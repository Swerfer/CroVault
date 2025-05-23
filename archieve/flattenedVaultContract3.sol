// Sources flattened with hardhat v2.23.0 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol@v5.3.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.3.0) (proxy/utils/Initializable.sol)

pragma solidity ^0.8.20;

/**
 * @dev This is a base contract to aid in writing upgradeable contracts, or any kind of contract that will be deployed
 * behind a proxy. Since proxied contracts do not make use of a constructor, it's common to move constructor logic to an
 * external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
 * function so it can only be called once. The {initializer} modifier provided by this contract will have this effect.
 *
 * The initialization functions use a version number. Once a version number is used, it is consumed and cannot be
 * reused. This mechanism prevents re-execution of each "step" but allows the creation of new initialization steps in
 * case an upgrade adds a module that needs to be initialized.
 *
 * For example:
 *
 * [.hljs-theme-light.nopadding]
 * ```solidity
 * contract MyToken is ERC20Upgradeable {
 *     function initialize() initializer public {
 *         __ERC20_init("MyToken", "MTK");
 *     }
 * }
 *
 * contract MyTokenV2 is MyToken, ERC20PermitUpgradeable {
 *     function initializeV2() reinitializer(2) public {
 *         __ERC20Permit_init("MyToken");
 *     }
 * }
 * ```
 *
 * TIP: To avoid leaving the proxy in an uninitialized state, the initializer function should be called as early as
 * possible by providing the encoded function call as the `_data` argument to {ERC1967Proxy-constructor}.
 *
 * CAUTION: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or to ensure
 * that all initializers are idempotent. This is not verified automatically as constructors are by Solidity.
 *
 * [CAUTION]
 * ====
 * Avoid leaving a contract uninitialized.
 *
 * An uninitialized contract can be taken over by an attacker. This applies to both a proxy and its implementation
 * contract, which may impact the proxy. To prevent the implementation contract from being used, you should invoke
 * the {_disableInitializers} function in the constructor to automatically lock it when it is deployed:
 *
 * [.hljs-theme-light.nopadding]
 * ```
 * /// @custom:oz-upgrades-unsafe-allow constructor
 * constructor() {
 *     _disableInitializers();
 * }
 * ```
 * ====
 */
