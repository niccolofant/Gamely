import { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import GamelyMainCard from "./GamelyMainCard";
import GamelySmallCard from "./GamelySmallCard";
import GameCard from "./GameCard";
import { storage } from "../abi/FeesStorageABI";
import { gameFactory } from "../abi/GameFactoryABI";
import { game } from "../abi/GameABI";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const factoryAddress = "0x0576957cFb1C214E2Bb2B16560EdE2be512A6dc9";
const factoryContract = new web3.eth.Contract(gameFactory, factoryAddress);

function GamelyApp() {
  const [games, setGames] = useState("");
  const [creator, setCreator] = useState("");

  const getCreator = async (gameAddress) => {
    const gameContract = new web3.eth.Contract(game, gameAddress);
    const gameCreator = await gameContract.methods.player1().call();
    return gameCreator;
  };

  useEffect(async () => {
    let games = await factoryContract.methods.getDeployedGames().call();
    for (const game of games) {
      const gameCreator = await getCreator(game);
      setCreator(gameCreator);
    }

    setGames(games);
  });

  return (
    <Box sx={{ padding: "5vw" }}>
      <Box sx={{ margin: "0 0 10vw 0" }}>
        <GamelyMainCard>
          <GamelySmallCard title="Games Created" number={games.length} />
          <GamelySmallCard title="Total ETHs won" number="10" />
        </GamelyMainCard>
      </Box>
      <Box>
        <Typography
          sx={{ fontFamily: "Roboto Mono", color: "#777", fontWeight: "300" }}
        >
          Available games ({games.length})
        </Typography>
        {Object.values(games).map((game) => {
          return <GameCard key={game} item={game} creator={creator} />;
        })}
      </Box>
    </Box>
  );
}

export default GamelyApp;
