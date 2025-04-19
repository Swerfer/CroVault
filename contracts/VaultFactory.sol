// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./CostManager.sol";
import "./VaultContract.sol";

/**
 * @title VaultFactory
 * @dev Deploys new vaults using minimal proxy clones of a pre-deployed VaultContract implementation.
 *      The user pays `vaultCreationCost` directly here, then that amount is forwarded to the clone's initializer.
 *      CostManager is set after deployment via setCostManager(...).
 */
contract VaultFactory is Ownable { 
    using Clones for address;

    CostManager public costManager;
    // The deployed implementation of VaultContract (immutable)
    address public immutable vaultImplementation;

    mapping(address => address) public ownerToVault; 

    event VaultCreated(address indexed vaultOwner, address indexed vault);
    event VaultInitFailed(address indexed owner, address indexed vault, string reason);

    modifier onlyOwnerOrAuthorized() {
        require(
            msg.sender == owner() || costManager.authorized(msg.sender),
            "Not owner or costManager authorized"
        );
        _;
    }

    /**
     * @dev The constructor takes the deployed VaultContract implementation.
     */
    constructor(address _vaultImplementation, address _costManager) Ownable(msg.sender) {
        require(_vaultImplementation != address(0), "Invalid implementation");
        vaultImplementation = _vaultImplementation;
        require(_costManager != address(0), "Invalid CostManager address");
        costManager = CostManager(payable(_costManager));
    }

    /**
     * @dev Creates a new vault clone.
     *      Checks that the caller sent the correct vaultCreationCost,
     *      then clones the implementation and calls its initializer.
     */
    function createVault() external payable {
        require(ownerToVault[msg.sender] == address(0), "Vault already exists");

        CostManager _cm = costManager;
        require(address(_cm) != address(0), "CostManager not set");

        uint256 requiredCost = _cm.vaultCreationCost();
        require(msg.value == requiredCost, "Incorrect vault creation cost");

        // Create the clone
        address clone = vaultImplementation.clone();

        // Initialize the clone.
        // The initializer is defined in VaultContract as:
        // function initialize(address _owner, address _costManager) external payable
        try VaultContract(payable(clone)).initialize{value: msg.value}(msg.sender, address(_cm)) {
            emit VaultCreated(msg.sender, clone);
            ownerToVault[msg.sender] = clone;
        } catch Error(string memory reason) {
            emit VaultInitFailed(msg.sender, clone, reason);
        } catch {
            emit VaultInitFailed(msg.sender, clone, "Unknown error");
        }
    }

    function transferVaultFactoryOwnership(address newOwner) external {
        require(msg.sender == costManager.owner(), "Not CostManager's owner");
        require(newOwner != address(0), "Invalid new owner");
        transferOwnership(newOwner);
    }
}
