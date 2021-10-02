import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography, Alert, AlertTitle } from "@mui/material";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import { gameFactory } from "../abi/GameFactoryABI";
import Web3 from "web3";
import authContext from "./authContext";

const web3 = new Web3(Web3.givenProvider);

//GameFactory contract config
const factoryAddress = "0x0576957cFb1C214E2Bb2B16560EdE2be512A6dc9";
const factoryContract = new web3.eth.Contract(gameFactory, factoryAddress);

const CustomButtonRoot = styled("button")(`
  background-color: #5479F7;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 400;
  font-family: Roboto Mono, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: black;
  }

`);

let isClicked = false;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function CreateGameButton() {
  const auth = useContext(authContext);

  const setGame = async (t) => {
    t.preventDefault();
    const accounts = await web3.eth.getAccounts();
    isClicked = true;
    if (auth.authenticated) {
      const account = accounts[0];
      const post = await factoryContract.methods.instanciateGame().send({
        from: account,
        gas: "6000000",
      });
    } else {
      console.log("loggati su metamamsk");
    }
  };
  return (
    <Grid container>
      <Grid item xs={5}>
        <CustomButton onClick={setGame}>Create Game</CustomButton>
      </Grid>
      <Grid item xs={7}>
        {!auth.authenticated && isClicked ? (
          <Alert
            severity="warning"
            sx={{
              border: "1px solid #fcd69f",
              fontFamily: "Roboto Mono",
              fontWeight: "400",
              fontSize: "14px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
            }}
          >
            Connect to a wallet!
          </Alert>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default CreateGameButton;
