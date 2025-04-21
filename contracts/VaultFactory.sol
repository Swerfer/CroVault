// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./CostManager.sol";
import "./VaultContract.sol";

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
