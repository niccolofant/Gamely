import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

function GamelySmallCard(props) {
  const { title, number, currency, type } = props;

  const [ethPrice, setEthPrice] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    async function fetchEthPrice() {
      let response = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      let data = await response.json();
      if (isMounted.current) setEthPrice(data.USD);
    }
    fetchEthPrice();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        background: "white",
        margin: "0 2vw 2vw 2vw",
        padding: "1vw",
        fontFamily: "Roboto Mono",
        color: "#222823",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
      }}
    >
      <Typography
        variant="h8"
        sx={{ fontFamily: "Roboto Mono", color: "#777", fontWeight: "300" }}
      >
        {title}
      </Typography>

      <Typography
        variant="h3"
        sx={{ fontFamily: "Roboto Mono", fontWeight: "300" }}
      >
        {currency}

        {type ? number * type * parseInt(ethPrice) : number}
      </Typography>
    </Box>
  );
}

export default GamelySmallCard;
