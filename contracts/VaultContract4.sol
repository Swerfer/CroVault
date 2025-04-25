// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./CostManager.sol";

/**
 * @title VaultContract4
 * @notice Stores Pin codes, Bank accounts, credit cards, insurance in a single contract, 
 *         with combined "upsert" methods and batch deletion, plus automatic 
 *         CRO payout on each call.
 *
 * Note: This contract is meant to be used as an implementation for clones.
 *       Use the `initialize` function to set the owner and CostManager address.
 */
contract VaultContract4 is Initializable, OwnableUpgradeable {
    // Reference to CostManager for upsert fees
    CostManager public costManager;

    /*//////////////////////////////////////////////////////////////
                        Assets & Ownership Records
    //////////////////////////////////////////////////////////////*/
    uint256 private nextAssetId = 1;

    struct Asset {
        uint256 id;
        string assetType;      // e.g., "House", "Car", "Artwork"
        string ownershipId;    // e.g., VIN number, deed number, registration ID
        string valueEstimate;  // optional estimated value
        string linkedTo;       // link to related person, company, or other asset
        string remarks;
        uint256 timestamp;
    }

    struct AssetUpsert {
        uint256 id;
        string assetType;
        string ownershipId;
        string valueEstimate;
        string linkedTo;
        string remarks;
    }

    Asset[] private assets;
    mapping(uint256 => uint256) private assetIndexById;

    /*//////////////////////////////////////////////////////////////
                    Emergency Contacts & Trustees
    //////////////////////////////////////////////////////////////*/
    uint256 private nextContactId = 1;

    struct Contact {
        uint256 id;
        string name;           // full name of the contact
        string relation;       // relation to user (child, spouse, lawyer, etc.)
        string email;
        string phone;
        string remarks;
        uint256 timestamp;
    }

    struct ContactUpsert {
        uint256 id;
        string name;
        string relation;
        string email;
        string phone;
        string remarks;
    }

    Contact[] private contacts;
    mapping(uint256 => uint256) private contactIndexById;

    /*//////////////////////////////////////////////////////////////
                    Subscriptions / Recurring Payments
    //////////////////////////////////////////////////////////////*/
    uint256 private nextSubscriptionId = 1;

    struct Subscription {
        uint256 id;
        string serviceName;    // e.g., "Netflix", "AWS", "Spotify"
        string billingAccount; // account used for billing
        string frequency;      // e.g., "Monthly", "Yearly"
        string linkedTo;       // link to related bank account or credit card
        string remarks;
        uint256 timestamp;
    }

    struct SubscriptionUpsert {
        uint256 id;
        string serviceName;
        string billingAccount;
        string frequency;
        string linkedTo;
        string remarks;
    }

    Subscription[] private subscriptions;
    mapping(uint256 => uint256) private subscriptionIndexById;

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
    function upsertAssets(AssetUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertAssets");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                assets.push(
                    Asset({
                        id: nextAssetId,
                        assetType: data[i].assetType,
                        ownershipId: data[i].ownershipId,
                        valueEstimate: data[i].valueEstimate,
                        linkedTo: data[i].linkedTo,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                assetIndexById[nextAssetId] = assets.length - 1;
                nextAssetId++;
            } else {
                uint256 index = assetIndexById[data[i].id];
                require(index < assets.length, "Invalid asset ID");

                Asset storage a = assets[index];
                if (bytes(data[i].assetType).length > 0) a.assetType = data[i].assetType;
                if (bytes(data[i].ownershipId).length > 0) a.ownershipId = data[i].ownershipId;
                if (bytes(data[i].valueEstimate).length > 0) a.valueEstimate = data[i].valueEstimate;
                if (bytes(data[i].linkedTo).length > 0) a.linkedTo = data[i].linkedTo;
                if (bytes(data[i].remarks).length > 0) a.remarks = data[i].remarks;
                a.timestamp = block.timestamp;
            }
        }
    }

    function deleteAssets(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = assetIndexById[id];
            require(index < assets.length, "Invalid asset ID");

            uint256 lastIndex = assets.length - 1;
            if (index != lastIndex) {
                Asset storage last = assets[lastIndex];
                assets[index] = last;
                assetIndexById[last.id] = index;
            }
            assets.pop();
            delete assetIndexById[id];
        }
    }

    function readAssets() external view onlyOwner returns (Asset[] memory) {
        return assets;
    }

    function upsertContacts(ContactUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertContacts");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                contacts.push(
                    Contact({
                        id: nextContactId,
                        name: data[i].name,
                        relation: data[i].relation,
                        email: data[i].email,
                        phone: data[i].phone,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                contactIndexById[nextContactId] = contacts.length - 1;
                nextContactId++;
            } else {
                uint256 index = contactIndexById[data[i].id];
                require(index < contacts.length, "Invalid contact ID");

                Contact storage c = contacts[index];
                if (bytes(data[i].name).length > 0) c.name = data[i].name;
                if (bytes(data[i].relation).length > 0) c.relation = data[i].relation;
                if (bytes(data[i].email).length > 0) c.email = data[i].email;
                if (bytes(data[i].phone).length > 0) c.phone = data[i].phone;
                if (bytes(data[i].remarks).length > 0) c.remarks = data[i].remarks;
                c.timestamp = block.timestamp;
            }
        }
    }

    function deleteContacts(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = contactIndexById[id];
            require(index < contacts.length, "Invalid contact ID");

            uint256 lastIndex = contacts.length - 1;
            if (index != lastIndex) {
                Contact storage last = contacts[lastIndex];
                contacts[index] = last;
                contactIndexById[last.id] = index;
            }
            contacts.pop();
            delete contactIndexById[id];
        }
    }

    function readContacts() external view onlyOwner returns (Contact[] memory) {
        return contacts;
    }

    function upsertSubscriptions(SubscriptionUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertSubscriptions");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                subscriptions.push(
                    Subscription({
                        id: nextSubscriptionId,
                        serviceName: data[i].serviceName,
                        billingAccount: data[i].billingAccount,
                        frequency: data[i].frequency,
                        linkedTo: data[i].linkedTo,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                subscriptionIndexById[nextSubscriptionId] = subscriptions.length - 1;
                nextSubscriptionId++;
            } else {
                uint256 index = subscriptionIndexById[data[i].id];
                require(index < subscriptions.length, "Invalid subscription ID");

                Subscription storage s = subscriptions[index];
                if (bytes(data[i].serviceName).length > 0) s.serviceName = data[i].serviceName;
                if (bytes(data[i].billingAccount).length > 0) s.billingAccount = data[i].billingAccount;
                if (bytes(data[i].frequency).length > 0) s.frequency = data[i].frequency;
                if (bytes(data[i].linkedTo).length > 0) s.linkedTo = data[i].linkedTo;
                if (bytes(data[i].remarks).length > 0) s.remarks = data[i].remarks;
                s.timestamp = block.timestamp;
            }
        }
    }

    function deleteSubscriptions(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = subscriptionIndexById[id];
            require(index < subscriptions.length, "Invalid subscription ID");

            uint256 lastIndex = subscriptions.length - 1;
            if (index != lastIndex) {
                Subscription storage last = subscriptions[lastIndex];
                subscriptions[index] = last;
                subscriptionIndexById[last.id] = index;
            }
            subscriptions.pop();
            delete subscriptionIndexById[id];
        }
    }

    function readSubscriptions() external view onlyOwner returns (Subscription[] memory) {
        return subscriptions;
    }

    receive() external payable {}
    fallback() external payable {}
}
