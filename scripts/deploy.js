const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with account:', deployer.address);

  const SimpleERC20 = await hre.ethers.getContractFactory('SimpleERC20');
  const token = await SimpleERC20.deploy('OZ Test', 'OZT', hre.ethers.parseEther('1000000'));
  await token.waitForDeployment();
  console.log('Token deployed to:', token.target || token.address);

  const Presale = await hre.ethers.getContractFactory('Presale');
  // price: 0.01 ETH per token -> 0.01 * 1e18 = 1e16 wei per token
  const presale = await Presale.deploy(token.target || token.address, hre.ethers.parseEther('0.01'));
  await presale.waitForDeployment();
  console.log('Presale deployed to:', presale.target || presale.address);

  // approve and deposit some tokens from deployer
  const depositAmount = hre.ethers.parseEther('100000');
  await token.approve(presale.target || presale.address, depositAmount);
  await presale.depositTokens(depositAmount);
  console.log('Deposited tokens to presale');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
