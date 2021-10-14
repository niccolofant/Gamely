import { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import JoinGameButton from "./JoinGameButton";
import { game } from "../abi/GameABI";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

function GameCard(props) {
  const gameContract = new web3.eth.Contract(game, props.item);

  const [gameCreator, setGameCreator] = useState("");
  const [player2, setPlayer2] = useState("");
  const [bet, setBet] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    async function retrieveGameInfo() {
      const gameCreator = await gameContract.methods.player1().call();
      const player2 = await gameContract.methods.player2().call();
      const bet = await gameContract.methods.bet().call();
      const prizePool = await gameContract.methods.prizePool().call();

      if (isMounted.current) {
        setGameCreator(gameCreator);
        setPlayer2(player2);
        setBet(bet);
        setPrizePool(prizePool);
      }
    }
    retrieveGameInfo();
    return () => {
      isMounted.current = false;
    };
  }, [gameContract.methods]);

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
        padding: "3vw",
        marginTop: "3vw",
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "400",
              color: "#222823",
            }}
          >
            {props.item.slice(0, 6)}...
            {props.item.slice(props.item.length - 4, props.item.length)}
          </Typography>

          <Typography
            variant="h7"
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "300",
              color: "#777",
            }}
          >
            vs {gameCreator.slice(0, 6)}...
            {gameCreator.slice(gameCreator.length - 4, gameCreator.length)}
            <AiOutlineInfoCircle />
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            textAlign: "center",

            padding: "0 2.5vw 0 0",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Roboto Mono",
                fontSize: "14px",
                fontWeight: "300",
                color: "#777",
                padding: "0 0 0.2vw 0",
              }}
            >
              Game <br />
            </Typography>
            <Typography
              variant="h7"
              sx={{
                fontFamily: "Roboto Mono",
                fontWeight: "400",
                color: "#222823",
              }}
            >
              Clash Royale
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Box sx={{ borderLeft: "1px solid #d1d1d1" }}>
            <Typography
              sx={{
                fontFamily: "Roboto Mono",
                fontSize: "14px",
                fontWeight: "300",
                color: "#777",
                padding: "0 0 0.2vw 0",
              }}
            >
              Bet <br />
            </Typography>
            <Typography
              variant="h7"
              sx={{
                fontFamily: "Roboto Mono",
                fontWeight: "400",
                color: "#222823",
              }}
            >
              {web3.utils.fromWei(bet, "ether")}
              <FaEthereum style={{ padding: "0 0 0 0.5vw" }} />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {player2 === "0x0000000000000000000000000000000000000000" ? (
            <JoinGameButton game={gameContract} bet={bet} />
          ) : (
            <Box sx={{ borderLeft: "1px solid #d1d1d1" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto Mono",
                  fontSize: "14px",
                  fontWeight: "300",
                  color: "#777",
                  padding: "0 0 0.2vw 0",
                }}
              >
                Prize Pool <br />
              </Typography>
              <Typography
                variant="h7"
                sx={{
                  fontFamily: "Roboto Mono",
                  fontWeight: "400",
                  color: "#222823",
                }}
              >
                {web3.utils.fromWei(prizePool, "ether")}
                <FaEthereum style={{ padding: "0 0 0 0.5vw" }} />
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default GameCard;
