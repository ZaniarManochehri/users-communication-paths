import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Input, CustomButton } from "components";

//icons
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import PublicIcon from "@mui/icons-material/Public";

type userPathType = {
  link: string;
  type: string;
};
type Props = {
  onClose: () => void;
  setUserPath: (userPath: userPathType) => void;
  data?: userPathType;
  isEdit?: boolean;
};

const UserForm: React.FC<Props> = (props) => {
  const { onClose, setUserPath, data, isEdit } = props;
  const [type, setType] = useState<string>(isEdit ? data.type : "undefined");
  const [linkValue, setLinkValue] = useState<string>(isEdit ? data.link : "");
  const types = [
    {
      value: "undefined",
      label: { name: "undefined" },
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

  const handleRecord = () => {
    const userLink = linkValue;
    const userPath = type;
    setUserPath({ link: userLink, type: userPath });
    onClose();
  };

  const handleClose = () => {
    if (!isEdit) {
      setType("undefined");
      setLinkValue("");
    }
    onClose();
  };

  return (
    <Stack padding={2} gap={2}>
      <span>افزودن مسیر های ارتباطی</span>
      <Stack direction="row" gap={1}>
        <Input
          select
          options={types}
          label="نوع"
          onChange={handleChangeType}
          value={type}
          width="30%"
        />
        <Input
          label="لینک"
          onChange={(e) => setLinkValue(e.currentTarget.value)}
          value={linkValue}
          width="70%"
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" gap={1}>
        <CustomButton
          variant="outlined"
          customColor=" rgb(255, 168, 46)"
          height={30}
          onClick={handleClose}
        >
          انصراف
        </CustomButton>
        <CustomButton
          onClick={handleRecord}
          variant="contained"
          height={30}
          disabled={type === "undefined" || !linkValue}
          customColor="#000"
          backgroundColor=" rgb(255, 168, 46)"
        >
          {`${isEdit ? "ویرایش" : "ثبت"} مسیر ارتباطی`}
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default UserForm;
