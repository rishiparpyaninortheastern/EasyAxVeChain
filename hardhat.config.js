require("@nomicfoundation/hardhat-toolbox");
require("@vechain/hardhat-vechain");
require("@vechain/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    vechain: {
      url: "https://vethor-node-test.vechaindev.com",
      accounts: {
        mnemonic: "mad soldier goose umbrella pottery select latin prosper exist correct purchase tunnel",
        count: 10,
      },
      restful: true,
      gas: 10000000
    }
  },
  paths: {
    artifacts: "src/artifacts",
  },
};
