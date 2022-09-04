import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Input, CustomButton } from "components";
import { Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

//icons
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
  socials: userPathType[];
};

const UserForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { onClose, setUserPath, data, isEdit, socials } = props;
  const [type, setType] = useState<string>(isEdit ? data.type : "undefined");
  const [linkValue, setLinkValue] = useState<string>(isEdit ? data.link : "");
  const [hasInputError, setHasInputError] = useState(false);
  const [texts, setTexts] = useState({
    addSocial: "",
    instagram: "",
    twitter: "",
    telegram: "",
    web: "",
    facebook: "",
    linkedin: "",
  });

  useEffect(() => {
    updateTexts({
      addSocial: t("ADD_SOCIAL"),
      instagram: t("INSTAGRAM"),
      twitter: t("TWITTER"),
      telegram: t("TELEGRAM"),
      web: t("WEB"),
      facebook: t("FACEBOOK"),
      linkedin: t("LINKEDIN"),
    });
  }, [theme.direction]);

  const updateTexts = (obj: any) => {
    let mObj = { ...texts };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        mObj = { ...mObj, [key]: obj[key] };
      }
    }
    setTexts(mObj);
  };

  const types = [
    {
      value: "undefined",
      label: { name: "undefined" },
    },
    {
      value: "Twitter",
      label: { name: texts.twitter, icon: <TwitterIcon /> },
    },
    {
      value: "Instagram",
      label: { name: texts.instagram, icon: <InstagramIcon /> },
    },
    {
      value: "Facebook",
      label: { name: texts.facebook, icon: <FacebookIcon /> },
    },
    {
      value: "Telegram",
      label: { name: texts.telegram, icon: <TelegramIcon /> },
    },
    {
      value: "Linkedin",
      label: { name: texts.linkedin, icon: <LinkedinIcon /> },
    },
    {
      value: "Web",
      label: { name: texts.web, icon: <PublicIcon /> },
    },
  ];

  const handleChangeType = (value: string) => {
    setType(value);
  };

  const handleRecord = () => {
    const userLink = linkValue;
    const userPath = type;
    setUserPath({ link: userLink, type: userPath });
    setType("undefined");
    setLinkValue("");
    onClose();
  };

  const handleClose = () => {
    if (!isEdit) {
      setType("undefined");
      setLinkValue("");
    }
    onClose();
  };

  const validUrl = (str: string) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };

  return (
    <Stack padding={2} gap={2}>
      <span>{texts.addSocial}</span>
      <Stack direction="row" gap={1}>
        <Formik
          initialValues={{ type: "", link: linkValue }}
          validate={(values) => {
            setLinkValue(values.link);
            handleChangeType(values.type);

            const errors = { link: "", type: "" };
            if (socials.find((social) => social.link === values.link)) {
              errors.link = "مسیر تکراری است";
            }
            if (values.type === "undefined") {
              errors.type = "وارد کردن این فیلد اجباری است";
            }
            if (!values.link) {
              errors.link = "وارد کردن این فیلد اجباری است";
            } else if (values.type !== "undefined" && !values.link) {
              errors.link = "وارد کردن این فیلد اجباری است";
            } else if (!validUrl(values.link)) {
              errors.link = "محتویات این فیلد باید از جنس آدرس اینترنتی باشد";
            }
            setHasInputError(errors.link !== "" || errors.type !== "");
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 16,
              }}
            >
              <Stack width="30%">
                <Input
                  select
                  name="type"
                  options={types}
                  label="نوع"
                  onChange={handleChange}
                  value={type}
                  onBlur={handleBlur}
                  isRequired
                  errorText={errors.type}
                />
                <span
                  style={{
                    visibility: errors.type ? "visible" : "hidden",
                    fontSize: 12,
                    color: "red",
                  }}
                >
                  {errors.type ? errors.type : "required"}
                </span>
              </Stack>
              <Stack width="70%" style={{ gap: 4 }}>
                <Input
                  label="لینک"
                  name="link"
                  onChange={handleChange}
                  value={linkValue}
                  width="100%"
                  onBlur={handleBlur}
                  isRequired
                  errorText={errors.link}
                />
                <span
                  style={{
                    visibility: errors.link ? "visible" : "hidden",
                    fontSize: 12,
                    color: "red",
                  }}
                >
                  {errors.link ? errors.link : "required"}
                </span>
              </Stack>
            </form>
          )}
        </Formik>
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
          disabled={type === "undefined" || hasInputError}
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
