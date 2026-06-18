const { expect } = require('chai');
const { ethers } = require('hardhat');

// ─── Helpers ─────────────────────────────────────────────────────────────────

const E = (n) => ethers.parseEther(String(n));   // shorthand for parseEther

/** Deploy a fresh SimpleERC20 + Presale and deposit `depositEther` tokens. */
async function deployFixture(priceEther = '0.01', depositEther = '100000') {
  const [owner, buyer, stranger] = await ethers.getSigners();

  const Token = await ethers.getContractFactory('SimpleERC20');
  const token = await Token.deploy('Sale Token', 'SALE', E('1000000'));
  await token.waitForDeployment();

  const Presale = await ethers.getContractFactory('Presale');
  const presale = await Presale.deploy(token.target, E(priceEther));
  await presale.waitForDeployment();

  if (Number(depositEther) > 0) {
    await token.approve(presale.target, E(depositEther));
    await presale.depositTokens(E(depositEther));
  }

  return { token, presale, owner, buyer, stranger };
}

// ─── Test suite ──────────────────────────────────────────────────────────────

describe('Presale', function () {

  // ── Deployment ─────────────────────────────────────────────────────────────
  describe('Deployment', function () {
    let token, presale, owner;

    beforeEach(async function () {
      ({ token, presale, owner } = await deployFixture());
    });

    it('stores the token address', async function () {
      expect(await presale.token()).to.equal(token.target);
    });

    it('stores the initial price', async function () {
      expect(await presale.priceWeiPerToken()).to.equal(E('0.01'));
    });

    it('starts in the open state', async function () {
      expect(await presale.open()).to.equal(true);
    });

    it('sets the deployer as owner', async function () {
      expect(await presale.owner()).to.equal(owner.address);
    });

    it('reverts when price is zero', async function () {
      const Token = await ethers.getContractFactory('SimpleERC20');
      const t = await Token.deploy('T', 'T', E('1000'));
      await t.waitForDeployment();

      const Presale = await ethers.getContractFactory('Presale');
      await expect(Presale.deploy(t.target, 0))
        .to.be.revertedWith('Presale: price must be > 0');
    });

    it('reverts when token address is zero', async function () {
      const Presale = await ethers.getContractFactory('Presale');
      await expect(Presale.deploy(ethers.ZeroAddress, E('0.01')))
        .to.be.revertedWith('Presale: token is zero address');
    });
  });

  // ── buy() ──────────────────────────────────────────────────────────────────
  describe('buy()', function () {

    describe('happy path', function () {
      let token, presale, owner, buyer;

      beforeEach(async function () {
        // price = 0.01 ETH per token  →  0.1 ETH buys exactly 10 tokens
        ({ token, presale, owner, buyer } = await deployFixture('0.01', '100000'));
      });

      it('(case 1) buyer receives the correct token amount', async function () {
        await presale.connect(buyer).buy({ value: E('0.1') });
        expect(await token.balanceOf(buyer.address)).to.equal(E('10'));
      });

      it('(case 9) contract token balance decreases by the exact amount sold', async function () {
        const before = await token.balanceOf(presale.target);
        await presale.connect(buyer).buy({ value: E('0.1') });
        const after = await token.balanceOf(presale.target);
        expect(before - after).to.equal(E('10'));
      });

      it('totalRaised increases by msg.value', async function () {
        await presale.connect(buyer).buy({ value: E('0.1') });
        expect(await presale.totalRaised()).to.equal(E('0.1'));

        await presale.connect(buyer).buy({ value: E('0.05') });
        expect(await presale.totalRaised()).to.equal(E('0.15'));
      });

      it('contract ETH balance increases by msg.value', async function () {
        await expect(presale.connect(buyer).buy({ value: E('0.1') }))
          .to.changeEtherBalance(presale, E('0.1'));
      });

      it('emits a Bought event with correct arguments', async function () {
        const sentWei = E('0.1');
        const expectedTokens = E('10');
        await expect(presale.connect(buyer).buy({ value: sentWei }))
          .to.emit(presale, 'Bought')
          .withArgs(buyer.address, expectedTokens, sentWei);
      });
    });

    describe('revert cases', function () {
      let token, presale, buyer;

      beforeEach(async function () {
        ({ token, presale, buyer } = await deployFixture('0.01', '100000'));
      });

      it('(case 2) reverts when presale is closed', async function () {
        await presale.setOpen(false);
        await expect(
          presale.connect(buyer).buy({ value: E('0.1') })
        ).to.be.revertedWith('Presale: presale is not open');
      });

      it('(case 5) reverts when msg.value is 0', async function () {
        await expect(
          presale.connect(buyer).buy({ value: 0 })
        ).to.be.revertedWith('Presale: must send ETH to buy tokens');
      });

      it('(case 4) reverts when contract has no tokens left', async function () {
        // Deploy a presale with zero deposited tokens
        const Token = await ethers.getContractFactory('SimpleERC20');
        const t = await Token.deploy('T', 'T', E('1000'));
        await t.waitForDeployment();

        const Presale = await ethers.getContractFactory('Presale');
        const emptyPresale = await Presale.deploy(t.target, E('0.01'));
        await emptyPresale.waitForDeployment();
        // no depositTokens() call → balance is 0

        await expect(
          emptyPresale.connect(buyer).buy({ value: E('0.1') })
        ).to.be.revertedWith('Presale: not enough tokens in contract');
      });

      it('(case 4) reverts when remaining token balance is less than the purchase amount', async function () {
        // Deposit only 5 tokens, then try to buy 10
        const Token = await ethers.getContractFactory('SimpleERC20');
        const [owner] = await ethers.getSigners();
        const t = await Token.deploy('T', 'T', E('1000'));
        await t.waitForDeployment();

        const Presale = await ethers.getContractFactory('Presale');
        const tightPresale = await Presale.deploy(t.target, E('0.01'));
        await tightPresale.waitForDeployment();

        await t.approve(tightPresale.target, E('5'));
        await tightPresale.depositTokens(E('5'));     // only 5 tokens available

        await expect(
          tightPresale.connect(buyer).buy({ value: E('0.1') })  // wants 10
        ).to.be.revertedWith('Presale: not enough tokens in contract');
      });
    });

    // ── Precision / rounding edge case (case 10) ───────────────────────────
    describe('precision / rounding', function () {
      it('(case 10) truncates fractional tokens — buyer never overpays in tokens', async function () {
        // price = 0.003 ETH/token, send 0.01 ETH → exact result = 3.333... tokens
        // Solidity integer division truncates → buyer gets 3333333333333333333 units
        const [owner, buyer] = await ethers.getSigners();
        const priceWei = E('0.003');

        const Token = await ethers.getContractFactory('SimpleERC20');
        const t = await Token.deploy('T', 'T', E('1000000'));
        await t.waitForDeployment();

        const Presale = await ethers.getContractFactory('Presale');
        const p = await Presale.deploy(t.target, priceWei);
        await p.waitForDeployment();

        await t.approve(p.target, E('1000'));
        await p.depositTokens(E('1000'));

        const sentWei = E('0.01');
        // Replicate on-chain formula: (msg.value * 1e18) / priceWeiPerToken
        const expectedTokens = (sentWei * ethers.parseEther('1')) / priceWei;

        await p.connect(buyer).buy({ value: sentWei });
        expect(await t.balanceOf(buyer.address)).to.equal(expectedTokens);
      });

      it('buying multiple times accumulates tokens correctly', async function () {
        const { token, presale, buyer } = await deployFixture('0.01', '100000');

        await presale.connect(buyer).buy({ value: E('0.1') });  // +10 tokens
        await presale.connect(buyer).buy({ value: E('0.2') });  // +20 tokens
        await presale.connect(buyer).buy({ value: E('0.05') }); // +5 tokens

        expect(await token.balanceOf(buyer.address)).to.equal(E('35'));
      });
    });
  });

  // ── withdraw() ─────────────────────────────────────────────────────────────
  describe('withdraw()', function () {
    let presale, owner, buyer, stranger;

    beforeEach(async function () {
      ({ presale, owner, buyer, stranger } = await deployFixture('0.01', '100000'));
      // Fund the contract with a purchase first
      await presale.connect(buyer).buy({ value: E('0.1') });
    });

    it('(case 8) owner receives the full ETH balance', async function () {
      const contractBalance = await ethers.provider.getBalance(presale.target);
      await expect(presale.connect(owner).withdraw())
        .to.changeEtherBalance(owner, contractBalance);
    });

    it('(case 8) contract ETH balance is zero after withdrawal', async function () {
      await presale.connect(owner).withdraw();
      expect(await ethers.provider.getBalance(presale.target)).to.equal(0n);
    });

    it('emits a Withdrawn event with correct arguments', async function () {
      const balance = await ethers.provider.getBalance(presale.target);
      await expect(presale.connect(owner).withdraw())
        .to.emit(presale, 'Withdrawn')
        .withArgs(owner.address, balance);
    });

    it('(case 6) reverts when called by a non-owner', async function () {
      await expect(
        presale.connect(stranger).withdraw()
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('reverts when there is no ETH to withdraw', async function () {
      await presale.connect(owner).withdraw();          // drain once
      await expect(presale.connect(owner).withdraw())   // second call must fail
        .to.be.revertedWith('Presale: nothing to withdraw');
    });
  });

  // ── setPrice() ─────────────────────────────────────────────────────────────
  describe('setPrice()', function () {
    let presale, owner, buyer, stranger;

    beforeEach(async function () {
      ({ presale, owner, buyer, stranger } = await deployFixture('0.01', '100000'));
    });

    it('(case 7) reverts when called by a non-owner', async function () {
      await expect(
        presale.connect(stranger).setPrice(E('0.02'))
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('(case 3) reverts when new price is zero', async function () {
      await expect(
        presale.connect(owner).setPrice(0)
      ).to.be.revertedWith('Presale: price must be > 0');
    });

    it('owner can update the price and new price is reflected in buys', async function () {
      await presale.connect(owner).setPrice(E('0.02'));  // 0.02 ETH per token
      expect(await presale.priceWeiPerToken()).to.equal(E('0.02'));

      // At 0.02 ETH/token, 0.1 ETH should buy 5 tokens
      await presale.connect(buyer).buy({ value: E('0.1') });
      expect(await (await ethers.getContractFactory('SimpleERC20'))
        .attach((await presale.token()))
        .balanceOf(buyer.address)
      ).to.equal(E('5'));
    });

    it('emits a PriceUpdated event with old and new price', async function () {
      const oldPrice = await presale.priceWeiPerToken();
      const newPrice = E('0.02');
      await expect(presale.connect(owner).setPrice(newPrice))
        .to.emit(presale, 'PriceUpdated')
        .withArgs(oldPrice, newPrice);
    });
  });

  // ── setOpen() ──────────────────────────────────────────────────────────────
  describe('setOpen()', function () {
    let presale, owner, buyer, stranger;

    beforeEach(async function () {
      ({ presale, owner, buyer, stranger } = await deployFixture('0.01', '100000'));
    });

    it('owner can close the presale', async function () {
      await presale.connect(owner).setOpen(false);
      expect(await presale.open()).to.equal(false);
    });

    it('owner can reopen a closed presale', async function () {
      await presale.connect(owner).setOpen(false);
      await presale.connect(owner).setOpen(true);
      expect(await presale.open()).to.equal(true);

      // Buying should work again after reopening
      await presale.connect(buyer).buy({ value: E('0.1') });
      const token = await (await ethers.getContractFactory('SimpleERC20'))
        .attach(await presale.token());
      expect(await token.balanceOf(buyer.address)).to.equal(E('10'));
    });

    it('emits a PresaleStateChanged event', async function () {
      await expect(presale.connect(owner).setOpen(false))
        .to.emit(presale, 'PresaleStateChanged')
        .withArgs(false);

      await expect(presale.connect(owner).setOpen(true))
        .to.emit(presale, 'PresaleStateChanged')
        .withArgs(true);
    });

    it('reverts when called by a non-owner', async function () {
      await expect(
        presale.connect(stranger).setOpen(false)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  // ── depositTokens() ────────────────────────────────────────────────────────
  describe('depositTokens()', function () {
    let token, presale, owner, stranger;

    beforeEach(async function () {
      // Deploy with zero initial deposit so we can test deposit in isolation
      ({ token, presale, owner, stranger } = await deployFixture('0.01', '0'));
    });

    it('owner can deposit tokens and contract balance increases', async function () {
      await token.connect(owner).approve(presale.target, E('500'));
      await presale.connect(owner).depositTokens(E('500'));
      expect(await token.balanceOf(presale.target)).to.equal(E('500'));
    });

    it('reverts when called by a non-owner', async function () {
      await expect(
        presale.connect(stranger).depositTokens(E('100'))
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('reverts when amount is zero', async function () {
      await expect(
        presale.connect(owner).depositTokens(0)
      ).to.be.revertedWith('Presale: amount must be > 0');
    });

    it('reverts when allowance is insufficient', async function () {
      // No approve call → transferFrom will fail
      await expect(
        presale.connect(owner).depositTokens(E('500'))
      ).to.be.reverted;
    });
  });
});
