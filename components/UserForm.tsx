import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Input, CustomButton } from "components";
import { Formik } from "formik";

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

  const handleChangeType = (value: string) => {
    setType(value);
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
      <span>افزودن مسیر های ارتباطی</span>
      <Stack direction="row" gap={1}>
        <Formik
          initialValues={{ type: "", link: linkValue }}
          validate={(values) => {
            setLinkValue(values.link);
            handleChangeType(values.type);
            console.log(values.type);

            const errors = { link: "", type: "" };
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
          disabled={type === "undefined" || !linkValue || !validUrl(linkValue)}
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
