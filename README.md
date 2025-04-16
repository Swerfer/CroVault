# 🔐 CroVault

**CroVault** is a decentralized privacy vault DApp that allows users to securely store encrypted credentials, notes, and wallet information on the Cronos blockchain. It uses client-side encryption, self-custody design, and open-source smart contracts to give users full control over their sensitive data — even beyond their lifetime.

---

## 🌍 Live Site

👉 [https://crovault.com](https://crovault.com)

---

## 🛡 Key Features

- ✅ **End-to-End Encryption** (AES-GCM with PBKDF2)
- ✅ **No Centralized Storage** – Everything lives on-chain
- ✅ **Secure Legacy Planning** – Share access only when needed
- ✅ **Multi-device access** – Nothing stored locally
- ✅ **Verified Smart Contracts** – Viewable on Cronoscan
- ✅ **Open Source & Auditable**

---

## 🔧 How It Works

1. Connect your crypto wallet (supports Web3 wallets)
2. Set a strong password (never sent to server)
3. Create your personal vault smart contract
4. Store data securely (encrypted on device before blockchain)
5. Share selectively if desired

Full technical overview available in [`workflow.html`](./workflow.html).

---

## 📁 Project Structure
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

## 💻 Local Development

### Prerequisites
- Node.js (optional, for bundling)
- Static server (or open `index.html` directly)

### Quick Start (for testing locally)

```bash
# 1. Clone the repo
git clone https://github.com/YourUsername/crovault.git
cd crovault

# 2. Run a local server (Python 3)
python3 -m http.server 8080

# 3. Visit
http://localhost:8080
```

Then open your browser at [http://localhost:8080](http://localhost:8080).

---

## 🔐 Smart Contracts

All smart contracts are publicly verified on Cronoscan:

- [Vault Contract](https://cronoscan.com/address/0xe1eF8879b7216DC3dE4e153B37FFC9D810928EC0)
- [Vault Factory](https://cronoscan.com/address/0xa07477Da0dB859F7799bAbA9bac87E8AF104b810)
- [Cost Manager](https://cronoscan.com/address/0x587776cCCeC6Ec77971588D9e75468e99e30c318)

---

## 📜 License

This project is licensed under the [MIT License](./license.html).

---

## 📣 Support & Social

- [Twitter / X](https://x.com/CroVault)
- [Telegram](https://t.me/CroVault)

---

## ⚠️ Disclaimer

CroVault is a decentralized application (dApp). You are solely responsible for your vault password, crypto wallet, and private keys. **If you lose access, your data cannot be recovered.**

---

## 🙌 Contributions

Contributions are welcome! For major changes, please open an issue first to discuss your ideas, then submit a pull request.
