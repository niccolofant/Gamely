import { Button, Box, Typography, Tooltip } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon.tsx";

function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box>
        <Tooltip title="Balance">
          <Typography fontSize="md">
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(2)}{" "}
            ETH
          </Typography>
        </Tooltip>
      </Box>
      <Button
        sx={{
          height: "38px",
          border: "1px solid grey",
          borderRadius: "24px",
          margin: "10px",
        }}
      >
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
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      variant="outlined"
      sx={{ color: "#5479f7" }}
    >
      Connect to a Wallet
    </Button>
  );
}

export default ConnectButton;
