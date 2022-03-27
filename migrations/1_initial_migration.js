const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const BenedictNFT = artifacts.require('BenedictNFT');

module.exports = async (deployer) => {
  await deployProxy(BenedictNFT, [], { deployer, kind: 'uups' });
};
