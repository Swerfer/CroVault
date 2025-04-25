// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // 1) Get a ContractFactory for your contract
  //    If your contract name is "RandomToken":
  const BlockchainVault = await hre.ethers.getContractFactory("VaultContract3");
  
   // Deploy the contract
  const vault = await BlockchainVault.deploy();
  await vault.waitForDeployment();

  console.log("Deployed at:", await vault.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
