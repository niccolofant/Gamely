import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import GamelyMainCard from "./GamelyMainCard";
import GamelySmallCard from "./GamelySmallCard";
import GameCard from "./GameCard";
import { storage } from "../abi/FeesStorageABI";
import { gameFactory } from "../abi/GameFactoryABI";
import { game } from "../abi/GameABI";
import Web3 from "web3";
import authContext from "./authContext";

const web3 = new Web3(Web3.givenProvider);

const factoryAddress = "0x0576957cFb1C214E2Bb2B16560EdE2be512A6dc9";
const factoryContract = new web3.eth.Contract(gameFactory, factoryAddress);

function GamelyApp() {
  const [games, setGames] = useState("");

  useEffect(async () => {
    let game = await factoryContract.methods.getDeployedGames().call();
    setGames(game);
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
          return <GameCard key={game} item={game} />;
        })}
      </Box>
    </Box>
  );
}

export default GamelyApp;
