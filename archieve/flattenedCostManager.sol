// Sources flattened with hardhat v2.23.0 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/utils/Context.sol@v5.3.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v5.3.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File contracts/CostManager.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.28;
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
    * @param _newCost Amount of CRO (e.g., 5000000000000000000 for 5 CRO).
    */
    function setVaultCreationCost(uint256 _newCost) external onlyOwnerOrAuthorized {
        uint256 costInWei = _newCost;
        emit VaultCreationCostUpdated(vaultCreationCost, costInWei);
        vaultCreationCost = costInWei;
    }

    /**
    * @dev Set the cost for upserts inside the vault (owner or authorized).
    * @param _newCost Amount of CRO (e.g., 5000000000000000000 for 5 CRO).
    */
    function setVaultUpsertCost(uint256 _newCost) external onlyOwnerOrAuthorized {
        uint256 costInWei = _newCost;
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
