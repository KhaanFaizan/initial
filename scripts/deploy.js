/**
 * Deployment script: SimpleERC20 + Presale
 *
 * Usage:
 *   npx hardhat run scripts/deploy.js --network localhost
 *   npx hardhat run scripts/deploy.js --network sepolia
 *
 * After a successful run, React-ready JSON files are written to src/contracts/:
 *   src/contracts/SimpleERC20.json  — { address, abi, network, deployedAt }
 *   src/contracts/Presale.json      — { address, abi, network, deployedAt }
 */

const hre  = require('hardhat');
const fs   = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────────────

/** Total token supply minted to the deployer (1,000,000 tokens). */
const TOTAL_SUPPLY = hre.ethers.parseEther('1000000');

/**
 * Price per token in wei.
 * 0.001 ETH per token  →  1 ETH buys 1 000 tokens.
 */
const PRICE_WEI_PER_TOKEN = hre.ethers.parseEther('0.001');

/** How many tokens to transfer into the Presale contract (100,000 tokens). */
const PRESALE_DEPOSIT = hre.ethers.parseEther('100000');

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Read the ABI array from a Hardhat artifact.
 * @param {string} contractName  e.g. "Presale"
 */
function readAbi(contractName) {
  const artifactPath = path.join(
    __dirname, '..', 'artifacts', 'contracts',
    `${contractName}.sol`, `${contractName}.json`
  );

  if (!fs.existsSync(artifactPath)) {
    throw new Error(
      `Artifact not found at ${artifactPath}.\n` +
      'Run "npx hardhat compile" before deploying.'
    );
  }

  return JSON.parse(fs.readFileSync(artifactPath, 'utf8')).abi;
}

/**
 * Write a React-importable JSON file to src/contracts/.
 * Creates the directory if it does not exist.
 *
 * @param {string} contractName  File will be saved as <contractName>.json
 * @param {string} address       Deployed contract address
 * @param {Array}  abi           ABI array from the Hardhat artifact
 * @param {string} network       Hardhat network name
 * @param {number} deployedAt    Unix timestamp (seconds) of deployment block
 */
function saveContractInfo(contractName, address, abi, network, deployedAt) {
  const outDir = path.join(__dirname, '..', 'src', 'contracts');
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${contractName}.json`);
  const payload = { contractName, address, abi, network, deployedAt };

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
  console.log(`  ✔  Saved  ${path.relative(process.cwd(), outPath)}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const network    = hre.network.name;

  console.log('─'.repeat(60));
  console.log('Network  :', network);
  console.log('Deployer :', deployer.address);
  console.log(
    'Balance  :',
    hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)),
    'ETH'
  );
  console.log('─'.repeat(60));

  // ── 1. Deploy SimpleERC20 ──────────────────────────────────────────────────
  console.log('\n[1/5] Deploying SimpleERC20…');
  const TokenFactory = await hre.ethers.getContractFactory('SimpleERC20');
  const token = await TokenFactory.deploy('Stardust Token', 'STAR', TOTAL_SUPPLY);
  await token.waitForDeployment();

  const tokenAddress = token.target;
  const tokenBlock   = await hre.ethers.provider.getBlock('latest');
  console.log(`      SimpleERC20 deployed → ${tokenAddress}`);
  console.log(`      Supply: ${hre.ethers.formatEther(TOTAL_SUPPLY)} STAR`);

  // ── 2. Deploy Presale ──────────────────────────────────────────────────────
  console.log('\n[2/5] Deploying Presale…');
  const PresaleFactory = await hre.ethers.getContractFactory('Presale');
  const presale = await PresaleFactory.deploy(tokenAddress, PRICE_WEI_PER_TOKEN);
  await presale.waitForDeployment();

  const presaleAddress = presale.target;
  const presaleBlock   = await hre.ethers.provider.getBlock('latest');
  console.log(`      Presale deployed     → ${presaleAddress}`);
  console.log(
    `      Price: ${hre.ethers.formatEther(PRICE_WEI_PER_TOKEN)} ETH per token`,
    `  (1 ETH = ${hre.ethers.formatEther(
      hre.ethers.parseEther('1') * hre.ethers.parseEther('1') / PRICE_WEI_PER_TOKEN
    )} tokens)`
  );

  // ── 3. Approve + deposit tokens into Presale ───────────────────────────────
  console.log('\n[3/5] Depositing tokens into Presale…');
  const approveTx = await token.approve(presaleAddress, PRESALE_DEPOSIT);
  await approveTx.wait();

  const depositTx = await presale.depositTokens(PRESALE_DEPOSIT);
  await depositTx.wait();

  const presaleTokenBalance = await token.balanceOf(presaleAddress);
  console.log(
    `      Presale token balance → ${hre.ethers.formatEther(presaleTokenBalance)} STAR`
  );

  // ── 4. Confirm presale is open ─────────────────────────────────────────────
  console.log('\n[4/5] Confirming presale state…');
  const isOpen = await presale.open();

  if (!isOpen) {
    // Safety net: open it if somehow it was deployed closed.
    console.log('      Presale was closed — opening now…');
    const openTx = await presale.setOpen(true);
    await openTx.wait();
  }

  console.log(`      Presale is open: ${await presale.open()}`);
  console.log(
    `      Owner: ${await presale.owner()}`
  );

  // ── 5. Save addresses + ABIs for React ────────────────────────────────────
  console.log('\n[5/5] Writing contract info to src/contracts/…');

  saveContractInfo(
    'SimpleERC20',
    tokenAddress,
    readAbi('SimpleERC20'),
    network,
    tokenBlock.timestamp
  );

  saveContractInfo(
    'Presale',
    presaleAddress,
    readAbi('Presale'),
    network,
    presaleBlock.timestamp
  );

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('Deployment complete.');
  console.log('─'.repeat(60));
  console.log('CONTRACT ADDRESSES');
  console.log('  SimpleERC20 :', tokenAddress);
  console.log('  Presale     :', presaleAddress);
  console.log('─'.repeat(60));
  console.log('React import example:');
  console.log("  import Presale from './contracts/Presale.json';");
  console.log("  const contract = new ethers.Contract(Presale.address, Presale.abi, signer);");
  console.log('─'.repeat(60));
}

main().catch((err) => {
  console.error('\nDeployment failed:', err);
  process.exitCode = 1;
});
