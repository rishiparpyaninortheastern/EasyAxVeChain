const { ethers } = require("hardhat");
const { Signer, Contract, utils } = require("ethers");
const { expect } = require("chai");

async function deployTokenBalanceCheckerFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner, user] = await ethers.getSigners();

  // Deploy the TokenBalanceChecker contract
  const TokenBalanceCheckerFactory = await ethers.getContractFactory("TokenBalanceChecker");
  const tokenBalanceChecker = await TokenBalanceCheckerFactory.deploy("0x9D0550Bf6C46CFcB43A3E00C4A23D88226C5C2f7");
  
  return { tokenBalanceChecker, user };
}

describe("Balance Checks", function () {
  it("Should return the correct VET balance for a user", async function () {
    const { tokenBalanceChecker, user } = await deployTokenBalanceCheckerFixture();
    const userAddress = await user.getAddress();

    // Replace with actual balance and TOKEN_CONTRACT_ADDRESS
    const expectedBalance = '1000';
    // Call the getVETBalance function
    const balance = await tokenBalanceChecker.getVETBalance(userAddress);

    // Use the `eq` function to compare BigNumbers
    expect(balance).to.be.eq(expectedBalance);
  });

  // Add more balance check tests as needed
});
