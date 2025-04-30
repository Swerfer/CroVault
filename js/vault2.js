/* Steps to add a new VaultContract in CroVault:

1. Deploy the new Vault smart contract (e.g., VaultContract5.sol).
   - Add new storage fields, data types, and functions as needed.

2. Update VaultFactory.sol:
   - Call addVaultImplementation(newVaultAddress) to add your new vault to the factory.

3. Extend the vaultTypeMapping object in vault2.js:
   - Add a new entry:
     Example:
     readMedicalRecords: {
       index: 4,
       types: ["Medical Records", "Prescriptions", "Health History"],
       abi: vault5Abi // must define this ABI
     }

4. Add a new ABI for the new vault (vault5Abi):
   - Create an inline array for the new contract (Vault5 ABI) in abi.js
   - You only need the function signatures that you will call (e.g., readMedicalRecords()).

4. Add the abi name to the import below this comment block.

5. Update HTML UI:
   - If you want to show new forms for the new vault's data types, add the corresponding section in vault2.html.
   - Example: A new section like "Medical Records".

⚡ That's it! Very scalable structure. Only steps 3, 4 and 5 need manual updating.
*/

// ==== Cost manager ABI ====

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
    },
    {
      inputs: [],
      name: "vaultFactory",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
];

// ==== VaultFactory ABI ====

const factoryAbi = [
    {
      inputs: [],
      name: "createVaultsForAllImplementations",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" }
      ],
      name: "getVaultsByOwner",
      outputs: [
        { internalType: "address[]", name: "", type: "address[]" }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "vaultOwner", type: "address" },
        { indexed: true, internalType: "address", name: "vault", type: "address" },
        { indexed: false, internalType: "uint256", name: "implementationIndex", type: "uint256" }
      ],
      name: "VaultCreated",
      type: "event"
    },
    {
      inputs: [],
      name: "getVaultImplementations",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
];

// ==== Vault contracts ABIs ====

const vault1Abi = [
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
    },
  
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

