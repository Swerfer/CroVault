// ==== Config and ABIs ====
const costManagerAddress  = "0xcBB5409246532Ac3935598Bc4d50baed60fe0EF6";
const factoryAddress      = "0x6324CfA3c13b690d135B69886BB06C736e6aCf52";
// ==== topic0 = Event VaultCreated in CostManager contract Topics 0 ====
const topic0              = "0x5d9c31ffa0fecffd7cf379989a3c7af252f0335e0d2a1320b55245912c781f53";
const fetchVaultCountUrl  = `https://cronos.org/explorer/api?module=logs&action=getLogs&fromBlock=18000000&toBlock=latest&address=${factoryAddress}&topic0=${topic0}`;
const cronosRpcUrl        = "https://evm-cronos.crypto.org";
const cronoScanUrl        = "https://cronoscan.com";

const costManagerAbi = [
  {
    inputs: [],
    name: "vaultUpsertCost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "vaultCreationCost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

const vaultAbi = [
  {
    inputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "username", type: "string" },
        { internalType: "string", name: "password", type: "string" },
        { internalType: "string", name: "remarks", type: "string" }
      ],
      internalType: "struct VaultContract.Credential[]",
      name: "creds",
      type: "tuple[]"
    }],
    name: "upsertCredentials",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "readCredentials",
    outputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "username", type: "string" },
        { internalType: "string", name: "password", type: "string" },
        { internalType: "string", name: "remarks", type: "string" },
        { internalType: "uint256", name: "timestamp", type: "uint256" }
      ],
      internalType: "struct VaultContract.Credential[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    name: "deleteCredentials",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "note", type: "string" }
      ],
      internalType: "struct VaultContract.NoteUpsert[]",
      name: "data",
      type: "tuple[]"
    }],
    name: "upsertNotes",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "readNote",
    outputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "note", type: "string" },
        { internalType: "uint256", name: "timestamp", type: "uint256" }
      ],
      internalType: "struct VaultContract.Note[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    name: "deleteNotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "address", name: "walletAddress", type: "string" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "privateKey", type: "string" },
        { internalType: "string", name: "seedPhrase", type: "string" },
        { internalType: "string", name: "remarks", type: "string" }
      ],
      internalType: "struct VaultContract.WalletUpsert[]",
      name: "data",
      type: "tuple[]"
    }],
    name: "upsertWalletAddress",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "readWalletAddress",
    outputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "address", name: "walletAddress", type: "string" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "privateKey", type: "string" },
        { internalType: "string", name: "seedPhrase", type: "string" },
        { internalType: "string", name: "remarks", type: "string" },
        { internalType: "uint256", name: "timestamp", type: "uint256" }
      ],
      internalType: "struct VaultContract.WalletInfo[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    name: "deleteWalletAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
  ,
  {
    inputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "key", type: "string" },
        { internalType: "string", name: "algorithm", type: "string" },
        { internalType: "uint256", name: "interval", type: "uint256" }
      ],
      internalType: "struct VaultContract.TOTPUpsert[]",
      name: "data",
      type: "tuple[]"
    }],
    name: "upsertTOTP",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "readTOTP",
    outputs: [{
      components: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "key", type: "string" },
        { internalType: "string", name: "algorithm", type: "string" },
        { internalType: "uint256", name: "interval", type: "uint256" },
        { internalType: "uint256", name: "timestamp", type: "uint256" }
      ],
      internalType: "struct VaultContract.TOTP[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    name: "deleteTOTP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }  
];

// ==== State ====

let cachedCosts = { creation: null, upsert: null };
let web3Modal;
let provider;       // ethers provider
let signer;         // ethers signer
let walletAddress;  // connected wallet
let userVault = "";
let sessionPassword = null;
let walletDerivedKey = null;
let pendingCredentials = [];
let pendingNotes = [];
let pendingWallets = [];
let pendingTotps = [];
let editingOriginalCredential = null;
let editingOriginalNote = null;
let editingOriginalWallet = null;
let editingOriginalTotp = null;

// ==== Utilities ====

function strToUint8(str) { return new TextEncoder().encode(str); }

function uint8ToB64(bytes) { return btoa(String.fromCharCode(...new Uint8Array(bytes))); }

function b64ToUint8(base64) {
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard"))
    .catch(err => console.error("Failed to copy text:", err));
}

function showSpinner(text = "Saving to blockchain...") {
  const overlay = document.getElementById("spinnerOverlay");
  if (!overlay) return;
  overlay.querySelector(".spinner-text").textContent = text;
  overlay.classList.remove("hidden");
}

function hideSpinner() {
  const overlay = document.getElementById("spinnerOverlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
}

function clearCredentialForm() {
  ["credName", "credUsername", "credPassword", "credRemarks"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

function clearNoteForm() {
  document.getElementById("noteName").value = "";
  document.getElementById("noteContent").value = "";
}

function clearWalletForm() {
  ["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

function clearTotpForm() {
  ["totpName", "totpKey", "totpAlgorithm", "totpInterval"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

function showVaultType(type) {
  document.querySelectorAll('.vault-card').forEach(el => el.classList.add('displayNone'));
  document.querySelectorAll(`.vault-${type}`).forEach(el => el.classList.remove('displayNone'));
}

async function fetchVaultCount() {
  const path = window.location.pathname.toLowerCase();
  if (!(path.endsWith("/") || path.endsWith("/index") || path.endsWith("/index.html"))) return;
  try {
    const response = await fetch(fetchVaultCountUrl);
    const data = await response.json();

    // Check if data looks good
    if (data && data.status === "1" && Array.isArray(data.result)) {
      const count = data.result.length;
      document.getElementById("activeVaults").textContent = "Number of active vaults: " + count;
    }
  } catch (err) {
    console.error("Failed to fetch vault count:", err);
    document.getElementById("activeVaults").textContent = "Error";
  }
}

async function fetchAndCacheCosts() {
  if (!provider) return;
  try {
    await getVaultUpsertCost(); // sets cachedCosts.upsert
    await getVaultCreationCost(); // sets cachedCosts.creation
    let costText = `Creating a vault will cost you <strong>${cachedCosts.creation} CRO</strong> plus a small transaction fee.`;
    let priceDisplay = document.getElementById("createVaultPrice");
    if (priceDisplay) {
      priceDisplay.innerHTML = costText;
    }
    costText = `Updating or editing data will cost <strong>${cachedCosts.upsert} CRO</strong> plus a network fee.<br>
      The network fee varies with data size and network conditions.<br>
      <strong>Tip:</strong> Batching updates doesn’t increase the CRO fee and can reduce the total network fee per item.`;
    priceDisplay = document.getElementById("upsertCredentialPrice");
    if (priceDisplay) {
      priceDisplay.innerHTML = costText;
    }
    priceDisplay = document.getElementById("upsertNotePrice");
    if (priceDisplay) {
      priceDisplay.innerHTML = costText;
    }
    priceDisplay = document.getElementById("upsertWalletPrice");
    if (priceDisplay) {
      priceDisplay.innerHTML = costText;
    }
    priceDisplay = document.getElementById("upsertTotpPrice");
    if (priceDisplay) {
      priceDisplay.innerHTML = costText;
    }

  } catch (e) {
    console.error("Error fetching costs:", e.message);
  }
}

async function getVaultCreationCost() {
  const costManager = new ethers.Contract(costManagerAddress, costManagerAbi, provider);
  for (let i = 0; i < 10; i++) {
    try {
      cachedCosts.creation = ethers.utils.formatEther(await costManager.vaultCreationCost());
      return cachedCosts.creation;
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw new Error("Unable to fetch vault creation cost");
}

async function getVaultUpsertCost() {
  const costManager = new ethers.Contract(costManagerAddress, costManagerAbi, provider);
  for (let i = 0; i < 10; i++) {
    try {
      cachedCosts.upsert = ethers.utils.formatEther(await costManager.vaultUpsertCost());
      return cachedCosts.upsert;
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw new Error("Unable to fetch vault upsert cost");
}

function updateGlobalSaveButtonVisibility() {
  const shouldShow =
    pendingCredentials.length > 0 ||
    pendingNotes.length > 0 ||
    pendingWallets.length > 0 ||
    pendingTotps.length > 0;

  const btn1 = document.getElementById("estimateSaveBtn");
  const btn2 = document.getElementById("globalSaveAllBtn");
  const stickyBar = document.getElementById("stickySaveBar");
  btn1?.classList.toggle("displayNone", !shouldShow);
  btn2?.classList.toggle("displayNone", !shouldShow);
  stickyBar?.classList.toggle("hidden", !shouldShow);

}

function showCostModal() {
  document.getElementById("feeCreate").textContent = cachedCosts.creation || "Loading...";
  document.getElementById("feeUpsert").textContent = cachedCosts.upsert || "Loading...";
  document.getElementById("costInfoModal").classList.remove("hidden");
}

// ==== Encryption / Decryption ====

async function deriveWalletKey() {
  if (walletDerivedKey) return; // Already derived
  const signer = provider.getSigner();
  const message = "I authorize access to my CroVault data on the blockchain";
  const signature = await signer.signMessage(message);
  const rawKey = await crypto.subtle.digest("SHA-256", strToUint8(signature));
  walletDerivedKey = new Uint8Array(rawKey);
  const btn = document.getElementById("retrySignBtn");
  if (btn) {
    btn.classList.toggle("displayNone", walletDerivedKey);
  }
}

async function encryptWithPassword(password, data) {
  if (!walletDerivedKey) {
    await deriveWalletKey();
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const combined = strToUint8(password + new TextDecoder().decode(walletDerivedKey));
  const keyMaterial = await crypto.subtle.importKey("raw", combined, { name: "PBKDF2" }, false, ["deriveKey"]);

  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const encoded = strToUint8(JSON.stringify(data));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

  return {
    version: "pbkdf2-aesgcm",
    salt: uint8ToB64(salt),
    iv: uint8ToB64(iv),
    ciphertext: uint8ToB64(ciphertext)
  };
}

async function decryptWithPassword(password, payload) {
  if (!walletDerivedKey) {
    await deriveWalletKey();
  }

  const salt = b64ToUint8(payload.salt);
  const iv = b64ToUint8(payload.iv);
  const ciphertext = b64ToUint8(payload.ciphertext);

  const combined = strToUint8(password + new TextDecoder().decode(walletDerivedKey));
  const keyMaterial = await crypto.subtle.importKey("raw", combined, { name: "PBKDF2" }, false, ["deriveKey"]);

  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return JSON.parse(new TextDecoder().decode(decrypted));
}

function shortenAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// ==== Helpers ====

async function retryWeb3ConnectWithTimeout(maxRetries = 10, timeoutMs = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const instance = await Promise.race([
        web3Modal.connect(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Connect timed out")), timeoutMs)
        )
      ]);
      return instance;
    } catch (err) {
      if (attempt === maxRetries) return null;
      await new Promise(res => setTimeout(res, timeoutMs));
    }
  }
}

async function retryReadVaultMapping(factory, walletAddress, maxRetries = 10, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const vaultAddress = await factory.callStatic["ownerToVault(address)"](walletAddress);
      return vaultAddress;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}

function closeOtherForms(excludeSection) {
  const forms = [
    { section: "credential", form: "newCredentialForm", hasData: hasUnsavedCredential, clear: clearCredentialForm },
    { section: "note",       form: "newNoteForm",       hasData: hasUnsavedNote,       clear: clearNoteForm },
    { section: "wallet",     form: "newWalletForm",     hasData: hasUnsavedWallet,     clear: clearWalletForm },
    { section: "totp",       form: "newTotpForm",       hasData: hasUnsavedTotp,       clear: clearTotpForm }
  ];  

  forms.forEach(({ section, form, hasData, clear }) => {
    const formElement = document.getElementById(form);
    if (section !== excludeSection && !formElement.classList.contains("slide-hidden")) {
      if (hasData() && !confirm("You have unsaved data, discard?")) return;
      formElement.classList.add("slide-hidden");
      clear();
    }
  });
}

function unlockAndLoadAllSections() {
  if (sessionPassword) {
    return loadAllSections();
  }

  showUnlockModal(async (pw) => {
    sessionPassword = pw;
    await deriveWalletKey();
    await loadAllSections(); // ✅ only called AFTER pw is set
  });
}


// ==== Connect wallet flow ====

async function connectWallet() {
  if (walletAddress) return; // Already connected
  const connectBtnText = document.getElementById("connectBtnText");
  const walletLoader   = document.getElementById("walletLoader");

  try {
    connectBtnText.textContent = "Connecting...";
    walletLoader.classList.add("visibleInline");
    const instance = await retryWeb3ConnectWithTimeout(10, 1000); // 10 tries max, 1s timeout each
    if (!instance) {
      throw new Error("Wallet connection failed after multiple timed-out attempts");
      return;
    }
    await afterWalletConnect(instance);
  } catch (err) {
    console.error("Wallet connect error:", err);
    connectBtnText.textContent = "Connect Wallet";
  } finally {
    walletLoader.classList.remove("visibleInline");
  }
}

async function afterWalletConnect(instance) {
  const balanceEl = document.getElementById("balance");
  balanceEl.textContent = "";
  provider = new ethers.providers.Web3Provider(instance);
  signer   = provider.getSigner();
  walletAddress = (await signer.getAddress()).toLowerCase();

  // Display short version of address
  document.getElementById("connectBtnText").innerHTML =
    "Connected: " + shortenAddress(walletAddress);

  hideOrShowCreateVault();

  // Listen for account changes
  provider.provider.on("accountsChanged", (accounts) => {
    if (!accounts.length) {
      // disconnected
      walletAddress = null;
      userVault = null; 
      const vaultAddressEl = document.getElementById("vaultAddress");

    if (vaultAddressEl) vaultAddressEl.innerHTML = "";
      document.getElementById("connectBtnText").textContent = "Connect Wallet";
      handleIdleTimeout(false); // Force session end
      hideOrShowCreateVault();
    } else {
      walletAddress = accounts[0].toLowerCase();
      document.getElementById("connectBtnText").innerHTML =
        "Connected: " + shortenAddress(walletAddress);
      handleIdleTimeout(false); // Force session end
      hideOrShowCreateVault();
    }
  });

  // Possibly switch to Cronos
  try {
    await provider.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x19" }], // chainId 25 decimal => 0x19
    });
  } catch (switchError) {
    // If unrecognized chain (4902), add chain
    if (switchError.code === 4902) {
      try {
        await provider.provider.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x19",
            chainName: "Cronos Mainnet",
            rpcUrls: [cronosRpcUrl],
            nativeCurrency: { name: "Cronos CRO", symbol: "CRO", decimals: 18 },
            blockExplorerUrls: [cronoScanUrl]
          }],
        });
      } catch (addError) {
        console.error("Failed to add Cronos chain:", addError);
      }
    } else {
      console.error("Failed to switch to Cronos chain:", switchError);
    }
  }
  updateBalanceDisplay();
}

async function loadAllSections() {
  if (!sessionPassword) {
    console.warn("Skipping loadAllSections: sessionPassword not set");
    return;
  }

  await Promise.all([
    loadAndShowCredentials(),
    loadAndShowNotes(),
    loadAndShowWallets(),
    loadAndShowTotps()
  ]);
}

async function updateBalanceDisplay() {
  if (!provider || !walletAddress) return;

  try {
    const balanceBigInt = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(balanceBigInt);
    const balanceEl = document.getElementById("balance");
    if (balanceEl) {
      balanceEl.textContent = `Balance: ${parseFloat(balanceInEth).toFixed(2)} CRO`;
    }
  } catch (err) {
    console.error("Failed to fetch wallet balance:", err);
  }
}

// ==== Vault Creation ====

async function hideOrShowCreateVault() {
  const createVaultSection = document.getElementById("createVaultSection");

  if (!walletAddress) {
    createVaultSection.classList.add("hidden");
    return;
  }

  try {
    // VaultFactory address and ABI
    //const factoryJson = await fetch("contracts/VaultFactory.json").then(r => r.json());
    //const factoryAbi = factoryJson.abi;
    //const factory = new ethers.Contract(factoryAddress, factoryAbi, provider);
    const minimalAbi = [
      "function ownerToVault(address) view returns (address)"
    ];
    const factory = new ethers.Contract(factoryAddress, minimalAbi, provider);
    const vaultAddress = await retryReadVaultMapping(factory, walletAddress);
    vaultAddress == "0x0000000000000000000000000000000000000000" 
      ? userAddress = null
      : userVault = vaultAddress;
      if (userVault && userVault.startsWith("0x")) {
        createVaultSection.classList.add("hidden");
      
        // 1) Display the vault address, a copy icon, and a link icon
        const vaultAddressEl = document.getElementById("vaultAddress");
        vaultAddressEl.innerHTML = `
          Vault address:
          <span>${shortenAddress(userVault)}</span>
          <a href="https://cronoscan.com/address/${userVault}"
             target="_blank"
             rel="noopener"
             class="icon-btn"
             title="View on Cronoscan"
             style="margin-left: 6px;">
             <i class="fas fa-external-link-alt"></i>
          </a>
        `;
      
        unlockAndLoadAllSections();
      
      } else {
        createVaultSection.classList.remove("hidden");
        document.getElementById("vaultDataSection").classList.add("displayNone");
      }
      
      
  } catch (err) {
    console.error("Vault check failed:", err);
    createVaultSection.classList.add("hidden"); // fallback: hide
  }
}

async function createNewVault() {
  const createVaultBtn = document.getElementById("createVaultBtn");
  const deployLoader   = document.getElementById("deployLoader");
  const deployResult   = document.getElementById("deployResult");

  deployResult.textContent = "";
  deployLoader.classList.add("visibleInline");
  createVaultBtn.disabled = true;

  try {
    if (!walletAddress) {
      throw new Error("Wallet not connected!");
    }

    // 1) Fetch the compiled contract from /contracts/VaultContract.json
    //    You must place the contract ABI/bytecode in that file.
    const vaultJson = await fetch("contracts/VaultContract.json").then(r => r.json());
    const vaultAbi = vaultJson.abi;
    const vaultBytecode = vaultJson.bytecode;
    if (!vaultAbi || !vaultBytecode) {
      throw new Error("Invalid or missing ABI/bytecode in VaultContract.json");
    }

      // 1. Load factory ABI
      const factoryJson = await fetch("contracts/VaultFactory.json").then(r => r.json());
      const factoryAbi = factoryJson.abi;

      const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);

      showSpinner("Deploying your vault...");
      // 2. Call createVault
      const tx = await factory.createVault({
      value: ethers.utils.parseEther(cachedCosts.creation),
      });

      const receipt = await tx.wait();
      try {
        // 3. Extract new vault address from event
        const vaultEvent = receipt.events.find(e => e.event === "VaultCreated");
        const deployedAddress = vaultEvent.args.vault;
        deployResult.textContent = "Vault deployed at: " + deployedAddress;
        alert("Vault deployed at: " + deployedAddress);
        hideSpinner();
      } catch {}
      hideOrShowCreateVault();

  } catch (err) {
    console.error(err);
    deployResult.textContent = "Error: " + err.message;
  } finally {
    deployLoader.classList.remove("visibleInline");
    createVaultBtn.disabled = false;
  }
}

// ==== Vault Unlock Modal ====

function showUnlockModal(onConfirm) {
  const modal = document.getElementById("unlockModal");
  const passInput = document.getElementById("unlockPassword");
  const confirmBtn = document.getElementById("confirmUnlockBtn");
  const cancelBtn = document.getElementById("cancelUnlockBtn");

  passInput.value = "";
  modal.classList.remove("hidden");
  passInput.focus();

  function handleKey(event) {
    if (event.key === "Enter") confirmBtn.click();
    if (event.key === "Escape") cancelBtn.click();
  }

  confirmBtn.onclick = () => {
    const pw = passInput.value;
    if (!pw || pw.length < 12) return alert("Password too short");
  
    modal.classList.add("hidden");
    document.removeEventListener("keydown", handleKey);
    onConfirm(pw); // 🔁 No deriveWalletKey here anymore
    startIdleMonitor(); // ✅ Start idle timeout after unlock
    document.getElementById("retryUnlockBtn")?.classList.add("displayNone");
  };
  
  
  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    document.removeEventListener("keydown", handleKey);
    const retryUnlockBtn = document.getElementById("retryUnlockBtn");
    if (retryUnlockBtn) retryUnlockBtn.classList.remove("displayNone"); // ✅ here
  };  

  document.addEventListener("keydown", handleKey);
}

// ==== Password Creation Modal ====

function showPasswordModal(onConfirm) {
  const modal = document.getElementById("passwordModal");
  const confirmBtn = document.getElementById("confirmVaultPasswordBtn");
  const cancelBtn = document.getElementById("cancelVaultPasswordBtn");
  const passInput = document.getElementById("vaultPassword");
  const passConfirm = document.getElementById("vaultPasswordConfirm");

  passInput.value = "";
  passConfirm.value = "";
  confirmBtn.disabled = true;
  modal.classList.remove("hidden");
  passInput.focus();

  const strengthText = document.getElementById("invalidPasswordStrength");

  function validateInputs() {
    const p1 = passInput.value;
    const p2 = passConfirm.value;

    if (!p1 || p1.length < 12) {
      strengthText.textContent = "Password must be at least 12 characters.";
      confirmBtn.disabled = true;
      return;
    }

    const regexes = {
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      digit: /\d/,
      special: /[^a-zA-Z0-9]/,
    };

    const missing = Object.entries(regexes)
      .filter(([_, regex]) => !regex.test(p1))
      .map(([label]) => label);

    if (missing.length) {
      strengthText.textContent = "Include at least one: " + missing.join(", ");
      confirmBtn.disabled = true;
      return;
    }

    if (p1 !== p2) {
      strengthText.textContent = "Passwords do not match.";
      confirmBtn.disabled = true;
      return;
    }

    strengthText.innerHTML = `<i class="fas fa-check"></i> <span class="vault-label-text"> Strong password.</span>`;
    strengthText.style.color = "green";
    confirmBtn.disabled = false;
  }

  passInput.oninput = passConfirm.oninput = validateInputs;

  function handleKey(event) {
    if (event.key === "Enter" && !confirmBtn.disabled) confirmBtn.click();
    if (event.key === "Escape") cancelBtn.click();
  }

  confirmBtn.onclick = () => {
    modal.classList.add("hidden");
    document.removeEventListener("keydown", handleKey);
    onConfirm(passInput.value);
    startIdleMonitor(); // ✅ Start idle timeout after password is set
    document.getElementById("retryUnlockBtn")?.classList.add("displayNone");
    document.getElementById("retryPasswordBtn")?.classList.add("displayNone");
  };

  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    strengthText.remove();
    document.removeEventListener("keydown", handleKey);
    const retryPasswordBtn = document.getElementById("retryPasswordBtn");
    if (retryPasswordBtn) retryPasswordBtn.classList.remove("displayNone");
  };

  document.addEventListener("keydown", handleKey);
} 

function showWrongPasswordModal() {
  const modal = document.getElementById("wrongPasswordModal");
  const retryBtn = document.getElementById("retryUnlockBtnModal");
  const cancelBtn = document.getElementById("cancelUnlockBtn2");

  modal.classList.remove("hidden");

  retryBtn.onclick = () => {
    modal.classList.add("hidden");
    showUnlockModal(async (pw) => {
      sessionPassword = pw;
      unlockAndLoadAllSections();
    });
  };

  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    document.getElementById("retryUnlockBtn")?.classList.remove("displayNone"); // ✅ This now works!
  };
}

// ==== Data Readers from blockchain ====

async function retryReadDataWithTimeout(vault, maxRetries = 10, timeoutMs = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const [creds, notes, wallets, totps] = await Promise.all([
        vault.readCredentials(),
        vault.readNote(),
        vault.readWalletAddress(),
        vault.readTOTP()
      ]);
      return [creds, notes, wallets, totps];
    } catch (err) {
      if (attempt === maxRetries) return null;
      await new Promise(res => setTimeout(res, timeoutMs));
    }
  }
}

async function loadAndShowCredentials(deleted = false) {
  if (!sessionPassword) return;
  let creds, notes, wallets

  // Check if there is a vault address
  if (!walletDerivedKey) {
    try {
      await deriveWalletKey();
    } catch (e) {
      const btn = document.getElementById("retrySignBtn");
      if (btn) {
        btn.classList.toggle("displayNone", false);
      }
      return;
    }
  }
  
  // If session password is set show the vault data section
  document.getElementById("vaultDataSection").classList.remove("displayNone");

  // Hide the retry button
  document.getElementById("retryUnlockBtn")?.classList.add("displayNone");

  // If there is no session password or vault address, return early
  if (!sessionPassword || !userVault || !userVault.startsWith("0x")) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVault, vaultAbi, signer);

  try {
    creds = await vault.readCredentials();
  } catch (err) {
    console.error("Error reading credentials:", err);
    return;
  }

  if (!creds.length) {
    return; // No credentials to show
  }

  const container = document.getElementById("credentialReadItems");
  container.innerHTML = "";
  document.getElementById("credCount").textContent = creds.length;

  for (const cred of creds) {
    let decrypted;
    try {
      decrypted = {
        id: cred.id,
        name: (await decryptWithPassword(sessionPassword, JSON.parse(cred.name))).name,
        username: (await decryptWithPassword(sessionPassword, JSON.parse(cred.username))).username,
        password: (await decryptWithPassword(sessionPassword, JSON.parse(cred.password))).password,
        remarks: (await decryptWithPassword(sessionPassword, JSON.parse(cred.remarks))).remarks,
      };
    } catch (e) {
      showWrongPasswordModal();
      return;
    }

    renderCredentialItem(decrypted, false);
  }
  updateCredentialPendingUI();
}

// ==== Updated Note Reader ====

async function loadAndShowNotes() {
  if (!sessionPassword) return;
  if (!userVault || !userVault.startsWith("0x")) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVault, vaultAbi, signer);
  let notes = [];

  try {
    notes = await vault.readNote();
  } catch (err) {
    console.error("Error reading notes:", err);
    return;
  }

  if (!notes.length) {
    return; // No notes to show
  }
  const container = document.getElementById("noteReadItems");
  container.innerHTML = "";
  document.getElementById("noteCount").textContent = notes.length;

  for (const note of notes) {
    let decrypted;
    try {
      decrypted = {
        id: note.id,
        name: (await decryptWithPassword(sessionPassword, JSON.parse(note.name))).name,
        note: (await decryptWithPassword(sessionPassword, JSON.parse(note.note))).note,
      };
    } catch (e) {
      showWrongPasswordModal();
      return;
    }

    renderNoteItem(decrypted, false);
  }
  updateNotePendingUI();
}

// ==== Updated Wallet Reader ====

async function loadAndShowWallets() {
  if (!sessionPassword) return;
  if (!userVault || !userVault.startsWith("0x")) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVault, vaultAbi, signer);
  let wallets = [];

  try {
    wallets = await vault.readWalletAddress();
  } catch (err) {
    console.error("Error reading wallet addresses:", err);
    return;
  }

  if (!wallets.length) {
    return; // No notes to show
  }

  const container = document.getElementById("walletReadItems");
  container.innerHTML = "";
  document.getElementById("walletCount").textContent = wallets.length;

  for (const wallet of wallets) {
    let decrypted;
    try {
      decrypted = {
        id: wallet.id,
        walletAddress: (await decryptWithPassword(sessionPassword, JSON.parse(wallet.walletAddress))).walletAddress,
        name: (await decryptWithPassword(sessionPassword, JSON.parse(wallet.name))).name,
        privateKey: (await decryptWithPassword(sessionPassword, JSON.parse(wallet.privateKey))).privateKey,
        seedPhrase: (await decryptWithPassword(sessionPassword, JSON.parse(wallet.seedPhrase))).seedPhrase,
        remarks: (await decryptWithPassword(sessionPassword, JSON.parse(wallet.remarks))).remarks,
      };
    } catch (e) {
      showWrongPasswordModal();
      return;
    }

    renderWalletItem(decrypted, false);
  }
  updateWalletPendingUI();
}

async function loadAndShowTotps() {
  if (!sessionPassword) return;
  if (!userVault || !userVault.startsWith("0x")) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVault, vaultAbi, signer);
  let totps = [];

  try {
    totps = await vault.readTOTP();
  } catch (err) {
    console.error("Error reading TOTP:", err);
    return;
  }

  const container = document.getElementById("totpReadItems");
  container.innerHTML = "";
  document.getElementById("totpCount").textContent = totps.length;

  if (!totps.length) return;

  for (const totp of totps) {
    let decrypted;
    try {
      decrypted = {
        id: totp.id,
        name: (await decryptWithPassword(sessionPassword, JSON.parse(totp.name))).name,
        key: (await decryptWithPassword(sessionPassword, JSON.parse(totp.key))).key,
        algorithm: (await decryptWithPassword(sessionPassword, JSON.parse(totp.algorithm))).algorithm,
        interval: totp.interval
      };
    } catch (e) {
      showWrongPasswordModal();
      return;
    }

    renderTotpItem(decrypted, false);
  }
  updateTotpPendingUI();
}

function toggleVaultSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.classList.toggle("displayNone");
}

// ==== Data write to blockchain ====
async function estimateSaveAllFees() {
  if (!sessionPassword || !userVault || !userVault.startsWith("0x")) {
    alert("Vault is not unlocked or connected.");
    return;
  }

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVault, vaultAbi, signer);

  try {
    let totalGas = ethers.BigNumber.from(0);
    let results = [];

    if (pendingCredentials.length > 0) {
      const creds = [];
      for (const c of pendingCredentials) {
        creds.push({
          id: c.id || 0,
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: c.name })),
          username: JSON.stringify(await encryptWithPassword(sessionPassword, { username: c.username })),
          password: JSON.stringify(await encryptWithPassword(sessionPassword, { password: c.password })),
          remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: c.remarks }))
        });
      }
      const gas = await vault.estimateGas.upsertCredentials(creds, {
        value: ethers.utils.parseEther(cachedCosts.upsert)
      });
      results.push({ type: "Credentials", gas });
      totalGas = totalGas.add(gas);
    }

    if (pendingNotes.length > 0) {
      const notes = [];
      for (const n of pendingNotes) {
        notes.push({
          id: 0,
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: n.name })),
          note: JSON.stringify(await encryptWithPassword(sessionPassword, { note: n.note }))
        });
      }
      const gas = await vault.estimateGas.upsertNotes(notes, {
        value: ethers.utils.parseEther(cachedCosts.upsert)
      });
      results.push({ type: "Notes", gas });
      totalGas = totalGas.add(gas);
    }

    if (pendingWallets.length > 0) {
      const wallets = [];
      for (const w of pendingWallets) {
        wallets.push({
          id: w.id || 0,
          walletAddress: JSON.stringify(await encryptWithPassword(sessionPassword, { walletAddress: w.walletAddress })),
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: w.name })),
          privateKey: JSON.stringify(await encryptWithPassword(sessionPassword, { privateKey: w.privateKey })),
          seedPhrase: JSON.stringify(await encryptWithPassword(sessionPassword, { seedPhrase: w.seedPhrase })),
          remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: w.remarks }))
        });        
      }
      const gas = await vault.estimateGas.upsertWalletAddress(wallets, {
        value: ethers.utils.parseEther(cachedCosts.upsert)
      });
      results.push({ type: "Wallets", gas });
      totalGas = totalGas.add(gas);
    }

    if (pendingTotps.length > 0) {
      const totps = [];
      for (const t of pendingTotps) {
        totps.push({
          id: t.id || 0,
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: t.name })),
          key: JSON.stringify(await encryptWithPassword(sessionPassword, { key: t.key })),
          algorithm: JSON.stringify(await encryptWithPassword(sessionPassword, { algorithm: t.algorithm })),
          interval: t.interval || 30
        });
      }
      const gas = await vault.estimateGas.upsertTOTP(totps, {
        value: ethers.utils.parseEther(cachedCosts.upsert)
      });
      results.push({ type: "TOTP", gas });
      totalGas = totalGas.add(gas);
    }    

    const gasPrice = await provider.getGasPrice();
    const totalFee = ethers.utils.formatEther(totalGas.mul(gasPrice));

    let summary = `Estimated gas fees:\n`;
    for (const r of results) {
      const fee = ethers.utils.formatEther(r.gas.mul(gasPrice));
      summary += `- ${r.type}: ~${parseFloat(fee).toFixed(2)} CRO\n`;
    }
    summary += `Total estimated fee: ~${parseFloat(totalFee).toFixed(2)} CRO`;

    alert(summary);
  } catch (err) {
    console.error("Gas estimation failed:", err);
    alert("Failed to estimate gas: " + err.message);
  }
}

async function saveAllPendingItems() {
  if (!sessionPassword) {
    showPasswordModal(async (pw) => {
      sessionPassword = pw;
      await deriveWalletKey(); // ensure wallet signature is included
      await saveAllPendingItems(); // retry
    });
    return;
  }
  alert("If the fee shown in your wallet is low (<1 CRO), then reject the transaction and try again.");
  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVault, vaultAbi, signer);
  try {
    if (pendingCredentials.length > 0) {
      const creds = [];
      for (const c of pendingCredentials) {
        creds.push({
          id: c.id || 0,
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: c.name })),
          username: JSON.stringify(await encryptWithPassword(sessionPassword, { username: c.username })),
          password: JSON.stringify(await encryptWithPassword(sessionPassword, { password: c.password })),
          remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: c.remarks }))
        });
      }
      showSpinner("Saving credential(s) to blockchain...");
      const tx = await vault.upsertCredentials(creds, {
        value: ethers.utils.parseEther(cachedCosts.upsert),
        gasLimit: 5_000_000 
      });
      await tx.wait();
    }

    if (pendingNotes.length > 0) {
      const notes = [];
      for (const n of pendingNotes) {
        notes.push({
          id: 0,
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: n.name })),
          note: JSON.stringify(await encryptWithPassword(sessionPassword, { note: n.note }))
        });
      }
      showSpinner("Saving note(s) to blockchain...");
      const tx = await vault.upsertNotes(notes, {
        value: ethers.utils.parseEther(cachedCosts.upsert),
        gasLimit: 5_000_000 
      });
      await tx.wait();
    }

    if (pendingWallets.length > 0) {
      const wallets = [];
      for (const w of pendingWallets) {
        wallets.push({
          id: w.id || 0,
          walletAddress: JSON.stringify(await encryptWithPassword(sessionPassword, { walletAddress: w.walletAddress })),
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: w.name })),
          privateKey: JSON.stringify(await encryptWithPassword(sessionPassword, { privateKey: w.privateKey })),
          seedPhrase: JSON.stringify(await encryptWithPassword(sessionPassword, { seedPhrase: w.seedPhrase })),
          remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: w.remarks }))
        });
        
      }
      showSpinner("Saving wallet(s) to blockchain...");
      const tx = await vault.upsertWalletAddress(wallets, {
        value: ethers.utils.parseEther(cachedCosts.upsert),
        gasLimit: 5_000_000 
      });
      await tx.wait();
    }

    if (pendingTotps.length > 0) {
      const totps = [];
      for (const t of pendingTotps) {
        totps.push({
          id: t.id || 0,
          name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: t.name })),
          key: JSON.stringify(await encryptWithPassword(sessionPassword, { key: t.key })),
          algorithm: JSON.stringify(await encryptWithPassword(sessionPassword, { algorithm: t.algorithm })),
          interval: t.interval || 30
        });
      }
      showSpinner("Saving TOTP(s) to blockchain...");
      const tx = await vault.upsertTOTP(totps, {
        value: ethers.utils.parseEther(cachedCosts.upsert),
        gasLimit: 5_000_000
      });
      await tx.wait();
    }
    
    alert("All pending data saved!");
    // Clear pending entries first
    pendingCredentials = [];
    pendingNotes = [];
    pendingWallets = [];
    pendingTotps = [];

    // Immediately update UI to remove yellow pending items before redraw
    updateCredentialPendingUI();
    updateNotePendingUI();
    updateWalletPendingUI();
    updateTotpPendingUI();
    updateGlobalSaveButtonVisibility();

    // Now reload all sections from the chain
    updateBalanceDisplay();
    await loadAndShowCredentials();
    await loadAndShowNotes();
    await loadAndShowWallets();
    await loadAndShowTotps();

  } catch (err) {
    console.error("Error saving pending data:", err);
    alert("Saving failed: " + err.message);
  } finally {
    hideSpinner();
  }
}

// ==== Data delete from blockchain ====

async function deleteCredentials(ids = []) {
  if (!userVault || !userVault.startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting credential...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVault, vaultAbi, signer);

    const tx = await vault.deleteCredentials(ids);
    await tx.wait();

    alert("Credential(s) deleted!");

    updateCredentialPendingUI();           // ✅ Refresh pending display (optional but safe)
    updateCredentialCountDisplay();        // ✅ <-- Add this RIGHT HERE
    updateGlobalSaveButtonVisibility();    // ✅ Optional: ensure Save All button hides if needed
    await loadAndShowCredentials(true);    // ✅ Reload read items

  } catch (e) {
    console.error("Error deleting credentials:", e);
    alert("Failed to delete credential(s).");
  } finally {
    hideSpinner();
  }
}

async function deleteNotes(ids = []) {
  if (!userVault || !userVault.startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting note...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVault, vaultAbi, signer);

    const tx = await vault.deleteNotes(ids);
    await tx.wait();

    alert("Note(s) deleted!");

    updateNotePendingUI();
    updateNoteCountDisplay();
    updateGlobalSaveButtonVisibility();
    await loadAndShowNotes();

  } catch (e) {
    console.error("Error deleting notes:", e);
    alert("Failed to delete note(s).");
  } finally {
    hideSpinner();
  }
}

async function deleteWallets(ids = []) {
  if (!userVault || !userVault.startsWith("0x")) return;
  if (!addresses.length) return;

  try {
    showSpinner("Deleting wallet...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVault, vaultAbi, signer);

    const tx = await vault.deleteWalletAddresses(ids);
    await tx.wait();

    alert("Wallet(s) deleted!");

    updateWalletPendingUI();
    updateWalletCountDisplay();
    updateGlobalSaveButtonVisibility();
    await loadAndShowWallets();

  } catch (e) {
    console.error("Error deleting wallet address(es):", e);
    alert("Failed to delete wallet address(es).");
  } finally {
    hideSpinner();
  }
}

async function deleteTotps(ids = []) {
  if (!userVault || !userVault.startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting TOTP...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVault, vaultAbi, signer);

    const tx = await vault.deleteTOTP(ids);
    await tx.wait();

    alert("TOTP secret(s) deleted!");

    updateTotpPendingUI();
    updateTotpCountDisplay();
    updateGlobalSaveButtonVisibility();
    await loadAndShowTotps();

  } catch (e) {
    console.error("Error deleting TOTP:", e);
    alert("Failed to delete TOTP.");
  } finally {
    hideSpinner();
  }
}

// ==== Data editors client side new data====
 
function editPendingCredential(index) {
  const cred = pendingCredentials[index];

  // Track it for restoration in case of cancel/delete
  editingOriginalCredential = cred.id ? { ...cred } : null;

  document.getElementById("credName").value = cred.name;
  document.getElementById("credUsername").value = cred.username;
  document.getElementById("credPassword").value = cred.password;
  document.getElementById("credRemarks").value = cred.remarks;
  document.getElementById("credentialFormTitle").innerHTML = '<i class="fas fa-lock"></i> Update Credential';
  document.getElementById("newCredentialForm").classList.remove("slide-hidden");
  document.getElementById("credentialReadItems").classList.remove("displayNone");

  pendingCredentials.splice(index, 1);
  updateCredentialPendingUI();
}

function deletePendingCredential(index) {
  if (!confirm("Are you sure you want to discard this pending credential?")) return;
  const removed = pendingCredentials.splice(index, 1)[0];

  if (removed._original && removed.id === removed._original.id) {
    renderCredentialItem(removed._original);
  }  

  updateCredentialPendingUI();
}

function editPendingNote(index) {
  const note = pendingNotes[index];

  editingOriginalNote = note.id ? { ...note } : null;

  document.getElementById("noteName").value = note.name;
  document.getElementById("noteContent").value = note.note;
  document.getElementById("credentialFormTitle").innerHTML = '<i class="fas fa-lock"></i> Update Credential';
  document.getElementById("noteFormTitle").innerHTML = '<i class="fas fa-note"></i> Update Note';
  document.getElementById("newNoteForm").classList.remove("slide-hidden");
  document.getElementById("noteList").classList.remove("displayNone");

  pendingNotes.splice(index, 1);
  updateNotePendingUI();
}

function deletePendingNote(index) {
  if (!confirm("Are you sure you want to discard this pending note?")) return;
  const removed = pendingNotes.splice(index, 1)[0];

  if (removed._original && removed.id === removed._original.id) {
    renderNoteItem(removed._original);
  }

  updateNotePendingUI();
}

function editPendingWallet(index) {
  const wallet = pendingWallets[index];

  editingOriginalWallet = wallet._original ? { ...wallet._original } : (wallet.walletAddress ? { ...wallet } : null);

  document.getElementById("walletName").value = wallet.name;
  document.getElementById("walletAddress").value = wallet.walletAddress;
  document.getElementById("walletPrivateKey").value = wallet.privateKey;
  document.getElementById("walletSeedPhrase").value = wallet.seedPhrase;
  document.getElementById("walletRemarks").value = wallet.remarks;
  document.getElementById("walletFormTitle").innerHTML = '<i class="fas fa-wallet"></i> Update Wallet';
  document.getElementById("newWalletForm").classList.remove("slide-hidden");
  document.getElementById("walletReadItems").classList.remove("displayNone");

  pendingWallets.splice(index, 1);
  updateWalletPendingUI();
}

function deletePendingWallet(index) {
  if (!confirm("Are you sure you want to discard this pending wallet?")) return;

  const removed = pendingWallets.splice(index, 1)[0];
  if (removed._original && removed.walletAddress === removed._original.walletAddress) {
    renderWalletItem(removed._original);
  }

  updateWalletPendingUI();
}

function editPendingTotp(index) {
  const totp = pendingTotps[index];

  // Track original for possible revert
  editingOriginalTotp = totp.id ? { ...totp } : null;

  // Fill form fields
  document.getElementById("totpName").value = totp.name;
  document.getElementById("totpKey").value = totp.key;
  document.getElementById("totpAlgorithm").value = totp.algorithm;
  document.getElementById("totpInterval").value = totp.interval;

  // Show the form
  document.getElementById("newTotpForm").classList.remove("slide-hidden");
  document.getElementById("totpReadItems").classList.remove("displayNone");
  document.getElementById("totpFormTitle").innerHTML = '<i class="fas fa-key"></i> Update TOTP';

  // Remove from pending so it doesn't show twice
  pendingTotps.splice(index, 1);
  updateTotpPendingUI();
}

function deletePendingTotp(index) {
  if (!confirm("Are you sure you want to discard this pending TOTP secret?")) return;
  pendingTotps.splice(index, 1);
  updateTotpPendingUI();
}

