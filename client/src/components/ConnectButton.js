import { Button, Box, Typography, Tooltip } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon.tsx";
import { GiWallet } from "react-icons/gi";

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
          <p>
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </p>
        </Tooltip>
        <Identicon />
      </Button>
      <Box>
        <Tooltip title="Balance">
          <p>
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(2)}{" "}
            ETH
          </p>
        </Tooltip>
      </Box>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}>
      <GiWallet />
      <p>CONNECT WALLET</p>
    </Button>
  );
}

export default ConnectButton;
