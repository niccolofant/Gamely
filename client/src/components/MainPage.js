import image from "../images/main-page-image.svg";
import AppButton from "./AppButton";
import MainPageCard from "./MainPageCard";
import { Box, Grid, Typography } from "@mui/material";
import crlogo from "../images/clash-royale-logo.png";

function MainPage() {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            textAlign: "left",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontFamily: "Poppins",
              fontWeight: "400",
            }}
          >
            Stake and earn ETHs while playing{" "}
            <span style={{ color: "#5479F7" }}>Mobile Games</span>.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto Mono",
              color: "#777",
              fontWeight: "200",
              marginBottom: "2vw",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

          <AppButton />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textAlign: "right",
          }}
        >
          <img src={image} alt="Main Logo" />
        </Grid>
      </Grid>
      <Box sx={{ padding: "10vw 0 0 0", textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: "Roboto Mono",
            color: "#777",
            fontWeight: "300",
          }}
        >
          Supported Games
        </Typography>
        <img src={crlogo} alt="Clash Royale" height="100" />
      </Box>
      <Box
        sx={{
          margin: "10vw 0 0 0",
          padding: "5vw",
        }}
      >
        <MainPageCard />
      </Box>
    </Box>
  );
}

export default MainPage;
