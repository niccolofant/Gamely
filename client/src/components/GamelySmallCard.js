import { Box, Typography } from "@mui/material";

const request = require("request");

async function getEthPrice() {
  const data = await request.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
  return data.json();
}
(async () => {
  const result = await getEthPrice();
  console.log(result);
})();

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
  const { title, number, currency } = props;

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
      <Typography variant="h2" sx={{ fontFamily: "Roboto Mono" }}>
        {currency}
        {number}
      </Typography>
    </Box>
  );
}

export default GamelySmallCard;
