import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Tooltip, tooltipClasses } from "@mui/material";
import JoinGameButton from "./JoinGameButton";
import { game } from "../abi/GameABI";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "#777",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    fontFamily: "Poppins",
    border: "1px solid #dadde9",
  },
}));

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
        marginTop: "3vw",
        background: "white",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
        padding: "3vw",
        transition: "transform 0.5s",
        "&:hover": {
          background: "white",
          transform: "scale(1.03)",
        },
      }}
    >
      <Grid container>
        <Grid item xs={3} sx={{ textAlign: "center" }}>
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
            <CustomTooltip
              title={
                <>
                  <Typography color="inherit">Friend link: </Typography>
                  <Typography color="black">
                    <em>{"And here's"}</em> <b>{"some"}</b>{" "}
                    <u>{"amazing content"}</u>. {"It's very engaging. Right?"}
                  </Typography>
                </>
              }
            >
              <span
                style={{
                  padding: "0 0 0 0.5vw",
                }}
              >
                <AiOutlineInfoCircle />
              </span>
            </CustomTooltip>
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{ textAlign: "center" }}>
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
        <Grid item xs={3} sx={{ textAlign: "center" }}>
          {player2 === "0x0000000000000000000000000000000000000000" ? (
            <JoinGameButton game={gameContract} bet={bet} />
          ) : (
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
