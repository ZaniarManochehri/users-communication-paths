import React from "react";
import { CustomButton } from "components";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import styles from "./styles/Header.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  handleChangeDarkMode: () => void;
  handleChangeLang: (val: boolean) => void;
};

const Header: React.FC<Props> = (props) => {
  const { t, i18n, ready } = useTranslation();
  i18n.changeLanguage("en");
  const { handleChangeDarkMode, handleChangeLang } = props;
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      maxWidth={900}
      width="100%"
    >
      {/* <h6 className={styles.title}>{t("USER_SETTINGS")}</h6> */}
      <h6 className={styles.title}>{"USER_SETTINGS"}</h6>
      <Stack direction="row" gap={1}>
        <CustomButton
          customColor="rgb(121, 131, 142)"
          onClick={() => handleChangeLang(false)}
        >
          ENGLISH
        </CustomButton>
        <CustomButton
          customColor="rgb(255, 168, 46)"
          onClick={() => handleChangeLang(true)}
        >
          فارسی
        </CustomButton>
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
