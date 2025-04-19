// scripts/fundVault.js
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // The vault contract address
  const contractAddress = "0x80F27fAEdcb37333fA3C04D37C53Baf951A05a05";

  // Get the signer (your private key must be in hardhat.config.js for the 'cronos' network)
  const [deployer] = await ethers.getSigners();

  console.log("Sending 5 CRO to the contract...");
  const tx = await deployer.sendTransaction({
    to: contractAddress,
    value: ethers.parseEther("5"), // 5 CRO
    gasLimit: 50000 // Manually specify gas limit
  });

  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Sent 5 CRO to the contract!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
