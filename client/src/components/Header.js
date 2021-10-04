import { Typography } from "@mui/material";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 10px 10px 0",
      }}
    >
      <img src={logo} alt="Gamely Logo" height="30" />
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "500",
          color: "#222823",
          padding: "0 0 0 0.5vw",
        }}
      >
        Gamely
      </Typography>
    </header>
  );
}

export default Header;
