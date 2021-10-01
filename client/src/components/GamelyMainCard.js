import { Box, Grid, Typography } from "@mui/material";

function GamelyMainCard() {
  return (
    <Box>
      <Grid
        container
        sx={{
          background: "#f5f5f5",
          borderRadius: "15px",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            textAlign: "left",
            padding: "3vw",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "300",
            }}
          >
            Compete and win ETHs
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textAlign: "right",
            padding: "3vw",
          }}
        >
          <Grid xs={12}>ciao</Grid>
          <Grid xs={12}>ciao</Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamelyMainCard;
