import { Button, Box, Typography, Tooltip } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon.tsx";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";

const CustomButtonRoot = styled("button")(`
  background-color: #5479F7;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 400;
  font-family: Nunito Sans, Arial, sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
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

  return account ? (
    <Box>
      <Button>
        <Tooltip title="Account settings">
          <Typography>
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </Typography>
        </Tooltip>
        <Identicon />
      </Button>
      <Box>
        <Tooltip title="Balance">
          <Typography>
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(2)}{" "}
            ETH
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  ) : (
    <CustomButton onClick={handleConnectWallet}>Connect Wallet</CustomButton>
  );
}

export default ConnectButton;
