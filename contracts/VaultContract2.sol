// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./CostManager.sol";

/**
 * @title VaultContract2
 * @notice Stores Pin codes, Bank accounts, credit cards, insurance in a single contract, 
 *         with combined "upsert" methods and batch deletion, plus automatic 
 *         CRO payout on each call.
 *
 * Note: This contract is meant to be used as an implementation for clones.
 *       Use the `initialize` function to set the owner and CostManager address.
 */
contract VaultContract2 is Initializable, OwnableUpgradeable {
    // Reference to CostManager for upsert fees
    CostManager public costManager;

    /*//////////////////////////////////////////////////////////////
                              PIN CODES
    //////////////////////////////////////////////////////////////*/
    uint256 private nextPinId = 1;

    struct Pin {
        uint256 id;
        string name;
        string linkedTo;
        string pin;
        string remarks;
        uint256 timestamp;
    }

    // Upsert struct: if id == 0 then new entry; if id > 0 then update existing.
    struct PinUpsert {
        uint256 id;
        string name;
        string linkedTo;
        string pin;
        string remarks;
    }

    Pin[] private pins;
    mapping(uint256 => uint256) private pinIndexById;

    /*//////////////////////////////////////////////////////////////
                            BANK ACCOUNTS
    //////////////////////////////////////////////////////////////*/
    uint256 private nextBankAccountId = 1;

    struct BankAccount {
        uint256 id;
        string name;
        string accountNumber;
        string iban;
        string swift;
        string bankName;
        string country;
        string remarks;
        uint256 timestamp;
    }

    struct BankAccountUpsert {
        uint256 id;
        string name;
        string accountNumber;
        string iban;
        string swift;
        string bankName;
        string country;
        string remarks;
    }

    BankAccount[] private bankAccounts;
    mapping(uint256 => uint256) private bankAccountIndexById;

    /*//////////////////////////////////////////////////////////////
                            CREDIT CARDS
    //////////////////////////////////////////////////////////////*/
    uint256 private nextCreditCardId = 1;

    struct CreditCard {
        uint256 id;
        string name;            // e.g., "Main VISA", "Work Card"
        string cardNumber;      // masked or full (encrypted)
        string cardHolder;      // name on card
        string expiryDate;      // MM/YY format
        string cvv;             // usually encrypted, optional
        string linkedTo;        // what this card is used for (e.g., Netflix, Amazon)
        string remarks;
        uint256 timestamp;
    }

    struct CreditCardUpsert {
        uint256 id;
        string name;
        string cardNumber;
        string cardHolder;
        string expiryDate;
        string cvv;
        string linkedTo;
        string remarks;
    }

    CreditCard[] private creditCards;
    mapping(uint256 => uint256) private creditCardIndexById;

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
    function upsertPins(PinUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertPins");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                pins.push(
                    Pin({
                        id: nextPinId,
                        name: data[i].name,
                        linkedTo: data[i].linkedTo,
                        pin: data[i].pin,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                pinIndexById[nextPinId] = pins.length - 1;
                nextPinId++;
            } else {
                uint256 index = pinIndexById[data[i].id];
                require(index < pins.length, "Invalid pin ID");

                Pin storage p = pins[index];
                if (bytes(data[i].name).length > 0) p.name = data[i].name;
                if (bytes(data[i].linkedTo).length > 0) p.linkedTo = data[i].linkedTo;
                if (bytes(data[i].pin).length > 0) p.pin = data[i].pin;
                if (bytes(data[i].remarks).length > 0) p.remarks = data[i].remarks;
                p.timestamp = block.timestamp;
            }
        }
    }

    function deletePins(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = pinIndexById[id];
            require(index < pins.length, "Invalid pin ID");

            uint256 lastIndex = pins.length - 1;
            if (index != lastIndex) {
                Pin storage lastPin = pins[lastIndex];
                pins[index] = lastPin;
                pinIndexById[lastPin.id] = index;
            }
            pins.pop();
            delete pinIndexById[id];
        }
    }

    function readPins() external view onlyOwner returns (Pin[] memory) {
        return pins;
    }

    function upsertBankAccounts(BankAccountUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertBankAccounts");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                bankAccounts.push(
                    BankAccount({
                        id: nextBankAccountId,
                        name: data[i].name,
                        accountNumber: data[i].accountNumber,
                        iban: data[i].iban,
                        swift: data[i].swift,
                        bankName: data[i].bankName,
                        country: data[i].country,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                bankAccountIndexById[nextBankAccountId] = bankAccounts.length - 1;
                nextBankAccountId++;
            } else {
                uint256 index = bankAccountIndexById[data[i].id];
                require(index < bankAccounts.length, "Invalid bank account ID");

                BankAccount storage a = bankAccounts[index];
                if (bytes(data[i].name).length > 0) a.name = data[i].name;
                if (bytes(data[i].accountNumber).length > 0) a.accountNumber = data[i].accountNumber;
                if (bytes(data[i].iban).length > 0) a.iban = data[i].iban;
                if (bytes(data[i].swift).length > 0) a.swift = data[i].swift;
                if (bytes(data[i].bankName).length > 0) a.bankName = data[i].bankName;
                if (bytes(data[i].country).length > 0) a.country = data[i].country;
                if (bytes(data[i].remarks).length > 0) a.remarks = data[i].remarks;
                a.timestamp = block.timestamp;
            }
        }
    }

    function deleteBankAccounts(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = bankAccountIndexById[id];
            require(index < bankAccounts.length, "Invalid bank account ID");

            uint256 lastIndex = bankAccounts.length - 1;
            if (index != lastIndex) {
                BankAccount storage last = bankAccounts[lastIndex];
                bankAccounts[index] = last;
                bankAccountIndexById[last.id] = index;
            }
            bankAccounts.pop();
            delete bankAccountIndexById[id];
        }
    }

    function readBankAccounts() external view onlyOwner returns (BankAccount[] memory) {
        return bankAccounts;
    }

    function upsertCreditCards(CreditCardUpsert[] calldata data) external payable onlyOwner {
        uint256 requiredCost = costManager.vaultUpsertCost();
        require(msg.value == requiredCost, "Wrong cost for upsertCreditCards");
        (bool success, ) = address(costManager).call{value: msg.value}("");
        require(success, "Forwarding fee failed");

        for (uint256 i = 0; i < data.length; i++) {
            if (data[i].id == 0) {
                creditCards.push(
                    CreditCard({
                        id: nextCreditCardId,
                        name: data[i].name,
                        cardNumber: data[i].cardNumber,
                        cardHolder: data[i].cardHolder,
                        expiryDate: data[i].expiryDate,
                        cvv: data[i].cvv,
                        linkedTo: data[i].linkedTo,
                        remarks: data[i].remarks,
                        timestamp: block.timestamp
                    })
                );
                creditCardIndexById[nextCreditCardId] = creditCards.length - 1;
                nextCreditCardId++;
            } else {
                uint256 index = creditCardIndexById[data[i].id];
                require(index < creditCards.length, "Invalid credit card ID");

                CreditCard storage c = creditCards[index];
                if (bytes(data[i].name).length > 0) c.name = data[i].name;
                if (bytes(data[i].cardNumber).length > 0) c.cardNumber = data[i].cardNumber;
                if (bytes(data[i].cardHolder).length > 0) c.cardHolder = data[i].cardHolder;
                if (bytes(data[i].expiryDate).length > 0) c.expiryDate = data[i].expiryDate;
                if (bytes(data[i].cvv).length > 0) c.cvv = data[i].cvv;
                if (bytes(data[i].linkedTo).length > 0) c.linkedTo = data[i].linkedTo;
                if (bytes(data[i].remarks).length > 0) c.remarks = data[i].remarks;
                c.timestamp = block.timestamp;
            }
        }
    }

    function deleteCreditCards(uint256[] calldata ids) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 index = creditCardIndexById[id];
            require(index < creditCards.length, "Invalid credit card ID");

            uint256 lastIndex = creditCards.length - 1;
            if (index != lastIndex) {
                CreditCard storage last = creditCards[lastIndex];
                creditCards[index] = last;
                creditCardIndexById[last.id] = index;
            }
            creditCards.pop();
            delete creditCardIndexById[id];
        }
    }

    function readCreditCards() external view onlyOwner returns (CreditCard[] memory) {
        return creditCards;
    }

    receive() external payable {}
    fallback() external payable {}
}
