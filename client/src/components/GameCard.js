import { Box, Grid, Typography } from "@mui/material";

function GameCard(props) {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
        padding: "3vw",
        marginTop: "3vw",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Roboto Mono",
          fontWeight: "400",
          color: "#222823",
          textTransform: "uppercase",
        }}
      >
        {props.item.slice(0, 6)}...
        {props.item.slice(props.item.length - 4, props.item.length)}
      </Typography>
    </Box>
  );
}

export default GameCard;
