// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IWorldID {
    /// @notice Reverts if the zero-knowledge proof is invalid.
    /// @param root The root of the Merkle tree
    /// @param group_id The group ID of the semaphore
    /// @param signal_hash The hash of the signal
    /// @param nullifier_hash The nullifier hash
    /// @param external_nullifier_hash The external nullifier hash
    /// @param proof The zero-knowledge proof
    function verifyProof(
        uint256 root,
        uint256 group_id,
        uint256 signal_hash,
        uint256 nullifier_hash,
        uint256 external_nullifier_hash,
        uint256[8] calldata proof
    ) external view;
}
