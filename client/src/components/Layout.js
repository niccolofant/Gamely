import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ConnectButton from "./ConnectButton";

function Layout(props) {
  return (
    <React.Fragment>
      <Box
        sx={{
          padding: "2vw 0 0 10vw",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={5}
            sx={{
              textAlign: "left",
            }}
          >
            <Header />
          </Grid>
          <Grid
            item
            xs={5}
            sx={{
              textAlign: "right",
            }}
          >
            <ConnectButton />
          </Grid>
        </Grid>
      </Box>

      <main>{props.children}</main>
    </React.Fragment>
  );
}

export default Layout;
