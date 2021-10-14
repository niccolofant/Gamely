import { Box, Grid, Typography } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import WinCard from "./WinCard";

function MainPageCard() {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
      }}
    >
      <Grid container>
        <Grid item xs={7} sx={{ padding: "7vw 5vw 0 5vw" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: "Poppins",
              fontWeight: "400",
              color: "#222823",
            }}
          >
            Earning ETHs has never been easier
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "200",
              color: "#777",
            }}
          >
            Play and win!
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "200",
              color: "#777",
            }}
          >
            <Box sx={{ margin: "1vw 0 1vw 0" }}>
              <FaCheck
                style={{
                  color: "#5479F7",
                }}
              />{" "}
              Lowest fees — only 2%
            </Box>
            <Box>
              <FaCheck
                style={{
                  color: "#5479F7",
                }}
              />{" "}
              Secure
            </Box>
          </Typography>
        </Grid>

        <Grid item xs={5} sx={{ padding: "5vw" }}>
          <WinCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainPageCard;
