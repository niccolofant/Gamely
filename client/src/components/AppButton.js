import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";

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

function AppButton() {
  return (
    <Stack spacing={2} direction="row">
      <Link to="/app">
        <CustomButton>Get Started</CustomButton>
      </Link>
    </Stack>
  );
}

export default AppButton;
