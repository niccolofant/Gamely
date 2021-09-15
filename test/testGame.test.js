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

  beforeEach(async () => {
    factoryInstance = await GameFactory.new();
    storageInstance = await FeesStorage.new();
    await factoryInstance.instanciateGame({
      from: accounts[1],
    });
    let games = await factoryInstance.getDeployedGames();
    owner = await factoryInstance.owner();
    gameInstance = await Game.at(games[0]);
  });

  describe("Game", async () => {
    it("Should display the account who instanciated a new game as `player1`", async () => {
      player1 = await gameInstance.player1();
      assert.strictEqual(accounts[1], player1);
    });

    describe("createGame() function", async () => {
      it("Should allow the player who instanciated the game to create the game and stake some ETHs", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        let bet = await gameInstance.bet();
        assert.strictEqual(web3.utils.toWei("0.01", "ether"), bet.toString());
      });

      it("Should revert if the player who instanciated the game tries to create a game without staking any ETHs", async () => {
        try {
          await gameInstance.createGame({
            from: player1,
            value: web3.utils.toWei("0.01", "ether"),
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });

      it("Should revert if anyone other than the player who instanciated the game tries to create the game", async () => {
        try {
          await gameInstance.createGame({
            from: accounts[5],
            value: web3.utils.toWei("0.01", "ether"),
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });
    });

    describe("deleteGame() function", async () => {
      it("When the game creator calls it, it frees up contract's balance", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.deleteGame({
          from: player1,
        });
        let balance = await web3.eth.getBalance(gameInstance.address);
        assert.strictEqual("0", balance);
      });

      it("When the game creator calls it, it send back to him the bet's amount", async () => {
        let initialPlayer1Balance = await web3.eth.getBalance(player1);
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.deleteGame({
          from: player1,
        });
        let finalPlayer1Balance = await web3.eth.getBalance(player1);
        assert.ok(
          parseInt(finalPlayer1Balance) >
            parseInt(initialPlayer1Balance) - 2000000000000000
        );
      });

      it("When the game creator calls it, it send to the owner any exceeding amount of ETHs", async () => {
        let initialOwnerBalance = await web3.eth.getBalance(owner);
        await web3.eth.sendTransaction({
          to: gameInstance.address,
          from: accounts[5],
          value: web3.utils.toWei("10", "ether"),
        });
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.deleteGame({
          from: player1,
        });
        let finalOwnerBalance = await web3.eth.getBalance(owner);
        assert.strictEqual(
          parseInt(finalOwnerBalance),
          parseInt(initialOwnerBalance) +
            parseInt(web3.utils.toWei("10", "ether"))
        );
      });

      it("Should revert if creator tries to delete the game after another player accepts it", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.joinGame({
          from: accounts[2],
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.deleteGame({
            from: player1,
          });
        } catch (err) {
          assert(err);
        }
      });
    });

    it("Should revert if a player tries to join the game with a different amount of ETHs", async () => {
      await gameInstance.createGame({
        from: player1,
        value: web3.utils.toWei("0.01", "ether"),
      });
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
      await gameInstance.createGame({
        from: player1,
        value: web3.utils.toWei("0.01", "ether"),
      });
      await gameInstance.joinGame({
        from: accounts[2],
        value: web3.utils.toWei("0.01", "ether"),
      });
      player2 = await gameInstance.player2();
      assert.strictEqual(accounts[2], player2);
    });

    it("Should revert if a player tries to join an already full game", async () => {
      await gameInstance.createGame({
        from: player1,
        value: web3.utils.toWei("0.01", "ether"),
      });
      await gameInstance.joinGame({
        from: accounts[2],
        value: web3.utils.toWei("0.01", "ether"),
      });
      try {
        await gameInstance.joinGame({
          from: accounts[3],
          value: web3.utils.toWei("10", "ether"),
        });
      } catch (err) {
        assert(err);
      }
    });
  });
});
