import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Navigation() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={4}>
          <Link to="/">
            <Typography sx={{ minWidth: 100 }}>Home</Typography>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/about">
            <Typography sx={{ minWidth: 100 }}>About</Typography>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/app">
            <Typography sx={{ minWidth: 100 }}>Gamely App</Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Navigation;
