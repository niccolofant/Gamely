// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./FeesStorage.sol";

contract GameFactory is Ownable {
    address[] public deployedGames;

    event GameCreated(Game game);

    /**
     * @dev Allows a player to create a new game
     */
    function createGame() external payable {
        require(msg.value > 0, "You must stake some ETHs.");

        address payable newGame = payable(address(new Game(msg.sender, owner)));
        (bool success, ) = newGame.call{value: msg.value}("");

        require(success, "Transfer failed.");

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
    address public owner;
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

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You don't have the permissions to do this action."
        );
        _;
    }

    modifier onlyGameCreator() {
        require(
            msg.sender == player1,
            "You don't have the permissions to do this action."
        );
        _;
    }

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
    constructor(address _gameCreator, address _owner) payable {
        owner = _owner;
        gameId = bytes32(
            keccak256(abi.encodePacked(_gameCreator, blockhash(block.number)))
        );
        player1 = payable(_gameCreator);
        emit GameCreated(gameId, player1, prizePool);
    }

    /**
     * @dev Fallback function
     */
    receive() external payable {
        prizePool += msg.value;
        bet = msg.value;
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
    function deleteGame() external payable onlyGameCreator {
        require(
            player2 == address(0),
            "Game already accepted. You can't delete it."
        );
        uint256 refundAmount = address(this).balance - bet;
        uint256 exceededAmount = address(this).balance - refundAmount;
        if (exceededAmount > 0) {
            (bool success, ) = owner.call{value: exceededAmount}("");
            require(success, "Transfer failed.");
        }
        selfdestruct(player1);
        emit GameCancelled(gameId);
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
        uint256 fee = (prizePool / 100) * 2;
        storeFees(payable(0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F), fee);
        (bool success, ) = _winner.call{value: prizePool - fee}("");

        require(success, "Transfer failed.");

        emit GameEnded(gameId, _winner, prizePool);

        //resetState();
    }

    /**
     * @dev Stores the fee's `_amount` to another contract
     * at address `_storageAddress`
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
    function cancelGame() external payable onlyOwner {
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

    /**
     * @dev Resets the Game
     */
    function resetState() internal {
        gameId = "";
        player1 = payable(address(0));
        player2 = payable(address(0));
        prizePool = 0;
        bet = 0;
    }
}
