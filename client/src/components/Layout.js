import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ConnectButton from "./ConnectButton";

function Layout(props) {
  return (
    <React.Fragment>
      <Box>
        <Grid
          container
          spacing={5}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Grid
            item
            xs={8}
            sx={{
              textAlign: "left",
            }}
          >
            <Header />
          </Grid>
          <Grid
            item
            xs={4}
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
