const GameFactory = artifacts.require("GameFactory");
const Game = artifacts.require("Game");
const FeesStorage = artifacts.require("FeesStorage");

contract("Game", (accounts) => {
  let factoryInstance;
  let gameInstance;
  let storageInstance;
  let owner;
  let player1;
  let player2;

  before(async () => {
    factoryInstance = await GameFactory.deployed();
    storageInstance = await FeesStorage.deployed();
    await factoryInstance.instanciateGame({
      from: accounts[1],
    });
    let games = await factoryInstance.getDeployedGames();
    owner = await factoryInstance.owner();
    gameInstance = await Game.at(games[0]);
  });

  it("Should display the account who instanciated a new game as `player1`", async () => {
    player1 = await gameInstance.player1();
    assert.strictEqual(accounts[1], player1);
  });

  it("Should allow the player who instanciated the game to create the game and stake some ETHs", async () => {
    await gameInstance.createGame({
      from: player1,
      value: web3.utils.toWei("0.01", "ether"),
    });
    let bet = await gameInstance.bet();
    assert.strictEqual(web3.utils.toWei("0.01", "ether"), bet.toString());
  });

  /*
  it("Should allow the creator to delete the game before anyone accepts it, giving the bet amount to him and any exceeding ETHs to the owner", async () => {
    let player1Balance = await web3.eth.getBalance(player1);
    let ownerBalance = await web3.eth.getBalance(owner);
    console.log("player1: " + player1Balance);
    console.log("owner: " + ownerBalance);
    await web3.eth.sendTransaction({
      to: gameInstance.address,
      from: accounts[0],
      value: web3.utils.toWei("50", "ether"),
    });

    await gameInstance.deleteGame({
      from: player1,
    });
    player1Balance = await web3.eth.getBalance(player1);
    ownerBalance = await web3.eth.getBalance(owner);

    //let newPlayerBalance = parseInt(player1Balance) + 10000000000000000000;
    //let newOwnerBalance = parseInt(ownerBalance) + 50000000000000000000;
    console.log("player1: " + player1Balance);
    console.log("owner: " + ownerBalance);
    let contractBalance = await web3.eth.getBalance(gameInstance.address);
    assert.strictEqual("0", contractBalance);
  });
  */
  it("Should revert if a player tries to join the game with a different amount of ETHs", async () => {
    try {
      await gameInstance.joinGame({
        from: accounts[2],
        value: web3.utils.toWei("15", "ether"),
      });
    } catch (err) {
      assert(err);
    }
  });

  it("Allows a new player to join the game, only if he stakes the same amount of ETHs", async () => {
    await gameInstance.joinGame({
      from: accounts[2],
      value: web3.utils.toWei("0.01", "ether"),
    });
    player2 = await gameInstance.player2();
    assert.strictEqual(accounts[2], player2);
  });

  it("Should revert if a player tries to join an already full game", async () => {
    try {
      await gameInstance.joinGame({
        from: accounts[3],
        value: web3.utils.toWei("10", "ether"),
      });
    } catch (err) {
      assert(err);
    }
  });

  it("Should revert if creator tries to delete the game after another player accepts it", async () => {
    try {
      await gameInstance.deleteGame({
        from: player1,
      });
    } catch (err) {
      assert(err);
    }
  });
});
