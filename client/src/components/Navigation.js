import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Navigation() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link to="/">Home</Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/about">About</Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/app">Gamely App</Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Navigation;
