// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./CostManager.sol";

/**
 * @title VaultContract
 * @notice Stores Credentials, Notes, and Wallet addresses in a single contract, 
 *         with combined "upsert" methods and batch deletion, plus automatic 
 *         CRO payout on each call.
 *
 * Note: This contract is meant to be used as an implementation for clones.
 *       Use the `initialize` function to set the owner and CostManager address.
 */
contract VaultContract is Initializable, OwnableUpgradeable {
    // Reference to CostManager for upsert fees
    CostManager public costManager;

    /*//////////////////////////////////////////////////////////////
                              CREDENTIALS
    //////////////////////////////////////////////////////////////*/
    uint256 private nextCredentialId = 1;

    struct Credential {
        uint256 id;
        string name;
        string username;
        string password;
        string remarks;
        uint256 timestamp;
    }

    // Upsert struct: if id == 0 then new entry; if id > 0 then update existing.
    struct CredentialUpsert {
        uint256 id;
        string name;
        string username;
        string password;
        string remarks;
    }

    Credential[] private credentials;
    mapping(uint256 => uint256) private credentialIndexById;

    /*//////////////////////////////////////////////////////////////
                                NOTES
    //////////////////////////////////////////////////////////////*/
    uint256 private nextNoteId = 1;

    struct Note {
        uint256 id;
        string name;
        string note;
        uint256 timestamp;
    }

    struct NoteUpsert {
        uint256 id;
        string name;
        string note;
    }

    Note[] private notes;
    mapping(uint256 => uint256) private noteIndexById;

    /*//////////////////////////////////////////////////////////////
                        WALLET ADDRESSES (with ID)
    //////////////////////////////////////////////////////////////*/
    uint256 private nextWalletId = 1;

    struct WalletInfo {
        uint256 id;
        string name;
        string walletAddress;
        string privateKey;
        string seedPhrase;
        string remarks;
        uint256 timestamp;
    }

    struct WalletUpsert {
        uint256 id; // 0 = new, >0 = update
        string name;
        string walletAddress;
        string privateKey;
        string seedPhrase;
        string remarks;
    }

    WalletInfo[] private walletInfos;
    mapping(uint256 => uint256) private walletIndexById;

    /*//////////////////////////////////////////////////////////////
                                  TOTP
    //////////////////////////////////////////////////////////////*/
    uint256 private nextTotpId = 1;

    struct TOTP {
        uint256 id;
        string name;
        string key;
        string algorithm;
        uint256 interval;
        uint256 timestamp;
    }

    struct TOTPUpsert {
        uint256 id;
        string name;
        string key;
        string algorithm;
        uint256 interval;
    }

    TOTP[] private totps;
    mapping(uint256 => uint256) private totpIndexById;

    /*//////////////////////////////////////////////////////////////
                           INITIALIZER
    //////////////////////////////////////////////////////////////*/
    /**
     * @dev Initializes the vault.
     * @param _owner The address that will own this vault.
     * @param _costManager The address of the CostManager contract.
     *
     * If any value is sent, it will be forwarded to CostManager.
     */
    function initialize(address _owner, address _costManager) external payable initializer {
        __Ownable_init(_owner); 
        _transferOwnership(_owner);
        require(_costManager != address(0), "Invalid CostManager");
        costManager = CostManager(payable(_costManager));

        /*//////////////////////////////////////////////////////////////
        ============ Remove if-block with new contracts! ===============
        //////////////////////////////////////////////////////////////*/
        if (msg.value > 0) {
            (bool success, ) = address(costManager).call{value: msg.value}("");
            require(success, "Forwarding creation fee to CostManager failed");
        }
    }

    /*//////////////////////////////////////////////////////////////
                           UPDATER FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function upsertCredentials(CredentialUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertCredentials");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                credentials.push(
                    Credential({
                        id: nextCredentialId,
                        name: data[i].name,
                        username: data[i].username,
                        password: data[i].password,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                credentialIndexById[nextCredentialId] = credentials.length - 1;
                nextCredentialId++;
            } else {
                uint256 index = credentialIndexById[data[i].id];
                require(index < credentials.length, "Invalid credential ID");

                Credential storage c = credentials[index];
                if (bytes(data[i].name).length > 0) {
                    c.name = data[i].name;
                }
                if (bytes(data[i].username).length > 0) {
                    c.username = data[i].username;
                }
                if (bytes(data[i].password).length > 0) {
                    c.password = data[i].password;
                }
                if (bytes(data[i].remarks).length > 0) {
                    c.remarks = data[i].remarks;
                }
                c.timestamp = block.timestamp;
            }
        }
    }

    function deleteCredentials(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = credentialIndexById[id];
            require(index < credentials.length, "Invalid credential ID");

            uint256 lastIndex = credentials.length - 1;
            if (index != lastIndex) {
                Credential storage lastCred = credentials[lastIndex];
                credentials[index] = lastCred;
                credentialIndexById[lastCred.id] = index;
            }
            credentials.pop();
            delete credentialIndexById[id];
        }
    }

    function readCredentials() external view onlyOwner returns (Credential[] memory) {
        return credentials;
    }

    function upsertNotes(NoteUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertNotes");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                notes.push(
                    Note({
                        id: nextNoteId,
                        name: data[i].name,
                        note: data[i].note,
                        timestamp: block.timestamp
                    })
                );
                noteIndexById[nextNoteId] = notes.length - 1;
                nextNoteId++;
            } else {
                uint256 index = noteIndexById[data[i].id];
                require(index < notes.length, "Invalid note ID");

                Note storage n = notes[index];
                if (bytes(data[i].name).length > 0) {
                    n.name = data[i].name;
                }
                if (bytes(data[i].note).length > 0) {
                    n.note = data[i].note;
                }
                n.timestamp = block.timestamp;
            }
        }
    }

    function deleteNotes(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = noteIndexById[id];
            require(index < notes.length, "Invalid note ID");

            uint256 lastIndex = notes.length - 1;
            if (index != lastIndex) {
                Note storage lastNote = notes[lastIndex];
                notes[index] = lastNote;
                noteIndexById[lastNote.id] = index;
            }
            notes.pop();
            delete noteIndexById[id];
        }
    }

    function readNote() external view onlyOwner returns (Note[] memory) {
        return notes;
    }

    function upsertWalletAddress(WalletUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertWalletAddress");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                walletInfos.push(WalletInfo({
                    id: nextWalletId,
                    name: data[i].name,
                    walletAddress: data[i].walletAddress,
                    privateKey: data[i].privateKey,
                    seedPhrase: data[i].seedPhrase,
                    remarks: data[i].remarks,
                    timestamp: block.timestamp
                }));
                walletIndexById[nextWalletId] = walletInfos.length - 1;
                nextWalletId++;
            } else {
                uint256 index = walletIndexById[data[i].id];
                require(index < walletInfos.length, "Invalid wallet ID");

                WalletInfo storage w = walletInfos[index];
                if (bytes(data[i].name).length > 0) {
                    w.name = data[i].name;
                }
                if (bytes(data[i].walletAddress).length > 0) {
                    w.walletAddress = data[i].walletAddress;
                }
                if (bytes(data[i].privateKey).length > 0) {
                    w.privateKey = data[i].privateKey;
                }
                if (bytes(data[i].seedPhrase).length > 0) {
                    w.seedPhrase = data[i].seedPhrase;
                }
                if (bytes(data[i].remarks).length > 0) {
                    w.remarks = data[i].remarks;
                }
                w.timestamp = block.timestamp;
            }
        }
    }

    function deleteWalletAddresses(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = walletIndexById[id];
            require(index < walletInfos.length, "Invalid wallet ID");

            uint256 lastIndex = walletInfos.length - 1;
            if (index != lastIndex) {
                WalletInfo storage last = walletInfos[lastIndex];
                walletInfos[index] = last;
                walletIndexById[last.id] = index;
            }
            walletInfos.pop();
            delete walletIndexById[id];
        }
    }

    function readWalletAddress() external view onlyOwner returns (WalletInfo[] memory) {
        return walletInfos;
    }

    function upsertTOTP(TOTPUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertTOTP");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                totps.push(TOTP({
                    id: nextTotpId,
                    name: data[i].name,
                    key: data[i].key,
                    algorithm: data[i].algorithm,
                    interval: data[i].interval,
                    timestamp: block.timestamp
                }));
                totpIndexById[nextTotpId] = totps.length - 1;
                nextTotpId++;
            } else {
                uint256 index = totpIndexById[data[i].id];
                require(index < totps.length, "Invalid TOTP ID");

                TOTP storage t = totps[index];
                if (bytes(data[i].name).length > 0) {
                    t.name = data[i].name;
                }
                if (bytes(data[i].key).length > 0) {
                    t.key = data[i].key;
                }
                if (bytes(data[i].algorithm).length > 0) {
                    t.algorithm = data[i].algorithm;
                }
                if (data[i].interval > 0) {
                    t.interval = data[i].interval;
                }
                t.timestamp = block.timestamp;
            }
        }
    }

    function deleteTOTP(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = totpIndexById[id];
            require(index < totps.length, "Invalid TOTP ID");

            uint256 lastIndex = totps.length - 1;
            if (index != lastIndex) {
                TOTP storage last = totps[lastIndex];
                totps[index] = last;
                totpIndexById[last.id] = index;
            }
            totps.pop();
            delete totpIndexById[id];
        }
    }

    function readTOTP() external view onlyOwner returns (TOTP[] memory) {
        return totps;
    }

    receive() external payable {}
    fallback() external payable {}
}
