import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import GamelyMainCard from "./GamelyMainCard";
import GamelySmallCard from "./GamelySmallCard";
import { storage } from "../abi/FeesStorageABI";
import { gameFactory } from "../abi/GameFactoryABI";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

//GameFactory contract config
const factoryAddress = "0x0576957cFb1C214E2Bb2B16560EdE2be512A6dc9";
const factoryContract = new web3.eth.Contract(gameFactory, factoryAddress);

//FeesStorage contract config
const storageAddress = "0xeAB4dD34Ddba1dC79BE807605C11294aBb5443c7";
const storageContract = new web3.eth.Contract(storage, storageAddress);

function GamelyApp() {
  const [error, setError] = useState(false);
  const [games, setGames] = useState("");

  useEffect(async () => {
    let game = await factoryContract.methods.getDeployedGames().call();
    setGames(game);
  });

  const setGame = async (t) => {
    t.preventDefault();

    const accounts = await web3.eth.getAccounts();

    if (accounts.length > 0) {
      const account = accounts[0];
      const post = await factoryContract.methods.instanciateGame().send({
        from: account,
        gas: "6000000",
      });
    } else {
      setError(true);
      console.log("loggati su metamamsk");
    }
  };

  return (
    <Box
      sx={{
        padding: "5vw",
      }}
    >
      <GamelyMainCard>
        <GamelySmallCard title="Games Created" number={games.length} />

        <GamelySmallCard title="Total ETHs won" number="10" />
      </GamelyMainCard>
    </Box>
  );
}

export default GamelyApp;

/*
<div className="main">
      <button onClick={setGame} type="button">
        create game
      </button>
      {games.length}

      {error ? <div> errore </div> : null}
    </div>
    */
