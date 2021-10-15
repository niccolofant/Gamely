import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import { ref, set } from "firebase/database";
import database from "../firebase.js";
import { useState } from "react";
import { FaUserFriends, FaHashtag } from "react-icons/fa";

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

function ProfileConfig(props) {
  const [open, setOpen] = useState(props.open);
  const [playerTag, setPlayerTag] = useState("");
  const [friendLink, setFriendLink] = useState("");

  // Push data to firebase database
  function pushInfo() {
    set(ref(database, props.account), {
      playerTag: "#" + playerTag,
      friendLink: friendLink,
    });
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "5vw 7vw 5vw 7vw",
          borderRadius: "10px",
          boxShadow:
            "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "400",
            color: "#222823",
            margin: "0 0 1vw 0 ",
          }}
        >
          Edit your info
        </Typography>
        <Box sx={{ padding: "1vw" }}>
          <TextField
            label="Player tag"
            placeholder="e.g. C0G20PR2"
            value={playerTag}
            onChange={(e) => setPlayerTag(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaHashtag style={{ color: "#222823" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ padding: "1vw", margin: "0 0 1vw 0" }}>
          <TextField
            label="Friend Link"
            value={friendLink}
            onChange={(e) => setFriendLink(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUserFriends style={{ color: "#222823" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <CustomButton onClick={pushInfo}>Update</CustomButton>
      </Box>
    </Modal>
  );
}

export default ProfileConfig;