function updateCredentialPendingUI() {
  const credentialItems = document.getElementById("credentialPendingItems");
  credentialItems.innerHTML = "";

  pendingCredentials.forEach((cred, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item";
    item.classList.add("pending-bg");

    const header = document.createElement("div");
    header.className = "data-header cursorPointer";
    header.innerHTML = `<i class="fas fa-lock"></i> ${cred.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Username:</strong> ${cred.username}</div>
      <div>
        <strong>Password:</strong>
        <span class="hidden-password">********</span>
        <span class="real-password displayNone">${cred.password}</span>
        <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      </div>
      <div><strong>Remarks:</strong> ${cred.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingCredential(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingCredential(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    credentialItems.appendChild(item);

    // Scroll the last pending item into view + highlight
    if (credentialItems.lastElementChild) {
      credentialItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      credentialItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => credentialItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }

  });

  const readCount = document.querySelectorAll('#credentialReadItems .vault-data-item').length;
  const pendingCount = pendingCredentials.length;
  document.getElementById("credCount").innerHTML =
  pendingCount > 0
    ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
    : `${readCount}`;

  credentialItems.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
      const hidden = button.previousElementSibling.previousElementSibling;
      const revealed = button.previousElementSibling;

      hidden.classList.toggle("displayNone");
      revealed.classList.toggle("displayNone");
      button.querySelector("i").classList.toggle("fa-eye"); button.querySelector("i").classList.toggle("fa-eye-slash");
      button.title = hidden.classList.contains("displayNone") ? "Hide" : "Show";
    });
  });
  updateGlobalSaveButtonVisibility();
}

function updateCredentialCountDisplay() {
  const readCount = document.querySelectorAll('#credentialReadItems .vault-data-item').length;
  const pendingCount = pendingCredentials.length;
  document.getElementById("credCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
      : `${readCount}`;
}

function updateNotePendingUI() {
  const noteItems = document.getElementById("notePendingItems");
  noteItems.innerHTML = "";

  pendingNotes.forEach((note, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item";
    item.classList.add("pending-bg");

    const header = document.createElement("div");
    header.className = "data-header cursorPointer";
    header.innerHTML = `<i class="fas fa-note"></i> ${note.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div>${note.note}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingNote(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingNote(${index})"><i class="fas fa-trash"></i></button>
      </div>`;

    item.appendChild(header);
    item.appendChild(detail);
    noteItems.appendChild(item);

    // Scroll the last pending item into view + highlight
    if (noteItems.lastElementChild) {
      noteItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      noteItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => noteItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }

  });

  const readCount = document.querySelectorAll('#noteReadItems .vault-data-item').length;
  const pendingCount = pendingNotes.length;
  document.getElementById("noteCount").innerHTML =
  pendingCount > 0
    ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
    : `${readCount}`;
    
  updateGlobalSaveButtonVisibility()
}

function updateNoteCountDisplay() {
  const readCount = document.querySelectorAll('#noteReadItems .vault-data-item').length;
  const pendingCount = pendingNotes.length;
  document.getElementById("noteCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
      : `${readCount}`;
}

function updateWalletPendingUI() {
  const walletItems = document.getElementById("walletPendingItems");
  walletItems.innerHTML = "";

  pendingWallets.forEach((wallet, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item";
    item.classList.add("pending-bg");

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-wallet"></i> ${wallet.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Address:</strong> ${wallet.walletAddress}</div>
      <div><strong>Private Key:</strong>
        <span class="hidden-password">********</span>
        <span class="real-password displayNone">${wallet.privateKey}</span>
        <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      </div>
      <div><strong>Seed Phrase:</strong>
        <span class="hidden-password">********</span>
        <span class="real-password displayNone">${wallet.seedPhrase}</span>
        <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      </div>
      <div><strong>Remarks:</strong> ${wallet.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingWallet(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingWallet(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    walletItems.appendChild(item);
    
    // Scroll the last pending item into view + highlight
    if (walletItems.lastElementChild) {
      walletItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      walletItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => walletItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#walletReadItems .vault-data-item').length;
  const pendingCount = pendingWallets.length;
  document.getElementById("walletCount").innerHTML =
  pendingCount > 0
    ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
    : `${readCount}`;

  walletItems.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
      const hidden = button.previousElementSibling.previousElementSibling;
      const revealed = button.previousElementSibling;

      hidden.classList.toggle("displayNone");
      revealed.classList.toggle("displayNone");
      button.querySelector("i").classList.toggle("fa-eye"); button.querySelector("i").classList.toggle("fa-eye-slash");
      button.title = hidden.classList.contains("displayNone") ? "Hide" : "Show";
    });
  });
  updateGlobalSaveButtonVisibility()
}

function updateWalletCountDisplay() {
  const readCount = document.querySelectorAll('#walletReadItems .vault-data-item').length;
  const pendingCount = pendingWallets.length;
  document.getElementById("walletCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
      : `${readCount}`;
}

function updateTotpPendingUI() {
  const totpItems = document.getElementById("totpPendingItems");
  totpItems.innerHTML = "";

  pendingTotps.forEach((totp, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-key"></i> ${totp.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Key:</strong> ${totp.key}</div>
      <div><strong>Algorithm:</strong> ${totp.algorithm}</div>
      <div><strong>Interval:</strong> ${totp.interval} sec</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingTotp(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingTotp(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    totpItems.appendChild(item);
    
    // Scroll the last pending item into view + highlight
    if (totpItems.lastElementChild) {
      totpItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      totpItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => totpItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#totpReadItems .vault-data-item').length;
  const pendingCount = pendingTotps.length;
  document.getElementById("totpCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateTotpCountDisplay() {
  const readCount = document.querySelectorAll('#totpReadItems .vault-data-item').length;
  const pendingCount = pendingTotps.length;

  document.getElementById("totpCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

// Check if forms have unsaved data

function hasUnsavedCredential() {
  return ["credName", "credUsername", "credPassword", "credRemarks"]
    .some(id => document.getElementById(id).value.trim() !== "");
}

function hasUnsavedNote() {
  return ["noteName", "noteContent"]
    .some(id => document.getElementById(id).value.trim() !== "");
}

function hasUnsavedWallet() {
  return ["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"]
    .some(id => document.getElementById(id).value.trim() !== "");
}

function hasUnsavedTotp() {
  return ["totpName", "totpKey", "totpAlgorithm", "totpInterval"]
    .some(id => document.getElementById(id).value.trim() !== "");
}

function renderCredentialItem(cred, shouldUpdateUI = true) {
  const container = document.getElementById("credentialReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-lock"></i> <span class="vault-label-text">${cred.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `cred-${cred.id}`;
  detail.innerHTML = `
    <div>
      <strong>Username:</strong> ${cred.username}
      <button class="icon-btn" title="Copy Username" onclick="copyToClipboard('${cred.username}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div>
      <strong>Password:</strong>
      <span class="hidden-password">********</span>
      <span class="real-password displayNone">${cred.password}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Password" onclick="copyToClipboard('${cred.password}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div>
      <strong>Remarks:</strong> ${cred.remarks}
    </div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("credName").value = cred.name;
    document.getElementById("credUsername").value = cred.username;
    document.getElementById("credPassword").value = cred.password;
    document.getElementById("credRemarks").value = cred.remarks;
    document.getElementById("newCredentialForm").classList.remove("slide-hidden");
    document.getElementById("credentialReadItems").classList.remove("displayNone");

    editingOriginalCredential = { ...cred };
    pendingCredentials = pendingCredentials.filter(c => c.id !== cred.id);
    const readCard = document.getElementById(`cred-${cred.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateCredentialPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = async () => {
    if (confirm(`Delete credential "${cred.name}"?`)) {
      await deleteCredentials([cred.id]);
    }
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
  item.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
      const hidden = button.previousElementSibling.previousElementSibling;
      const revealed = button.previousElementSibling;
  
      hidden.classList.toggle("displayNone");
      revealed.classList.toggle("displayNone");
  
      button.querySelector("i").classList.toggle("fa-eye"); button.querySelector("i").classList.toggle("fa-eye-slash");
      button.title = hidden.classList.contains("displayNone") ? "Hide" : "Show";
    });
  });  
}

function renderNoteItem(note, shouldUpdateUI = true) {
  const container = document.getElementById("noteReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-note"></i> <span class="vault-label-text">${note.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `note-${note.id}`;
  detail.innerHTML = `
    <div>
      <strong>Note:</strong> ${note.note.replace(/\n/g, "<br>")}
    </div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("noteName").value = note.name;
    document.getElementById("noteContent").value = note.note;
    document.getElementById("newNoteForm").classList.remove("slide-hidden");
    document.getElementById("noteReadItems").classList.remove("displayNone");

    editingOriginalNote = { ...note };
    pendingNotes = pendingNotes.filter(n => n.id !== note.id);
    const readCard = document.getElementById(`note-${note.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateNotePendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = async () => {
    if (confirm(`Delete note "${note.name}"?`)) {
      await deleteNotes([note.id]);
    }
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

function renderWalletItem(wallet, shouldUpdateUI = true) {
  const container = document.getElementById("walletReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-wallet"></i> <span class="vault-label-text">${wallet.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `wallet-${wallet.walletAddress}`;
  detail.innerHTML = `
    <div>
      <strong>Address:</strong> ${wallet.walletAddress}
      <button class="icon-btn" title="Copy Address" onclick="copyToClipboard('${wallet.walletAddress}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div>
      <strong>Private Key:</strong> 
      <span class="hidden-password">********</span>
      <span class="real-password displayNone">${wallet.privateKey}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Private Key" onclick="copyToClipboard('${wallet.privateKey}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Seed Phrase:</strong> 
      <span class="hidden-password">********</span>
      <span class="real-password displayNone">${wallet.seedPhrase}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Seed Phrase" onclick="copyToClipboard('${wallet.seedPhrase}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Remarks:</strong> ${wallet.remarks}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("walletName").value = wallet.name;
    document.getElementById("walletAddress").value = wallet.walletAddress;
    document.getElementById("walletPrivateKey").value = wallet.privateKey;
    document.getElementById("walletSeedPhrase").value = wallet.seedPhrase;
    document.getElementById("walletRemarks").value = wallet.remarks;

    document.getElementById("newWalletForm").classList.remove("slide-hidden");
    document.getElementById("walletList").classList.remove("displayNone");

    editingOriginalWallet = { ...wallet };
    pendingWallets = pendingWallets.filter(w => w.walletAddress !== wallet.walletAddress);
    const card = document.getElementById(`wallet-${wallet.walletAddress}`)?.parentElement;
    if (card) container.removeChild(card);
    if (shouldUpdateUI) {
      updateWalletPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = async () => {
    if (confirm(`Delete wallet "${wallet.name}"?`)) {
      await deleteWallets([wallet.ids]);
    }
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
  item.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
      const hidden = button.previousElementSibling.previousElementSibling;
      const revealed = button.previousElementSibling;
  
      hidden.classList.toggle("displayNone");
      revealed.classList.toggle("displayNone");
  
      button.querySelector("i").classList.toggle("fa-eye"); button.querySelector("i").classList.toggle("fa-eye-slash");
      button.title = hidden.classList.contains("displayNone") ? "Hide" : "Show";
    });
  });  
}

function renderTotpItem(totp, shouldUpdateUI = true) {
  const container = document.getElementById("totpReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-key"></i> <span class="vault-label-text">${totp.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `totp-${totp.id}`;
  detail.innerHTML = `
    <div>
      <strong>Key:</strong>
      <span class="hidden-password">********</span>
      <span class="real-password displayNone">${totp.key}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Key" onclick="copyToClipboard('${totp.key}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Algorithm:</strong> ${totp.algorithm}</div>
    <div><strong>Interval:</strong> ${totp.interval} sec</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("totpName").value = totp.name;
    document.getElementById("totpKey").value = totp.key;
    document.getElementById("totpAlgorithm").value = totp.algorithm;
    document.getElementById("totpInterval").value = totp.interval;

    document.getElementById("newTotpForm").classList.remove("slide-hidden");
    document.getElementById("totpReadItems").classList.remove("displayNone");
    document.getElementById("totpFormTitle").innerHTML = '<i class="fas fa-key"></i> Update TOTP';

    editingOriginalTotp = { ...totp };
    pendingTotps = pendingTotps.filter(t => t.id !== totp.id);

    const card = document.getElementById(`totp-${totp.id}`)?.parentElement;
    if (card) container.removeChild(card);
    if (shouldUpdateUI) {
      updateTotpPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = async () => {
    if (confirm(`Delete TOTP secret "${totp.name}"?`)) {
      await deleteTotps([totp.id]);
    }
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
  item.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
      const hidden = button.previousElementSibling.previousElementSibling;
      const revealed = button.previousElementSibling;
  
      hidden.classList.toggle("displayNone");
      revealed.classList.toggle("displayNone");
  
      button.querySelector("i").classList.toggle("fa-eye");
      button.querySelector("i").classList.toggle("fa-eye-slash");
      button.title = hidden.classList.contains("displayNone") ? "Hide" : "Show";
    });
  });
  
}

// ==== IDLE TIMEOUT HANDLING ====

let idleTimeout;
let idleListening = false;
const idleLimitMs = 5 * 30 * 1000;

function resetIdleTimer() {
  if (!idleListening) return;

  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(handleIdleTimeout, idleLimitMs);
}

function handleIdleTimeout(timeout = true) {
  // Reset session
  sessionPassword = null;
  walletDerivedKey = null;

  // Hide vault section
  const vaultSection = document.getElementById("vaultDataSection");
  if (vaultSection) vaultSection.classList.add("displayNone");
  const balanceEl = document.getElementById("balance");
  balanceEl.textContent = "";
  // Show retry sign button
  const signBtn = document.getElementById("retrySignBtn");
  if (signBtn) signBtn.classList.remove("displayNone");

  // Stop the idle system until reinitialized
  idleListening = false;
  clearTimeout(idleTimeout);
  if (timeout) {
    // 🔥 Force rendering first, then alert
    requestAnimationFrame(() => {
      setTimeout(() => {
        alert("You were inactive for 2½ minutes. Vault access has been reset for your security.");
      }, 0);
    });
  }
}

// Activity events that reset the idle timer
["click", "mousedown", "keydown", "scroll", "touchstart"].forEach(event =>
  document.addEventListener(event, resetIdleTimer, true)
);

// Start listening to idle timer (must be called manually after password+sign)
function startIdleMonitor() {
  idleListening = true;
  resetIdleTimer();
}

// ==== DOM Events + Batch Save ====

document.addEventListener("DOMContentLoaded", async () => {
  // Always run this (even on index.html)
  document.getElementById("year").textContent = new Date().getFullYear();

  provider = provider || new ethers.providers.JsonRpcProvider(cronosRpcUrl);

  await fetchVaultCount();    // ✅ Always fetch vault count
  await fetchAndCacheCosts(); // ✅ Always fetch cost info
  // ⛔ Skip the rest for index page
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith("/") || path.endsWith("/index") || path.endsWith("/index.html")) return;

  const Web3ModalConstructor = window.Web3Modal && (window.Web3Modal.default || window.Web3Modal);
  if (!Web3ModalConstructor) {
    console.error("Web3Modal library not found!");
    return;
  }
  web3Modal = new Web3ModalConstructor({
    cacheProvider: true,
    providerOptions: {}
  });
  // If already cached provider, auto-connect
  if (web3Modal.cachedProvider) {
    await connectWallet();
  }

  // Set up button listeners
  document.getElementById("connectWalletBtn").addEventListener("click", () => {
    if (walletAddress) {
      // Already connected: go to CronoScan
      const url = `https://cronoscan.com/address/${walletAddress}`;
      window.open(url, '_blank');
    } else {
      // Not connected: trigger wallet connect
      connectWallet();
    }
  });
  document.getElementById("createVaultBtn").addEventListener("click", createNewVault);

  document.getElementById("retryUnlockBtn")?.addEventListener("click", () => {
    document.getElementById("retryUnlockBtn").classList.add("displayNone");
    showUnlockModal(pw => { 
      sessionPassword = pw; 
      loadAndShowCredentials(); 
    })
  });

  document.getElementById("estimateSaveBtn")?.addEventListener("click", estimateSaveAllFees);
  document.getElementById("stickySaveBtn")?.addEventListener("click", saveAllPendingItems);
  document.getElementById("stickyEstimateBtn")?.addEventListener("click", estimateSaveAllFees);
  document.getElementById("globalSaveAllBtn")?.addEventListener("click", saveAllPendingItems);
  document.getElementById("retrySignBtn")?.addEventListener("click", loadAndShowCredentials);

  // Vault section header toggles
  document.querySelectorAll(".vault-toggle").forEach(header => {
    header.addEventListener("click", () => {
      const targetId = header.dataset.target;
      const section = document.getElementById(targetId);
      if (!section) return;
  
      const isCurrentlyVisible = !section.classList.contains("displayNone");
  
      // === If the section is visible and user is collapsing it, check for unsaved form inside
      if (isCurrentlyVisible) {
        const form = section.querySelector(".vault-card:not(.slide-hidden)");
        if (form) {
          // Determine form type by section ID
          const sectionId = header.closest(".vault-section")?.id || "";
          let hasUnsaved = false;
          let clearFunc = null;
          let title = "";
  
          switch (sectionId) {
            case "credentialSection":
              hasUnsaved = hasUnsavedCredential();
              clearFunc = clearCredentialForm;
              title = "credential";
              break;
            case "noteSection":
              hasUnsaved = hasUnsavedNote();
              clearFunc = clearNoteForm;
              title = "note";
              break;
            case "walletSection":
              hasUnsaved = hasUnsavedWallet();
              clearFunc = clearWalletForm;
              title = "wallet";
              break;
            case "totpSection":
              hasUnsaved = hasUnsavedTotp();
              clearFunc = clearTotpForm;
              title = "TOTP";
              break;
          }
  
          if (hasUnsaved) {
            if (!confirm(`Discard unsaved ${title}?`)) {
              return; // User cancelled → keep section and form open
            }
            form.classList.add("slide-hidden");
            form.classList.add("displayNone");
            clearFunc?.();
          } else {
            // Form is open but no data → just hide
            form.classList.add("slide-hidden");
            form.classList.add("displayNone");
            clearFunc?.();
          }
        }
  
        section.classList.add("displayNone"); // Now collapse the section
      } else {
        section.classList.remove("displayNone"); // Expand normally
      }
    });
  });    

  // ===== Credentials =====
  const addCredentialBtn = document.getElementById("addCredentialBtn");
  const cancelCredentialBtn = document.getElementById("cancelCredentialBtn");
  const saveCredentialBtn = document.getElementById("saveCredentialBtn");

  if (addCredentialBtn) {
    addCredentialBtn.addEventListener("click", () => {
      closeOtherForms("credential");
      document.getElementById("credentialList").classList.remove("displayNone");
      const credentialForm = document.getElementById("newCredentialForm");
      credentialForm.classList.remove("slide-hidden");
      credentialForm.classList.remove("displayNone"); // ✅ <- this fixes it
    });
  }
 
  if (cancelCredentialBtn) {
    cancelCredentialBtn.addEventListener("click", () => {
      const message = editingOriginalCredential
        ? "Cancel editing this credential?"
        : "Cancel adding this credential?";
  
      if (confirm(message)) {
        const form = document.getElementById("newCredentialForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone"); // ✅ hide completely
        document.getElementById("credentialFormTitle").innerHTML = '<i class="fas fa-lock"></i> New Credential';
        clearCredentialForm();
  
        if (editingOriginalCredential) {
          renderCredentialItem(editingOriginalCredential);
          editingOriginalCredential = null;
        }
      }
    });
  }
  
  if (saveCredentialBtn) {
    saveCredentialBtn.addEventListener("click", () => {
      const name = document.getElementById("credName").value.trim();
      const username = document.getElementById("credUsername").value.trim();
      const password = document.getElementById("credPassword").value.trim();
      const remarks = document.getElementById("credRemarks").value.trim();

      if (!name || !username || !password) {
        alert("Name, username, and password are required.");
        return;
      }

      if (editingOriginalCredential && editingOriginalCredential.id) {
        pendingCredentials.push({ 
          id: editingOriginalCredential.id, 
          name, username, password, remarks,
          _original: { ...editingOriginalCredential }  // Store original for restore
        });
        editingOriginalCredential = null;
      } else {
        pendingCredentials.push({ name, username, password, remarks });
      }         

      document.getElementById("newCredentialForm").classList.add("slide-hidden");
      document.getElementById("credentialFormTitle").innerHTML = '<i class="fas fa-lock"></i> New Credential';
      clearCredentialForm();

      updateCredentialPendingUI();
    });
  }

  // ===== Notes =====
  const addNoteBtn = document.getElementById("addNoteBtn");
  const cancelNoteBtn = document.getElementById("cancelNoteBtn");
  const saveNoteBtn = document.getElementById("saveNoteBtn");

  if (addNoteBtn) {
    addNoteBtn.addEventListener("click", () => {
      closeOtherForms("note");
      document.getElementById("noteList").classList.remove("displayNone");
      const noteForm = document.getElementById("newNoteForm");
      noteForm.classList.remove("slide-hidden");
      noteForm.classList.remove("displayNone"); // ✅ <- this fixes it
    });
  }

  if (cancelNoteBtn) {
    cancelNoteBtn.addEventListener("click", () => {
      const message = editingOriginalNote
        ? "Cancel editing this note?"
        : "Cancel adding this note?";
  
      if (confirm(message)) {
        const form = document.getElementById("newNoteForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone"); // ✅ hide completely
        document.getElementById("noteFormTitle").innerHTML = '<i class="fas fa-note"></i> New Note';
        clearNoteForm();
  
        if (editingOriginalNote) {
          renderNoteItem(editingOriginalNote);
          editingOriginalNote = null;
        }
      }
    });
  }
  
  if (saveNoteBtn) {
    saveNoteBtn.addEventListener("click", () => {
      const name = document.getElementById("noteName").value.trim();
      const content = document.getElementById("noteContent").value.trim();
  
      if (!name || !content) {
        alert("Both name and content are required.");
        return;
      }
  
      if (editingOriginalNote && editingOriginalNote.id) {
        pendingNotes.push({
          id: editingOriginalNote.id,
          name,
          note: content,
          _original: { ...editingOriginalNote }
        });
        editingOriginalNote = null;
      } else {
        pendingNotes.push({ name, note: content });
      }
  
      document.getElementById("newNoteForm").classList.add("slide-hidden");
      document.getElementById("noteFormTitle").innerHTML = '<i class="fas fa-note"></i> New Note';
      clearNoteForm();
  
      updateNotePendingUI();
    });
  }
  
  // ===== Wallet Addresses =====
  const addWalletBtn = document.getElementById("addWalletBtn");
  const cancelWalletBtn = document.getElementById("cancelWalletBtn");
  const saveWalletBtn = document.getElementById("saveWalletBtn");

  if (addWalletBtn) {
    addWalletBtn.addEventListener("click", () => {
      closeOtherForms("wallet");
      document.getElementById("walletList").classList.remove("displayNone");
      const walletForm = document.getElementById("newWalletForm");
      walletForm.classList.remove("slide-hidden");
      walletForm.classList.remove("displayNone"); // ✅ <- this fixes it
    });
  }

  if (cancelWalletBtn) {
    cancelWalletBtn.addEventListener("click", () => {
      const message = editingOriginalWallet
        ? "Cancel editing this wallet?"
        : "Cancel adding this wallet?";
  
      if (confirm(message)) {
        const form = document.getElementById("newWalletForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone"); // ✅ hide completely
        document.getElementById("walletFormTitle").innerHTML = '<i class="fas fa-wallet"></i> New Wallet';
        clearWalletForm();
  
        if (editingOriginalWallet) {
          renderWalletItem(editingOriginalWallet);
          editingOriginalWallet = null;
        }
      }
    });
  }
  
  if (saveWalletBtn) {
    saveWalletBtn.addEventListener("click", () => {
      const name = document.getElementById("walletName").value.trim();
      const walletAddress = document.getElementById("walletAddress").value.trim();
      const privateKey = document.getElementById("walletPrivateKey").value.trim();
      const seedPhrase = document.getElementById("walletSeedPhrase").value.trim();
      const remarks = document.getElementById("walletRemarks").value.trim();
  
      if (!name || !walletAddress) {
        alert("Name and wallet address are required.");
        return;
      }
  
      if (editingOriginalWallet && editingOriginalWallet.walletAddress === walletAddress) {
        pendingWallets.push({
          walletAddress,
          name,
          privateKey,
          seedPhrase,
          remarks,
          _original: { ...editingOriginalWallet }
        });
        editingOriginalWallet = null;
      } else {
        pendingWallets.push({ name, walletAddress, privateKey, seedPhrase, remarks });
      }
  
      document.getElementById("newWalletForm").classList.add("slide-hidden");
      document.getElementById("walletFormTitle").innerHTML = '<i class="fas fa-wallet"></i> New Wallet';
      clearWalletForm();
  
      updateWalletPendingUI();

    });
  }

  // ===== Totp ====
  const addTotpBtn = document.getElementById("addTotpBtn");
  const cancelTotpBtn = document.getElementById("cancelTotpBtn");
  const saveTotpBtn = document.getElementById("saveTotpBtn");

  if (addTotpBtn) {
    addTotpBtn.addEventListener("click", () => {
      closeOtherForms("totp");
      document.getElementById("totpList").classList.remove("displayNone");
      const totpForm = document.getElementById("newTotpForm");
      totpForm.classList.remove("slide-hidden");
      totpForm.classList.remove("displayNone"); // ✅ <- this fixes it
    });
  }

  if (cancelTotpBtn) {
    cancelTotpBtn.addEventListener("click", () => {
      const message = editingOriginalTotp
        ? "Cancel editing this TOTP?"
        : "Cancel adding this TOTP?";
    
      if (confirm(message)) {
        const form = document.getElementById("newTotpForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone"); // ✅ hide completely

        document.getElementById("totpFormTitle").innerHTML = '<i class="fas fa-key"></i> New TOTP Secret';
        clearTotpForm();
    
        if (editingOriginalTotp) {
          renderTotpItem(editingOriginalTotp);
          editingOriginalTotp = null;
        }
      }
    });
    
  }

  if (saveTotpBtn) {
    saveTotpBtn.addEventListener("click", () => {
      const name = document.getElementById("totpName").value.trim();
      const key = document.getElementById("totpKey").value.trim();
      const algorithm = document.getElementById("totpAlgorithm").value.trim();
      const interval = parseInt(document.getElementById("totpInterval").value.trim(), 10);
    
      if (!name || !key || !algorithm || !interval || interval <= 0) {
        alert("All fields are required and interval must be positive.");
        return;
      }
    
      if (editingOriginalTotp && editingOriginalTotp.id) {
        pendingTotps.push({
          id: editingOriginalTotp.id,
          name,
          key,
          algorithm,
          interval,
          _original: { ...editingOriginalTotp }
        });      
        editingOriginalTotp = null;
      } else {
        pendingTotps.push({ name, key, algorithm, interval });
      }
    
      document.getElementById("newTotpForm").classList.add("slide-hidden");
      document.getElementById("totpFormTitle").innerHTML = '<i class="fas fa-key"></i> New TOTP Secret';
      clearTotpForm();
      updateTotpPendingUI();
    });    
  }

});

