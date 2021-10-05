import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

//const request = require("request");

/*
function getEthPrice() {
  request.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    function (error, response, body) {
      if (error) return error;
      else if (!response) return new Error("no response");
      else if (response.statusCode !== 200) return new Error("bad response");
      else return JSON.stringify(JSON.parse(body), null, 4);
    }
  );
}
*/
function GamelySmallCard(props) {
  const { title, number, currency, type } = props;

  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    getEthPrice();
  }, []);

  async function getEthPrice() {
    let response = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    let data = await response.json();
    setEthPrice(data.USD);
  }

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
