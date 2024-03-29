// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./FeesStorage.sol";

contract GameFactory is Ownable {
    address[] public deployedGames;

    event GameCreated(Game game);

    /**
     * @dev Allows a player to instanciate a new game
     */
    function instanciateGame() external {
        address payable newGame = payable(
            address(new Game(msg.sender, payable(owner)))
        );
        deployedGames.push(newGame);
    }

    /**
     * @dev Returns an array containing all the deployed games
     */
    function getDeployedGames() external view returns (address[] memory) {
        return deployedGames;
    }
}

contract Game {
    address payable public owner;
    uint256 public prizePool;
    uint256 public bet;
    address payable public player1;
    address payable public player2;

    event Received(address sender, uint256 value);
    event GameCreated(address indexed player1, uint256 prizePool);
    event GameAccepted(
        address indexed player1,
        address indexed player2,
        uint256 prizePool
    );
    event GameEnded(address indexed winner, uint256 prizePool);
    event GameCancelled();

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You don't have the permissions to do this action."
        );
        _;
    }

    /**
     * @dev Throws if called by any account other than the game creator.
     */
    modifier onlyGameCreator() {
        require(
            msg.sender == player1,
            "You don't have the permissions to do this action."
        );
        _;
    }

    /**
     * @dev Throws if called when the game is already full.
     */
    modifier onlyIfPossible() {
        require(
            msg.sender != player2 && msg.sender != player1,
            "You are already in this game."
        );
        require(player2 == address(0), "Somebody is already in this game.");
        _;
    }

    /**
     * @dev The Game constructor sets `player1` of the Game to the `_gameCreator`
     * and the original `owner` of the contract to the address that deployed the GameFactory
     * @param _gameCreator The address of the account who created the Game
     * @param _owner The address of the owner of the GameFactory
     */
    constructor(address _gameCreator, address payable _owner) {
        owner = _owner;
        player1 = payable(_gameCreator);
    }

    /**
     * @dev Allows the account that instanciate the game to create the game, staking some ETHs
     */
    function createGame() external payable onlyGameCreator {
        require(msg.value > 0, "You must stake some ETHs.");
        prizePool += msg.value;
        bet = msg.value;
        emit GameCreated(player1, prizePool);
    }

    /**
     * @dev Fallback function
     */
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    /**
     * @dev Allows a player to join an existing challenge
     */
    function joinGame() external payable onlyIfPossible {
        require(
            msg.value == bet,
            "You must stake the same amount of ETHs as your opponent."
        );
        player2 = payable(msg.sender);
        prizePool += msg.value;
        emit GameAccepted(player1, player2, prizePool);
    }

    /**
     * @dev Allows the creator of the game to delete it, only if it hasn't already been accepted by an opponent
     */
    function deleteGame() external onlyGameCreator {
        require(
            player2 == address(0),
            "Game already accepted. You can't delete it."
        );
        (bool success, ) = player1.call{value: bet}("");
        require(success, "Transfer failed.");
        emit GameCancelled();
        selfdestruct(owner);
    }

    /**
     * @dev Declares the winner of the Game and resets state variables
     * @param _winner Address of the winner
     * @param _storageAddress Address of the account that store the fees
     */
    function declareWinner(
        address payable _winner,
        address payable _storageAddress
    ) external onlyOwner {
        require(player1 != address(0) && player2 != address(0));
        require(_winner == player1 || _winner == player2);
        uint256 fee = (prizePool / 100) * 2;
        _storeFees(payable(address(_storageAddress)), fee);
        (bool success, ) = _winner.call{value: prizePool - fee}("");
        require(success, "Transfer failed.");
        emit GameEnded(_winner, prizePool);
        //selfdestruct(owner);
    }

    /**
     * @dev Stores the fee's `_amount` to another contract at address `_storageAddress`
     * @param _storageAddress Address of the account that store the fees
     * @param _amount Amount of ETHs to store in the storage
     */
    function _storeFees(address payable _storageAddress, uint256 _amount)
        internal
    {
        (bool success, ) = _storageAddress.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    /**
     * @dev Allows the `owner` of the Factory to cancel the game and give back the bets
     */
    function cancelGame() external onlyOwner {
        if (player1 != address(0)) {
            (bool success, ) = player1.call{value: bet}("");
            require(success, "Transfer failed.");
        }
        if (player2 != address(0)) {
            (bool success, ) = player2.call{value: bet}("");
            require(success, "Transfer failed.");
        }
        emit GameCancelled();
        selfdestruct(owner);
    }
}
