import image from "../images/main-page-image.svg";
import AppButton from "./AppButton";
import { Grid, Typography } from "@mui/material";

function MainPage() {
  return (
    <div
      style={{
        margin: "5vw 10vw 0 10vw",
      }}
    >
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="h2" component="div" gutterBottom>
            Stake and earn ETHs while playing{" "}
            <span style={{ color: "#5479F7" }}>Mobile Games</span>.
          </Typography>

          <AppButton />
        </Grid>
        <Grid item xs={5}>
          <img src={image} alt="Main Logo" />
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
