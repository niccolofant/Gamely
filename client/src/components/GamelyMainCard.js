import { Box, Grid, Typography } from "@mui/material";
import GamelySmallCard from "./GamelySmallCard";

function GamelyMainCard(props) {
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
          {props.children.map((item) => {
            return (
              <div key={item.props.number}>
                <Grid item xs={12}>
                  {item}
                </Grid>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamelyMainCard;

/*
<Grid item xs={12}>
            {props.children}
          </Grid>
          <Grid item xs={12}>
            {props.children}
          </Grid>
          */
