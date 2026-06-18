// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Presale
 * @notice Sells a fixed-price ERC-20 token in exchange for ETH.
 *         Only the owner may configure the presale or withdraw proceeds.
 * @dev    Inherits ReentrancyGuard and Ownable from OpenZeppelin v4.
 */
contract Presale is ReentrancyGuard, Ownable {
    /// @notice The ERC-20 token being sold.
    IERC20 public token;

    /// @notice Price in wei that must be paid to receive one full token (1e18 units).
    uint256 public priceWeiPerToken;

    /// @notice Whether the presale is currently accepting purchases.
    bool public open;

    /// @notice Cumulative ETH (in wei) received from all purchases.
    uint256 public totalRaised;

    /// @notice Emitted on every successful token purchase.
    /// @param buyer        Address that sent ETH and received tokens.
    /// @param amountTokens Number of token units (1e18 = 1 full token) transferred.
    /// @param valueWei     Amount of ETH (in wei) paid.
    event Bought(address indexed buyer, uint256 amountTokens, uint256 valueWei);

    /// @notice Emitted when the owner changes the token price.
    /// @param oldPrice Previous price in wei per token.
    /// @param newPrice Updated price in wei per token.
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);

    /// @notice Emitted when the presale open/closed state changes.
    /// @param isOpen New state — true means open, false means closed.
    event PresaleStateChanged(bool isOpen);

    /// @notice Emitted when the owner withdraws ETH from the contract.
    /// @param recipient Address that received the ETH (always the owner).
    /// @param amount    Wei amount withdrawn.
    event Withdrawn(address indexed recipient, uint256 amount);

    /**
     * @notice Deploys the presale contract.
     * @param _token            Address of the ERC-20 token to be sold.
     * @param _priceWeiPerToken Price in wei required to buy one full token.
     *                          Must be greater than zero.
     */
    constructor(IERC20 _token, uint256 _priceWeiPerToken) {
        require(address(_token) != address(0), "Presale: token is zero address");
        require(_priceWeiPerToken > 0, "Presale: price must be > 0");

        token = _token;
        priceWeiPerToken = _priceWeiPerToken;
        open = true;
    }

    // ───────────────────────────── Public ─────────────────────────────

    /**
     * @notice Purchase tokens by sending ETH.
     *         The number of tokens received equals:
     *         (msg.value * 1e18) / priceWeiPerToken
     * @dev    Follows checks-effects-interactions:
     *         1. All require() guards (checks).
     *         2. State mutation of `totalRaised` (effects).
     *         3. External token transfer (interactions).
     *         Protected by `nonReentrant` to prevent re-entrancy attacks.
     */
    function buy() external payable nonReentrant {
        // --- Checks ---
        require(open, "Presale: presale is not open");
        require(priceWeiPerToken > 0, "Presale: price must be > 0");
        require(msg.value > 0, "Presale: must send ETH to buy tokens");

        uint256 tokensToSend = (msg.value * 1e18) / priceWeiPerToken;
        require(
            token.balanceOf(address(this)) >= tokensToSend,
            "Presale: not enough tokens in contract"
        );

        // --- Effects ---
        totalRaised += msg.value;

        // --- Interactions ---
        require(
            token.transfer(msg.sender, tokensToSend),
            "Presale: token transfer failed"
        );

        emit Bought(msg.sender, tokensToSend, msg.value);
    }

    // ───────────────────────────── Owner only ─────────────────────────

    /**
     * @notice Withdraw all ETH held by this contract to the owner's address.
     * @dev    Uses low-level `call` instead of `transfer` to avoid the 2 300-gas
     *         stipend limitation should the owner ever be a smart contract.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Presale: nothing to withdraw");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Presale: ETH transfer failed");

        emit Withdrawn(owner(), balance);
    }

    /**
     * @notice Open or close the presale.
     * @param _open Pass `true` to open, `false` to close.
     */
    function setOpen(bool _open) external onlyOwner {
        open = _open;
        emit PresaleStateChanged(_open);
    }

    /**
     * @notice Update the token price.
     * @param _priceWeiPerToken New price in wei per full token. Must be > 0.
     */
    function setPrice(uint256 _priceWeiPerToken) external onlyOwner {
        require(_priceWeiPerToken > 0, "Presale: price must be > 0");
        emit PriceUpdated(priceWeiPerToken, _priceWeiPerToken);
        priceWeiPerToken = _priceWeiPerToken;
    }

    /**
     * @notice Deposit tokens into this contract so buyers can purchase them.
     * @dev    Requires prior ERC-20 `approve(address(this), amount)` from the owner.
     * @param  amount Number of token units (1e18 = 1 full token) to deposit.
     */
    function depositTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Presale: amount must be > 0");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Presale: token deposit failed"
        );
    }
}
