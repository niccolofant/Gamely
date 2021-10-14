import { Button, Box, Typography, Tooltip, Grid } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { FaEthereum, FaUserCircle } from "react-icons/fa";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import { useContext, useEffect } from "react";
import authContext from "./authContext";

const CustomButtonRoot = styled("button")(`
  background-color: #5479F7;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 400;
  font-family: Roboto Mono, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: black;
  }

`);

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  const { setAuthenticated } = useContext(authContext);

  useEffect(() => {
    if (account) {
      setAuthenticated(true);
    }
  }, [account, setAuthenticated]);

  return account ? (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            padding: "1vw",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Roboto Mono",
                color: "#222823",
                fontWeight: "300",
                padding: "0 1vw 0 0",
              }}
            >
              {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(2)}
              <FaEthereum style={{ padding: "0 0 0 0.5vw" }} />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Button
            sx={{
              background: "white",
              borderRadius: "15px",
              boxShadow:
                "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
              padding: "15px 20px",
            }}
          >
            <Tooltip title="Account settings">
              <Typography
                sx={{
                  fontFamily: "Roboto Mono",
                  color: "#222823",
                  fontWeight: "300",
                  padding: "0 0.5vw 0 0",
                  textTransform: "lowercase",
                }}
              >
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Typography>
            </Tooltip>
            <FaUserCircle style={{ color: "black" }} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <CustomButton onClick={handleConnectWallet}>Connect Wallet</CustomButton>
  );
}

export default ConnectButton;
