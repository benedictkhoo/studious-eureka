const { constants, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const BenedictNFT = artifacts.require('BenedictNFT');

contract('BenedictNFT', ([owner, other]) => {
  const DEFAULT_ADMIN_ROLE = constants.ZERO_ADDRESS;
  const PAUSER_ROLE = web3.utils.keccak256('PAUSER_ROLE');
  const MINTER_ROLE = web3.utils.keccak256('MINTER_ROLE');
  const UPGRADER_ROLE = web3.utils.keccak256('UPGRADER_ROLE');
  let instance;

  beforeEach(async () => {
    instance = await BenedictNFT.deployed();
  });

  it('the deployer should have the DEFAULT_ADMIN_ROLE, PAUSER_ROLE, MINTER_ROLE & UPGRADER_ROLE', async () => {
    expect(await instance.hasRole(DEFAULT_ADMIN_ROLE, owner)).to.equal(true);
    expect(await instance.hasRole(PAUSER_ROLE, owner)).to.equal(true);
    expect(await instance.hasRole(MINTER_ROLE, owner)).to.equal(true);
    expect(await instance.hasRole(UPGRADER_ROLE, owner)).to.equal(true);
  });

  it('the deployer should be able to pause() & unpause()', async () => {
    await instance.pause();
    expect(await instance.paused()).to.equal(true);
    await instance.unpause();
    expect(await instance.paused()).to.equal(false);
  });

  it('the deployer should be able to safeMint()', async () => {
    await instance.safeMint(other);
  });

  it('other users should not be able to safeMint()', async () => {
    expectRevert(
      instance.safeMint(other, { from: other }),
      `AccessControl: account ${other} is missing role ${MINTER_ROLE}.`
    );
  });

  it('other users should not be able to pause() & unpause()', async () => {
    expectRevert(
      instance.pause({ from: other }),
      `AccessControl: account ${other} is missing role ${PAUSER_ROLE}.`
    );
    expect(await instance.paused()).to.equal(false);
    expectRevert(
      instance.unpause({ from: other }),
      `AccessControl: account ${other} is missing role ${PAUSER_ROLE}.`
    );
    expect(await instance.paused()).to.equal(false);
  });
});
