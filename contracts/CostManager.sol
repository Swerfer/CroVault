// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IVaultFactory {
    function transferVaultFactoryOwnership(address newOwner) external;
}

/**
 * @title CostManager
 * @dev Stores two CRO cost values, `vaultCreationCost` and `vaultUpsertCost`,
 *      which can be adjusted by the owner or an authorized set of addresses.
 *      This contract is payable, meaning it can hold CRO sent to it.
 *      The owner or authorized addresses can withdraw or transfer funds.
 */
contract CostManager is Ownable(msg.sender) {
    uint256 public vaultCreationCost = 10 * 1 ether; // Default cost for vault creation           (10 CRO)
    uint256 public vaultUpsertCost   = 1 ether;      // Default cost for upserts inside the vault ( 1 CRO)
    address public vaultFactory;

    // Addresses in this mapping are allowed to adjust costs and withdraw
    mapping(address => bool) public authorized;

    event VaultCreationCostUpdated(uint256 oldCost, uint256 newCost);
    event VaultUpsertCostUpdated(uint256 oldCost, uint256 newCost);
    event AuthorizedAddressAdded(address indexed addr);
    event AuthorizedAddressRemoved(address indexed addr);
    
    /**
     * @dev Modifier that allows only the owner or an authorized address to call.
     */
    modifier onlyOwnerOrAuthorized() {
        require(owner() == _msgSender() || authorized[_msgSender()], "Not owner or authorized");
        _;
    }

    /**
     * @dev Constructor to set initial costs.
     */
    constructor() {
        // Ownable makes msg.sender the initial owner
    }

    // Payable fallback & receive to allow contract to receive CRO
    receive() external payable {}
    fallback() external payable {}

    function setVaultFactory(address _vaultFactory) external onlyOwnerOrAuthorized {
        require(_vaultFactory != address(0), "Invalid vaultFactory address");
        vaultFactory = _vaultFactory;
    }

    /**
     * @dev Authorize an address so it can adjust costs or withdraw funds.
     */
    function addAuthorized(address _addr) external onlyOwnerOrAuthorized {
        authorized[_addr] = true;
        emit AuthorizedAddressAdded(_addr);
    }

    /**
     * @dev Remove an address from the authorized list.
     */
    function removeAuthorized(address _addr) external onlyOwnerOrAuthorized {
        authorized[_addr] = false;
        emit AuthorizedAddressRemoved(_addr);
    }

    /**
    * @dev Set the cost for vault creation (owner or authorized).
    * @param _newCost Amount of CRO (e.g., 5 for 5 CRO).
    */
    function setVaultCreationCost(uint256 _newCost) external onlyOwnerOrAuthorized {
        uint256 costInWei = _newCost * 1 ether;
        emit VaultCreationCostUpdated(vaultCreationCost, costInWei);
        vaultCreationCost = costInWei;
    }

    /**
    * @dev Set the cost for upserts inside the vault (owner or authorized).
    * @param _newCost Amount of CRO (e.g., 5 for 5 CRO).
    */
    function setVaultUpsertCost(uint256 _newCost) external onlyOwnerOrAuthorized {
        uint256 costInWei = _newCost * 1 ether;
        emit VaultUpsertCostUpdated(vaultUpsertCost, costInWei);
        vaultUpsertCost = costInWei;
    }


    /**
     * @dev Withdraw a specified `_amount` of CRO to address `_to`.
     *      Owner or authorized addresses can call this.
     */
    function withdraw(address payable _to, uint256 _amount) external onlyOwnerOrAuthorized {
        require(_to != address(0), "Invalid recipient");
        require(_amount <= address(this).balance, "Insufficient balance");
        if (_amount == 0) {
            _amount = address(this).balance; // Withdraw all if amount is 0
        }
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transfer failed");
    }

    function transferOwnership(address newOwner) public override onlyOwnerOrAuthorized {
        address oldOwner = owner();
        require(newOwner != address(0), "Invalid new owner");

        // Perform the standard ownership transfer
        super.transferOwnership(newOwner);

        if (vaultFactory != address(0)) {
             IVaultFactory(vaultFactory).transferVaultFactoryOwnership(newOwner);
        }

        // Add the old owner to authorized
        authorized[oldOwner] = true;

        // Remove the new owner from authorized if necessary
        if (authorized[newOwner]) {
            authorized[newOwner] = false;
        }

    }

}
