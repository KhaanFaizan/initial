/**
 * usePresale — custom hook for interacting with the Presale smart contract.
 *
 * Responsibilities:
 *   - Connect to MetaMask via ethers v6 BrowserProvider
 *   - Automatically switch MetaMask to the Hardhat local network (chainId 31337)
 *   - Read priceWeiPerToken from the deployed Presale contract
 *   - Send ETH to the buy() function and track the transaction lifecycle
 *   - Keep the caller's ETH balance up-to-date after every purchase
 *
 * Prerequisites:
 *   - Hardhat node running at http://127.0.0.1:8545
 *   - npx hardhat run scripts/deploy.js --network localhost  (writes src/contracts/Presale.json)
 *   - MetaMask installed in the browser
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import PresaleData from '../contracts/Presale.json';

// Hardhat default chainId
const HARDHAT_CHAIN_ID = 31337n;

// Hex encoding of 31337 used by wallet_ RPC methods
const HARDHAT_CHAIN_ID_HEX = '0x7A69';

/**
 * Extract a human-readable revert reason from an ethers v6 error object.
 * Covers MetaMask user-rejection (code 4001), on-chain require() messages,
 * and generic fallbacks.
 */
function parseError(err) {
  if (!err) return 'Unknown error.';
  if (err.code === 4001 || err.code === 'ACTION_REJECTED') return 'Transaction rejected by user.';
  if (err.reason) return err.reason;
  if (err.data?.message) return err.data.message;
  // ethers v6 sometimes nests the revert reason inside info
  if (err.info?.error?.message) return err.info.error.message;
  return err.message ?? 'An unexpected error occurred.';
}

export default function usePresale() {
  // Keep the provider in a ref so it never triggers re-renders
  const providerRef = useRef(null);

  const [account, setAccount]         = useState(null);
  const [ethBalance, setEthBalance]   = useState('0');
  const [tokenPrice, setTokenPrice]   = useState(null);   // BigInt | null
  const [isPending, setIsPending]     = useState(false);
  const [txHash, setTxHash]           = useState(null);
  // 'idle' | 'pending' | 'success' | 'error'
  const [txStatus, setTxStatus]       = useState('idle');
  const [error, setError]             = useState(null);

  const isConnected = Boolean(account);

  // ── Helpers ──────────────────────────────────────────────────────────────

  /** Re-fetch the caller's ETH balance. */
  const refreshBalance = useCallback(async (addr) => {
    if (!providerRef.current || !addr) return;
    try {
      const raw = await providerRef.current.getBalance(addr);
      setEthBalance(ethers.formatEther(raw));
    } catch {
      // Non-fatal — balance display simply stays stale
    }
  }, []);

  /** Read priceWeiPerToken from the live contract. */
  const fetchPrice = useCallback(async (contractInstance) => {
    try {
      const price = await contractInstance.priceWeiPerToken();
      setTokenPrice(price);
    } catch {
      setError(
        'Could not read price from contract. ' +
        'Make sure the Hardhat node is running and the contract is deployed.'
      );
    }
  }, []);

  // ── MetaMask event listeners (account/network changes) ───────────────────

  useEffect(() => {
    if (!window.ethereum) return;

    const onAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected all accounts
        providerRef.current = null;
        setAccount(null);
        setEthBalance('0');
        setTokenPrice(null);
        setTxStatus('idle');
        setTxHash(null);
        setError(null);
      } else {
        setAccount(accounts[0]);
        refreshBalance(accounts[0]);
      }
    };

    // Safest approach: reload page on chain switch so all state is fresh
    const onChainChanged = () => window.location.reload();

    window.ethereum.on('accountsChanged', onAccountsChanged);
    window.ethereum.on('chainChanged', onChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, [refreshBalance]);

  // ── connectWallet ─────────────────────────────────────────────────────────

  const connectWallet = useCallback(async () => {
    setError(null);

    if (!window.ethereum) {
      setError('MetaMask is not installed. Please visit metamask.io to install it.');
      return;
    }

    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);

      // Prompt the user to approve account access
      await _provider.send('eth_requestAccounts', []);

      // Verify we are on the Hardhat local network; switch if we are not
      const network = await _provider.getNetwork();
      if (network.chainId !== HARDHAT_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: HARDHAT_CHAIN_ID_HEX }],
          });
        } catch (switchErr) {
          // 4902 = the chain has not been added to MetaMask yet
          if (switchErr.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: HARDHAT_CHAIN_ID_HEX,
                chainName: 'Hardhat Local',
                rpcUrls: ['http://127.0.0.1:8545'],
                nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
                blockExplorerUrls: [],
              }],
            });
          } else {
            throw new Error(
              'Please switch MetaMask to the Hardhat Local network (localhost:8545).'
            );
          }
        }
      }

      const _signer  = await _provider.getSigner();
      const _account = await _signer.getAddress();

      providerRef.current = _provider;

      // Instantiate the contract with the signer so buy() can send transactions
      const _contract = new ethers.Contract(
        PresaleData.address,
        PresaleData.abi,
        _signer
      );

      setAccount(_account);
      await refreshBalance(_account);
      await fetchPrice(_contract);
    } catch (err) {
      setError(parseError(err));
    }
  }, [refreshBalance, fetchPrice]);

  // ── buyTokens ─────────────────────────────────────────────────────────────

  /**
   * Send ETH to the Presale buy() function.
   * @param {string|number} ethAmount  Human-readable ETH amount, e.g. "0.5"
   */
  const buyTokens = useCallback(async (ethAmount) => {
    if (!account || !providerRef.current) {
      setError('Please connect your wallet first.');
      return;
    }

    const amount = Number(ethAmount);
    if (!ethAmount || isNaN(amount) || amount <= 0) {
      setError('Enter a valid ETH amount greater than 0.');
      return;
    }

    setError(null);
    setTxHash(null);
    setTxStatus('pending');
    setIsPending(true);

    try {
      // Re-create contract with a fresh signer for every transaction
      const _signer   = await providerRef.current.getSigner();
      const _contract = new ethers.Contract(
        PresaleData.address,
        PresaleData.abi,
        _signer
      );

      const value = ethers.parseEther(String(ethAmount));
      const tx    = await _contract.buy({ value });
      setTxHash(tx.hash);

      // Wait for 1 confirmation
      await tx.wait(1);

      setTxStatus('success');
      await refreshBalance(account);

      // Re-read price in case the owner changed it between calls
      await fetchPrice(_contract);
    } catch (err) {
      setTxStatus('error');
      setError(parseError(err));
    } finally {
      setIsPending(false);
    }
  }, [account, refreshBalance, fetchPrice]);

  return {
    account,
    ethBalance,
    tokenPrice,      // BigInt — use ethers.formatEther() to display
    isConnected,
    isPending,
    txHash,
    txStatus,
    error,
    connectWallet,
    buyTokens,
  };
}
