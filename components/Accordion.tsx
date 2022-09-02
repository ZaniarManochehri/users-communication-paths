import { useState } from "react";
import styles from "./styles/Accordion.module.css";
import Stack from "@mui/material/Stack";
import { CustomButton, Input } from "components";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import PublicIcon from "@mui/icons-material/Public";

type Props = {};

const Accordion: React.FC<Props> = (props) => {
  const [type, setType] = useState<string>("undefined1");
  const types = [
    {
      value: "undefined1",
      label: { name: "undefined2" },
    },
    {
      value: "Twitter",
      label: { name: "تویتر", icon: <TwitterIcon /> },
    },
    {
      value: "Instagram",
      label: { name: "اینستاگرام", icon: <InstagramIcon /> },
    },
    {
      value: "Facebook",
      label: { name: "فیسبوک", icon: <FacebookIcon /> },
    },
    {
      value: "Telegram",
      label: { name: "تلگرام", icon: <TelegramIcon /> },
    },
    {
      value: "Linkedin",
      label: { name: "لینکدین", icon: <LinkedinIcon /> },
    },
    {
      value: "Web",
      label: { name: "وبسایت", icon: <PublicIcon /> },
    },
  ];
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  return (
    <Stack className={styles.accordion}>
      <span>مسیر های ارتباطی</span>
      <Stack alignItems="flex-start">
        <CustomButton color="white" StartIcon={<AddIcon />}>
          افزودن مسیر ارتباطی
        </CustomButton>
      </Stack>
      <Stack className={styles.content}>
        <span>افزودن مسیر های ارتباطی</span>
        <Stack>
          <Input
            select
            options={types}
            label="نوع"
            onChange={handleChangeType}
            value={type}
          />
          <Input
            label="لینک"
            onChange={() => {}}
            value={"type"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Accordion;