abstract contract Initializable {
    /**
     * @dev Storage of the initializable contract.
     *
     * It's implemented on a custom ERC-7201 namespace to reduce the risk of storage collisions
     * when using with upgradeable contracts.
     *
     * @custom:storage-location erc7201:openzeppelin.storage.Initializable
     */
    struct InitializableStorage {
        /**
         * @dev Indicates that the contract has been initialized.
         */
        uint64 _initialized;
        /**
         * @dev Indicates that the contract is in the process of being initialized.
         */
        bool _initializing;
    }

    // keccak256(abi.encode(uint256(keccak256("openzeppelin.storage.Initializable")) - 1)) & ~bytes32(uint256(0xff))
    bytes32 private constant INITIALIZABLE_STORAGE = 0xf0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00;

    /**
     * @dev The contract is already initialized.
     */
    error InvalidInitialization();

    /**
     * @dev The contract is not initializing.
     */
    error NotInitializing();

    /**
     * @dev Triggered when the contract has been initialized or reinitialized.
     */
    event Initialized(uint64 version);

    /**
     * @dev A modifier that defines a protected initializer function that can be invoked at most once. In its scope,
     * `onlyInitializing` functions can be used to initialize parent contracts.
     *
     * Similar to `reinitializer(1)`, except that in the context of a constructor an `initializer` may be invoked any
     * number of times. This behavior in the constructor can be useful during testing and is not expected to be used in
     * production.
     *
     * Emits an {Initialized} event.
     */
    modifier initializer() {
        // solhint-disable-next-line var-name-mixedcase
        InitializableStorage storage $ = _getInitializableStorage();

        // Cache values to avoid duplicated sloads
        bool isTopLevelCall = !$._initializing;
        uint64 initialized = $._initialized;

        // Allowed calls:
        // - initialSetup: the contract is not in the initializing state and no previous version was
        //                 initialized
        // - construction: the contract is initialized at version 1 (no reinitialization) and the
        //                 current contract is just being deployed
        bool initialSetup = initialized == 0 && isTopLevelCall;
        bool construction = initialized == 1 && address(this).code.length == 0;

        if (!initialSetup && !construction) {
            revert InvalidInitialization();
        }
        $._initialized = 1;
        if (isTopLevelCall) {
            $._initializing = true;
        }
        _;
        if (isTopLevelCall) {
            $._initializing = false;
            emit Initialized(1);
        }
    }

    /**
     * @dev A modifier that defines a protected reinitializer function that can be invoked at most once, and only if the
     * contract hasn't been initialized to a greater version before. In its scope, `onlyInitializing` functions can be
     * used to initialize parent contracts.
     *
     * A reinitializer may be used after the original initialization step. This is essential to configure modules that
     * are added through upgrades and that require initialization.
     *
     * When `version` is 1, this modifier is similar to `initializer`, except that functions marked with `reinitializer`
     * cannot be nested. If one is invoked in the context of another, execution will revert.
     *
     * Note that versions can jump in increments greater than 1; this implies that if multiple reinitializers coexist in
     * a contract, executing them in the right order is up to the developer or operator.
     *
     * WARNING: Setting the version to 2**64 - 1 will prevent any future reinitialization.
     *
     * Emits an {Initialized} event.
     */
    modifier reinitializer(uint64 version) {
        // solhint-disable-next-line var-name-mixedcase
        InitializableStorage storage $ = _getInitializableStorage();

        if ($._initializing || $._initialized >= version) {
            revert InvalidInitialization();
        }
        $._initialized = version;
        $._initializing = true;
        _;
        $._initializing = false;
        emit Initialized(version);
    }

    /**
     * @dev Modifier to protect an initialization function so that it can only be invoked by functions with the
     * {initializer} and {reinitializer} modifiers, directly or indirectly.
     */
    modifier onlyInitializing() {
        _checkInitializing();
        _;
    }

    /**
     * @dev Reverts if the contract is not in an initializing state. See {onlyInitializing}.
     */
    function _checkInitializing() internal view virtual {
        if (!_isInitializing()) {
            revert NotInitializing();
        }
    }

    /**
     * @dev Locks the contract, preventing any future reinitialization. This cannot be part of an initializer call.
     * Calling this in the constructor of a contract will prevent that contract from being initialized or reinitialized
     * to any version. It is recommended to use this to lock implementation contracts that are designed to be called
     * through proxies.
     *
     * Emits an {Initialized} event the first time it is successfully executed.
     */
    function _disableInitializers() internal virtual {
        // solhint-disable-next-line var-name-mixedcase
        InitializableStorage storage $ = _getInitializableStorage();

        if ($._initializing) {
            revert InvalidInitialization();
        }
        if ($._initialized != type(uint64).max) {
            $._initialized = type(uint64).max;
            emit Initialized(type(uint64).max);
        }
    }

    /**
     * @dev Returns the highest version that has been initialized. See {reinitializer}.
     */
    function _getInitializedVersion() internal view returns (uint64) {
        return _getInitializableStorage()._initialized;
    }

    /**
     * @dev Returns `true` if the contract is currently initializing. See {onlyInitializing}.
     */
    function _isInitializing() internal view returns (bool) {
        return _getInitializableStorage()._initializing;
    }

    /**
     * @dev Pointer to storage slot. Allows integrators to override it with a custom storage location.
     *
     * NOTE: Consider following the ERC-7201 formula to derive storage locations.
     */
    function _initializableStorageSlot() internal pure virtual returns (bytes32) {
        return INITIALIZABLE_STORAGE;
    }

    /**
     * @dev Returns a pointer to the storage namespace.
     */
    // solhint-disable-next-line var-name-mixedcase
    function _getInitializableStorage() private pure returns (InitializableStorage storage $) {
        bytes32 slot = _initializableStorageSlot();
        assembly {
            $.slot := slot
        }
    }
}


// File @openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol@v5.3.0

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
abstract contract ContextUpgradeable is Initializable {
    function __Context_init() internal onlyInitializing {
    }

    function __Context_init_unchained() internal onlyInitializing {
    }
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


// File @openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol@v5.3.0

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
abstract contract OwnableUpgradeable is Initializable, ContextUpgradeable {
    /// @custom:storage-location erc7201:openzeppelin.storage.Ownable
    struct OwnableStorage {
        address _owner;
    }

    // keccak256(abi.encode(uint256(keccak256("openzeppelin.storage.Ownable")) - 1)) & ~bytes32(uint256(0xff))
    bytes32 private constant OwnableStorageLocation = 0x9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300;

    function _getOwnableStorage() private pure returns (OwnableStorage storage $) {
        assembly {
            $.slot := OwnableStorageLocation
        }
    }

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
    function __Ownable_init(address initialOwner) internal onlyInitializing {
        __Ownable_init_unchained(initialOwner);
    }

    function __Ownable_init_unchained(address initialOwner) internal onlyInitializing {
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
        OwnableStorage storage $ = _getOwnableStorage();
        return $._owner;
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
        OwnableStorage storage $ = _getOwnableStorage();
        address oldOwner = $._owner;
        $._owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


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


// File contracts/VaultContract3.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.28;
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
