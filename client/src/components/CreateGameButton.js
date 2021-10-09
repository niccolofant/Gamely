import { useContext, useState } from "react";
import {
  Grid,
  Alert,
  Modal,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Input,
  TextField,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import { FaEthereum } from "react-icons/fa";
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
  const [openModal, setOpenModal] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [balance, setBalance] = useState("");
  const [bet, setBet] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleTextFieldChange = (e) => {
    setBet(e.target.value);
  };

  const createGame = async (t) => {
    t.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setBalance(
      parseFloat(
        web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether")
      ).toFixed(2)
    );

    isClicked = true;
    if (auth.authenticated) {
      setOpenModal(true);
    }
  };

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
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item xs={5}>
          <CustomButton onClick={createGame}>Create Game</CustomButton>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Game options"
        aria-describedby="Game options"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "5vw 7vw 5vw 7vw",
            borderRadius: "10px",
            boxShadow:
              "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "400",
              color: "#222823",
              margin: "0 0 2vw 0 ",
            }}
          >
            Choose game settings
          </Typography>
          <Grid container>
            <Grid item xs={9} sx={{ textAlign: "left" }}>
              <TextField
                label="Bet amount"
                id="outlined-start-adornment"
                value={bet}
                onChange={handleTextFieldChange}
                sx={{
                  m: 1,
                  width: "25ch",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEthereum />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomButton onClick={setGame} sx={{ margin: "0.7vw 0 0 0" }}>
                Create
              </CustomButton>
            </Grid>
          </Grid>

          <Typography
            sx={{
              fontFamily: "Roboto Mono",
              color: "#777",
              fontWeight: "300",
              padding: "1vw 0 0 0.5vw",
            }}
          >
            Balance:{" "}
            <span style={{ color: "#222823" }}>
              {balance}
              <FaEthereum style={{ padding: "0 0 0 0.5vw" }} />
            </span>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default CreateGameButton;
