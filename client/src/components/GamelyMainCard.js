import { Box, Grid, Typography } from "@mui/material";
import CreateGameButton from "./CreateGameButton";

function GamelyMainCard(props) {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
      }}
    >
      <Grid container>
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
            gutterBottom
            sx={{
              fontFamily: "Roboto Mono",
              fontWeight: "300",
              color: "#222823",
              margin: "2vw 0 1vw 0 ",
            }}
          >
            Compete and win ETHs
          </Typography>
          <CreateGameButton />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textAlign: "right",
            padding: "4vw 3vw 2vw 10vw",
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
