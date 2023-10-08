const { ethers, upgrades } = require('hardhat');

async function main() {
  // Deploy TokenBalanceChecker contract
  const EcoTraveler = await ethers.getContractFactory('EcoTraveler');
  //const vetTokenAddress = '0xa04d78598f32e4134d4834E8DCC4fC216A60b820'; // Replace with the actual VET token address
  const ecoTraveler = await EcoTraveler.deploy();

  console.log('ecoTraveler deployed to:', await ecoTraveler.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });