import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ConnectButton from "./ConnectButton";

function Layout(props) {
  return (
    <React.Fragment>
      <Box sx={{ marginTop: "20px" }}>
        <Grid
          container
          spacing={5}
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Header />
          </Grid>
          <Grid xs={6}></Grid>
          <Grid item xs={3}>
            <ConnectButton />
          </Grid>
        </Grid>
      </Box>

      <div
        className="navigationWrapper"
        style={{ borderTop: "1px solid grey ", marginTop: "20px" }}
      >
        <main>{props.children}</main>
      </div>
    </React.Fragment>
  );
}

export default Layout;
