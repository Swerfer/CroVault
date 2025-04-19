require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    cronos: {
      url: "https://evm.cronos.org",
      chainId: 25,
      accounts: ["ae409965dd877ac26c96f5edd3c12be4062d50a568920f2dc558a89e38863119"] // Vault contracts owner
    }
  },
  sourcify: {
    enabled: true
  }
};
