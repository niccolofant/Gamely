import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ConnectButton from "./ConnectButton";

function Layout(props) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Header />
          </Grid>
          <Grid item xs={4}>
            <Navigation />
          </Grid>
          <Grid item xs={4}>
            <ConnectButton />
          </Grid>
        </Grid>
      </Box>

      <div className="navigationWrapper">
        <main>{props.children}</main>
      </div>
    </React.Fragment>
  );
}

export default Layout;
