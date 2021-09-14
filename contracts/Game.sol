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
    bytes32 public gameId;
    uint256 public prizePool;
    uint256 public bet;
    address payable public player1;
    address payable public player2;

    event Received(address sender, uint256 value);
    event GameCreated(
        bytes32 indexed gameId,
        address indexed player1,
        uint256 prizePool
    );
    event GameAccepted(
        bytes32 indexed gameId,
        address indexed player1,
        address indexed player2,
        uint256 prizePool
    );
    event GameEnded(
        bytes32 indexed gameId,
        address indexed winner,
        uint256 prizePool
    );
    event GameCancelled(bytes32 gameId);

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
    constructor(address _gameCreator, address payable _owner) payable {
        owner = _owner;
        gameId = bytes32(
            keccak256(abi.encodePacked(_gameCreator, blockhash(block.number)))
        );
        player1 = payable(_gameCreator);
        emit GameCreated(gameId, player1, prizePool);
    }

    /**
     * @dev Allows the account that instanciate the game to create the game, staking some ETHs
     */
    function createGame() external payable onlyGameCreator {
        require(msg.value > 0, "You must stake some ETHs.");
        prizePool += msg.value;
        bet = msg.value;
        emit GameCreated(gameId, player1, prizePool);
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
        emit GameAccepted(gameId, player1, player2, prizePool);
    }

    /**
     * @dev Allows the creator of the game to delete it, only if it hasn't already been accepted by an opponent
     */
    function deleteGame() external onlyGameCreator {
        require(
            player2 == address(0),
            "Game already accepted. You can't delete it."
        );
        uint256 exceededAmount = address(this).balance - bet;
        if (exceededAmount > 0) {
            (bool success, ) = owner.call{value: exceededAmount}("");
            require(success, "Transfer failed.");
        }
        emit GameCancelled(gameId);
        selfdestruct(player1);
    }

    /**
     * @dev Declares the winner of the Game and resets state variables
     * @param _winner Address of the winner
     */
    function _declareWinner(address payable _winner)
        external
        payable
        onlyOwner
    {
        require(gameId != "", "Game already ended.");
        require(_winner == player1 || _winner == player2);
        uint256 fee = (prizePool / 100) * 2;
        storeFees(
            payable(address(0xd9145CCE52D386f254917e481eB44e9943F39138)),
            fee
        );
        (bool success, ) = _winner.call{value: prizePool - fee}("");
        require(success, "Transfer failed.");

        emit GameEnded(gameId, _winner, prizePool);
    }

    /**
     * @dev Stores the fee's `_amount` to another contract at address `_storageAddress`
     */
    function storeFees(address payable _storageAddress, uint256 _amount)
        internal
    {
        (bool success, ) = _storageAddress.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    /**
     * @dev Allows the `owner` of the Factory to cancel the game and give back the bets
     */
    function cancelGame() external onlyOwner {
        require(gameId != "");

        if (player1 != address(0)) {
            (bool success, ) = player1.call{value: bet}("");
            require(success, "Transfer failed.");
        }
        if (player2 != address(0)) {
            (bool success, ) = player2.call{value: bet}("");
            require(success, "Transfer failed.");
        }
        selfdestruct(payable(owner));
    }
}
