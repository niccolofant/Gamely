import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import GamelyMainCard from "./GamelyMainCard";
import GamelySmallCard from "./GamelySmallCard";
import GameCard from "./GameCard";
import { storage } from "../abi/FeesStorageABI";
import { gameFactory } from "../abi/GameFactoryABI";
import Web3 from "web3";
import authContext from "./authContext";

const web3 = new Web3(Web3.givenProvider);

//GameFactory contract config
const factoryAddress = "0x0576957cFb1C214E2Bb2B16560EdE2be512A6dc9";
const factoryContract = new web3.eth.Contract(gameFactory, factoryAddress);

//FeesStorage contract config
const storageAddress = "0xeAB4dD34Ddba1dC79BE807605C11294aBb5443c7";
const storageContract = new web3.eth.Contract(storage, storageAddress);

function GamelyApp() {
  const [games, setGames] = useState("");

  //const auth = useContext(authContext);
  //console.log(typeof Object.keys(games));
  useEffect(async () => {
    let game = await factoryContract.methods.getDeployedGames().call();
    setGames(game);
  });

  return (
    <Box sx={{ padding: "5vw" }}>
      <GamelyMainCard>
        <GamelySmallCard title="Games Created" number={games.length} />
        <GamelySmallCard title="Total ETHs won" number="10" />
      </GamelyMainCard>
      {Object.values(games).map((game) => {
        return <GameCard key={game} item={game} />;
      })}
    </Box>
  );
}

export default GamelyApp;

/*
 
      */
