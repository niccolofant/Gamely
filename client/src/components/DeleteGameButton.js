import { useState, useContext } from "react";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import Web3 from "web3";
import authContext from "./authContext";

const web3 = new Web3(Web3.givenProvider);

const CustomButtonRoot = styled("button")(`
  background-color: #f55d5d;
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

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function DeleteGameButton(props) {
  const auth = useContext(authContext);

  async function deleteGame(t) {
    t.preventDefault();

    if (auth.authenticated) {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      console.log(accounts);
      await props.game.methods.deleteGame().send({
        from: account,
      });
    }
  }
  return <CustomButton onClick={deleteGame}>Delete Game</CustomButton>;
}

export default DeleteGameButton;