const vault2Abi = [
    // === Pins ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "pin", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract2.PinUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertPins",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readPins",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "pin", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract2.Pin[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deletePins",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
  
    // === BankAccounts ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "accountNumber", type: "string" },
          { internalType: "string", name: "iban", type: "string" },
          { internalType: "string", name: "swift", type: "string" },
          { internalType: "string", name: "bankName", type: "string" },
          { internalType: "string", name: "country", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract2.BankAccountUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertBankAccounts",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readBankAccounts",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "accountNumber", type: "string" },
          { internalType: "string", name: "iban", type: "string" },
          { internalType: "string", name: "swift", type: "string" },
          { internalType: "string", name: "bankName", type: "string" },
          { internalType: "string", name: "country", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract2.BankAccount[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteBankAccounts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
  
    // === CreditCards ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "cardNumber", type: "string" },
          { internalType: "string", name: "cardHolder", type: "string" },
          { internalType: "string", name: "expiryDate", type: "string" },
          { internalType: "string", name: "cvv", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract2.CreditCardUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertCreditCards",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readCreditCards",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "cardNumber", type: "string" },
          { internalType: "string", name: "cardHolder", type: "string" },
          { internalType: "string", name: "expiryDate", type: "string" },
          { internalType: "string", name: "cvv", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract2.CreditCard[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteCreditCards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
];

const vault3Abi = [
    // === Insurances ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "provider", type: "string" },
          { internalType: "string", name: "policyNumber", type: "string" },
          { internalType: "string", name: "expiryDate", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract3.InsuranceUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertInsurances",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readInsurances",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "provider", type: "string" },
          { internalType: "string", name: "policyNumber", type: "string" },
          { internalType: "string", name: "expiryDate", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract3.Insurance[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteInsurances",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
  
    // === Identities ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "documentType", type: "string" },
          { internalType: "string", name: "documentNumber", type: "string" },
          { internalType: "string", name: "country", type: "string" },
          { internalType: "string", name: "expiryDate", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract3.IdentityUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertIdentities",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readIdentities",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "documentType", type: "string" },
          { internalType: "string", name: "documentNumber", type: "string" },
          { internalType: "string", name: "country", type: "string" },
          { internalType: "string", name: "expiryDate", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract3.Identity[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteIdentities",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
  
    // === Legal Documents ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "documentType", type: "string" },
          { internalType: "string", name: "storageLocation", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract3.LegalDocumentUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertLegalDocuments",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readLegalDocuments",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "documentType", type: "string" },
          { internalType: "string", name: "storageLocation", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract3.LegalDocument[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteLegalDocuments",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
];

const vault4Abi = [
    // === Assets ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "assetType", type: "string" },
          { internalType: "string", name: "ownershipId", type: "string" },
          { internalType: "string", name: "valueEstimate", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract4.AssetUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertAssets",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readAssets",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "assetType", type: "string" },
          { internalType: "string", name: "ownershipId", type: "string" },
          { internalType: "string", name: "valueEstimate", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract4.Asset[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteAssets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
  
    // === Contacts ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "relation", type: "string" },
          { internalType: "string", name: "email", type: "string" },
          { internalType: "string", name: "phone", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract4.ContactUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertContacts",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readContacts",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "relation", type: "string" },
          { internalType: "string", name: "email", type: "string" },
          { internalType: "string", name: "phone", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract4.Contact[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteContacts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
  
    // === Subscriptions ===
    {
      inputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "serviceName", type: "string" },
          { internalType: "string", name: "billingAccount", type: "string" },
          { internalType: "string", name: "frequency", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" }
        ],
        internalType: "struct VaultContract4.SubscriptionUpsert[]",
        name: "data",
        type: "tuple[]"
      }],
      name: "upsertSubscriptions",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "readSubscriptions",
      outputs: [{
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "serviceName", type: "string" },
          { internalType: "string", name: "billingAccount", type: "string" },
          { internalType: "string", name: "frequency", type: "string" },
          { internalType: "string", name: "linkedTo", type: "string" },
          { internalType: "string", name: "remarks", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct VaultContract4.Subscription[]",
        name: "",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
      name: "deleteSubscriptions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
];

// ==== Config ====
const costManagerAddress  = "0x50E2c7201d5714e018a33203FbD92979BC51eee4";
let factoryAddress;

// ==== topic0 = Event VaultCreated in CostManager contract Topics 0 ====
const topic0              = "0x0b045af6aff86dd2cda5342fd0329a354dc66759ff1eda00d7ecf13a76c7fb3b";
const fetchVaultCountUrl  = `https://cronos.org/explorer/api?module=logs&action=getLogs&fromBlock=19160779&toBlock=latest&address=factoryAddress&topic0=${topic0}`;
const cronosRpcUrl        = "https://evm-cronos.crypto.org";
const cronoScanUrl        = "https://cronoscan.com";

// ==== Mapping of vault index, vault ABI and pretty names. ====
// ==== This const must be in the .js after the vault#Abi's ====

const vaultTypeMapping = {
  readCredentials: {
    index: 0,
    types: ["Credentials", "Notes", "Wallets", "TOTPs"],
    abi: vault1Abi
  },
  readPins: {
    index: 1,
    types: ["PINs", "Bank Accounts", "Credit Cards"],
    abi: vault2Abi
  },
  readInsurances: {
    index: 2,
    types: ["Insurances", "Identities", "Legal Documents"],
    abi: vault3Abi
  },
  readAssets: {
    index: 3,
    types: ["Assets", "Contacts", "Subscriptions"],
    abi: vault4Abi
  }
};

// ==== State ====

let newVault = false;
let cachedCosts = { creation: null, upsert: null };
let web3Modal;
let provider;       // ethers provider
let signer;         // ethers signer
let walletAddress;  // connected wallet
let sessionPassword   = null;
let sessionPasswordOk = false;
let walletDerivedKey  = null;
let userVaults = [];

// ==== IDLE TIMEOUT HANDLING ====

let idleTimeout;
let idleListening = false;
const idleLimitMs = 5 * 30 * 1000; // 2.5 minutes

// ==== Vault 1 (Credentials, Notes, Wallets, TOTPs)
let pendingCredentials = [];
let pendingNotes = [];
let pendingWallets = [];
let pendingTotps = [];
let editingOriginalCredential = null;
let editingOriginalNote = null;
let editingOriginalWallet = null;
let editingOriginalTotp = null;

// === Vault 2 (PINs, Bank Accounts, Credit Cards)
let pendingPins = [];
let pendingBankAccounts = [];
let pendingCreditCards = [];
let editingOriginalPin = null;
let editingOriginalBankAccount = null;
let editingOriginalCreditCard = null;

// === Vault 3 (Insurances, Identities, Legal Docs)
let pendingInsurances = [];
let pendingIdentities = [];
let pendingLegalDocuments = [];
let editingOriginalInsurance = null;
let editingOriginalIdentity = null;
let editingOriginalLegal = null;

// === Vault 4 (Assets, Contacts, Subscriptions)
let pendingAssets = [];
let pendingContacts = [];
let pendingSubscriptions = [];
let editingOriginalAsset = null;
let editingOriginalContact = null;
let editingOriginalSubscription = null;

// ==== Utilities ====

function strToUint8(str) { 
  return new TextEncoder().encode(str); 
}

function uint8ToB64(bytes) { 
  return btoa(String.fromCharCode(...new Uint8Array(bytes))); 
}

function b64ToUint8(base64) {
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showAlert("Copied to clipboard", "success"))
    .catch(() => {});
}

function showSpinner(text = "Saving to blockchain...") {
  const overlay = document.getElementById("spinnerOverlay");
  if (!overlay) return;
  overlay.querySelector(".spinner-text").innerHTML = text;
  overlay.classList.remove("hidden");
}

function hideSpinner() {
  const overlay = document.getElementById("spinnerOverlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
}

function showVaultType(type) {
  document.querySelectorAll('.vault-card').forEach(el => el.classList.add('displayNone'));
  document.querySelectorAll(`.vault-${type}`).forEach(el => el.classList.remove('displayNone'));
}

async function fetchVaultCount() {
  const path = window.location.pathname.toLowerCase();
  if (!(path.endsWith("/") || path.endsWith("/index") || path.endsWith("/index.html"))) return;
  try {
    const response = await fetch(fetchVaultCountUrl.replace("factoryAddress", factoryAddress));
    const data = await response.json();
    // Check if data looks good
    if (data && data.status === "1" && Array.isArray(data.result)) {
      const count = data.result.length; // Divide by 4 for the real user count;
      document.getElementById("activeVaults").textContent = "Number of active vaults: " + count;
    }
  } catch {
    document.getElementById("activeVaults").textContent = "";
  }
}

async function getFactoryAddress() {
  const costManager = new ethers.Contract(costManagerAddress, costManagerAbi, provider);
  for (let i = 0; i < 10; i++) {
    try {
      factoryAddress = await costManager.vaultFactory();
      return;
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw new Error("Unable to fetch factory address");
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
    pendingTotps.length > 0 ||
    pendingPins.length > 0 ||
    pendingBankAccounts.length > 0 ||
    pendingCreditCards.length > 0 ||
    pendingInsurances.length > 0 ||
    pendingIdentities.length > 0 ||
    pendingLegalDocuments.length > 0 ||
    pendingAssets.length > 0 ||
    pendingContacts.length > 0 ||
    pendingSubscriptions.length > 0;

  const btn1 = document.getElementById("estimateSaveBtn");
  const btn2 = document.getElementById("globalSaveAllBtn");
  const stickyBar = document.getElementById("stickySaveBar");
  btn1?.classList.toggle("displayNone", !shouldShow);
  btn2?.classList.toggle("displayNone", !shouldShow);
  stickyBar?.classList.toggle("hidden", !shouldShow);
}

function showCostModal() {
  document.getElementById("feeUpsert").textContent = cachedCosts.upsert || "Loading...";
  document.getElementById("costInfoModal").classList.remove("hidden");
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showAlert("Copied to clipboard!", "success");
  }).catch(() => {
    showAlert("Failed to copy.", "error");
  });
}

function showAlert(message, type = "info", onClose = null) {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
  const modal = document.getElementById("alertModal");
  const title = document.getElementById("alertModalTitle");
  const text = document.getElementById("alertModalText");
  const closeBtn = document.getElementById("alertModalCloseBtn");

  // Reset classes
  modal.className = "modal";
  modal.classList.add(type); // e.g. "success", "warning"

  // Set title and icon
  const iconMap = {
    info: "fas fa-info-circle",
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-times-circle"
  };
  const iconClass = iconMap[type] || iconMap.info;
  title.innerHTML = `<i class="${iconClass}"></i> ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  // Set message
  text.innerHTML = message;
  modal.classList.remove("hidden");

  function closeHandler() {
    modal.classList.add("hidden");
    document.getElementById("modalOverlay")?.classList.add("hidden");
    closeBtn.removeEventListener("click", closeHandler);
    if (onClose) onClose();
  }

  closeBtn.addEventListener("click", closeHandler);
}

function showConfirm(message, onConfirm, onCancel = null) {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
  const modal = document.getElementById("confirmModal");
  const title = document.getElementById("confirmModalTitle");
  const text = document.getElementById("confirmModalText");
  const yesBtn = document.getElementById("confirmModalYesBtn");
  const noBtn = document.getElementById("confirmModalNoBtn");

  text.innerHTML = message;
  title.innerHTML = `<i class="fas fa-question-circle"></i> Confirm`;
  modal.classList.remove("hidden");

  function cleanup() {
    modal.classList.add("hidden");
    document.getElementById("modalOverlay")?.classList.add("hidden");
    yesBtn.removeEventListener("click", yesHandler);
    noBtn.removeEventListener("click", noHandler);
  }

  function yesHandler() {
    cleanup();
    if (onConfirm) onConfirm();
  }

  function noHandler() {
    cleanup();
    if (onCancel) onCancel();
  }

  yesBtn.addEventListener("click", yesHandler);
  noBtn.addEventListener("click", noHandler);
}

function isValidSeedPhrase(seedPhrase) {
  if (!seedPhrase) return true; // Empty check

  const words = seedPhrase.trim().split(/\s+/);
  if (words.length !== 12 && words.length !== 24) return false;

  const wordRegex = /^[a-zA-Z]+$/; // Only letters allowed (case insensitive)
  
  for (const word of words) {
    if (!wordRegex.test(word)) {
      return false; // invalid word found
    }
  }

  return true; // all checks passed
}

function isValidCreditCardNumber(cardNumber) {
  if (!cardNumber) return false;

  // Remove spaces or dashes
  cardNumber = cardNumber.replace(/\D/g, '');

  if (!/^\d{13,19}$/.test(cardNumber)) return false; // 13–19 digits

  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function isValidCVV(cvv) {
  if (!cvv) return false;

  // Remove spaces
  cvv = cvv.trim();

  if (!/^\d+$/.test(cvv)) return false; // Only digits

}

function isValidIBAN(iban) {
  if (!iban) return false;

  // Remove spaces and uppercase
  iban = iban.replace(/\s+/g, '').toUpperCase();

  // Basic format check (country + 2 digits + up to 30 chars)
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{10,30}$/.test(iban)) {
    return false;
  }

  // Rearrange: move first 4 chars to end
  const rearranged = iban.slice(4) + iban.slice(0, 4);

  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  const numericIban = rearranged.replace(/[A-Z]/g, (char) => char.charCodeAt(0) - 55);

  // Now modulo 97, but the number can be VERY big, so do it piece by piece
  let remainder = numericIban.slice(0, 2);
  for (let offset = 2; offset < numericIban.length; offset += 7) {
    const part = remainder + numericIban.slice(offset, offset + 7);
    remainder = String(parseInt(part, 10) % 97);
  }

  return parseInt(remainder, 10) === 1;
}

function showLockButton() {
  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn)    unlockBtn.classList.add("displayNone");
  const lockBtn   = document.getElementById("lockBtn");
  if (lockBtn)     lockBtn.classList.remove("displayNone");
}

function showUnlockButton() {
  const unlockBtn =    document.getElementById("unlockBtn");
  if (unlockBtn)    unlockBtn.classList.remove("displayNone");
  const lockBtn   =    document.getElementById("lockBtn");
  if (lockBtn)           lockBtn.classList.add("displayNone");
}

// ==== Encryption / Decryption ====

async function encryptWithPassword(password, data) {
  if (!password || !walletDerivedKey) {
    showUnlockModal(async (pw) => {
      sessionPassword = pw;
      password = pw;
      await deriveWalletKey();
    });
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
  sessionPasswordOk = true;
  return JSON.parse(new TextDecoder().decode(decrypted));
}

function shortenAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// ==== Helpers ====

function clearForm(fieldIds) {
    fieldIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
}

function hasUnsavedForm(fieldIds) {
    return fieldIds.some(id => {
      const el = document.getElementById(id);
      return el && el.value.trim() !== "";
    });
}
  
async function waitForTxWithTimeout(tx, timeoutMs = 15000) {
  return Promise.race([
    tx.wait(), // resolves when confirmed
    new Promise((_, reject) => setTimeout(() => reject(new Error("Transaction timed out")), timeoutMs))
  ]);
}

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
        // Just the first result of the array. Future modify to itterate multiple vault contracts.
        const vaults = await factory.getVaultsByOwner(walletAddress);
        const vaultAddress = vaults.length > 0 ? vaults[0] : null;
      return vaultAddress;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
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
  } catch {}
}

// ==== Connect wallet flow ====

async function connectWallet() {
  if (walletAddress) return; // Already connected
  const connectBtnText = document.getElementById("connectBtnText");

  try {
    connectBtnText.textContent = "Connecting...";
    showSpinner("Connecting...");
    const instance = await retryWeb3ConnectWithTimeout(10, 1000); // 10 tries max, 1s timeout each
    if (!instance) {
      throw new Error("Wallet connection failed after multiple timed-out attempts");
    }
    await afterWalletConnect(instance);
  } catch (err) {
    connectBtnText.textContent = "Connect Wallet";
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
      userVaults = null; 
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
      } catch {}
    } 
  }
  updateBalanceDisplay();
}

async function hideOrShowCreateVault() {
  const createVaultSection = document.getElementById("createVaultSection");
  const newVaultsBanner = document.getElementById("newVaultsBanner");

  if (!walletAddress) {
    createVaultSection.classList.add("hidden");
    newVaultsBanner?.classList.add("hidden");
    return;
  }

  showSpinner("<p>Connected to " + shortenAddress(walletAddress) + "</p><p>Loading your vault addresses...</p>");

  try {
    const factory = new ethers.Contract(factoryAddress, factoryAbi, provider);
    const vaultAddresses = await factory.getVaultsByOwner(walletAddress);
    const implementations = await factory.getVaultImplementations();

    userVaults = await detectVaultTypes(vaultAddresses);

    const ownedVaultCount = userVaults.filter(v => v).length;
    const totalVaultTypes = implementations.length;

    if (ownedVaultCount === totalVaultTypes) {
      createVaultSection.classList.add("hidden");
      newVaultsBanner?.classList.add("hidden");

      const vaultAddressEl = document.getElementById("vaultAddress");
      vaultAddressEl.innerHTML = "<strong>Your personal vaults:</strong><br>";

      userVaults.forEach((vault, index) => {
        if (!vault) return;
        vaultAddressEl.innerHTML += `
          <div>
            <span>Vault ${index + 1}:</span>
            <span>${shortenAddress(vault)}</span>
            <a href="https://cronoscan.com/address/${vault}" target="_blank" class="icon-btn" title="View on Cronoscan" style="margin-left: 6px;">
              <i class="fas fa-external-link-alt"></i>
            </a>
            <button class="icon-btn" title="Copy Address" onclick="copyToClipboard('${vault}')">
              <i class="fas fa-copy white"></i>
            </button>
          </div>
        `;
      });

      unlockAndLoadAllSections();
    } else if (ownedVaultCount === 0) {
      // New user: no vaults yet
      createVaultSection.classList.remove("hidden");
      newVaultsBanner?.classList.add("hidden");
      document.getElementById("vaultDataSection").classList.add("displayNone");
    } else {
      // User is missing vaults
      createVaultSection.classList.add("hidden");
      newVaultsBanner?.classList.remove("hidden");

      const missingIndexes = [];
      for (const [funcName, details] of Object.entries(vaultTypeMapping)) {
        if (!userVaults[details.index]) {
          missingIndexes.push(details.index);
        }
      }

      const missingDescriptions = missingIndexes
        .map(index => {
          const match = Object.values(vaultTypeMapping).find(v => v.index === index);
          if (match) {
            return `Vault ${index + 1}: ${match.types.join(", ")}`;
          }
          return `Vault ${index + 1}`;
        })
        .join("<br>");

      document.getElementById("missingVaultTypes").innerHTML = `
        <p><strong>The following vault types are available to add:</strong></p>
        <p>${missingDescriptions}</p>
      `;
    }
  } catch (e) {
    console.error(e);
    createVaultSection.classList.add("hidden");
    newVaultsBanner?.classList.add("hidden");
  } 
  hideSpinner();
}

async function detectVaultTypes(vaultAddresses) {
  const signer = provider.getSigner();
  const detectedVaults = Array(Object.keys(vaultTypeMapping).length).fill(null);

  for (const addr of vaultAddresses) {
    if (!addr || addr === "0x0000000000000000000000000000000000000000") continue;

    let matched = false;

    for (const [funcName, details] of Object.entries(vaultTypeMapping)) {
      try {
        const vault = new ethers.Contract(addr, details.abi, signer); // ✅ correct ABI per vault
        await vault[funcName](); // call the function
        detectedVaults[details.index] = addr;
        matched = true;
        break;
      } catch (e) {
        // try next
      }
    }

    if (!matched) {
      console.warn("Unknown vault type:", addr);
    }
  }

  return detectedVaults;
}

async function unlockAndLoadAllSections() {
  const signer = provider.getSigner();
  let foundData = false;

  try {
    for (let index = 0; index <= 3; index++) {
      const vaultAddress = userVaults[index];
      if (!vaultAddress || !vaultAddress.startsWith("0x")) continue;

      const abi = index === 0 ? vault1Abi : index === 1 ? vault2Abi : index === 2 ? vault3Abi : vault4Abi;
      const vault = new ethers.Contract(vaultAddress, abi, signer);

      const result = await retryReadDataWithTimeout(vault, index);
      if (result && result.some(arr => Array.isArray(arr) && arr.length > 0)) {
        foundData = true;
        break;
      }
    }

    if (!foundData) {
      newVault = true;
      await deriveWalletKey();
      document.getElementById("vaultDataSection").classList.remove("displayNone");
      return;
    }
  } catch {}

  showUnlockModal(async (pw) => {
    sessionPassword = pw;
    await deriveWalletKey();
    await loadAllSections();
  });
}

async function retryReadDataWithTimeout(vault, vaultIndex, maxRetries = 10, timeoutMs = 1000) {
  const readersByVault = {
    0: ["readCredentials", "readNote", "readWalletAddress", "readTOTP"],
    1: ["readPins", "readBankAccounts", "readCreditCards"],
    2: ["readInsurances", "readIdentities", "readLegalDocuments"],
    3: ["readAssets", "readContacts", "readSubscriptions"]
  };

  const readFns = readersByVault[vaultIndex];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const results = await Promise.all(
        readFns.map(fn => vault[fn]())
      );
      return results;
    } catch (err) {
      if (attempt === maxRetries) return null;
      await new Promise(res => setTimeout(res, timeoutMs));
    }
  }
}

async function loadAllSections() {
  if (!sessionPassword) return;

  await Promise.all([
    loadAndShowCredentials(),
    loadAndShowNotes(),
    loadAndShowWallets(),
    loadAndShowTotps(),
    loadAndShowPins(),
    loadAndShowBankAccounts(),
    loadAndShowCreditCards(),
    loadAndShowInsurances(),
    loadAndShowIdentities(),
    loadAndShowLegalDocuments(),
    loadAndShowAssets(),
    loadAndShowContacts(),
    loadAndShowSubscriptions()
  ]);
}

async function deriveWalletKey() {
  if (walletDerivedKey) return; // Already derived
  try {
    const signer = provider.getSigner();
    const message = "I authorize access to my CroVault data on the blockchain";
    const signature = await signer.signMessage(message);
    const rawKey = await crypto.subtle.digest("SHA-256", strToUint8(signature));
    walletDerivedKey = new Uint8Array(rawKey);
    showLockButton();
  } catch (err) {
    showUnlockButton();
    throw err; // rethrow to let caller know
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
    if (!pw || pw.length < 12) return showAlert("Password too short", "warning");
  
    modal.classList.add("hidden");
    document.removeEventListener("keydown", handleKey);
    onConfirm(pw); // 🔁 No deriveWalletKey here anymore
    startIdleMonitor(); // ✅ Start idle timeout after unlock
    showLockButton();
  };
  
  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    document.removeEventListener("keydown", handleKey);
    showUnlockButton();
  };  

  document.addEventListener("keydown", handleKey);
}

// ==== Create new vault ====

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

      const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
      showSpinner("Deploying your vault...");
      // 2. Call createVault
      const tx = await factory.createVaultsForAllImplementations({
        value: ethers.utils.parseEther("0"), // 0 CRO Keep it 0 CRO, else only one vault will be created and the rest fails.
      });
      const receipt = await tx.wait();
      try {
        const vaultEvents = receipt.events.filter(e => e.event === "VaultCreated");
        if (vaultEvents.length > 0) {
          const addresses = vaultEvents.map(e => e.args.vault);
          const addressList = addresses.map(a => `<div>${a}</div>`).join("");
      
          deployResult.innerHTML = "Vaults deployed at:<br>" + addressList;
          showAlert(`Vaults deployed at:<br>${addressList}`, "success");
        }
      } catch {}      
      hideSpinner();
      hideOrShowCreateVault();

  } catch (err) {
    deployResult.textContent = "Error: " + err.message;
  } finally {
    deployLoader.classList.remove("visibleInline");
    createVaultBtn.disabled = false;
  }
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
  };

  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    strengthText.remove();
    document.removeEventListener("keydown", handleKey);
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
    unlockAndLoadAllSections();
  };

  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    showUnlockButton();
  };
}

// ==== Close other forms ====

function closeOtherForms(excludeSection) { // Clears and closes other new data type forms if confirmed. If canceled, the previous open form stays open.
    const forms = [
      // Vault 1
      { section: "credential",   form: "newCredentialForm",   fields: ["credName", "credUsername", "credPassword", "credRemarks"] },
      { section: "note",         form: "newNoteForm",         fields: ["noteName", "noteContent"] },
      { section: "wallet",       form: "newWalletForm",       fields: ["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"] },
      { section: "totp",         form: "newTotpForm",         fields: ["totpName", "totpKey", "totpAlgorithm", "totpInterval"] },
  
      // Vault 2
      { section: "pin",          form: "newPinForm",          fields: ["pinName", "pinLinkedTo", "pinValue", "pinRemarks"] },
      { section: "bank",         form: "newBankForm",         fields: ["bankName", "bankAccountNumber", "bankIban", "bankSwift", "bankBankName", "bankCountry", "bankRemarks"] },
      { section: "card",         form: "newCardForm",         fields: ["cardName", "cardNumber", "cardHolder", "cardExpiration", "cardCVV", "cardLinkedTo", "cardRemarks"] },
  
      // Vault 3
      { section: "insurance",    form: "newInsuranceForm",    fields: ["insuranceName", "insuranceProvider", "insurancePolicyNumber", "insuranceExpiryDate", "insuranceLinkedTo", "insuranceRemarks"] },
      { section: "identity",     form: "newIdentityForm",     fields: ["identityName", "identityDocumentType", "identityDocumentNumber", "identityCountry", "identityExpiryDate", "identityRemarks"] },
      { section: "legal",        form: "newLegalForm",        fields: ["legalName", "legalDocumentType", "legalStorageLocation", "legalLinkedTo", "legalRemarks"] },
  
      // Vault 4
      { section: "asset",        form: "newAssetForm",        fields: ["assetType", "assetOwnershipId", "assetValueEstimate", "assetLinkedTo", "assetRemarks"] },
      { section: "contact",      form: "newContactForm",      fields: ["contactName", "contactRelation", "contactEmail", "contactPhone", "contactRemarks"] },
      { section: "subscription", form: "newSubscriptionForm", fields: ["subscriptionServiceName", "subscriptionBillingAccount", "subscriptionFrequency", "subscriptionLinkedTo", "subscriptionRemarks"] },
    ];
  
    forms.forEach(({ section, form, fields }) => {
      const formElement = document.getElementById(form);
      if (section !== excludeSection && formElement && !formElement.classList.contains("slide-hidden")) {
        if (hasUnsavedForm(fields)) {
          showConfirm("You have unsaved data, discard?", () => {
            clearForm(fields);
            formElement.classList.add("slide-hidden");
          });
        } else {
          clearForm(fields);
          formElement.classList.add("slide-hidden");
        }
      }
    });
}  

// ==== Load and show data types function ====

async function loadAndShowSection({
    vaultIndex,
    abi,
    readFunc,
    encryptedFields,
    plainFields,
    containerId,
    countElementId,
    renderFunc,
    updatePendingUIFunc
  }) {
    if (!sessionPassword) return;
    let items;
  
    // Check if there is a vault address
    if (!walletDerivedKey) {
      try {
        await deriveWalletKey();
      } catch (e) {
        showUnlockButton();
        return;
      }
    }
    
    // If session password is set, show the vault data section
    document.getElementById("vaultDataSection").classList.remove("displayNone");
  
    // Hide the retry button
    showLockButton();
  
    // Validate session password and vault address
    if (!sessionPassword || !userVaults[vaultIndex] || !userVaults[vaultIndex].startsWith("0x")) return;
  
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVaults[vaultIndex], abi, signer);
    try {
      items = await readFunc(vault);
    } catch (ex) {
      return;
    }
  
    if (!items.length) {
      return;
    }
  
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    document.getElementById(countElementId).textContent = items.length;
  
    for (const item of items) {
        let decrypted = { id: item.id };
        try {
          for (const field of encryptedFields) {
            const result = await decryptWithPassword(sessionPassword, JSON.parse(item[field]));
            decrypted[field] = typeof result === "object" ? result[field] : result;
          }
          for (const field of plainFields) {
            decrypted[field] = item[field];
          }
          decrypted.timestamp = item.timestamp;
        } catch (e) {
          if (!sessionPasswordOk) {
            showWrongPasswordModal();
            return;
          }
        }     
        renderFunc(decrypted, false);
      }         
    updatePendingUIFunc();
}  

// ==== Load and show functions Vault 1 ====

async function loadAndShowCredentials() {
    await loadAndShowSection({
      vaultIndex: 0,
      abi: vault1Abi,
      readFunc: (vault) => vault.readCredentials(),
      encryptedFields: ["name", "username", "password", "remarks"],
      plainFields: [],
      containerId: "credentialReadItems",
      countElementId: "credCount",
      renderFunc: renderCredentialItem,
      updatePendingUIFunc: updateCredentialPendingUI
    });
}
  
async function loadAndShowNotes() {
    await loadAndShowSection({
      vaultIndex: 0,
      abi: vault1Abi,
      readFunc: (vault) => vault.readNote(),
      encryptedFields: ["name", "note"],
      plainFields: [],
      containerId: "noteReadItems",
      countElementId: "noteCount",
      renderFunc: renderNoteItem,
      updatePendingUIFunc: updateNotePendingUI
    });
}

async function loadAndShowWallets() {
    await loadAndShowSection({
      vaultIndex: 0,
      abi: vault1Abi,
      readFunc: (vault) => vault.readWalletAddress(),
      encryptedFields: ["name", "walletAddress", "privateKey", "seedPhrase", "remarks"],
      plainFields: [],
      containerId: "walletReadItems",
      countElementId: "walletCount",
      renderFunc: renderWalletItem,
      updatePendingUIFunc: updateWalletPendingUI
    });
}

async function loadAndShowTotps() {
    await loadAndShowSection({
      vaultIndex: 0,
      abi: vault1Abi,
      readFunc: (vault) => vault.readTOTP(),
      encryptedFields: ["name", "key", "algorithm"],
      plainFields: ["interval"],
      containerId: "totpReadItems",
      countElementId: "totpCount",
      renderFunc: renderTotpItem,
      updatePendingUIFunc: updateTotpPendingUI
    });
}
  
// ==== Load and show functions Vault 2 ====

async function loadAndShowPins() {
    await loadAndShowSection({
      vaultIndex: 1,
      abi: vault2Abi,
      readFunc: (vault) => vault.readPins(),
      encryptedFields: ["name", "linkedTo", "pin", "remarks"],
      plainFields: [],
      containerId: "pinReadItems",
      countElementId: "pinCount",
      renderFunc: renderPinItem,
      updatePendingUIFunc: updatePinPendingUI
    });
}

async function loadAndShowBankAccounts() {
    await loadAndShowSection({
      vaultIndex: 1,
      abi: vault2Abi,
      readFunc: (vault) => vault.readBankAccounts(),
      encryptedFields: ["name", "accountNumber", "iban", "swift", "bankName", "country", "remarks"],
      plainFields: [],
      containerId: "bankReadItems",
      countElementId: "bankCount",
      renderFunc: renderBankAccountItem,
      updatePendingUIFunc: updateBankAccountPendingUI
    });
}

async function loadAndShowCreditCards() {
    await loadAndShowSection({
      vaultIndex: 1,
      abi: vault2Abi,
      readFunc: (vault) => vault.readCreditCards(),
      encryptedFields: ["name", "cardNumber", "cardHolder", "expiryDate", "cvv", "linkedTo", "remarks"],
      plainFields: [],
      containerId: "cardReadItems",
      countElementId: "cardCount",
      renderFunc: renderCreditCardItem,
      updatePendingUIFunc: updateCreditCardPendingUI
    });
}
  
// ==== Load and show functions Vault 3 ====

async function loadAndShowInsurances() {
    await loadAndShowSection({
      vaultIndex: 2,
      abi: vault3Abi,
      readFunc: (vault) => vault.readInsurances(),
      encryptedFields: ["name", "provider", "policyNumber", "expiryDate", "linkedTo", "remarks"],
      plainFields: [],
      containerId: "insuranceReadItems",
      countElementId: "insuranceCount",
      renderFunc: renderInsuranceItem,
      updatePendingUIFunc: updateInsurancePendingUI
    });
}

async function loadAndShowIdentities() {
    await loadAndShowSection({
      vaultIndex: 2,
      abi: vault3Abi,
      readFunc: (vault) => vault.readIdentities(),
      encryptedFields: ["name", "documentType", "documentNumber", "country", "expiryDate", "remarks"],
      plainFields: [],
      containerId: "identityReadItems",
      countElementId: "identityCount",
      renderFunc: renderIdentityItem,
      updatePendingUIFunc: updateIdentityPendingUI
    });
}

async function loadAndShowLegalDocuments() {
    await loadAndShowSection({
      vaultIndex: 2,
      abi: vault3Abi,
      readFunc: (vault) => vault.readLegalDocuments(),
      encryptedFields: ["name", "documentType", "storageLocation", "linkedTo", "remarks"],
      plainFields: [],
      containerId: "legalReadItems",
      countElementId: "legalCount",
      renderFunc: renderLegalDocumentItem,
      updatePendingUIFunc: updateLegalDocumentPendingUI
    });
}
  
// ==== Load and show functions Vault 4 ====

async function loadAndShowAssets() {
    await loadAndShowSection({
      vaultIndex: 3,
      abi: vault4Abi,
      readFunc: (vault) => vault.readAssets(),
      encryptedFields: ["assetType", "ownershipId", "valueEstimate", "linkedTo", "remarks"],
      plainFields: [],
      containerId: "assetReadItems",
      countElementId: "assetCount",
      renderFunc: renderAssetItem,
      updatePendingUIFunc: updateAssetPendingUI
    });
}

async function loadAndShowContacts() {
    await loadAndShowSection({
      vaultIndex: 3,
      abi: vault4Abi,
      readFunc: (vault) => vault.readContacts(),
      encryptedFields: ["name", "relation", "email", "phone", "remarks"],
      plainFields: [],
      containerId: "contactReadItems",
      countElementId: "contactCount",
      renderFunc: renderContactItem,
      updatePendingUIFunc: updateContactPendingUI
    });
}

async function loadAndShowSubscriptions() {
    await loadAndShowSection({
      vaultIndex: 3,
      abi: vault4Abi,
      readFunc: (vault) => vault.readSubscriptions(),
      encryptedFields: ["serviceName", "billingAccount", "frequency", "linkedTo", "remarks"],
      plainFields: [],
      containerId: "subscriptionReadItems",
      countElementId: "subscriptionCount",
      renderFunc: renderSubscriptionItem,
      updatePendingUIFunc: updateSubscriptionPendingUI
    });
}
  
// ==== Data delete from blockchain Vault 1 ====

async function deleteCredentials(ids = []) {
  if (!userVaults[0] || !userVaults[0].startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting credential...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVaults[0], vault1Abi, signer);

    const tx = await vault.deleteCredentials(ids);
    await tx.wait();

    showAlert("Credential(s) deleted!", "success");

    updateCredentialPendingUI();           // ✅ Refresh pending display (optional but safe)
    updateCredentialCountDisplay();        // ✅ <-- Add this RIGHT HERE
    updateGlobalSaveButtonVisibility();    // ✅ Optional: ensure Save All button hides if needed
    await loadAndShowCredentials();        // ✅ Reload read items

  } catch {
    showAlert("Failed to delete credential(s).", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteNotes(ids = []) {
  if (!userVaults[0] || !userVaults[0].startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting note...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVaults[0], vault1Abi, signer);

    const tx = await vault.deleteNotes(ids);
    await tx.wait();

    showAlert("Note(s) deleted!", "success");

    updateNotePendingUI();
    updateNoteCountDisplay();
    updateGlobalSaveButtonVisibility();
    await loadAndShowNotes();

  } catch {
    showAlert("Failed to delete note(s).", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteWallets(ids = []) {
  if (!userVaults[0] || !userVaults[0].startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting wallet...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVaults[0], vault1Abi, signer);

    const tx = await vault.deleteWalletAddresses(ids);
    await tx.wait();

    showAlert("Wallet(s) deleted!", "success");

    updateWalletPendingUI();
    updateWalletCountDisplay();
    updateGlobalSaveButtonVisibility();
    await loadAndShowWallets();

  } catch {
    showAlert("Failed to delete wallet address(es).", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteTotps(ids = []) {
  if (!userVaults[0] || !userVaults[0].startsWith("0x")) return;
  if (!ids.length) return;

  try {
    showSpinner("Deleting TOTP...");
    const signer = provider.getSigner();
    const vault = new ethers.Contract(userVaults[0], vault1Abi, signer);

    const tx = await vault.deleteTOTP(ids);
    await tx.wait();

    showAlert("TOTP secret(s) deleted!", "success");

    updateTotpPendingUI();
    updateTotpCountDisplay();
    updateGlobalSaveButtonVisibility();
    await loadAndShowTotps();

  } catch {
    showAlert("Failed to delete TOTP.", "error");
  } finally {
    hideSpinner();
  }
}

// ==== Data delete from blockchain Vault 2 ====

async function deletePins(id) {
  if (!userVaults[1]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[1], vault2Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deletePins([id]);
    await loadAndShowPins();
    showAlert("PIN deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting PIN.", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteBankAccounts(id) {
  if (!userVaults[1]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[1], vault2Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteBankAccounts([id]);
    await loadAndShowBankAccounts();
    showAlert("Bank account deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting bank account.", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteCreditCards(id) {
  if (!userVaults[1]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[1], vault2Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteCreditCards([id]);
    await loadAndShowCreditCards();
    showAlert("Credit card deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting credit card.", "error");
  } finally {
    hideSpinner();
  }
}

// ==== Data delete from blockchain Vault 3 ====

async function deleteInsurances(id) {
  if (!userVaults[2]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[2], vault3Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteInsurances([id]);
    await loadAndShowInsurances();
    showAlert("Insurance deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting insurance.", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteIdentities(id) {
  if (!userVaults[2]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[2], vault3Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteIdentities([id]);
    await loadAndShowIdentities();
    showAlert("Identity deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting identity.", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteLegalDocuments(id) {
  if (!userVaults[2]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[2], vault3Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteLegalDocuments([id]);
    await loadAndShowLegalDocuments();
    showAlert("Legal document deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting legal document.", "error");
  } finally {
    hideSpinner();
  }
}

// ==== Data delete from blockchain Vault 4 ====

async function deleteAssets(id) {
  if (!userVaults[3]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[3], vault4Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteAssets([id]);
    await loadAndShowAssets();
    showAlert("Asset deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting asset.", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteContacts(id) {
  if (!userVaults[3]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[3], vault4Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteContacts([id]);
    await loadAndShowContacts();
    showAlert("Contact deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting contact.", "error");
  } finally {
    hideSpinner();
  }
}

async function deleteSubscriptions(id) {
  if (!userVaults[3]) return;

  const signer = provider.getSigner();
  const vault = new ethers.Contract(userVaults[3], vault4Abi, signer);

  try {
    showSpinner("Deleting...");
    await vault.deleteSubscriptions([id]);
    await loadAndShowSubscriptions();
    showAlert("Subscription deleted successfully.", "success");
  } catch (e) {
    showAlert("Error deleting subscription.", "error");
  } finally {
    hideSpinner();
  }
}

// ==== Data editors client side new data====

// ==== editPending Vault 1 ====

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
  document.getElementById("credentialList").classList.remove("displayNone");

  pendingCredentials.splice(index, 1);
  updateCredentialPendingUI();
}

function editPendingNote(index) {
  const note = pendingNotes[index];

  editingOriginalNote = note.id ? { ...note } : null;

  document.getElementById("noteName").value = note.name;
  document.getElementById("noteContent").value = note.note;
  document.getElementById("noteFormTitle").innerHTML = '<i class="fas fa-note"></i> Update Note';
  document.getElementById("newNoteForm").classList.remove("slide-hidden");
  document.getElementById("noteList").classList.remove("displayNone");

  pendingNotes.splice(index, 1);
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
  document.getElementById("walletList").classList.remove("displayNone");

  pendingWallets.splice(index, 1);
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
  document.getElementById("totpFormTitle").innerHTML = '<i class="fas fa-key"></i> Update TOTP';
  document.getElementById("newTotpForm").classList.remove("slide-hidden");
  document.getElementById("totpList").classList.remove("displayNone");

  // Remove from pending so it doesn't show twice
  pendingTotps.splice(index, 1);
  updateTotpPendingUI();
}

// ==== editPending Vault 2 ====

function editPendingPin(index) {
  const pin = pendingPins[index];

  editingOriginalPin = pin.id ? { ...pin } : null;

  document.getElementById("pinName").value = pin.name;
  document.getElementById("pinLinkedTo").value = pin.linkedTo;
  document.getElementById("pinValue").value = pin.pin;
  document.getElementById("pinRemarks").value = pin.remarks;

  document.getElementById("pinFormTitle").innerHTML = '<i class="fas fa-key"></i> Update PIN';
  document.getElementById("newPinForm").classList.remove("slide-hidden");
  document.getElementById("pinList").classList.remove("displayNone");

  pendingPins.splice(index, 1);
  updatePinPendingUI();
}

function editPendingBankAccount(index) {
  const bank = pendingBankAccounts[index];

  editingOriginalBank = bank.id ? { ...bank } : null;

  document.getElementById("bankName").value = bank.name;
  document.getElementById("bankAccountNumber").value = bank.accountNumber;
  document.getElementById("bankIban").value = bank.iban;
  document.getElementById("bankSwift").value = bank.swift;
  document.getElementById("bankBankName").value = bank.bankName;
  document.getElementById("bankCountry").value = bank.country;
  document.getElementById("bankRemarks").value = bank.remarks;

  document.getElementById("bankFormTitle").innerHTML = '<i class="fas fa-university"></i> Update Bank Account';
  document.getElementById("newBankForm").classList.remove("slide-hidden");
  document.getElementById("bankList").classList.remove("displayNone");

  pendingBankAccounts.splice(index, 1);
  updateBankAccountPendingUI();
}

function editPendingCreditCard(index) {
  const card = pendingCreditCards[index];

  editingOriginalCard = card.id ? { ...card } : null;

  document.getElementById("cardName").value = card.name;
  document.getElementById("cardNumber").value = card.cardNumber;
  document.getElementById("cardHolder").value = card.cardHolder;
  document.getElementById("cardExpiration").value = card.expiryDate;
  document.getElementById("cardCVV").value = card.cvv;
  document.getElementById("cardLinkedTo").value = card.linkedTo;
  document.getElementById("cardRemarks").value = card.remarks;

  document.getElementById("cardFormTitle").innerHTML = '<i class="fas fa-credit-card"></i> Update Credit Card';
  document.getElementById("newCardForm").classList.remove("slide-hidden");
  document.getElementById("cardList").classList.remove("displayNone");

  pendingCreditCards.splice(index, 1);
  updateCreditCardPendingUI();
}

// ==== editPending Vault 3 ====

function editPendingInsurance(index) {
  const insurance = pendingInsurances[index];

  editingOriginalInsurance = insurance.id ? { ...insurance } : null;

  document.getElementById("insuranceName").value = insurance.name;
  document.getElementById("insuranceProvider").value = insurance.provider;
  document.getElementById("insurancePolicyNumber").value = insurance.policyNumber;
  document.getElementById("insuranceExpiryDate").value = insurance.expiryDate;
  document.getElementById("insuranceLinkedTo").value = insurance.linkedTo;
  document.getElementById("insuranceRemarks").value = insurance.remarks;

  document.getElementById("insuranceFormTitle").innerHTML = '<i class="fas fa-file-medical"></i> Update Insurance';
  document.getElementById("newInsuranceForm").classList.remove("slide-hidden");
  document.getElementById("insuranceList").classList.remove("displayNone");

  pendingInsurances.splice(index, 1);
  updateInsurancePendingUI();
}

function editPendingIdentity(index) {
  const identity = pendingIdentities[index];

  editingOriginalIdentity = identity.id ? { ...identity } : null;

  document.getElementById("identityName").value = identity.name;
  document.getElementById("identityDocumentType").value = identity.documentType;
  document.getElementById("identityDocumentNumber").value = identity.documentNumber;
  document.getElementById("identityCountry").value = identity.country;
  document.getElementById("identityExpiryDate").value = identity.expiryDate;
  document.getElementById("identityRemarks").value = identity.remarks;

  document.getElementById("identityFormTitle").innerHTML = '<i class="fas fa-id-card"></i> Update Identity';
  document.getElementById("newIdentityForm").classList.remove("slide-hidden");
  document.getElementById("identityList").classList.remove("displayNone");

  pendingIdentities.splice(index, 1);
  updateIdentityPendingUI();
}

function editPendingLegalDocument(index) {
  const legal = pendingLegalDocuments[index];

  editingOriginalLegal = legal.id ? { ...legal } : null;

  document.getElementById("legalName").value = legal.name;
  document.getElementById("legalDocumentType").value = legal.documentType;
  document.getElementById("legalStorageLocation").value = legal.storageLocation;
  document.getElementById("legalLinkedTo").value = legal.linkedTo;
  document.getElementById("legalRemarks").value = legal.remarks;

  document.getElementById("legalFormTitle").innerHTML = '<i class="fas fa-file-contract"></i> Update Legal Document';
  document.getElementById("newLegalForm").classList.remove("slide-hidden");
  document.getElementById("legalList").classList.remove("displayNone");

  pendingLegalDocuments.splice(index, 1);
  updateLegalDocumentPendingUI();
}

// ==== editPending Vault 4 ====

function editPendingAsset(index) {
  const asset = pendingAssets[index];

  editingOriginalAsset = asset.id ? { ...asset } : null;

  document.getElementById("assetType").value = asset.assetType;
  document.getElementById("assetOwnershipId").value = asset.ownershipId;
  document.getElementById("assetValueEstimate").value = asset.valueEstimate;
  document.getElementById("assetLinkedTo").value = asset.linkedTo;
  document.getElementById("assetRemarks").value = asset.remarks;

  document.getElementById("assetFormTitle").innerHTML = '<i class="fas fa-building"></i> Update Asset';
  document.getElementById("newAssetForm").classList.remove("slide-hidden");
  document.getElementById("assetList").classList.remove("displayNone");

  pendingAssets.splice(index, 1);
  updateAssetPendingUI();
}

function editPendingContact(index) {
  const contact = pendingContacts[index];

  editingOriginalContact = contact.id ? { ...contact } : null;

  document.getElementById("contactName").value = contact.name;
  document.getElementById("contactRelation").value = contact.relation;
  document.getElementById("contactEmail").value = contact.email;
  document.getElementById("contactPhone").value = contact.phone;
  document.getElementById("contactRemarks").value = contact.remarks;

  document.getElementById("contactFormTitle").innerHTML = '<i class="fas fa-address-book"></i> Update Contact';
  document.getElementById("newContactForm").classList.remove("slide-hidden");
  document.getElementById("contactList").classList.remove("displayNone");

  pendingContacts.splice(index, 1);
  updateContactPendingUI();
}

function editPendingSubscription(index) {
  const subscription = pendingSubscriptions[index];

  editingOriginalSubscription = subscription.id ? { ...subscription } : null;

  document.getElementById("subscriptionServiceName").value = subscription.serviceName;
  document.getElementById("subscriptionBillingAccount").value = subscription.billingAccount;
  document.getElementById("subscriptionFrequency").value = subscription.frequency;
  document.getElementById("subscriptionLinkedTo").value = subscription.linkedTo;
  document.getElementById("subscriptionRemarks").value = subscription.remarks;

  document.getElementById("subscriptionFormTitle").innerHTML = '<i class="fas fa-sync-alt"></i> Update Subscription';
  document.getElementById("newSubscriptionForm").classList.remove("slide-hidden");
  document.getElementById("subscriptionList").classList.remove("displayNone");

  pendingSubscriptions.splice(index, 1);
  updateSubscriptionPendingUI();
}

// ==== deletePending Vault 1 ====

function deletePendingCredential(index) {
  showConfirm("Are you sure you want to discard this pending credential?", () => {
    const removed = pendingCredentials.splice(index, 1)[0];
  
    if (removed._original && removed.id === removed._original.id) {
      renderCredentialItem(removed._original);
    }
  
    updateCredentialPendingUI();
  });
}

function deletePendingNote(index) {
  showConfirmModal("Are you sure you want to discard this pending note?", () => {
    const removed = pendingNotes.splice(index, 1)[0];
  
    if (removed._original && removed.id === removed._original.id) {
      renderNoteItem(removed._original);
    }
  
    updateNotePendingUI();
  }); 
}

function deletePendingWallet(index) {
  showConfirm("Are you sure you want to discard this pending wallet?", () => {
    const removed = pendingWallets.splice(index, 1)[0];
  
    if (removed._original && removed.id === removed._original.id) {
      renderWalletItem(removed._original);
    }
  
    updateWalletPendingUI();
  }); 
}

function deletePendingTotp(index) {
  showConfirm("Are you sure you want to discard this pending TOTP secret?", () => {
    pendingTotps.splice(index, 1);
    updateTotpPendingUI();
  });  
}

// ==== deletePending Vault 2 ====

function deletePendingPin(index) {
  showConfirm("Are you sure you want to discard this pending PIN?", () => {
    pendingPins.splice(index, 1);
    updatePinPendingUI();
  });
}

function deletePendingBankAccount(index) {
  showConfirm("Are you sure you want to discard this pending Bank Account?", () => {
    pendingBankAccounts.splice(index, 1);
    updateBankAccountPendingUI();
  });
}

function deletePendingCreditCard(index) {
  showConfirm("Are you sure you want to discard this pending Credit Card?", () => {
    pendingCreditCards.splice(index, 1);
    updateCreditCardPendingUI();
  });
}

// ==== deletePending Vault 3 ====

function deletePendingInsurance(index) {
  showConfirm("Are you sure you want to discard this pending Insurance?", () => {
    pendingInsurances.splice(index, 1);
    updateInsurancePendingUI();
  });
}

function deletePendingIdentity(index) {
  showConfirm("Are you sure you want to discard this pending Identity?", () => {
    pendingIdentities.splice(index, 1);
    updateIdentityPendingUI();
  });
}

function deletePendingLegalDocument(index) {
  showConfirm("Are you sure you want to discard this pending Legal Document?", () => {
    pendingLegalDocuments.splice(index, 1);
    updateLegalDocumentPendingUI();
  });
}

// ==== deletePending Vault 4 ====

function deletePendingAsset(index) {
  showConfirm("Are you sure you want to discard this pending Asset?", () => {
    pendingAssets.splice(index, 1);
    updateAssetPendingUI();
  });
}

function deletePendingContact(index) {
  showConfirm("Are you sure you want to discard this pending Contact?", () => {
    pendingContacts.splice(index, 1);
    updateContactPendingUI();
  });
}

function deletePendingSubscription(index) {
  showConfirm("Are you sure you want to discard this pending Subscription?", () => {
    pendingSubscriptions.splice(index, 1);
    updateSubscriptionPendingUI();
  });
}

// ==== updatePending Vault 1 ====

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
        <span class="hidden-password">••••••••</span>
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
        <span class="hidden-password">••••••••</span>
        <span class="real-password displayNone">${wallet.privateKey}</span>
        <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      </div>
      <div><strong>Seed Phrase:</strong>
        <span class="hidden-password">••••••••</span>
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

// ==== updatePending Vault 2 ====

function updatePinPendingUI() {
  const pinItems = document.getElementById("pinPendingItems");
  pinItems.innerHTML = "";

  pendingPins.forEach((pin, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-key"></i> ${pin.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Linked To:</strong> ${pin.linkedTo}</div>
      <div><strong>PIN:</strong> ${pin.pin}</div>
      <div><strong>Remarks:</strong> ${pin.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingPin(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingPin(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    pinItems.appendChild(item);

    if (pinItems.lastElementChild) {
      pinItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      pinItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => pinItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#pinReadItems .vault-data-item').length;
  const pendingCount = pendingPins.length;
  document.getElementById("pinCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateBankAccountPendingUI() {
  const bankItems = document.getElementById("bankPendingItems");
  bankItems.innerHTML = "";

  pendingBankAccounts.forEach((bank, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-university"></i> ${bank.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Account Number:</strong> ${bank.accountNumber}</div>
      <div><strong>IBAN:</strong> ${bank.iban}</div>
      <div><strong>SWIFT:</strong> ${bank.swift}</div>
      <div><strong>Bank Name:</strong> ${bank.bankName}</div>
      <div><strong>Country:</strong> ${bank.country}</div>
      <div><strong>Remarks:</strong> ${bank.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingBankAccount(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingBankAccount(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    bankItems.appendChild(item);

    if (bankItems.lastElementChild) {
      bankItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      bankItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => bankItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#bankReadItems .vault-data-item').length;
  const pendingCount = pendingBankAccounts.length;
  document.getElementById("bankCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateCreditCardPendingUI() {
  const cardItems = document.getElementById("cardPendingItems");
  cardItems.innerHTML = "";

  pendingCreditCards.forEach((card, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-credit-card"></i> ${card.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Card Number:</strong> ${card.cardNumber}</div>
      <div><strong>Card Holder:</strong> ${card.cardHolder}</div>
      <div><strong>Expiry Date:</strong> ${card.expiryDate}</div>
      <div><strong>CVV:</strong> ${card.cvv}</div>
      <div><strong>Linked To:</strong> ${card.linkedTo}</div>
      <div><strong>Remarks:</strong> ${card.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingCreditCard(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingCreditCard(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    cardItems.appendChild(item);

    if (cardItems.lastElementChild) {
      cardItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      cardItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => cardItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#cardReadItems .vault-data-item').length;
  const pendingCount = pendingCreditCards.length;
  document.getElementById("cardCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

// ==== updatePending Vault 3 ====

function updateInsurancePendingUI() {
  const insuranceItems = document.getElementById("insurancePendingItems");
  insuranceItems.innerHTML = "";

  pendingInsurances.forEach((insurance, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-file-medical"></i> ${insurance.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Provider:</strong> ${insurance.provider}</div>
      <div><strong>Policy Number:</strong> ${insurance.policyNumber}</div>
      <div><strong>Expiry Date:</strong> ${insurance.expiryDate}</div>
      <div><strong>Linked To:</strong> ${insurance.linkedTo}</div>
      <div><strong>Remarks:</strong> ${insurance.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingInsurance(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingInsurance(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    insuranceItems.appendChild(item);

    if (insuranceItems.lastElementChild) {
      insuranceItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      insuranceItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => insuranceItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#insuranceReadItems .vault-data-item').length;
  const pendingCount = pendingInsurances.length;
  document.getElementById("insuranceCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateIdentityPendingUI() {
  const identityItems = document.getElementById("identityPendingItems");
  identityItems.innerHTML = "";

  pendingIdentities.forEach((identity, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-id-card"></i> ${identity.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Document Type:</strong> ${identity.documentType}</div>
      <div><strong>Document Number:</strong> ${identity.documentNumber}</div>
      <div><strong>Country:</strong> ${identity.country}</div>
      <div><strong>Expiry Date:</strong> ${identity.expiryDate}</div>
      <div><strong>Remarks:</strong> ${identity.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingIdentity(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingIdentity(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    identityItems.appendChild(item);

    if (identityItems.lastElementChild) {
      identityItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      identityItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => identityItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#identityReadItems .vault-data-item').length;
  const pendingCount = pendingIdentities.length;
  document.getElementById("identityCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateLegalDocumentPendingUI() {
  const legalItems = document.getElementById("legalPendingItems");
  legalItems.innerHTML = "";

  pendingLegalDocuments.forEach((legal, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-file-contract"></i> ${legal.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Document Type:</strong> ${legal.documentType}</div>
      <div><strong>Storage Location:</strong> ${legal.storageLocation}</div>
      <div><strong>Linked To:</strong> ${legal.linkedTo}</div>
      <div><strong>Remarks:</strong> ${legal.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingLegalDocument(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingLegalDocument(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    legalItems.appendChild(item);

    if (legalItems.lastElementChild) {
      legalItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      legalItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => legalItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#legalReadItems .vault-data-item').length;
  const pendingCount = pendingLegalDocuments.length;
  document.getElementById("legalCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

// ==== updatePending Vault 4 ====

function updateAssetPendingUI() {
  const assetItems = document.getElementById("assetPendingItems");
  assetItems.innerHTML = "";

  pendingAssets.forEach((asset, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-building"></i> ${asset.assetType} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Ownership ID:</strong> ${asset.ownershipId}</div>
      <div><strong>Value Estimate:</strong> ${asset.valueEstimate}</div>
      <div><strong>Linked To:</strong> ${asset.linkedTo}</div>
      <div><strong>Remarks:</strong> ${asset.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingAsset(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingAsset(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    assetItems.appendChild(item);

    if (assetItems.lastElementChild) {
      assetItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      assetItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => assetItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#assetReadItems .vault-data-item').length;
  const pendingCount = pendingAssets.length;
  document.getElementById("assetCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateContactPendingUI() {
  const contactItems = document.getElementById("contactPendingItems");
  contactItems.innerHTML = "";

  pendingContacts.forEach((contact, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-address-book"></i> ${contact.name} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Relation:</strong> ${contact.relation}</div>
      <div><strong>Email:</strong> ${contact.email}</div>
      <div><strong>Phone:</strong> ${contact.phone}</div>
      <div><strong>Remarks:</strong> ${contact.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingContact(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingContact(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    contactItems.appendChild(item);

    if (contactItems.lastElementChild) {
      contactItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      contactItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => contactItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#contactReadItems .vault-data-item').length;
  const pendingCount = pendingContacts.length;
  document.getElementById("contactCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

function updateSubscriptionPendingUI() {
  const subscriptionItems = document.getElementById("subscriptionPendingItems");
  subscriptionItems.innerHTML = "";

  pendingSubscriptions.forEach((sub, index) => {
    const item = document.createElement("div");
    item.className = "vault-data-item pending-bg";

    const header = document.createElement("div");
    header.className = "data-header";
    header.innerHTML = `<i class="fas fa-sync-alt"></i> ${sub.serviceName} <em class="pending-label">(Pending)</em>`;
    header.onclick = () => detail.classList.toggle("displayNone");

    const detail = document.createElement("div");
    detail.className = "data-details displayNone";
    detail.innerHTML = `
      <div><strong>Billing Account:</strong> ${sub.billingAccount}</div>
      <div><strong>Frequency:</strong> ${sub.frequency}</div>
      <div><strong>Linked To:</strong> ${sub.linkedTo}</div>
      <div><strong>Remarks:</strong> ${sub.remarks}</div>
      <div class="action-icons">
        <button class="icon-btn primary" title="Edit" onclick="editPendingSubscription(${index})"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Delete" onclick="deletePendingSubscription(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    item.appendChild(header);
    item.appendChild(detail);
    subscriptionItems.appendChild(item);

    if (subscriptionItems.lastElementChild) {
      subscriptionItems.lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
      subscriptionItems.lastElementChild.classList.add("pulse-highlight");
      setTimeout(() => subscriptionItems.lastElementChild.classList.remove("pulse-highlight"), 1200);
    }
  });

  const readCount = document.querySelectorAll('#subscriptionReadItems .vault-data-item').length;
  const pendingCount = pendingSubscriptions.length;
  document.getElementById("subscriptionCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;

  updateGlobalSaveButtonVisibility();
}

// ==== updateCountDisplay Vault 1 ====


function updateCredentialCountDisplay() {
  const readCount = document.querySelectorAll('#credentialReadItems .vault-data-item').length;
  const pendingCount = pendingCredentials.length;
  document.getElementById("credCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
      : `${readCount}`;
}

function updateNoteCountDisplay() {
  const readCount = document.querySelectorAll('#noteReadItems .vault-data-item').length;
  const pendingCount = pendingNotes.length;
  document.getElementById("noteCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
      : `${readCount}`;
}

function updateWalletCountDisplay() {
  const readCount = document.querySelectorAll('#walletReadItems .vault-data-item').length;
  const pendingCount = pendingWallets.length;
  document.getElementById("walletCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-count">${pendingCount}</span>`
      : `${readCount}`;
}

function updateTotpCountDisplay() {
  const readCount = document.querySelectorAll('#totpReadItems .vault-data-item').length;
  const pendingCount = pendingTotps.length;

  document.getElementById("totpCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

// ==== updateCountDisplay Vault 2 ====

function updatePinCountDisplay() {
  const readCount = document.querySelectorAll('#pinReadItems .vault-data-item').length;
  const pendingCount = pendingPins.length;

  document.getElementById("pinCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

function updateBankAccountCountDisplay() {
  const readCount = document.querySelectorAll('#bankReadItems .vault-data-item').length;
  const pendingCount = pendingBankAccounts.length;

  document.getElementById("bankCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

function updateCreditCardCountDisplay() {
  const readCount = document.querySelectorAll('#cardReadItems .vault-data-item').length;
  const pendingCount = pendingCreditCards.length;

  document.getElementById("cardCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

// ==== updateCountDisplay Vault 3 ====

function updateInsuranceCountDisplay() {
  const readCount = document.querySelectorAll('#insuranceReadItems .vault-data-item').length;
  const pendingCount = pendingInsurances.length;

  document.getElementById("insuranceCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

function updateIdentityCountDisplay() {
  const readCount = document.querySelectorAll('#identityReadItems .vault-data-item').length;
  const pendingCount = pendingIdentities.length;

  document.getElementById("identityCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

function updateLegalDocumentCountDisplay() {
  const readCount = document.querySelectorAll('#legalReadItems .vault-data-item').length;
  const pendingCount = pendingLegalDocuments.length;

  document.getElementById("legalCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

// ==== updateCountDisplay Vault 4 ====

function updateAssetCountDisplay() {
  const readCount = document.querySelectorAll('#assetReadItems .vault-data-item').length;
  const pendingCount = pendingAssets.length;

  document.getElementById("assetCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

function updateContactCountDisplay() {
  const readCount = document.querySelectorAll('#contactReadItems .vault-data-item').length;
  const pendingCount = pendingContacts.length;

  document.getElementById("contactCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

function updateSubscriptionCountDisplay() {
  const readCount = document.querySelectorAll('#subscriptionReadItems .vault-data-item').length;
  const pendingCount = pendingSubscriptions.length;

  document.getElementById("subscriptionCount").innerHTML =
    pendingCount > 0
      ? `${readCount} + <span class="pending-label">${pendingCount}</span>`
      : `${readCount}`;
}

// ==== Render functions Vault 1 ====

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
      <span class="hidden-password">••••••••</span>
      <span class="real-password displayNone">${cred.password}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Password" onclick="copyToClipboard('${cred.password}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div>
      <strong>Remarks:</strong> ${cred.remarks}
    </div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(cred.timestamp)}</div>
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
  deleteBtn.onclick = () => {
    showConfirm(`Delete credential "${cred.name}"?`, async () => {
      await deleteCredentials([cred.id]);
    });
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
    <div><strong>Last Updated:</strong> ${formatTimestamp(note.timestamp)}</div>
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
  deleteBtn.onclick = () => {
    showConfirm(`Delete note "${note.name}"?`, async () => {
      await deleteNotes([note.id]);
    });
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
      <span class="hidden-password">••••••••</span>
      <span class="real-password displayNone">${wallet.privateKey}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Private Key" onclick="copyToClipboard('${wallet.privateKey}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Seed Phrase:</strong> 
      <span class="hidden-password">••••••••</span>
      <span class="real-password displayNone">${wallet.seedPhrase}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Seed Phrase" onclick="copyToClipboard('${wallet.seedPhrase}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Remarks:</strong> ${wallet.remarks}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(wallet.timestamp)}</div>
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
  deleteBtn.onclick = () => {
    showConfirm(`Delete wallet "${wallet.name}"?`, async () => {
      await deleteWallets([wallet.id]);
    });
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
      <span class="hidden-password">••••••••</span>
      <span class="real-password displayNone">${totp.key}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy Key" onclick="copyToClipboard('${totp.key}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Algorithm:</strong> ${totp.algorithm}</div>
    <div><strong>Interval:</strong> ${totp.interval} sec</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(totp.timestamp)}</div>
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
  deleteBtn.onclick = () => {
    showConfirm(`Delete TOTP "${totp.name}"?`, async () => {
      await deleteTotps([totp.id]);
    });
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

// ==== Render functions Vault 2 ====

function renderPinItem(pin, shouldUpdateUI = true) {
  const container = document.getElementById("pinReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-key"></i> <span class="vault-label-text">${pin.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `pin-${pin.id}`;
  detail.innerHTML = `
    <div>
      <strong>Linked To:</strong> ${pin.linkedTo || "-"}
    </div>
    <div>
      <strong>PIN:</strong>
      <span class="hidden-password">••••••••</span>
      <span class="real-password displayNone">${pin.pin}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy PIN" onclick="copyToClipboard('${pin.pin}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div>
      <strong>Remarks:</strong> ${pin.remarks || "-"}
    </div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(pin.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("pinName").value = pin.name;
    document.getElementById("pinLinkedTo").value = pin.linkedTo;
    document.getElementById("pinValue").value = pin.pin;
    document.getElementById("pinRemarks").value = pin.remarks;
    document.getElementById("newPinForm").classList.remove("slide-hidden");
    document.getElementById("pinReadItems").classList.remove("displayNone");

    editingOriginalPin = { ...pin };
    pendingPins = pendingPins.filter(p => p.id !== pin.id);
    const readCard = document.getElementById(`pin-${pin.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updatePinPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete PIN "${pin.name}"?`, async () => {
      await deletePins([pin.id]);
    });
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

function renderBankAccountItem(bank, shouldUpdateUI = true) {
  const container = document.getElementById("bankReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-university"></i> <span class="vault-label-text">${bank.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `bank-${bank.id}`;
  detail.innerHTML = `
    <div><strong>Account Number:</strong> ${bank.accountNumber || "-"}</div>
    <div><strong>IBAN:</strong> ${bank.iban || "-"}</div>
    <div><strong>SWIFT:</strong> ${bank.swift || "-"}</div>
    <div><strong>Bank Name:</strong> ${bank.bankName || "-"}</div>
    <div><strong>Country:</strong> ${bank.country || "-"}</div>
    <div><strong>Remarks:</strong> ${bank.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(bank.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("bankName").value = bank.name;
    document.getElementById("bankAccountNumber").value = bank.accountNumber;
    document.getElementById("bankIban").value = bank.iban;
    document.getElementById("bankSwift").value = bank.swift;
    document.getElementById("bankBankName").value = bank.bankName;
    document.getElementById("bankCountry").value = bank.country;
    document.getElementById("bankRemarks").value = bank.remarks;
    document.getElementById("newBankForm").classList.remove("slide-hidden");
    document.getElementById("bankReadItems").classList.remove("displayNone");

    editingOriginalBank = { ...bank };
    pendingBankAccounts = pendingBankAccounts.filter(b => b.id !== bank.id);
    const readCard = document.getElementById(`bank-${bank.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateBankAccountPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete bank account "${bank.name}"?`, async () => {
      await deleteBankAccounts([bank.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

function renderCreditCardItem(card, shouldUpdateUI = true) {
  const container = document.getElementById("cardReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-credit-card"></i> <span class="vault-label-text">${card.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `card-${card.id}`;
  detail.innerHTML = `
    <div><strong>Card Number:</strong> ${card.cardNumber || "-"}</div>
    <div><strong>Card Holder:</strong> ${card.cardHolder || "-"}</div>
    <div><strong>Expiry Date:</strong> ${card.expiryDate || "-"}</div>
    <div>
      <strong>CVV:</strong>
      <span class="hidden-password">••••</span>
      <span class="real-password displayNone">${card.cvv}</span>
      <button class="toggle-password icon-btn eye" title="Show/Hide"><i class="fas fa-eye"></i></button>
      <button class="icon-btn" title="Copy CVV" onclick="copyToClipboard('${card.cvv}')">
        <i class="fas fa-copy white"></i>
      </button>
    </div>
    <div><strong>Linked To:</strong> ${card.linkedTo || "-"}</div>
    <div><strong>Remarks:</strong> ${card.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(card.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("cardName").value = card.name;
    document.getElementById("cardNumber").value = card.cardNumber;
    document.getElementById("cardHolder").value = card.cardHolder;
    document.getElementById("cardExpiration").value = card.expiryDate;
    document.getElementById("cardCVV").value = card.cvv;
    document.getElementById("cardLinkedTo").value = card.linkedTo;
    document.getElementById("cardRemarks").value = card.remarks;
    document.getElementById("newCardForm").classList.remove("slide-hidden");
    document.getElementById("cardReadItems").classList.remove("displayNone");

    editingOriginalCard = { ...card };
    pendingCreditCards = pendingCreditCards.filter(c => c.id !== card.id);
    const readCard = document.getElementById(`card-${card.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateCreditCardPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete credit card "${card.name}"?`, async () => {
      await deleteCreditCards([card.id]);
    });
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

// ==== Render functions Vault 3 ====

function renderInsuranceItem(insurance, shouldUpdateUI = true) {
  const container = document.getElementById("insuranceReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-file-medical"></i> <span class="vault-label-text">${insurance.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `insurance-${insurance.id}`;
  detail.innerHTML = `
    <div><strong>Provider:</strong> ${insurance.provider || "-"}</div>
    <div><strong>Policy Number:</strong> ${insurance.policyNumber || "-"}</div>
    <div><strong>Expiry Date:</strong> ${insurance.expiryDate || "-"}</div>
    <div><strong>Linked To:</strong> ${insurance.linkedTo || "-"}</div>
    <div><strong>Remarks:</strong> ${insurance.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(insurance.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("insuranceName").value = insurance.name;
    document.getElementById("insuranceProvider").value = insurance.provider;
    document.getElementById("insurancePolicyNumber").value = insurance.policyNumber;
    document.getElementById("insuranceExpiryDate").value = insurance.expiryDate;
    document.getElementById("insuranceLinkedTo").value = insurance.linkedTo;
    document.getElementById("insuranceRemarks").value = insurance.remarks;
    document.getElementById("newInsuranceForm").classList.remove("slide-hidden");
    document.getElementById("insuranceReadItems").classList.remove("displayNone");

    editingOriginalInsurance = { ...insurance };
    pendingInsurances = pendingInsurances.filter(i => i.id !== insurance.id);
    const readCard = document.getElementById(`insurance-${insurance.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateInsurancePendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete insurance "${insurance.name}"?`, async () => {
      await deleteInsurances([insurance.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

function renderIdentityItem(identity, shouldUpdateUI = true) {
  const container = document.getElementById("identityReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-id-card"></i> <span class="vault-label-text">${identity.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `identity-${identity.id}`;
  detail.innerHTML = `
    <div><strong>Document Type:</strong> ${identity.documentType || "-"}</div>
    <div><strong>Document Number:</strong> ${identity.documentNumber || "-"}</div>
    <div><strong>Country:</strong> ${identity.country || "-"}</div>
    <div><strong>Expiry Date:</strong> ${identity.expiryDate || "-"}</div>
    <div><strong>Remarks:</strong> ${identity.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(identity.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("identityName").value = identity.name;
    document.getElementById("identityDocumentType").value = identity.documentType;
    document.getElementById("identityDocumentNumber").value = identity.documentNumber;
    document.getElementById("identityCountry").value = identity.country;
    document.getElementById("identityExpiryDate").value = identity.expiryDate;
    document.getElementById("identityRemarks").value = identity.remarks;
    document.getElementById("newIdentityForm").classList.remove("slide-hidden");
    document.getElementById("identityReadItems").classList.remove("displayNone");

    editingOriginalIdentity = { ...identity };
    pendingIdentities = pendingIdentities.filter(i => i.id !== identity.id);
    const readCard = document.getElementById(`identity-${identity.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateIdentityPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete identity "${identity.name}"?`, async () => {
      await deleteIdentities([identity.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

function renderLegalDocumentItem(legal, shouldUpdateUI = true) {
  const container = document.getElementById("legalReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-file-contract"></i> <span class="vault-label-text">${legal.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `legal-${legal.id}`;
  detail.innerHTML = `
    <div><strong>Document Type:</strong> ${legal.documentType || "-"}</div>
    <div><strong>Storage Location:</strong> ${legal.storageLocation || "-"}</div>
    <div><strong>Linked To:</strong> ${legal.linkedTo || "-"}</div>
    <div><strong>Remarks:</strong> ${legal.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(legal.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("legalName").value = legal.name;
    document.getElementById("legalDocumentType").value = legal.documentType;
    document.getElementById("legalStorageLocation").value = legal.storageLocation;
    document.getElementById("legalLinkedTo").value = legal.linkedTo;
    document.getElementById("legalRemarks").value = legal.remarks;
    document.getElementById("newLegalForm").classList.remove("slide-hidden");
    document.getElementById("legalReadItems").classList.remove("displayNone");

    editingOriginalLegal = { ...legal };
    pendingLegalDocuments = pendingLegalDocuments.filter(l => l.id !== legal.id);
    const readCard = document.getElementById(`legal-${legal.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateLegalDocumentPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete legal document "${legal.name}"?`, async () => {
      await deleteLegalDocuments([legal.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

// ==== Render functions Vault 4 ====

function renderAssetItem(asset, shouldUpdateUI = true) {
  const container = document.getElementById("assetReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-building"></i> <span class="vault-label-text">${asset.assetType}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `asset-${asset.id}`;
  detail.innerHTML = `
    <div><strong>Ownership ID:</strong> ${asset.ownershipId || "-"}</div>
    <div><strong>Value Estimate:</strong> ${asset.valueEstimate || "-"}</div>
    <div><strong>Linked To:</strong> ${asset.linkedTo || "-"}</div>
    <div><strong>Remarks:</strong> ${asset.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(asset.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("assetType").value = asset.assetType;
    document.getElementById("assetOwnershipId").value = asset.ownershipId;
    document.getElementById("assetValueEstimate").value = asset.valueEstimate;
    document.getElementById("assetLinkedTo").value = asset.linkedTo;
    document.getElementById("assetRemarks").value = asset.remarks;
    document.getElementById("newAssetForm").classList.remove("slide-hidden");
    document.getElementById("assetReadItems").classList.remove("displayNone");

    editingOriginalAsset = { ...asset };
    pendingAssets = pendingAssets.filter(a => a.id !== asset.id);
    const readCard = document.getElementById(`asset-${asset.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateAssetPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete asset "${asset.assetType}"?`, async () => {
      await deleteAssets([asset.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

function renderContactItem(contact, shouldUpdateUI = true) {
  const container = document.getElementById("contactReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-address-book"></i> <span class="vault-label-text">${contact.name}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `contact-${contact.id}`;
  detail.innerHTML = `
    <div><strong>Relation:</strong> ${contact.relation || "-"}</div>
    <div><strong>Email:</strong> ${contact.email || "-"}</div>
    <div><strong>Phone:</strong> ${contact.phone || "-"}</div>
    <div><strong>Remarks:</strong> ${contact.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(contact.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("contactName").value = contact.name;
    document.getElementById("contactRelation").value = contact.relation;
    document.getElementById("contactEmail").value = contact.email;
    document.getElementById("contactPhone").value = contact.phone;
    document.getElementById("contactRemarks").value = contact.remarks;
    document.getElementById("newContactForm").classList.remove("slide-hidden");
    document.getElementById("contactReadItems").classList.remove("displayNone");

    editingOriginalContact = { ...contact };
    pendingContacts = pendingContacts.filter(c => c.id !== contact.id);
    const readCard = document.getElementById(`contact-${contact.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateContactPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete contact "${contact.name}"?`, async () => {
      await deleteContacts([contact.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

function renderSubscriptionItem(subscription, shouldUpdateUI = true) {
  const container = document.getElementById("subscriptionReadItems");
  const item = document.createElement("div");
  item.className = "vault-data-item";

  const header = document.createElement("div");
  header.className = "data-header";
  header.innerHTML = `<i class="fas fa-sync-alt"></i> <span class="vault-label-text">${subscription.serviceName}</span>`;
  header.onclick = () => detail.classList.toggle("displayNone");

  const detail = document.createElement("div");
  detail.className = "data-details displayNone";
  detail.id = `subscription-${subscription.id}`;
  detail.innerHTML = `
    <div><strong>Billing Account:</strong> ${subscription.billingAccount || "-"}</div>
    <div><strong>Frequency:</strong> ${subscription.frequency || "-"}</div>
    <div><strong>Linked To:</strong> ${subscription.linkedTo || "-"}</div>
    <div><strong>Remarks:</strong> ${subscription.remarks || "-"}</div>
    <div><strong>Last Updated:</strong> ${formatTimestamp(subscription.timestamp)}</div>
  `;

  const actionBar = document.createElement("div");
  actionBar.className = "action-icons";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn primary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    document.getElementById("subscriptionServiceName").value = subscription.serviceName;
    document.getElementById("subscriptionBillingAccount").value = subscription.billingAccount;
    document.getElementById("subscriptionFrequency").value = subscription.frequency;
    document.getElementById("subscriptionLinkedTo").value = subscription.linkedTo;
    document.getElementById("subscriptionRemarks").value = subscription.remarks;
    document.getElementById("newSubscriptionForm").classList.remove("slide-hidden");
    document.getElementById("subscriptionReadItems").classList.remove("displayNone");

    editingOriginalSubscription = { ...subscription };
    pendingSubscriptions = pendingSubscriptions.filter(s => s.id !== subscription.id);
    const readCard = document.getElementById(`subscription-${subscription.id}`)?.parentElement;
    if (readCard) container.removeChild(readCard);
    if (shouldUpdateUI) {
      updateSubscriptionPendingUI();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    showConfirm(`Delete subscription "${subscription.serviceName}"?`, async () => {
      await deleteSubscriptions([subscription.id]);
    });
  };

  actionBar.appendChild(editBtn);
  actionBar.appendChild(deleteBtn);
  detail.appendChild(actionBar);

  item.appendChild(header);
  item.appendChild(detail);
  container.appendChild(item);
}

// ==== Data write to blockchain ====

async function estimateSaveAllFees() {
  showSpinner("Estimating...");
  if (newVault) {
    showPasswordModal(async (pw) => {
      sessionPassword = pw;
      await deriveWalletKey();
      newVault = false;
      await estimateSaveAllFees();
    });
    return;
  }
  if (!sessionPassword || !userVaults[0] || !userVaults[0].startsWith("0x")) {
    showAlert("Vault is not unlocked or connected.", "info");
    return;
  }

  const signer = provider.getSigner();
  let totalGas = ethers.BigNumber.from(0);
  let results = [];

  try {
    for (let vaultIndex = 0; vaultIndex <= 3; vaultIndex++) {
      const abi = vaultIndex === 0 ? vault1Abi : vaultIndex === 1 ? vault2Abi : vaultIndex === 2 ? vault3Abi : vault4Abi;
      const vault = new ethers.Contract(userVaults[vaultIndex], abi, signer);

      if (vaultIndex === 0) {
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
          const gas = await vault.estimateGas.upsertCredentials(creds, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Credentials", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingNotes.length > 0) {
          const notes = [];
          for (const n of pendingNotes) {
            notes.push({
              id: n.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: n.name })),
              note: JSON.stringify(await encryptWithPassword(sessionPassword, { note: n.note }))
            });
          }
          const gas = await vault.estimateGas.upsertNotes(notes, { value: ethers.utils.parseEther(cachedCosts.upsert) });
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
          const gas = await vault.estimateGas.upsertWalletAddress(wallets, { value: ethers.utils.parseEther(cachedCosts.upsert) });
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
          const gas = await vault.estimateGas.upsertTOTP(totps, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "TOTP", gas });
          totalGas = totalGas.add(gas);
        }
      }

      if (vaultIndex === 1) {
        if (pendingPins.length > 0) {
          const pins = [];
          for (const p of pendingPins) {
            pins.push({
              id: p.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: p.name })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: p.linkedTo })),
              pin: JSON.stringify(await encryptWithPassword(sessionPassword, { pin: p.pin })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: p.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertPins(pins, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "PINs", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingBankAccounts.length > 0) {
          const banks = [];
          for (const b of pendingBankAccounts) {
            banks.push({
              id: b.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: b.name })),
              accountNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { accountNumber: b.accountNumber })),
              iban: JSON.stringify(await encryptWithPassword(sessionPassword, { iban: b.iban })),
              swift: JSON.stringify(await encryptWithPassword(sessionPassword, { swift: b.swift })),
              bankName: JSON.stringify(await encryptWithPassword(sessionPassword, { bankName: b.bankName })),
              country: JSON.stringify(await encryptWithPassword(sessionPassword, { country: b.country })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: b.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertBankAccounts(banks, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Bank Accounts", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingCreditCards.length > 0) {
          const cards = [];
          for (const c of pendingCreditCards) {
            cards.push({
              id: c.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: c.name })),
              cardNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { cardNumber: c.cardNumber })),
              cardHolder: JSON.stringify(await encryptWithPassword(sessionPassword, { cardHolder: c.cardHolder })),
              expiryDate: JSON.stringify(await encryptWithPassword(sessionPassword, { expiryDate: c.expiryDate })),
              cvv: JSON.stringify(await encryptWithPassword(sessionPassword, { cvv: c.cvv })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: c.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: c.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertCreditCards(cards, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Credit Cards", gas });
          totalGas = totalGas.add(gas);
        }
      }

      if (vaultIndex === 2) {
        if (pendingInsurances.length > 0) {
          const items = [];
          for (const i of pendingInsurances) {
            items.push({
              id: i.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: i.name })),
              provider: JSON.stringify(await encryptWithPassword(sessionPassword, { provider: i.provider })),
              policyNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { policyNumber: i.policyNumber })),
              expiryDate: JSON.stringify(await encryptWithPassword(sessionPassword, { expiryDate: i.expiryDate })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: i.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: i.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertInsurances(items, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Insurances", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingIdentities.length > 0) {
          const items = [];
          for (const i of pendingIdentities) {
            items.push({
              id: i.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: i.name })),
              documentType: JSON.stringify(await encryptWithPassword(sessionPassword, { documentType: i.documentType })),
              documentNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { documentNumber: i.documentNumber })),
              country: JSON.stringify(await encryptWithPassword(sessionPassword, { country: i.country })),
              expiryDate: JSON.stringify(await encryptWithPassword(sessionPassword, { expiryDate: i.expiryDate })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: i.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertIdentities(items, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Identities", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingLegalDocuments.length > 0) {
          const items = [];
          for (const l of pendingLegalDocuments) {
            items.push({
              id: l.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: l.name })),
              documentType: JSON.stringify(await encryptWithPassword(sessionPassword, { documentType: l.documentType })),
              storageLocation: JSON.stringify(await encryptWithPassword(sessionPassword, { storageLocation: l.storageLocation })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: l.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: l.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertLegalDocuments(items, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Legal Documents", gas });
          totalGas = totalGas.add(gas);
        }
      }

      if (vaultIndex === 3) {
        if (pendingAssets.length > 0) {
          const items = [];
          for (const a of pendingAssets) {
            items.push({
              id: a.id || 0,
              assetType: JSON.stringify(await encryptWithPassword(sessionPassword, { assetType: a.assetType })),
              ownershipId: JSON.stringify(await encryptWithPassword(sessionPassword, { ownershipId: a.ownershipId })),
              valueEstimate: JSON.stringify(await encryptWithPassword(sessionPassword, { valueEstimate: a.valueEstimate })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: a.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: a.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertAssets(items, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Assets", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingContacts.length > 0) {
          const items = [];
          for (const c of pendingContacts) {
            items.push({
              id: c.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: c.name })),
              relation: JSON.stringify(await encryptWithPassword(sessionPassword, { relation: c.relation })),
              email: JSON.stringify(await encryptWithPassword(sessionPassword, { email: c.email })),
              phone: JSON.stringify(await encryptWithPassword(sessionPassword, { phone: c.phone })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: c.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertContacts(items, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Contacts", gas });
          totalGas = totalGas.add(gas);
        }

        if (pendingSubscriptions.length > 0) {
          const items = [];
          for (const s of pendingSubscriptions) {
            items.push({
              id: s.id || 0,
              serviceName: JSON.stringify(await encryptWithPassword(sessionPassword, { serviceName: s.serviceName })),
              billingAccount: JSON.stringify(await encryptWithPassword(sessionPassword, { billingAccount: s.billingAccount })),
              frequency: JSON.stringify(await encryptWithPassword(sessionPassword, { frequency: s.frequency })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: s.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: s.remarks }))
            });
          }
          const gas = await vault.estimateGas.upsertSubscriptions(items, { value: ethers.utils.parseEther(cachedCosts.upsert) });
          results.push({ type: "Subscriptions", gas });
          totalGas = totalGas.add(gas);
        }
      }
    }

    const gasPrice = await provider.getGasPrice();
    const upsertCost = ethers.utils.parseEther(cachedCosts.upsert);

    const totalFee = ethers.utils.formatEther(totalGas.mul(gasPrice).add(upsertCost.mul(results.length)));

    let summary = `Estimated gas fees:<br>`;
    for (const r of results) {
      const feeWithoutUpsert = r.gas.mul(gasPrice);
      const feeWithUpsert = feeWithoutUpsert.add(upsertCost);
      const fee = ethers.utils.formatEther(feeWithUpsert);

      summary += `- ${r.type}: ~${parseFloat(fee).toFixed(2)} CRO<br>`;
    }
    summary += `Total estimated fee: ~${parseFloat(totalFee).toFixed(2)} CRO`;


    showAlert(summary, "info");
  } catch (err) {
    showAlert("Failed to estimate gas: " + err.message, "error");
  } finally {
    hideSpinner();
  }
}

async function saveAllPendingItems() {
  if (idleListening) {
    clearTimeout(idleTimeout);
    idleListening = false;
  }
  if (!sessionPassword) {
    showPasswordModal(async (pw) => {
      sessionPassword = pw;
      await deriveWalletKey();
      await saveAllPendingItems();
    });
    return;
  }

  const signer = provider.getSigner();
  let overallFailureMessages = [];

  try {
    let credentialsFailed   = null;
    let notesFailed         = null;
    let walletsFailed       = null;
    let totpsFailed         = null;
    let pinsFailed          = null;
    let banksFailed         = null;
    let cardsFailed         = null;
    let insurancesFailed    = null;
    let identitiesFailed    = null;
    let legalDocsFailed     = null;
    let assetsFailed        = null;
    let contactsFailed      = null;
    let subscriptionsFailed = null;

    for (let vaultIndex = 0; vaultIndex <= 3; vaultIndex++) {
      const abi = vaultIndex === 0 ? vault1Abi : vaultIndex === 1 ? vault2Abi : vaultIndex === 2 ? vault3Abi : vault4Abi;
      const vault = new ethers.Contract(userVaults[vaultIndex], abi, signer);

      let failureMessages = [];
      if (vaultIndex === 0) {
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
          showSpinner("Saving credential(s)...");
          try {
            const tx = await vault.upsertCredentials(creds, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            credentialsFailed = false;
          } catch {
            credentialsFailed = true;
          } finally {
            hideSpinner();
          }
        }

        if (pendingNotes.length > 0) {
          const notes = [];
          for (const n of pendingNotes) {
            notes.push({
              id: n.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: n.name })),
              note: JSON.stringify(await encryptWithPassword(sessionPassword, { note: n.note }))
            });
          }
          showSpinner("Saving note(s)...");
          try {
            const tx = await vault.upsertNotes(notes, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            notesFailed = false;
          } catch {
            notesFailed = true;
          } finally {
            hideSpinner();
          }
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
          showSpinner("Saving wallet(s)...");
          try {
            const tx = await vault.upsertWalletAddress(wallets, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            walletsFailed = false;
          } catch {
            walletsFailed = true;
          } finally {
            hideSpinner();
          }
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
          showSpinner("Saving TOTP(s)...");
          try {
            const tx = await vault.upsertTOTP(totps, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            totpsFailed = false;
          } catch {
            totpsFailed = true;
          } finally {
            hideSpinner();
          }
        }

        if (credentialsFailed) failureMessages.push("Saving credentials failed."); else pendingCredentials = [];
        if (notesFailed)       failureMessages.push("Saving notes failed.");       else pendingNotes = [];
        if (walletsFailed)     failureMessages.push("Saving wallets failed.");     else pendingWallets = [];
        if (totpsFailed)       failureMessages.push("Saving TOTPs failed.");       else pendingTotps = [];

        if (!credentialsFailed) updateCredentialPendingUI();
        if (!notesFailed)       updateNotePendingUI();
        if (!walletsFailed)     updateWalletPendingUI();
        if (!totpsFailed)       updateTotpPendingUI();
      }

      if (vaultIndex === 1) {     
        if (pendingPins.length > 0) {
          const pins = [];
          for (const p of pendingPins) {
            pins.push({
              id: p.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: p.name })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: p.linkedTo })),
              pin: JSON.stringify(await encryptWithPassword(sessionPassword, { pin: p.pin })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: p.remarks }))
            });
          }
          showSpinner("Saving PIN(s)...");
          try {
            const tx = await vault.upsertPins(pins, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            pinsFailed = false;
          } catch {
            pinsFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pendingBankAccounts.length > 0) {
          const banks = [];
          for (const b of pendingBankAccounts) {
            banks.push({
              id: b.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: b.name })),
              accountNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { accountNumber: b.accountNumber })),
              iban: JSON.stringify(await encryptWithPassword(sessionPassword, { iban: b.iban })),
              swift: JSON.stringify(await encryptWithPassword(sessionPassword, { swift: b.swift })),
              bankName: JSON.stringify(await encryptWithPassword(sessionPassword, { bankName: b.bankName })),
              country: JSON.stringify(await encryptWithPassword(sessionPassword, { country: b.country })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: b.remarks }))
            });
          }
          showSpinner("Saving Bank Account(s)...");
          try {
            const tx = await vault.upsertBankAccounts(banks, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            banksFailed = false;
          } catch {
            banksFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pendingCreditCards.length > 0) {
          const cards = [];
          for (const c of pendingCreditCards) {
            cards.push({
              id: c.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: c.name })),
              cardNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { cardNumber: c.cardNumber })),
              cardHolder: JSON.stringify(await encryptWithPassword(sessionPassword, { cardHolder: c.cardHolder })),
              expiryDate: JSON.stringify(await encryptWithPassword(sessionPassword, { expiryDate: c.expiryDate })),
              cvv: JSON.stringify(await encryptWithPassword(sessionPassword, { cvv: c.cvv })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: c.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: c.remarks }))
            });
          }
          showSpinner("Saving Credit Card(s)...");
          try {
            const tx = await vault.upsertCreditCards(cards, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            cardsFailed = false;
          } catch {
            cardsFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pinsFailed)  failureMessages.push("Saving PINs failed."); else pendingPins = [];
        if (banksFailed) failureMessages.push("Saving Bank Accounts failed."); else pendingBankAccounts = [];
        if (cardsFailed) failureMessages.push("Saving Credit Cards failed."); else pendingCreditCards = [];
      
        if (!pinsFailed)  updatePinPendingUI();
        if (!banksFailed) updateBankAccountPendingUI();
        if (!cardsFailed) updateCreditCardPendingUI();
      }
      
      if (vaultIndex === 2) {
        if (pendingInsurances.length > 0) {
          const items = [];
          for (const i of pendingInsurances) {
            items.push({
              id: i.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: i.name })),
              provider: JSON.stringify(await encryptWithPassword(sessionPassword, { provider: i.provider })),
              policyNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { policyNumber: i.policyNumber })),
              expiryDate: JSON.stringify(await encryptWithPassword(sessionPassword, { expiryDate: i.expiryDate })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: i.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: i.remarks }))
            });
          }
          showSpinner("Saving Insurance(s)...");
          try {
            const tx = await vault.upsertInsurances(items, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            insurancesFailed = false;
          } catch {
            insurancesFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pendingIdentities.length > 0) {
          const items = [];
          for (const i of pendingIdentities) {
            items.push({
              id: i.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: i.name })),
              documentType: JSON.stringify(await encryptWithPassword(sessionPassword, { documentType: i.documentType })),
              documentNumber: JSON.stringify(await encryptWithPassword(sessionPassword, { documentNumber: i.documentNumber })),
              country: JSON.stringify(await encryptWithPassword(sessionPassword, { country: i.country })),
              expiryDate: JSON.stringify(await encryptWithPassword(sessionPassword, { expiryDate: i.expiryDate })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: i.remarks }))
            });
          }
          showSpinner("Saving Identity Document(s)...");
          try {
            const tx = await vault.upsertIdentities(items, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            identitiesFailed = false;
          } catch {
            identitiesFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pendingLegalDocuments.length > 0) {
          const items = [];
          for (const l of pendingLegalDocuments) {
            items.push({
              id: l.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: l.name })),
              documentType: JSON.stringify(await encryptWithPassword(sessionPassword, { documentType: l.documentType })),
              storageLocation: JSON.stringify(await encryptWithPassword(sessionPassword, { storageLocation: l.storageLocation })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: l.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: l.remarks }))
            });
          }
          showSpinner("Saving Legal Document(s)...");
          try {
            const tx = await vault.upsertLegalDocuments(items, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            legalDocsFailed = false;
          } catch {
            legalDocsFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (insurancesFailed) failureMessages.push("Saving Insurances failed."); else pendingInsurances = [];
        if (identitiesFailed) failureMessages.push("Saving Identities failed."); else pendingIdentities = [];
        if (legalDocsFailed) failureMessages.push("Saving Legal Documents failed."); else pendingLegalDocuments = [];
      
        if (!insurancesFailed) updateInsurancePendingUI();
        if (!identitiesFailed) updateIdentityPendingUI();
        if (!legalDocsFailed) updateLegalDocumentPendingUI();
      }
      
      if (vaultIndex === 3) {
        if (pendingAssets.length > 0) {
          const items = [];
          for (const a of pendingAssets) {
            items.push({
              id: a.id || 0,
              assetType: JSON.stringify(await encryptWithPassword(sessionPassword, { assetType: a.assetType })),
              ownershipId: JSON.stringify(await encryptWithPassword(sessionPassword, { ownershipId: a.ownershipId })),
              valueEstimate: JSON.stringify(await encryptWithPassword(sessionPassword, { valueEstimate: a.valueEstimate })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: a.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: a.remarks }))
            });
          }
          showSpinner("Saving Asset(s)...");
          try {
            const tx = await vault.upsertAssets(items, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            assetsFailed = false;
          } catch {
            assetsFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pendingContacts.length > 0) {
          const items = [];
          for (const c of pendingContacts) {
            items.push({
              id: c.id || 0,
              name: JSON.stringify(await encryptWithPassword(sessionPassword, { name: c.name })),
              relation: JSON.stringify(await encryptWithPassword(sessionPassword, { relation: c.relation })),
              email: JSON.stringify(await encryptWithPassword(sessionPassword, { email: c.email })),
              phone: JSON.stringify(await encryptWithPassword(sessionPassword, { phone: c.phone })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: c.remarks }))
            });
          }
          showSpinner("Saving Contact(s)...");
          try {
            const tx = await vault.upsertContacts(items, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            contactsFailed = false;
          } catch {
            contactsFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (pendingSubscriptions.length > 0) {
          const items = [];
          for (const s of pendingSubscriptions) {
            items.push({
              id: s.id || 0,
              serviceName: JSON.stringify(await encryptWithPassword(sessionPassword, { serviceName: s.serviceName })),
              billingAccount: JSON.stringify(await encryptWithPassword(sessionPassword, { billingAccount: s.billingAccount })),
              frequency: JSON.stringify(await encryptWithPassword(sessionPassword, { frequency: s.frequency })),
              linkedTo: JSON.stringify(await encryptWithPassword(sessionPassword, { linkedTo: s.linkedTo })),
              remarks: JSON.stringify(await encryptWithPassword(sessionPassword, { remarks: s.remarks }))
            });
          }
          showSpinner("Saving Subscription(s)...");
          try {
            const tx = await vault.upsertSubscriptions(items, {
              value: ethers.utils.parseEther(cachedCosts.upsert),
              gasLimit: 5_000_000
            });
            await waitForTxWithTimeout(tx, 15000);
            newVault = false;
            subscriptionsFailed = false;
          } catch {
            subscriptionsFailed = true;
          } finally {
            hideSpinner();
          }
        }
      
        if (assetsFailed) failureMessages.push("Saving Assets failed."); else pendingAssets = [];
        if (contactsFailed) failureMessages.push("Saving Contacts failed."); else pendingContacts = [];
        if (subscriptionsFailed) failureMessages.push("Saving Subscriptions failed."); else pendingSubscriptions = [];
      
        if (!assetsFailed) updateAssetPendingUI();
        if (!contactsFailed) updateContactPendingUI();
        if (!subscriptionsFailed) updateSubscriptionPendingUI();
      }
      
      if (failureMessages.length) {
          overallFailureMessages = overallFailureMessages.concat(failureMessages);
      }
    }
  
    const anythingSucceeded =
      credentialsFailed   === false ||
      notesFailed         === false ||
      walletsFailed       === false ||
      totpsFailed         === false ||
      pinsFailed          === false ||
      banksFailed         === false ||
      cardsFailed         === false ||
      insurancesFailed    === false ||
      identitiesFailed    === false ||
      legalDocsFailed     === false ||
      assetsFailed        === false ||
      contactsFailed      === false ||
      subscriptionsFailed === false;

      let alertMessage = "";

      if (anythingSucceeded) {
        alertMessage = "All pending data saved!";
        if (overallFailureMessages.length) {
          alertMessage += "<br><br>However, the following failed:<br>" + overallFailureMessages.join("<br>");
        }
      } else {
        alertMessage = "Saving failed for all pending items.<br><br>Details:<br>" + overallFailureMessages.join("<br>");
      }
      
      showAlert(alertMessage, "info");
      

    // Immediately update UI to remove yellow pending items before redraw
    if (!credentialsFailed)   updateCredentialPendingUI();
    if (!notesFailed)         updateNotePendingUI();
    if (!walletsFailed)       updateWalletPendingUI();
    if (!totpsFailed)         updateTotpPendingUI();
    if (!pinsFailed)          updatePinPendingUI();
    if (!banksFailed)         updateBankAccountPendingUI();
    if (!cardsFailed)         updateCreditCardPendingUI();
    if (!insurancesFailed)    updateInsurancePendingUI();
    if (!identitiesFailed)    updateIdentityPendingUI();
    if (!legalDocsFailed)     updateLegalDocumentPendingUI();
    if (!assetsFailed)        updateAssetPendingUI();
    if (!contactsFailed)      updateContactPendingUI();
    if (!subscriptionsFailed) updateSubscriptionPendingUI();

    updateGlobalSaveButtonVisibility();
    updateBalanceDisplay();

    // Now reload sections from blockchain only if saving succeeded
    if (!credentialsFailed)   await loadAndShowCredentials();
    if (!notesFailed)         await loadAndShowNotes();
    if (!walletsFailed)       await loadAndShowWallets();
    if (!totpsFailed)         await loadAndShowTotps();
    if (!pinsFailed)          await loadAndShowPins();
    if (!banksFailed)         await loadAndShowBankAccounts();
    if (!cardsFailed)         await loadAndShowCreditCards();
    if (!insurancesFailed)    await loadAndShowInsurances();
    if (!identitiesFailed)    await loadAndShowIdentities();
    if (!legalDocsFailed)     await loadAndShowLegalDocuments();
    if (!assetsFailed)        await loadAndShowAssets();
    if (!contactsFailed)      await loadAndShowContacts();
    if (!subscriptionsFailed) await loadAndShowSubscriptions();

  } catch (err) {
    showAlert("Saving failed: " + err.message, "error");
  } finally {
    startIdleMonitor();
  }
}
  
// ==== IDLE TIMEOUT HANDLING ====

function resetIdleTimer() {
  if (!idleListening) return;

  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(handleIdleTimeout, idleLimitMs);
}

function handleIdleTimeout(timeout = true) {
  // Reset session
  sessionPassword = null;
  sessionPasswordOk = false;
  walletDerivedKey = null;

  // Hide vault section
  const vaultSection = document.getElementById("vaultDataSection");
  if (vaultSection) vaultSection.classList.add("displayNone");
  const balanceEl = document.getElementById("balance");
  balanceEl.textContent = "";
  // Show retry sign button
  showUnlockButton();

  // Stop the idle system until reinitialized
  idleListening = false;
  clearTimeout(idleTimeout);
  if (timeout) {
    // 🔥 Force rendering first, then alert
    requestAnimationFrame(() => {
      setTimeout(() => {
        showAlert("You were inactive for 2½ minutes. Vault access has been reset for your security.", "info");
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

  await getFactoryAddress();
  await fetchVaultCount();    // ✅ Always fetch vault count
  await getVaultUpsertCost(); // ✅ Always fetch cost info
  // ⛔ Skip the rest for index page
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith("/") || path.endsWith("/index") || path.endsWith("/index.html")) return;

  const Web3ModalConstructor = window.Web3Modal && (window.Web3Modal.default || window.Web3Modal);
  if (!Web3ModalConstructor) {
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
  document.getElementById("connectWalletBtn").addEventListener("click", async () => {
    if (walletAddress) {
      // Already connected: go to CronoScan
      const url = `https://cronoscan.com/address/${walletAddress}`;
      window.open(url, '_blank');
    } else {
      // Not connected: trigger wallet connect
      await connectWallet();
    }
  });
  document.getElementById("createVaultBtn").addEventListener("click", createNewVault);

  document.getElementById("unlockBtn")?.addEventListener("click", () => {
    showLockButton();
    updateBalanceDisplay();
    unlockAndLoadAllSections();
  });

  document.getElementById("lockBtn")?.addEventListener("click", () => {
    handleIdleTimeout(false);
  });

  document.getElementById("estimateSaveBtn")?.addEventListener("click", estimateSaveAllFees);
  document.getElementById("stickySaveBtn")?.addEventListener("click", saveAllPendingItems);
  document.getElementById("stickyEstimateBtn")?.addEventListener("click", estimateSaveAllFees);
  document.getElementById("globalSaveAllBtn")?.addEventListener("click", saveAllPendingItems);

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
            // ==== Vault 1 ====
            case "credentialSection":
              hasUnsaved = hasUnsavedForm(["credName", "credUsername", "credPassword", "credRemarks"]);
              clearFunc = () => clearForm(["credName", "credUsername", "credPassword", "credRemarks"]);
              title = "credential";
              break;
            case "noteSection":
              hasUnsaved = hasUnsavedForm(["noteName", "noteContent"]);
              clearFunc = () => clearForm(["noteName", "noteContent"]);
              title = "note";
              break;
            case "walletSection":
              hasUnsaved = hasUnsavedForm(["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"]);
              clearFunc = () => clearForm(["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"]);
              title = "wallet";
              break;
            case "totpSection":
              hasUnsaved = hasUnsavedForm(["totpName", "totpKey", "totpAlgorithm", "totpInterval"]);
              clearFunc = () => clearForm(["totpName", "totpKey", "totpAlgorithm", "totpInterval"]);
              title = "TOTP";
              break;
          
            // ==== Vault 2 ====
            case "pinSection":
              hasUnsaved = hasUnsavedForm(["pinName", "pinLinkedTo", "pinValue", "pinRemarks"]);
              clearFunc = () => clearForm(["pinName", "pinLinkedTo", "pinValue", "pinRemarks"]);
              title = "PIN";
              break;
            case "bankSection":
              hasUnsaved = hasUnsavedForm(["bankName", "bankAccountNumber", "bankIban", "bankSwift", "bankBankName", "bankCountry", "bankRemarks"]);
              clearFunc = () => clearForm(["bankName", "bankAccountNumber", "bankIban", "bankSwift", "bankBankName", "bankCountry", "bankRemarks"]);
              title = "bank account";
              break;
            case "cardSection":
              hasUnsaved = hasUnsavedForm(["cardName", "cardNumber", "cardHolder", "cardExpiration", "cardCVV", "cardLinkedTo", "cardRemarks"]);
              clearFunc = () => clearForm(["cardName", "cardNumber", "cardHolder", "cardExpiration", "cardCVV", "cardLinkedTo", "cardRemarks"]);
              title = "credit card";
              break;
          
            // ==== Vault 3 ====
            case "insuranceSection":
              hasUnsaved = hasUnsavedForm(["insuranceName", "insuranceProvider", "insurancePolicyNumber", "insuranceExpiryDate", "insuranceLinkedTo", "insuranceRemarks"]);
              clearFunc = () => clearForm(["insuranceName", "insuranceProvider", "insurancePolicyNumber", "insuranceExpiryDate", "insuranceLinkedTo", "insuranceRemarks"]);
              title = "insurance";
              break;
            case "identitySection":
              hasUnsaved = hasUnsavedForm(["identityName", "identityDocumentType", "identityDocumentNumber", "identityCountry", "identityExpiryDate", "identityRemarks"]);
              clearFunc = () => clearForm(["identityName", "identityDocumentType", "identityDocumentNumber", "identityCountry", "identityExpiryDate", "identityRemarks"]);
              title = "identity document";
              break;
            case "legalSection":
              hasUnsaved = hasUnsavedForm(["legalName", "legalDocumentType", "legalStorageLocation", "legalLinkedTo", "legalRemarks"]);
              clearFunc = () => clearForm(["legalName", "legalDocumentType", "legalStorageLocation", "legalLinkedTo", "legalRemarks"]);
              title = "legal document";
              break;
          
            // ==== Vault 4 ====
            case "assetSection":
              hasUnsaved = hasUnsavedForm(["assetType", "assetOwnershipId", "assetValueEstimate", "assetLinkedTo", "assetRemarks"]);
              clearFunc = () => clearForm(["assetType", "assetOwnershipId", "assetValueEstimate", "assetLinkedTo", "assetRemarks"]);
              title = "asset";
              break;
            case "contactSection":
              hasUnsaved = hasUnsavedForm(["contactName", "contactRelation", "contactEmail", "contactPhone", "contactRemarks"]);
              clearFunc = () => clearForm(["contactName", "contactRelation", "contactEmail", "contactPhone", "contactRemarks"]);
              title = "contact";
              break;
            case "subscriptionSection":
              hasUnsaved = hasUnsavedForm(["subscriptionServiceName", "subscriptionBillingAccount", "subscriptionFrequency", "subscriptionLinkedTo", "subscriptionRemarks"]);
              clearFunc = () => clearForm(["subscriptionServiceName", "subscriptionBillingAccount", "subscriptionFrequency", "subscriptionLinkedTo", "subscriptionRemarks"]);
              title = "subscription";
              break;
          
            default:
              hasUnsaved = false;
              clearFunc = () => {};
              title = "section";
          }
          
          if (hasUnsaved) {
            showConfirm(`Discard unsaved ${title}?`, () => {
              form.classList.add("slide-hidden");
              form.classList.add("displayNone");
              clearFunc?.();
            });
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
  const addCredentialBtn    = document.getElementById("addCredentialBtn");
  const cancelCredentialBtn = document.getElementById("cancelCredentialBtn");
  const saveCredentialBtn   = document.getElementById("saveCredentialBtn");

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
  
        showConfirm(message, () => {
          const form = document.getElementById("newCredentialForm");
          form.classList.add("slide-hidden");
          form.classList.add("displayNone"); // ✅ hide completely
          document.getElementById("credentialFormTitle").innerHTML = '<i class="fas fa-lock"></i> New Credential';
          clearForm(["credName", "credUsername", "credPassword", "credRemarks"]);
        
          if (editingOriginalCredential) {
            renderCredentialItem(editingOriginalCredential);
            editingOriginalCredential = null;
          }
        });        
    });
  }
  
  if (saveCredentialBtn) {
    saveCredentialBtn.addEventListener("click", () => {
      const name      = document.getElementById("credName").value.trim();
      const username  = document.getElementById("credUsername").value.trim();
      const password  = document.getElementById("credPassword").value.trim();
      const remarks   = document.getElementById("credRemarks").value.trim();

      if (!name || !username || !password) {
        showAlert("Name, username, and password are required.", "warning");
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
      clearForm(["credName", "credUsername", "credPassword", "credRemarks"]);

      updateCredentialPendingUI();
    });
  }

  // ===== Notes =====
  const addNoteBtn    = document.getElementById("addNoteBtn");
  const cancelNoteBtn = document.getElementById("cancelNoteBtn");
  const saveNoteBtn   = document.getElementById("saveNoteBtn");

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
  
        showConfirm(message, () => {
          const form = document.getElementById("newNoteForm");
          form.classList.add("slide-hidden");
          form.classList.add("displayNone"); // ✅ hide completely
          document.getElementById("noteFormTitle").innerHTML = '<i class="fas fa-note"></i> New Note';
          clearForm(["noteName", "noteContent"]);
        
          if (editingOriginalNote) {
            renderNoteItem(editingOriginalNote);
            editingOriginalNote = null;
          }
        });        
    });
  }
  
  if (saveNoteBtn) {
    saveNoteBtn.addEventListener("click", () => {
      const name    = document.getElementById("noteName").value.trim();
      const content = document.getElementById("noteContent").value.trim();
  
      if (!name || !content) {
        showAlert("Both name and content are required.", "warning");
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
      clearForm(["noteName", "noteContent"]);
  
      updateNotePendingUI();
    });
  }
  
  // ===== Wallet Addresses =====
  const addWalletBtn    = document.getElementById("addWalletBtn");
  const cancelWalletBtn = document.getElementById("cancelWalletBtn");
  const saveWalletBtn   = document.getElementById("saveWalletBtn");

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
  
        showConfirm(message, () => {
          const form = document.getElementById("newWalletForm");
          form.classList.add("slide-hidden");
          form.classList.add("displayNone"); // ✅ hide completely
          document.getElementById("walletFormTitle").innerHTML = '<i class="fas fa-wallet"></i> New Wallet';
          clearForm(["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"]);
        
          if (editingOriginalWallet) {
            renderWalletItem(editingOriginalWallet);
            editingOriginalWallet = null;
          }
        });        
    });
  }
  
  if (saveWalletBtn) {
    saveWalletBtn.addEventListener("click", () => {
      const name          = document.getElementById("walletName").value.trim();
      const walletAddress = document.getElementById("walletAddress").value.trim();
      const privateKey    = document.getElementById("walletPrivateKey").value.trim();
      const seedPhrase    = document.getElementById("walletSeedPhrase").value.trim();
      const remarks       = document.getElementById("walletRemarks").value.trim();
  
      if (!name || !walletAddress) {
        showAlert("Name and wallet address are required.", "warning");
        return;
      }
  
      if (!isValidSeedPhrase(seedPhrase)) {
        showAlert("Not a valid seed phrase. A valid seed phrase contains 12 or 24 words.", "warning");
        return;
      }

      if (editingOriginalWallet && editingOriginalWallet.walletAddress === walletAddress) {
        pendingWallets.push({
          id: editingOriginalWallet.id,
          name,
          walletAddress,
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
      clearForm(["walletName", "walletAddress", "walletPrivateKey", "walletSeedPhrase", "walletRemarks"]);
  
      updateWalletPendingUI();

    });
  }

  // ===== Totp ====
  const addTotpBtn    = document.getElementById("addTotpBtn");
  const cancelTotpBtn = document.getElementById("cancelTotpBtn");
  const saveTotpBtn   = document.getElementById("saveTotpBtn");

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
    
        showConfirm(message, () => {
          const form = document.getElementById("newTotpForm");
          form.classList.add("slide-hidden");
          form.classList.add("displayNone"); // ✅ hide completely
        
          document.getElementById("totpFormTitle").innerHTML = '<i class="fas fa-key"></i> New TOTP Secret';
          clearForm(["totpName", "totpKey", "totpAlgorithm", "totpInterval"]);
        
          if (editingOriginalTotp) {
            renderTotpItem(editingOriginalTotp);
            editingOriginalTotp = null;
          }
        });        
    });  
  }

  if (saveTotpBtn) {
    saveTotpBtn.addEventListener("click", () => {
      const name      = document.getElementById("totpName").value.trim();
      const key       = document.getElementById("totpKey").value.trim();
      const algorithm = document.getElementById("totpAlgorithm").value.trim();
      const interval  = parseInt(document.getElementById("totpInterval").value.trim(), 10);
    
      if (!name || !key || !algorithm || !interval || interval <= 0) {
        showAlert("All fields are required and interval must be positive.", "warning");
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
      clearForm(["totpName", "totpKey", "totpAlgorithm", "totpInterval"]);
      updateTotpPendingUI();
    });    
  }

  // ===== PIN =====
  const addPinBtn     = document.getElementById("addPinBtn");
  const cancelPinBtn  = document.getElementById("cancelPinBtn");
  const savePinBtn    = document.getElementById("savePinBtn");

  if (addPinBtn) {
    addPinBtn.addEventListener("click", () => {
      closeOtherForms("pin");
      document.getElementById("pinList").classList.remove("displayNone");
      const form = document.getElementById("newPinForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelPinBtn) {
    cancelPinBtn.addEventListener("click", () => {
      const message = editingOriginalPin
        ? "Cancel editing this PIN?"
        : "Cancel adding this PIN?";

      showConfirm(message, () => {
        const form = document.getElementById("newPinForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("pinFormTitle").innerHTML = '<i class="fas fa-key"></i> New PIN';
        clearForm(["pinName", "pinLinkedTo", "pinValue", "pinRemarks"]);

        if (editingOriginalPin) {
          renderPinItem(editingOriginalPin);
          editingOriginalPin = null;
        }
      });
    });
  }

  if (savePinBtn) {
    savePinBtn.addEventListener("click", () => {
      const name      = document.getElementById("pinName").value.trim();
      const linkedTo  = document.getElementById("pinLinkedTo").value.trim();
      const pin       = document.getElementById("pinValue").value.trim();
      const remarks   = document.getElementById("pinRemarks").value.trim();
  
      if (!name) {
        showAlert("Name cannot be empty.", "warning");
        return;
      }

      if (!pin) {
        showAlert("PIN cannot be empty.", "warning");
        return;
      }
  
      if (editingOriginalPin && editingOriginalPin.id) {
        pendingPins.push({
          id: editingOriginalPin.id,
          name,
          linkedTo,
          pin,
          remarks,
          _original: { ...editingOriginalPin }
        });
        editingOriginalPin = null;
      } else {
        pendingPins.push({ name, linkedTo, pin, remarks });
      }
  
      document.getElementById("newPinForm").classList.add("slide-hidden");
      document.getElementById("pinFormTitle").innerHTML = '<i class="fas fa-key"></i> New PIN';
      clearForm(["pinName", "pinLinkedTo", "pinValue", "pinRemarks"]);
      updatePinPendingUI();
    });
  }  

  // ===== Bank Account =====
  const addBankBtn    = document.getElementById("addBankBtn");
  const cancelBankBtn = document.getElementById("cancelBankBtn");
  const saveBankBtn   = document.getElementById("saveBankBtn");

  if (addBankBtn) {
    addBankBtn.addEventListener("click", () => {
      closeOtherForms("bank");
      document.getElementById("bankList").classList.remove("displayNone");
      const form = document.getElementById("newBankForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelBankBtn) {
    cancelBankBtn.addEventListener("click", () => {
      const message = editingOriginalBankAccount
        ? "Cancel editing this Bank Account?"
        : "Cancel adding this Bank Account?";

      showConfirm(message, () => {
        const form = document.getElementById("newBankForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("bankFormTitle").innerHTML = '<i class="fas fa-university"></i> New Bank Account';
        clearForm(["bankName", "bankAccountNumber", "bankIban", "bankSwift", "bankBankName", "bankCountry", "bankRemarks"]);

        if (editingOriginalBankAccount) {
          renderBankAccountItem(editingOriginalBankAccount);
          editingOriginalBankAccount = null;
        }
      });
    });
  }

  if (saveBankBtn) {
    saveBankBtn.addEventListener("click", () => {
      const name          = document.getElementById("bankName").value.trim();
      const accountNumber = document.getElementById("bankAccountNumber").value.trim();
      const iban          = document.getElementById("bankIban").value.trim();
      const swift         = document.getElementById("bankSwift").value.trim();
      const bankName      = document.getElementById("bankBankName").value.trim();
      const country       = document.getElementById("bankCountry").value.trim();
      const remarks       = document.getElementById("bankRemarks").value.trim();
  
      if (!name) {
        showAlert("Name cannot be empty.", "warning");
        return;
      }
      
      if (!iban && !accountNumber) {
        showAlert("Account number and IBAN cannot both be empty.", "warning");
        return;
      }
  
      if(iban) {
        if(!isValidIBAN(iban)) {
          showAlert("The IBAN is not valid.", "warning");
          return;
        }
      }

      if (editingOriginalBankAccount && editingOriginalBankAccount.id) {
        pendingBankAccounts.push({
          id: editingOriginalBankAccount.id,
          name,
          accountNumber,
          iban,
          swift,
          bankName,
          country,
          remarks,
          _original: { ...editingOriginalBankAccount }
        });
        editingOriginalBankAccount = null;
      } else {
        pendingBankAccounts.push({ name, accountNumber, iban, swift, bankName, country, remarks });
      }
  
      document.getElementById("newBankForm").classList.add("slide-hidden");
      document.getElementById("bankFormTitle").innerHTML = '<i class="fas fa-university"></i> New Bank Account';
      clearForm(["bankName", "bankAccountNumber", "bankIban", "bankSwift", "bankBankName", "bankCountry", "bankRemarks"]);
      updateBankAccountPendingUI();
    });
  }  

  // ===== Credit Card =====
  const addCardBtn    = document.getElementById("addCardBtn");
  const cancelCardBtn = document.getElementById("cancelCardBtn");
  const saveCardBtn   = document.getElementById("saveCardBtn");

  if (addCardBtn) {
    addCardBtn.addEventListener("click", () => {
      closeOtherForms("card");
      document.getElementById("cardList").classList.remove("displayNone");
      const form = document.getElementById("newCardForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelCardBtn) {
    cancelCardBtn.addEventListener("click", () => {
      const message = editingOriginalCreditCard
        ? "Cancel editing this Credit Card?"
        : "Cancel adding this Credit Card?";

      showConfirm(message, () => {
        const form = document.getElementById("newCardForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("cardFormTitle").innerHTML = '<i class="fas fa-credit-card"></i> New Credit Card';
        clearForm(["cardName", "cardNumber", "cardHolder", "cardExpiration", "cardCVV", "cardLinkedTo", "cardRemarks"]);

        if (editingOriginalCreditCard) {
          renderCreditCardItem(editingOriginalCreditCard);
          editingOriginalCreditCard = null;
        }
      });
    });
  }

  if (saveCardBtn) {
    saveCardBtn.addEventListener("click", () => {
      const name        = document.getElementById("cardName").value.trim();
      const cardNumber  = document.getElementById("cardNumber").value.trim();
      const cardHolder  = document.getElementById("cardHolder").value.trim();
      const expiryDate  = document.getElementById("cardExpiration").value.trim();
      const cvv         = document.getElementById("cardCVV").value.trim();
      const linkedTo    = document.getElementById("cardLinkedTo").value.trim();
      const remarks     = document.getElementById("cardRemarks").value.trim();
  
      if (!name) {
        showAlert("Name cannot be empty.", "warning");
        return;
      }

      if (!cardNumber) {
        showAlert("Card number cannot be empty.", "warning");
        return;
      }

      if (!cardHolder) {
        showAlert("Card holder cannot be empty.", "warning");
        return;
      }

      if (!expiryDate) {
        showAlert("Expiry date cannot be empty.", "warning");
        return;
      }

      if (!ccv) {
        showAlert("CCV cannot be empty.", "warning");
        return;
      }

      if (!isValidCreditCardNumber(cardNumber)) {
        showAlert("The credit card number is not valid.", "warning");
        return;
      }

      if (!isValidCVV(cvv)) {
        showAlert("The CVV is not valid.", "warning");
        return;
      }
  
      if (editingOriginalCreditCard && editingOriginalCreditCard.id) {
        pendingCreditCards.push({
          id: editingOriginalCreditCard.id,
          name,
          cardNumber,
          cardHolder,
          expiryDate,
          cvv,
          linkedTo,
          remarks,
          _original: { ...editingOriginalCreditCard }
        });
        editingOriginalCreditCard = null;
      } else {
        pendingCreditCards.push({ name, cardNumber, cardHolder, expiryDate, cvv, linkedTo, remarks });
      }
  
      document.getElementById("newCardForm").classList.add("slide-hidden");
      document.getElementById("cardFormTitle").innerHTML = '<i class="fas fa-credit-card"></i> New Credit Card';
      clearForm(["cardName", "cardNumber", "cardHolder", "cardExpiration", "cardCVV", "cardLinkedTo", "cardRemarks"]);
      updateCreditCardPendingUI();
    });
  }  

  // ===== Insurance =====
  const addInsuranceBtn     = document.getElementById("addInsuranceBtn");
  const cancelInsuranceBtn  = document.getElementById("cancelInsuranceBtn");
  const saveInsuranceBtn  = document.getElementById("saveInsuranceBtn");

  if (addInsuranceBtn) {
    addInsuranceBtn.addEventListener("click", () => {
      closeOtherForms("insurance");
      document.getElementById("insuranceList").classList.remove("displayNone");
      const form = document.getElementById("newInsuranceForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelInsuranceBtn) {
    cancelInsuranceBtn.addEventListener("click", () => {
      const message = editingOriginalInsurance
        ? "Cancel editing this Insurance?"
        : "Cancel adding this Insurance?";

      showConfirm(message, () => {
        const form = document.getElementById("newInsuranceForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("insuranceFormTitle").innerHTML = '<i class="fas fa-file-medical"></i> New Insurance';
        clearForm(["insuranceName", "insuranceProvider", "insurancePolicyNumber", "insuranceExpiryDate", "insuranceLinkedTo", "insuranceRemarks"]);

        if (editingOriginalInsurance) {
          renderInsuranceItem(editingOriginalInsurance);
          editingOriginalInsurance = null;
        }
      });
    });
  }

  if (saveInsuranceBtn) {
    saveInsuranceBtn.addEventListener("click", () => {
      const name          = document.getElementById("insuranceName").value.trim();
      const provider      = document.getElementById("insuranceProvider").value.trim();
      const policyNumber  = document.getElementById("insurancePolicyNumber").value.trim();
      const expiryDate    = document.getElementById("insuranceExpiryDate").value.trim();
      const linkedTo      = document.getElementById("insuranceLinkedTo").value.trim();
      const remarks       = document.getElementById("insuranceRemarks").value.trim();
  
      if (!name) {
        showAlert("Insurance name cannot be empty.", "warning");
        return;
      }
  
      if (editingOriginalInsurance && editingOriginalInsurance.id) {
        pendingInsurances.push({
          id: editingOriginalInsurance.id,
          name,
          provider,
          policyNumber,
          expiryDate,
          linkedTo,
          remarks,
          _original: { ...editingOriginalInsurance }
        });
        editingOriginalInsurance = null;
      } else {
        pendingInsurances.push({ name, provider, policyNumber, expiryDate, linkedTo, remarks });
      }
  
      document.getElementById("newInsuranceForm").classList.add("slide-hidden");
      document.getElementById("insuranceFormTitle").innerHTML = '<i class="fas fa-file-medical"></i> New Insurance';
      clearForm(["insuranceName", "insuranceProvider", "insurancePolicyNumber", "insuranceExpiryDate", "insuranceLinkedTo", "insuranceRemarks"])
      updateInsurancePendingUI();
    });
  }  

  // ===== Identity =====
  const addIdentityBtn    = document.getElementById("addIdentityBtn");
  const cancelIdentityBtn = document.getElementById("cancelIdentityBtn");
  const saveIdentityBtn   = document.getElementById("saveIdentityBtn");

  if (addIdentityBtn) {
    addIdentityBtn.addEventListener("click", () => {
      closeOtherForms("identity");
      document.getElementById("identityList").classList.remove("displayNone");
      const form = document.getElementById("newIdentityForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelIdentityBtn) {
    cancelIdentityBtn.addEventListener("click", () => {
      const message = editingOriginalIdentity
        ? "Cancel editing this Identity?"
        : "Cancel adding this Identity?";

      showConfirm(message, () => {
        const form = document.getElementById("newIdentityForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("identityFormTitle").innerHTML = '<i class="fas fa-id-card"></i> New Identity';
        clearForm(["identityName", "identityDocumentType", "identityDocumentNumber", "identityCountry", "identityExpiryDate", "identityRemarks"]);

        if (editingOriginalIdentity) {
          renderIdentityItem(editingOriginalIdentity);
          editingOriginalIdentity = null;
        }
      });
    });
  }

  if (saveIdentityBtn) {
    saveIdentityBtn.addEventListener("click", () => {
      const name            = document.getElementById("identityName").value.trim();
      const documentType    = document.getElementById("identityDocumentType").value.trim();
      const documentNumber  = document.getElementById("identityDocumentNumber").value.trim();
      const country         = document.getElementById("identityCountry").value.trim();
      const expiryDate      = document.getElementById("identityExpiryDate").value.trim();
      const remarks         = document.getElementById("identityRemarks").value.trim();
  
      if (!name) {
        showAlert("Identity name cannot be empty.", "warning");
        return;
      }

      if (!documentType) {
        showAlert("Document type cannot be empty.", "warning");
        return;
      }

      if (!documentNumber) {
        showAlert("Document number cannot be empty.", "warning");
        return;
      }
  
      if (editingOriginalIdentity && editingOriginalIdentity.id) {
        pendingIdentities.push({
          id: editingOriginalIdentity.id,
          name,
          documentType,
          documentNumber,
          country,
          expiryDate,
          remarks,
          _original: { ...editingOriginalIdentity }
        });
        editingOriginalIdentity = null;
      } else {
        pendingIdentities.push({ name, documentType, documentNumber, country, expiryDate, remarks });
      }
  
      document.getElementById("newIdentityForm").classList.add("slide-hidden");
      document.getElementById("identityFormTitle").innerHTML = '<i class="fas fa-id-card"></i> New Identity';
      clearForm(["identityName", "identityDocumentType", "identityDocumentNumber", "identityCountry", "identityExpiryDate", "identityRemarks"])
      updateIdentityPendingUI();
    });
  }  

  // ===== Legal Document =====
  const addLegalBtn     = document.getElementById("addLegalBtn");
  const cancelLegalBtn  = document.getElementById("cancelLegalBtn");
  const saveLegalBtn    = document.getElementById("saveLegalBtn");

  if (addLegalBtn) {
    addLegalBtn.addEventListener("click", () => {
      closeOtherForms("legal");
      document.getElementById("legalList").classList.remove("displayNone");
      const form = document.getElementById("newLegalForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelLegalBtn) {
    cancelLegalBtn.addEventListener("click", () => {
      const message = editingOriginalLegal
        ? "Cancel editing this Legal Document?"
        : "Cancel adding this Legal Document?";

      showConfirm(message, () => {
        const form = document.getElementById("newLegalForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("legalFormTitle").innerHTML = '<i class="fas fa-file-contract"></i> New Legal Document';
        clearForm(["legalName", "legalDocumentType", "legalStorageLocation", "legalLinkedTo", "legalRemarks"])

        if (editingOriginalLegal) {
          renderLegalDocumentItem(editingOriginalLegal);
          editingOriginalLegal = null;
        }
      });
    });
  }

  if (saveLegalBtn) {
    saveLegalBtn.addEventListener("click", () => {
      const name            = document.getElementById("legalName").value.trim();
      const documentType    = document.getElementById("legalDocumentType").value.trim();
      const storageLocation = document.getElementById("legalStorageLocation").value.trim();
      const linkedTo        = document.getElementById("legalLinkedTo").value.trim();
      const remarks         = document.getElementById("legalRemarks").value.trim();
  
      if (!name) {
        showAlert("Legal Document name cannot be empty.", "warning");
        return;
      }
  
      if (!documentType) {
        showAlert("Document type cannot be empty.", "warning");
        return;
      }

      if (editingOriginalLegal && editingOriginalLegal.id) {
        pendingLegalDocuments.push({
          id: editingOriginalLegal.id,
          name,
          documentType,
          storageLocation,
          linkedTo,
          remarks,
          _original: { ...editingOriginalLegal }
        });
        editingOriginalLegal = null;
      } else {
        pendingLegalDocuments.push({ name, documentType, storageLocation, linkedTo, remarks });
      }
  
      document.getElementById("newLegalForm").classList.add("slide-hidden");
      document.getElementById("legalFormTitle").innerHTML = '<i class="fas fa-file-contract"></i> New Legal Document';
      clearForm(["legalName", "legalDocumentType", "legalStorageLocation", "legalLinkedTo", "legalRemarks"])
      updateLegalDocumentPendingUI();
    });
  }
  

  // ===== Asset =====
  const addAssetBtn     = document.getElementById("addAssetBtn");
  const cancelAssetBtn  = document.getElementById("cancelAssetBtn");
  const saveAssetBtn    = document.getElementById("saveAssetBtn");

  if (addAssetBtn) {
    addAssetBtn.addEventListener("click", () => {
      closeOtherForms("asset");
      document.getElementById("assetList").classList.remove("displayNone");
      const form = document.getElementById("newAssetForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelAssetBtn) {
    cancelAssetBtn.addEventListener("click", () => {
      const message = editingOriginalAsset
        ? "Cancel editing this Asset?"
        : "Cancel adding this Asset?";

      showConfirm(message, () => {
        const form = document.getElementById("newAssetForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("assetFormTitle").innerHTML = '<i class="fas fa-building"></i> New Asset';
        clearForm(["assetType", "assetOwnershipId", "assetValueEstimate", "assetLinkedTo", "assetRemarks"]);

        if (editingOriginalAsset) {
          renderAssetItem(editingOriginalAsset);
          editingOriginalAsset = null;
        }
      });
    });
  }

  if (saveAssetBtn) {
    saveAssetBtn.addEventListener("click", () => {
      const assetType     = document.getElementById("assetType").value.trim();
      const ownershipId   = document.getElementById("assetOwnershipId").value.trim();
      const valueEstimate = document.getElementById("assetValueEstimate").value.trim();
      const linkedTo      = document.getElementById("assetLinkedTo").value.trim();
      const remarks       = document.getElementById("assetRemarks").value.trim();
  
      if (!assetType) {
        showAlert("Asset Type cannot be empty.", "warning");
        return;
      }
  
      if (editingOriginalAsset && editingOriginalAsset.id) {
        pendingAssets.push({
          id: editingOriginalAsset.id,
          assetType,
          ownershipId,
          valueEstimate,
          linkedTo,
          remarks,
          _original: { ...editingOriginalAsset }
        });
        editingOriginalAsset = null;
      } else {
        pendingAssets.push({ assetType, ownershipId, valueEstimate, linkedTo, remarks });
      }
  
      document.getElementById("newAssetForm").classList.add("slide-hidden");
      document.getElementById("assetFormTitle").innerHTML = '<i class="fas fa-building"></i> New Asset';
      clearForm(["assetType", "assetOwnershipId", "assetValueEstimate", "assetLinkedTo", "assetRemarks"]);
      updateAssetPendingUI();
    });
  }  

  // ===== Contact =====
  const addContactBtn     = document.getElementById("addContactBtn");
  const cancelContactBtn  = document.getElementById("cancelContactBtn");
  const saveContactBtn    = document.getElementById("saveContactBtn");

  if (addContactBtn) {
    addContactBtn.addEventListener("click", () => {
      closeOtherForms("contact");
      document.getElementById("contactList").classList.remove("displayNone");
      const form = document.getElementById("newContactForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelContactBtn) {
    cancelContactBtn.addEventListener("click", () => {
      const message = editingOriginalContact
        ? "Cancel editing this Contact?"
        : "Cancel adding this Contact?";

      showConfirm(message, () => {
        const form = document.getElementById("newContactForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("contactFormTitle").innerHTML = '<i class="fas fa-address-book"></i> New Contact';
        clearForm(["contactName", "contactRelation", "contactEmail", "contactPhone", "contactRemarks"]);

        if (editingOriginalContact) {
          renderContactItem(editingOriginalContact);
          editingOriginalContact = null;
        }
      });
    });
  }

  if (saveContactBtn) {
    saveContactBtn.addEventListener("click", () => {
      const name      = document.getElementById("contactName").value.trim();
      const relation  = document.getElementById("contactRelation").value.trim();
      const email     = document.getElementById("contactEmail").value.trim();
      const phone     = document.getElementById("contactPhone").value.trim();
      const remarks   = document.getElementById("contactRemarks").value.trim();
  
      if (!name) {
        showAlert("Contact name cannot be empty.", "warning");
        return;
      }

      if (!relation) {
        showAlert("Relation cannot be empty.", "warning");
        return;
      }

      if (!email && !phone) {
        showAlert("Email and phone cannot both be empty.", "warning");
        return;
      }
  
      if (editingOriginalContact && editingOriginalContact.id) {
        pendingContacts.push({
          id: editingOriginalContact.id,
          name,
          relation,
          email,
          phone,
          remarks,
          _original: { ...editingOriginalContact }
        });
        editingOriginalContact = null;
      } else {
        pendingContacts.push({ name, relation, email, phone, remarks });
      }
  
      document.getElementById("newContactForm").classList.add("slide-hidden");
      document.getElementById("contactFormTitle").innerHTML = '<i class="fas fa-address-book"></i> New Contact';
      clearForm(["contactName", "contactRelation", "contactEmail", "contactPhone", "contactRemarks"]);
      updateContactPendingUI();
    });
  }  

  // ===== Subscription =====
  const addSubscriptionBtn    = document.getElementById("addSubscriptionBtn");
  const cancelSubscriptionBtn = document.getElementById("cancelSubscriptionBtn");
  const saveSubscriptionBtn   = document.getElementById("saveSubscriptionBtn");

  if (addSubscriptionBtn) {
    addSubscriptionBtn.addEventListener("click", () => {
      closeOtherForms("subscription");
      document.getElementById("subscriptionList").classList.remove("displayNone");
      const form = document.getElementById("newSubscriptionForm");
      form.classList.remove("slide-hidden");
      form.classList.remove("displayNone");
    });
  }

  if (cancelSubscriptionBtn) {
    cancelSubscriptionBtn.addEventListener("click", () => {
      const message = editingOriginalSubscription
        ? "Cancel editing this Subscription?"
        : "Cancel adding this Subscription?";

      showConfirm(message, () => {
        const form = document.getElementById("newSubscriptionForm");
        form.classList.add("slide-hidden");
        form.classList.add("displayNone");
        document.getElementById("subscriptionFormTitle").innerHTML = '<i class="fas fa-sync-alt"></i> New Subscription';
        clearForm(["subscriptionServiceName", "subscriptionBillingAccount", "subscriptionFrequency", "subscriptionLinkedTo", "subscriptionRemarks"]);

        if (editingOriginalSubscription) {
          renderSubscriptionItem(editingOriginalSubscription);
          editingOriginalSubscription = null;
        }
      });
    });
  }

  if (saveSubscriptionBtn) {
    saveSubscriptionBtn.addEventListener("click", () => {
      const serviceName    = document.getElementById("subscriptionServiceName").value.trim();
      const billingAccount = document.getElementById("subscriptionBillingAccount").value.trim();
      const frequency      = document.getElementById("subscriptionFrequency").value.trim();
      const linkedTo       = document.getElementById("subscriptionLinkedTo").value.trim();
      const remarks        = document.getElementById("subscriptionRemarks").value.trim();
  
      if (!serviceName) {
        showAlert("Subscription name cannot be empty.", "warning");
        return;
      }
  
      if (editingOriginalSubscription && editingOriginalSubscription.id) {
        pendingSubscriptions.push({
          id: editingOriginalSubscription.id,
          serviceName,
          billingAccount,
          frequency,
          linkedTo,
          remarks,
          _original: { ...editingOriginalSubscription }
        });
        editingOriginalSubscription = null;
      } else {
        pendingSubscriptions.push({ serviceName, billingAccount, frequency, linkedTo, remarks });
      }
  
      document.getElementById("newSubscriptionForm").classList.add("slide-hidden");
      document.getElementById("subscriptionFormTitle").innerHTML = '<i class="fas fa-address-book"></i> New Subscription';
      clearForm(["subscriptionServiceName", "subscriptionBillingAccount", "subscriptionFrequency", "subscriptionLinkedTo", "subscriptionRemarks"]);
      updateSubscriptionPendingUI();
    });
  }  

});

