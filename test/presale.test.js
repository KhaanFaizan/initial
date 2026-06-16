const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Presale', function () {
  let Token, token, Presale, presale, owner, buyer;

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();

    Token = await ethers.getContractFactory('SimpleERC20');
    token = await Token.deploy('OZ Test', 'OZT', ethers.parseEther('1000000'));
    await token.waitForDeployment();

    Presale = await ethers.getContractFactory('Presale');
    presale = await Presale.deploy(token.target || token.address, ethers.parseEther('0.01'));
    await presale.waitForDeployment();

    // Owner approves and deposits tokens to presale
    const depositAmount = ethers.parseEther('100000');
    await token.approve(presale.target || presale.address, depositAmount);
    await presale.depositTokens(depositAmount);
  });

  it('buyer can purchase tokens using ETH', async function () {
    const buyerBalanceBefore = await ethers.provider.getBalance(buyer.address);

    // Buyer sends 0.1 ETH -> should receive 10 tokens at 0.01 ETH per token
    const tx = await presale.connect(buyer).buy({ value: ethers.parseEther('0.1') });
    await tx.wait();

    const buyerTokenBalance = await token.balanceOf(buyer.address);
    expect(buyerTokenBalance).to.equal(ethers.parseEther('10'));
  });

  it('cannot buy if presale closed', async function () {
    await presale.setOpen(false);
    await expect(presale.connect(buyer).buy({ value: ethers.parseEther('0.1') })).to.be.revertedWith('Presale closed');
  });
});
