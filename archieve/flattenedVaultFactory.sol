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


// File @openzeppelin/contracts/utils/Errors.sol@v5.3.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.1.0) (utils/Errors.sol)

pragma solidity ^0.8.20;

/**
 * @dev Collection of common custom errors used in multiple contracts
 *
 * IMPORTANT: Backwards compatibility is not guaranteed in future versions of the library.
 * It is recommended to avoid relying on the error API for critical functionality.
 *
 * _Available since v5.1._
 */
library Errors {
    /**
     * @dev The ETH balance of the account is not enough to perform the operation.
     */
    error InsufficientBalance(uint256 balance, uint256 needed);

    /**
     * @dev A call to an address target failed. The target may have reverted.
     */
    error FailedCall();

    /**
     * @dev The deployment failed.
     */
    error FailedDeployment();

    /**
     * @dev A necessary precompile is missing.
     */
    error MissingPrecompile(address);
}


// File @openzeppelin/contracts/utils/Create2.sol@v5.3.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.1.0) (utils/Create2.sol)

pragma solidity ^0.8.20;

/**
 * @dev Helper to make usage of the `CREATE2` EVM opcode easier and safer.
 * `CREATE2` can be used to compute in advance the address where a smart
 * contract will be deployed, which allows for interesting new mechanisms known
 * as 'counterfactual interactions'.
 *
 * See the https://eips.ethereum.org/EIPS/eip-1014#motivation[EIP] for more
 * information.
 */
library Create2 {
    /**
     * @dev There's no code to deploy.
     */
    error Create2EmptyBytecode();

    /**
     * @dev Deploys a contract using `CREATE2`. The address where the contract
     * will be deployed can be known in advance via {computeAddress}.
     *
     * The bytecode for a contract can be obtained from Solidity with
     * `type(contractName).creationCode`.
     *
     * Requirements:
     *
     * - `bytecode` must not be empty.
     * - `salt` must have not been used for `bytecode` already.
     * - the factory must have a balance of at least `amount`.
     * - if `amount` is non-zero, `bytecode` must have a `payable` constructor.
     */
    function deploy(uint256 amount, bytes32 salt, bytes memory bytecode) internal returns (address addr) {
        if (address(this).balance < amount) {
            revert Errors.InsufficientBalance(address(this).balance, amount);
        }
        if (bytecode.length == 0) {
            revert Create2EmptyBytecode();
        }
        assembly ("memory-safe") {
            addr := create2(amount, add(bytecode, 0x20), mload(bytecode), salt)
            // if no address was created, and returndata is not empty, bubble revert
            if and(iszero(addr), not(iszero(returndatasize()))) {
                let p := mload(0x40)
                returndatacopy(p, 0, returndatasize())
                revert(p, returndatasize())
            }
        }
        if (addr == address(0)) {
            revert Errors.FailedDeployment();
        }
    }

    /**
     * @dev Returns the address where a contract will be stored if deployed via {deploy}. Any change in the
     * `bytecodeHash` or `salt` will result in a new destination address.
     */
    function computeAddress(bytes32 salt, bytes32 bytecodeHash) internal view returns (address) {
        return computeAddress(salt, bytecodeHash, address(this));
    }

    /**
     * @dev Returns the address where a contract will be stored if deployed via {deploy} from a contract located at
     * `deployer`. If `deployer` is this contract's address, returns the same value as {computeAddress}.
     */
    function computeAddress(bytes32 salt, bytes32 bytecodeHash, address deployer) internal pure returns (address addr) {
        assembly ("memory-safe") {
            let ptr := mload(0x40) // Get free memory pointer

            // |                   | Γåô ptr ...  Γåô ptr + 0x0B (start) ...  Γåô ptr + 0x20 ...  Γåô ptr + 0x40 ...   |
            // |-------------------|---------------------------------------------------------------------------|
            // | bytecodeHash      |                                                        CCCCCCCCCCCCC...CC |
            // | salt              |                                      BBBBBBBBBBBBB...BB                   |
            // | deployer          | 000000...0000AAAAAAAAAAAAAAAAAAA...AA                                     |
            // | 0xFF              |            FF                                                             |
            // |-------------------|---------------------------------------------------------------------------|
            // | memory            | 000000...00FFAAAAAAAAAAAAAAAAAAA...AABBBBBBBBBBBBB...BBCCCCCCCCCCCCC...CC |
            // | keccak(start, 85) |            ΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæΓåæ |

            mstore(add(ptr, 0x40), bytecodeHash)
            mstore(add(ptr, 0x20), salt)
            mstore(ptr, deployer) // Right-aligned with 12 preceding garbage bytes
            let start := add(ptr, 0x0b) // The hashed data starts at the final garbage byte which we will set to 0xff
            mstore8(start, 0xff)
            addr := and(keccak256(start, 85), 0xffffffffffffffffffffffffffffffffffffffff)
        }
    }
}


