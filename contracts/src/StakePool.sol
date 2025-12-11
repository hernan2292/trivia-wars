// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";

contract StakePool {
    address public owner;
    address public gameRegistry;
    IERC20 public usdcToken;

    mapping(address => uint256) public balances;
    mapping(bytes32 => uint256) public gamePools;

    event Deposit(bytes32 indexed gameId, address indexed user, uint256 amount);
    event PrizeDistributed(bytes32 indexed gameId, address indexed winner, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    modifier onlyRegistryOrOwner() {
        require(msg.sender == gameRegistry || msg.sender == owner, "Unauthorized");
        _;
    }

    constructor(address _usdcToken) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcToken);
    }

    function setGameRegistry(address _registry) external {
        require(msg.sender == owner, "Only owner");
        gameRegistry = _registry;
    }

    // Depositar stake para entrar a un juego
    function depositStake(bytes32 gameId, uint256 amount) external {
        require(amount > 0, "No stake provided");
        require(usdcToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        gamePools[gameId] += amount;
        emit Deposit(gameId, msg.sender, amount);
    }

    // Distribuir premios al finalizar juego
    function distributePrizes(bytes32 gameId, address[] calldata winners, uint256[] calldata amounts) external onlyRegistryOrOwner {
        for (uint256 i = 0; i < winners.length; i++) {
            balances[winners[i]] += amounts[i];
            emit PrizeDistributed(gameId, winners[i], amounts[i]);
        }
    }

    // Retirar ganancias acumuladas
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");
        balances[msg.sender] = 0; // Prevent reentrancy
        
        require(usdcToken.transfer(msg.sender, amount), "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
