// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";

contract StreakRewards {
    address public owner;
    address public gameRegistry;
    IERC20 public usdcToken;
    
    struct Streak {
        uint256 currentStreak;
        uint256 maxStreak;
    }

    mapping(address => Streak) public userStreaks;

    event StreakUpdated(address indexed user, uint256 currentStreak);
    event BonusDistributed(address indexed user, uint256 amount);

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

    // Registrar victoria y actualizar racha
    function recordWin(address user) external onlyRegistryOrOwner {
        Streak storage s = userStreaks[user];
        s.currentStreak += 1;
        if (s.currentStreak > s.maxStreak) {
            s.maxStreak = s.currentStreak;
        }
        emit StreakUpdated(user, s.currentStreak);
    }
    
    function resetStreak(address user) external onlyRegistryOrOwner {
         Streak storage s = userStreaks[user];
         s.currentStreak = 0;
         emit StreakUpdated(user, 0);
    }

    // Calcular bonus según racha
    // Asumiendo USDC con 6 decimales
    function calculateBonus(address user) public view returns (uint256) {
        uint256 streak = userStreaks[user].currentStreak;
        if (streak == 5) return 500000;      // $0.50
        if (streak == 10) return 2000000;    // $2.00
        if (streak == 20) return 5000000;    // $5.00
        if (streak == 50) return 20000000;   // $20.00
        return 0;
    }
    
    // Distribuir bonus
    function distributeBonus(address user) external onlyRegistryOrOwner {
        uint256 bonus = calculateBonus(user);
        if (bonus > 0) {
            require(usdcToken.balanceOf(address(this)) >= bonus, "Insufficient reward pool");
            require(usdcToken.transfer(user, bonus), "Transfer failed");
            emit BonusDistributed(user, bonus);
        }
    }
    
    // Allow deposit to refill pool
    function depositRewards(uint256 amount) external {
        require(usdcToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }
}
