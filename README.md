# CroVault

**CroVault** is a decentralized privacy vault built on the Cronos blockchain. It securely stores encrypted credentials, notes, and wallet information directly on-chain, accessible only through your crypto wallet and a personal password.

---

## Live Demo

👉 [https://crovault.com](https://crovault.com)

---

## Features

- **End-to-End Encryption**  
  Uses AES-GCM with PBKDF2 for secure, client-side data encryption.

- **Blockchain Storage**  
  Your data is stored in your personal vault smart contract on the Cronos blockchain.

- **Web3-Enabled**  
  No centralized server—only you control access to your data with your wallet and password.

- **Legacy Support**  
  Optionally share access with trusted individuals when needed.

- **Open Source**  
  All smart contracts are verified and auditable on Cronoscan.

---

## How It Works

1. **Connect Your Wallet:**  
   Use a Cronos-compatible Web3 wallet to connect to the DApp.

2. **Set a Password:**  
   Create a strong, 12+ character password for client-side encryption (never sent to a server).

3. **Create Your Vault:**  
   Deploy your personal vault smart contract, which stores your encrypted data on the blockchain.

4. **Store and Manage Data:**  
   Add, update, or delete encrypted credentials, notes, and wallet addresses as needed.

5. **Secure Access:**  
   Only someone with both your wallet and your password can decrypt your data.

See the detailed overview in the [Workflow Overview](./workflow.html) page.

---

## Project Structure

```
.
├── index.html         # Landing page
├── vault.html         # Main vault interface
├── vault.js           # DApp logic (wallet connection, encryption, decryption)
├── vault.css          # Styles for the DApp
├── workflow.html      # Detailed DApp process overview
├── terms.html         # Terms & Conditions
├── privacy.html       # Privacy Policy
└── license.html       # MIT License
```

---

## Local Setup

Clone the repository and start a local static server (e.g., using Python):

```bash
git clone https://github.com/YourUsername/crovault.git
cd crovault
python3 -m http.server 8080
```

Then open your browser at [http://localhost:8080](http://localhost:8080).

---

## Smart Contracts

All smart contracts are publicly verified on Cronoscan:

- [Vault Contract](https://cronoscan.com/address/0xe1eF8879b7216DC3dE4e153B37FFC9D810928EC0)
- [Vault Factory](https://cronoscan.com/address/0xa07477Da0dB859F7799bAbA9bac87E8AF104b810)
- [Cost Manager](https://cronoscan.com/address/0x587776cCCeC6Ec77971588D9e75468e99e30c318)

---

## License

This project is licensed under the [MIT License](./license.html).

---

## Connect with Us

- [Twitter / X](https://x.com/CroVault)
- [Telegram](https://t.me/CroVault)

---

## Disclaimer

CroVault is a decentralized application (dApp). You are solely responsible for your vault password, crypto wallet, and private keys. **If you lose access, your data cannot be recovered.**

---

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss your ideas, then submit a pull request.
