// scripts/interactVault.js
const hre = require("hardhat");

async function main() {
  // 1. Contract address on Cronos
  const contractAddress = "0x80F27fAEdcb37333fA3C04D37C53Baf951A05a05"; // your deployed contract

  // 2. Get the Contract instance
  const vault = await hre.ethers.getContractAt("BlockchainVault", contractAddress);

  // Inside the same script or a new function:
  const tx2 = await vault.deleteCredentials([1, 2]);
  await tx2.wait();

const walletsArray = await vault.readCredentials();
console.log("Current credentials:", walletsArray);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
