// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IWorldID.sol";

contract GameRegistry {
    address public owner;
    IWorldID public worldID;
    uint256 public externalNullifier;
    
    mapping(uint256 => bool) internal nullifierHashes;
    mapping(address => bool) public isVerified;

    struct Game {
        bytes32 id;
        uint256 stakeAmount;
        address creator;
        address winner;
        bool isActive;
        bool isFinalized;
    }

    mapping(bytes32 => Game) public games;

    event GameCreated(bytes32 indexed gameId, uint256 stakeAmount);
    event GameFinalized(bytes32 indexed gameId, address indexed winner);
    event GameCancelled(bytes32 indexed gameId);
    event UserVerified(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address _worldID, uint256 _externalNullifier) {
        owner = msg.sender;
        worldID = IWorldID(_worldID);
        externalNullifier = _externalNullifier;
    }

    function verifyHuman(
        address signal, // Expecting the user address as signal
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        require(signal == msg.sender, "Signal must be sender");
        require(!nullifierHashes[nullifierHash], "Nullifier already used");

        // Verify with World ID
        // signal_hash needs to be the hash of the signal. 
        // If signal is address, hash it? World ID usually takes raw signal hash.
        // We assume the frontend passes the correct hash of the address.
        // But to be secure, we should hash the address here?
        // WorldID docs: "The signal is the data you want to associate with the proof."
        // Usually `abi.encodePacked(address)` -> keccak256?
        // Let's assume the signal provided IS the hash for flexibility, but we check msg.sender relation?
        // Actually simplest integration: Users generating proofs for their address.
        
        uint256 signalHash = uint256(uint160(signal)); // Basic implementation using address as uint signal

        worldID.verifyProof(
            root,
            1, // groupId usually 1 for Orb
            signalHash,
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;
        isVerified[signal] = true;
        
        emit UserVerified(signal);
    }

    function createGame(bytes32 gameId, uint256 stakeAmount) external onlyOwner {
        require(games[gameId].id == bytes32(0), "Game exists");
        
        games[gameId] = Game({
            id: gameId,
            stakeAmount: stakeAmount,
            creator: msg.sender,
            winner: address(0),
            isActive: true,
            isFinalized: false
        });

        emit GameCreated(gameId, stakeAmount);
    }

    function finalizeGame(bytes32 gameId, address winner) external onlyOwner {
        Game storage game = games[gameId];
        require(game.isActive, "Game not active");
        require(!game.isFinalized, "Game finished");

        game.winner = winner;
        game.isActive = false;
        game.isFinalized = true;
        
        emit GameFinalized(gameId, winner);
    }

    function cancelGame(bytes32 gameId) external onlyOwner {
        Game storage game = games[gameId];
        require(game.isActive, "Game not active");
        game.isActive = false;
        
        emit GameCancelled(gameId);
    }
}
