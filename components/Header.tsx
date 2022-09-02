import React from "react";
import { CustomButton } from "components";
import IconButton from '@mui/material/IconButton';
import Stack from "@mui/material/Stack";
import Brightness2Icon from '@mui/icons-material/Brightness2';
import NightlightIcon from '@mui/icons-material/Nightlight';
import styles from "./styles/Header.module.css";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <h6 className={styles.title}>تنظیمات کاربری</h6>
      <Stack direction="row" gap={1} >
        <CustomButton color="rgb(121, 131, 142)">ENGLISH</CustomButton>
        <CustomButton color="rgb(255, 168, 46)">فارسی</CustomButton>
        <IconButton size="large" color="inherit">
          <NightlightIcon fontSize="inherit"/>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Header;
