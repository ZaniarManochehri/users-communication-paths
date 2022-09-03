import React from "react";
import { CustomButton } from "components";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import styles from "./styles/Header.module.css";

type Props = {
  handleChangeDarkMode: () => void;
};

const Header: React.FC<Props> = (props) => {
  const { handleChangeDarkMode } = props;
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      maxWidth={900}
      width="100%"
    >
      <h6 className={styles.title}>تنظیمات کاربری</h6>
      <Stack direction="row" gap={1}>
        <CustomButton customColor="rgb(121, 131, 142)">ENGLISH</CustomButton>
        <CustomButton customColor="rgb(255, 168, 46)">فارسی</CustomButton>
        <IconButton size="large" color="inherit" onClick={handleChangeDarkMode}>
          {theme.palette.mode === "dark" ? (
            <NightlightIcon fontSize="inherit" />
          ) : (
            <WbSunnyIcon fontSize="inherit" />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Header;
