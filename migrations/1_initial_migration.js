const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const BenedictNFT = artifacts.require('BenedictNFT');
const BenedictToken = artifacts.require('BenedictToken');

module.exports = async (deployer) => {
  await deployProxy(BenedictNFT, [], { deployer, kind: 'uups' });
  await deployProxy(BenedictToken, [], { deployer, kind: 'uups' });
};
