// scripts/deployVaultContract.js
const hre = require("hardhat");

async function main() {
  const VaultContract = await hre.ethers.getContractFactory("VaultFactory");

  // Replace these with your actual contract addresses:
  const vaultImplementationAddress = "0x3D47B247c139F55F5e01371d145d65d406c54A55";
  const costManagerAddress = "0x50E2c7201d5714e018a33203FbD92979BC51eee4";

  // Deploy the contract with parameters
  const vaultContract = await VaultContract.deploy(
    vaultImplementationAddress,
    costManagerAddress
  );

  await vaultContract.waitForDeployment();

  console.log("VaultContract deployed at:", await vaultContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
