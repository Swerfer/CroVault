// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./CostManager.sol";

/**
 * @title VaultContract3
 * @notice Stores Pin codes, Bank accounts, credit cards, insurance in a single contract, 
 *         with combined "upsert" methods and batch deletion, plus automatic 
 *         CRO payout on each call.
 *
 * Note: This contract is meant to be used as an implementation for clones.
 *       Use the `initialize` function to set the owner and CostManager address.
 */
contract VaultContract3 is Initializable, OwnableUpgradeable {
    // Reference to CostManager for upsert fees
    CostManager public costManager;

    /*//////////////////////////////////////////////////////////////
                            INSURANCE
    //////////////////////////////////////////////////////////////*/
    uint256 private nextInsuranceId = 1;

    struct Insurance {
        uint256 id;
        string name;            // e.g., "Car Insurance", "Life Policy"
        string provider;        // Insurance company
        string policyNumber;    // Unique policy ID
        string expiryDate;      // e.g., "2025-12-31"
        string linkedTo;        // e.g., Car, Travel, Health
        string remarks;
        uint256 timestamp;
    }

    struct InsuranceUpsert {
        uint256 id;
        string name;
        string provider;
        string policyNumber;
        string expiryDate;
        string linkedTo;
        string remarks;
    }

    Insurance[] private insurances;
    mapping(uint256 => uint256) private insuranceIndexById;

    /*//////////////////////////////////////////////////////////////
                        IDENTITY DOCUMENTS
    //////////////////////////////////////////////////////////////*/
    uint256 private nextIdentityId = 1;

    struct Identity {
        uint256 id;
        string name;           // e.g., "Passport John Doe"
        string documentType;   // e.g., Passport, ID Card, Driver's License
        string documentNumber; // official document number
        string country;        // country issuing the document
        string expiryDate;     // expiry date in format like YYYY-MM-DD
        string remarks;        // optional notes
        uint256 timestamp;     // when added/updated
    }

    struct IdentityUpsert {
        uint256 id;
        string name;
        string documentType;
        string documentNumber;
        string country;
        string expiryDate;
        string remarks;
    }

    Identity[] private identities;
    mapping(uint256 => uint256) private identityIndexById;

    /*//////////////////////////////////////////////////////////////
                            LEGAL DOCUMENTS
    //////////////////////////////////////////////////////////////*/
    uint256 private nextLegalDocId = 1;

    struct LegalDocument {
        uint256 id;
        string name;              // e.g., "Last Will", "Power of Attorney"
        string documentType;      // e.g., Will, Contract, Agreement
        string storageLocation;   // where it's stored: "Safe Deposit Box", "IPFS hash", etc.
        string linkedTo;          // linked person or asset
        string remarks;
        uint256 timestamp;
    }

    struct LegalDocumentUpsert {
        uint256 id;
        string name;
        string documentType;
        string storageLocation;
        string linkedTo;
        string remarks;
    }

    LegalDocument[] private legalDocuments;
    mapping(uint256 => uint256) private legalDocIndexById;

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
    }

    /*//////////////////////////////////////////////////////////////
                           UPDATER FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function upsertInsurances(InsuranceUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertInsurances");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                insurances.push(
                    Insurance({
                        id: nextInsuranceId,
                        name: data[i].name,
                        provider: data[i].provider,
                        policyNumber: data[i].policyNumber,
                        expiryDate: data[i].expiryDate,
                        linkedTo: data[i].linkedTo,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                insuranceIndexById[nextInsuranceId] = insurances.length - 1;
                nextInsuranceId++;
            } else {
                uint256 index = insuranceIndexById[data[i].id];
                require(index < insurances.length, "Invalid insurance ID");

                Insurance storage s = insurances[index];
                if (bytes(data[i].name).length > 0) s.name = data[i].name;
                if (bytes(data[i].provider).length > 0) s.provider = data[i].provider;
                if (bytes(data[i].policyNumber).length > 0) s.policyNumber = data[i].policyNumber;
                if (bytes(data[i].expiryDate).length > 0) s.expiryDate = data[i].expiryDate;
                if (bytes(data[i].linkedTo).length > 0) s.linkedTo = data[i].linkedTo;
                if (bytes(data[i].remarks).length > 0) s.remarks = data[i].remarks;
                s.timestamp = block.timestamp;
            }
        }
    }

    function deleteInsurances(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = insuranceIndexById[id];
            require(index < insurances.length, "Invalid insurance ID");

            uint256 lastIndex = insurances.length - 1;
            if (index != lastIndex) {
                Insurance storage last = insurances[lastIndex];
                insurances[index] = last;
                insuranceIndexById[last.id] = index;
            }
            insurances.pop();
            delete insuranceIndexById[id];
        }
    }

    function readInsurances() external view onlyOwner returns (Insurance[] memory) {
        return insurances;
    }

    function upsertIdentities(IdentityUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertIdentities");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                identities.push(
                    Identity({
                        id: nextIdentityId,
                        name: data[i].name,
                        documentType: data[i].documentType,
                        documentNumber: data[i].documentNumber,
                        country: data[i].country,
                        expiryDate: data[i].expiryDate,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                identityIndexById[nextIdentityId] = identities.length - 1;
                nextIdentityId++;
            } else {
                uint256 index = identityIndexById[data[i].id];
                require(index < identities.length, "Invalid identity ID");

                Identity storage doc = identities[index];
                if (bytes(data[i].name).length > 0) doc.name = data[i].name;
                if (bytes(data[i].documentType).length > 0) doc.documentType = data[i].documentType;
                if (bytes(data[i].documentNumber).length > 0) doc.documentNumber = data[i].documentNumber;
                if (bytes(data[i].country).length > 0) doc.country = data[i].country;
                if (bytes(data[i].expiryDate).length > 0) doc.expiryDate = data[i].expiryDate;
                if (bytes(data[i].remarks).length > 0) doc.remarks = data[i].remarks;
                doc.timestamp = block.timestamp;
            }
        }
    }

    function deleteIdentities(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = identityIndexById[id];
            require(index < identities.length, "Invalid identity ID");

            uint256 lastIndex = identities.length - 1;
            if (index != lastIndex) {
                Identity storage last = identities[lastIndex];
                identities[index] = last;
                identityIndexById[last.id] = index;
            }
            identities.pop();
            delete identityIndexById[id];
        }
    }

    function readIdentities() external view onlyOwner returns (Identity[] memory) {
        return identities;
    }

    function upsertLegalDocuments(LegalDocumentUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertLegalDocuments");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                legalDocuments.push(
                    LegalDocument({
                        id: nextLegalDocId,
                        name: data[i].name,
                        documentType: data[i].documentType,
                        storageLocation: data[i].storageLocation,
                        linkedTo: data[i].linkedTo,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                legalDocIndexById[nextLegalDocId] = legalDocuments.length - 1;
                nextLegalDocId++;
            } else {
                uint256 index = legalDocIndexById[data[i].id];
                require(index < legalDocuments.length, "Invalid legal document ID");

                LegalDocument storage doc = legalDocuments[index];
                if (bytes(data[i].name).length > 0) doc.name = data[i].name;
                if (bytes(data[i].documentType).length > 0) doc.documentType = data[i].documentType;
                if (bytes(data[i].storageLocation).length > 0) doc.storageLocation = data[i].storageLocation;
                if (bytes(data[i].linkedTo).length > 0) doc.linkedTo = data[i].linkedTo;
                if (bytes(data[i].remarks).length > 0) doc.remarks = data[i].remarks;
                doc.timestamp = block.timestamp;
            }
        }
    }

    function deleteLegalDocuments(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = legalDocIndexById[id];
            require(index < legalDocuments.length, "Invalid legal document ID");

            uint256 lastIndex = legalDocuments.length - 1;
            if (index != lastIndex) {
                LegalDocument storage last = legalDocuments[lastIndex];
                legalDocuments[index] = last;
                legalDocIndexById[last.id] = index;
            }
            legalDocuments.pop();
            delete legalDocIndexById[id];
        }
    }

    function readLegalDocuments() external view onlyOwner returns (LegalDocument[] memory) {
        return legalDocuments;
    }

    receive() external payable {}
    fallback() external payable {}
}
