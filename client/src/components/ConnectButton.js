import { Button, Box, Typography } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box>
      <Typography>
        {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
      </Typography>
      <Typography>
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
      </Typography>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      variant="outlined"
      sx={{ background: "#1a2030", color: "#5479f7" }}
    >
      Connect to a Wallet
    </Button>
  );
}

export default ConnectButton;
