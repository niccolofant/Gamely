import { Box, Grid, Typography } from "@mui/material";

function GamelySmallCard(props) {
  const { title, number } = props;

  return (
    <Box
      sx={{
        textAlign: "center",
        background: "white",
        margin: "0 2vw 2vw 2vw",
        padding: "1vw",
        fontFamily: "Roboto Mono",
        color: "#222823",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
      }}
    >
      <Typography
        variant="h8"
        sx={{ fontFamily: "Roboto Mono", color: "#777", fontWeight: "300" }}
      >
        {title}
      </Typography>
      <Typography variant="h2" sx={{ fontFamily: "Roboto Mono" }}>
        {number}
      </Typography>
    </Box>
  );
}

export default GamelySmallCard;
