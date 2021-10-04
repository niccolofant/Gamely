import { Box, Typography } from "@mui/material";
import trophy from "../images/trophy-image.svg";

function WinCard() {
  return (
    <Box
      sx={{
        border: "2px solid #5479F7",
        padding: "1vw",
        textAlign: "center",
        background: "white",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: "Roboto Mono",
          fontWeight: "400",
          color: "#222823",
        }}
      >
        Congrats!
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          fontFamily: "Roboto Mono",
          color: "#777",
          fontWeight: "300",
          margin: "0 0 2vw 0",
        }}
      >
        You won the game against Player#8CGC92VP!
      </Typography>
      <img src={trophy} alt="Trophy" height="150" />
      <Typography
        gutterBottom
        sx={{
          fontSize: "14px",
          fontFamily: "Roboto Mono",
          fontWeight: "300",
          color: "#777",
          margin: "2vw 0 2vw 0",
        }}
      >
        You earned{" "}
        <span style={{ color: "#222823", fontWeight: "400" }}>2 ETHs</span>
      </Typography>
      <Box
        sx={{
          background: "#5479F7",
          borderRadius: "10px",
          padding: "15px",
          textAlign: "center",
          margin: "1vw 5vw 1vw 5vw",
          boxShadow:
            "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
          color: "white",
          fontWeight: "400",
          fontFamily: "Roboto Mono, Arial, sans-serif",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Continue
      </Box>
    </Box>
  );
}

export default WinCard;
