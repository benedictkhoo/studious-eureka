const { constants, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const BenedictToken = artifacts.require('BenedictToken');

contract('BenedictToken', ([owner, other]) => {
  const DEFAULT_ADMIN_ROLE = constants.ZERO_ADDRESS;
  const MINTER_ROLE = web3.utils.keccak256('MINTER_ROLE');
  const UPGRADER_ROLE = web3.utils.keccak256('UPGRADER_ROLE');
  let instance;

  beforeEach(async () => {
    instance = await BenedictToken.deployed();
  });

  it('the deployer should have the DEFAULT_ADMIN_ROLE, MINTER_ROLE & UPGRADER_ROLE', async () => {
    expect(await instance.hasRole(DEFAULT_ADMIN_ROLE, owner)).to.equal(true);
    expect(await instance.hasRole(MINTER_ROLE, owner)).to.equal(true);
    expect(await instance.hasRole(UPGRADER_ROLE, owner)).to.equal(true);
  });

  it('the deployer should be able to mint() if does not exceeds cap', async () => {
    await instance.mint(owner, web3.utils.toBN(1E19));
  });

  it('the deployer should not be able to mint() if exceeds cap', async () => {
    const cap = await instance.cap();

    expectRevert(instance.mint(owner, cap), 'ERC20Capped: cap exceeded');
  });

  it('other users should not be able to mint()', async () => {
    expectRevert(
      instance.mint(owner, web3.utils.toBN(1E19), { from: other }),
      `AccessControl: account ${other} is missing role ${MINTER_ROLE}.`
    )
  });
});