// File @openzeppelin/contracts/proxy/Clones.sol@v5.3.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.3.0) (proxy/Clones.sol)

pragma solidity ^0.8.20;


/**
 * @dev https://eips.ethereum.org/EIPS/eip-1167[ERC-1167] is a standard for
 * deploying minimal proxy contracts, also known as "clones".
 *
 * > To simply and cheaply clone contract functionality in an immutable way, this standard specifies
 * > a minimal bytecode implementation that delegates all calls to a known, fixed address.
 *
 * The library includes functions to deploy a proxy using either `create` (traditional deployment) or `create2`
 * (salted deterministic deployment). It also includes functions to predict the addresses of clones deployed using the
 * deterministic method.
 */
library Clones {
    error CloneArgumentsTooLong();

    /**
     * @dev Deploys and returns the address of a clone that mimics the behavior of `implementation`.
     *
     * This function uses the create opcode, which should never revert.
     */
    function clone(address implementation) internal returns (address instance) {
        return clone(implementation, 0);
    }

    /**
     * @dev Same as {xref-Clones-clone-address-}[clone], but with a `value` parameter to send native currency
     * to the new contract.
     *
     * NOTE: Using a non-zero value at creation will require the contract using this function (e.g. a factory)
     * to always have enough balance for new deployments. Consider exposing this function under a payable method.
     */
    function clone(address implementation, uint256 value) internal returns (address instance) {
        if (address(this).balance < value) {
            revert Errors.InsufficientBalance(address(this).balance, value);
        }
        assembly ("memory-safe") {
            // Cleans the upper 96 bits of the `implementation` word, then packs the first 3 bytes
            // of the `implementation` address with the bytecode before the address.
            mstore(0x00, or(shr(0xe8, shl(0x60, implementation)), 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000))
            // Packs the remaining 17 bytes of `implementation` with the bytecode after the address.
            mstore(0x20, or(shl(0x78, implementation), 0x5af43d82803e903d91602b57fd5bf3))
            instance := create(value, 0x09, 0x37)
        }
        if (instance == address(0)) {
            revert Errors.FailedDeployment();
        }
    }

    /**
     * @dev Deploys and returns the address of a clone that mimics the behavior of `implementation`.
     *
     * This function uses the create2 opcode and a `salt` to deterministically deploy
     * the clone. Using the same `implementation` and `salt` multiple times will revert, since
     * the clones cannot be deployed twice at the same address.
     */
    function cloneDeterministic(address implementation, bytes32 salt) internal returns (address instance) {
        return cloneDeterministic(implementation, salt, 0);
    }

    /**
     * @dev Same as {xref-Clones-cloneDeterministic-address-bytes32-}[cloneDeterministic], but with
     * a `value` parameter to send native currency to the new contract.
     *
     * NOTE: Using a non-zero value at creation will require the contract using this function (e.g. a factory)
     * to always have enough balance for new deployments. Consider exposing this function under a payable method.
     */
    function cloneDeterministic(
        address implementation,
        bytes32 salt,
        uint256 value
    ) internal returns (address instance) {
        if (address(this).balance < value) {
            revert Errors.InsufficientBalance(address(this).balance, value);
        }
        assembly ("memory-safe") {
            // Cleans the upper 96 bits of the `implementation` word, then packs the first 3 bytes
            // of the `implementation` address with the bytecode before the address.
            mstore(0x00, or(shr(0xe8, shl(0x60, implementation)), 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000))
            // Packs the remaining 17 bytes of `implementation` with the bytecode after the address.
            mstore(0x20, or(shl(0x78, implementation), 0x5af43d82803e903d91602b57fd5bf3))
            instance := create2(value, 0x09, 0x37, salt)
        }
        if (instance == address(0)) {
            revert Errors.FailedDeployment();
        }
    }

    /**
     * @dev Computes the address of a clone deployed using {Clones-cloneDeterministic}.
     */
    function predictDeterministicAddress(
        address implementation,
        bytes32 salt,
        address deployer
    ) internal pure returns (address predicted) {
        assembly ("memory-safe") {
            let ptr := mload(0x40)
            mstore(add(ptr, 0x38), deployer)
            mstore(add(ptr, 0x24), 0x5af43d82803e903d91602b57fd5bf3ff)
            mstore(add(ptr, 0x14), implementation)
            mstore(ptr, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73)
            mstore(add(ptr, 0x58), salt)
            mstore(add(ptr, 0x78), keccak256(add(ptr, 0x0c), 0x37))
            predicted := and(keccak256(add(ptr, 0x43), 0x55), 0xffffffffffffffffffffffffffffffffffffffff)
        }
    }

    /**
     * @dev Computes the address of a clone deployed using {Clones-cloneDeterministic}.
     */
    function predictDeterministicAddress(
        address implementation,
        bytes32 salt
    ) internal view returns (address predicted) {
        return predictDeterministicAddress(implementation, salt, address(this));
    }

    /**
     * @dev Deploys and returns the address of a clone that mimics the behavior of `implementation` with custom
     * immutable arguments. These are provided through `args` and cannot be changed after deployment. To
     * access the arguments within the implementation, use {fetchCloneArgs}.
     *
     * This function uses the create opcode, which should never revert.
     */
    function cloneWithImmutableArgs(address implementation, bytes memory args) internal returns (address instance) {
        return cloneWithImmutableArgs(implementation, args, 0);
    }

    /**
     * @dev Same as {xref-Clones-cloneWithImmutableArgs-address-bytes-}[cloneWithImmutableArgs], but with a `value`
     * parameter to send native currency to the new contract.
     *
     * NOTE: Using a non-zero value at creation will require the contract using this function (e.g. a factory)
     * to always have enough balance for new deployments. Consider exposing this function under a payable method.
     */
    function cloneWithImmutableArgs(
        address implementation,
        bytes memory args,
        uint256 value
    ) internal returns (address instance) {
        if (address(this).balance < value) {
            revert Errors.InsufficientBalance(address(this).balance, value);
        }
        bytes memory bytecode = _cloneCodeWithImmutableArgs(implementation, args);
        assembly ("memory-safe") {
            instance := create(value, add(bytecode, 0x20), mload(bytecode))
        }
        if (instance == address(0)) {
            revert Errors.FailedDeployment();
        }
    }

    /**
     * @dev Deploys and returns the address of a clone that mimics the behavior of `implementation` with custom
     * immutable arguments. These are provided through `args` and cannot be changed after deployment. To
     * access the arguments within the implementation, use {fetchCloneArgs}.
     *
     * This function uses the create2 opcode and a `salt` to deterministically deploy the clone. Using the same
     * `implementation`, `args` and `salt` multiple times will revert, since the clones cannot be deployed twice
     * at the same address.
     */
    function cloneDeterministicWithImmutableArgs(
        address implementation,
        bytes memory args,
        bytes32 salt
    ) internal returns (address instance) {
        return cloneDeterministicWithImmutableArgs(implementation, args, salt, 0);
    }

    /**
     * @dev Same as {xref-Clones-cloneDeterministicWithImmutableArgs-address-bytes-bytes32-}[cloneDeterministicWithImmutableArgs],
     * but with a `value` parameter to send native currency to the new contract.
     *
     * NOTE: Using a non-zero value at creation will require the contract using this function (e.g. a factory)
     * to always have enough balance for new deployments. Consider exposing this function under a payable method.
     */
    function cloneDeterministicWithImmutableArgs(
        address implementation,
        bytes memory args,
        bytes32 salt,
        uint256 value
    ) internal returns (address instance) {
        bytes memory bytecode = _cloneCodeWithImmutableArgs(implementation, args);
        return Create2.deploy(value, salt, bytecode);
    }

    /**
     * @dev Computes the address of a clone deployed using {Clones-cloneDeterministicWithImmutableArgs}.
     */
    function predictDeterministicAddressWithImmutableArgs(
        address implementation,
        bytes memory args,
        bytes32 salt,
        address deployer
    ) internal pure returns (address predicted) {
        bytes memory bytecode = _cloneCodeWithImmutableArgs(implementation, args);
        return Create2.computeAddress(salt, keccak256(bytecode), deployer);
    }

    /**
     * @dev Computes the address of a clone deployed using {Clones-cloneDeterministicWithImmutableArgs}.
     */
    function predictDeterministicAddressWithImmutableArgs(
        address implementation,
        bytes memory args,
        bytes32 salt
    ) internal view returns (address predicted) {
        return predictDeterministicAddressWithImmutableArgs(implementation, args, salt, address(this));
    }

    /**
     * @dev Get the immutable args attached to a clone.
     *
     * - If `instance` is a clone that was deployed using `clone` or `cloneDeterministic`, this
     *   function will return an empty array.
     * - If `instance` is a clone that was deployed using `cloneWithImmutableArgs` or
     *   `cloneDeterministicWithImmutableArgs`, this function will return the args array used at
     *   creation.
     * - If `instance` is NOT a clone deployed using this library, the behavior is undefined. This
     *   function should only be used to check addresses that are known to be clones.
     */
    function fetchCloneArgs(address instance) internal view returns (bytes memory) {
        bytes memory result = new bytes(instance.code.length - 45); // revert if length is too short
        assembly ("memory-safe") {
            extcodecopy(instance, add(result, 32), 45, mload(result))
        }
        return result;
    }

    /**
     * @dev Helper that prepares the initcode of the proxy with immutable args.
     *
     * An assembly variant of this function requires copying the `args` array, which can be efficiently done using
     * `mcopy`. Unfortunately, that opcode is not available before cancun. A pure solidity implementation using
     * abi.encodePacked is more expensive but also more portable and easier to review.
     *
     * NOTE: https://eips.ethereum.org/EIPS/eip-170[EIP-170] limits the length of the contract code to 24576 bytes.
     * With the proxy code taking 45 bytes, that limits the length of the immutable args to 24531 bytes.
     */
    function _cloneCodeWithImmutableArgs(
        address implementation,
        bytes memory args
    ) private pure returns (bytes memory) {
        if (args.length > 24531) revert CloneArgumentsTooLong();
        return
            abi.encodePacked(
                hex"61",
                uint16(args.length + 45),
                hex"3d81600a3d39f3363d3d373d3d3d363d73",
                implementation,
                hex"5af43d82803e903d91602b57fd5bf3",
                args
            );
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


// File contracts/VaultContract.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.28;
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


// File contracts/VaultFactory.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.28;
interface IVaultReadable {
    function getVaultsByOwner(address user) external view returns (bytes32[] memory);
}

contract VaultFactory is Ownable {
    using Clones for address;

    CostManager public costManager;

    struct VaultImplementation {
        address implementation;
        bool isImmutable;
    }

    VaultImplementation[] public implementations;

    mapping(address => address[]) public ownerToVaults;

    event VaultCreated(address indexed vaultOwner, address indexed vault, uint256 implementationIndex);
    event VaultInitFailed(address indexed owner, address indexed vault, string reason);
    event VaultImplementationAdded(address implementation);
    event VaultImplementationUpdated(uint256 index, address oldImpl, address newImpl);
    event VaultImplementationLocked(uint256 index);

    modifier onlyOwnerOrAuthorized() {
        require(
            msg.sender == owner() || costManager.authorized(msg.sender),
            "Not owner or costManager authorized"
        );
        _;
    }

    constructor(address _initialImplementation, address _costManager) Ownable(msg.sender) {
        require(_initialImplementation != address(0), "Invalid implementation");
        implementations.push(VaultImplementation(_initialImplementation, false));
        require(_costManager != address(0), "Invalid CostManager address");
        costManager = CostManager(payable(_costManager));
        emit VaultImplementationAdded(_initialImplementation);
    }

    // === Implementation Management ===

    function addVaultImplementation(address newImpl) external onlyOwnerOrAuthorized {
        require(newImpl != address(0), "Invalid address");
        implementations.push(VaultImplementation(newImpl, false));
        emit VaultImplementationAdded(newImpl);
    }

    function updateVaultImplementation(uint256 index, address newImpl) external onlyOwnerOrAuthorized {
        require(index < implementations.length, "Invalid index");
        require(!implementations[index].isImmutable, "Implementation is locked");
        require(newImpl != address(0), "Invalid address");

        address oldImpl = implementations[index].implementation;
        implementations[index].implementation = newImpl;
        emit VaultImplementationUpdated(index, oldImpl, newImpl);
    }

    function deleteVaultImplementation(uint256 index) external onlyOwnerOrAuthorized {
        require(index < implementations.length, "Invalid index");
        require(!implementations[index].isImmutable, "Cannot delete immutable implementation");

        implementations[index].implementation = address(0);
    }

    function lockVaultImplementation(uint256 index) external onlyOwnerOrAuthorized {
        require(index < implementations.length, "Invalid index");
        implementations[index].isImmutable = true;
        emit VaultImplementationLocked(index);
    }

    function getVaultImplementations() external view returns (VaultImplementation[] memory) {
        return implementations;
    }

    // === Create vaults for all implementations ===

    function createVaultsForAllImplementations() external payable {
        uint256 alreadyCreated = ownerToVaults[msg.sender].length;
        require(alreadyCreated < implementations.length, "All vaults already exist");
        
        CostManager _cm = costManager;
        require(address(_cm) != address(0), "CostManager not set");

        uint256 costPerVault = _cm.vaultCreationCost();
        require(msg.value == costPerVault, "Incorrect vault creation cost");

        for (uint256 i = alreadyCreated; i < implementations.length; i++) {
            address impl = implementations[i].implementation;
            if (impl == address(0)) continue;

            address clone = impl.clone();

            try VaultContract(payable(clone)).initialize{value: costPerVault}(msg.sender, address(_cm)) {
                ownerToVaults[msg.sender].push(clone);
                emit VaultCreated(msg.sender, clone, i);
            } catch Error(string memory reason) {
                emit VaultInitFailed(msg.sender, clone, reason);
            } catch {
                emit VaultInitFailed(msg.sender, clone, "Unknown error");
            }
        }
    }

    function getVaultsByOwner(address user) external view returns (address[] memory) {
        return ownerToVaults[user];
    }

    function addVaultForUser(address user, address vault) external onlyOwnerOrAuthorized {
        require(user != address(0), "Invalid user");
        require(vault != address(0), "Invalid vault");
        ownerToVaults[user].push(vault);
    }

    function transferVaultFactoryOwnership(address newOwner) external {
        require(msg.sender == costManager.owner(), "Not CostManager's owner");
        require(newOwner != address(0), "Invalid new owner");
        transferOwnership(newOwner);
    }

}
