import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

const CssTextField = styled(TextField)({
  "& .muirtl-px39cz-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "red",
    },
  "& .muirtl-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
    color: "rgb(121, 131, 142)",
  },
  "& label.Mui-focused.Mui-error": {
    color: "red",
    fontFamily: "IRANYekan",
  },
  "& label.Mui-focused": {
    color: "rgb(255, 168, 46)",
    fontFamily: "IRANYekan",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(255, 168, 46)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffffa6",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(255, 168, 46)",
    },
  },
});

type Props = {
  select?: boolean;
  label: string;
  name?: string;
  value?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  options?: {
    value: string;
    label: { name: string; icon?: React.ReactNode };
  }[];
  width?: string | number;
  onBlur?: (value: any) => void;
  textAlign?: "right" | "left";
  isRequired?: boolean;
  errorText?: string;
};
const Input: React.FC<Props> = (props) => {
  const theme = useTheme();
  const {
    select,
    label,
    name,
    value = "",
    onChange,
    options,
    width,
    onBlur,
    textAlign = "left",
    isRequired = false,
    errorText,
  } = props;

  const MyComponent = theme.palette.mode === "dark" ? CssTextField : TextField;
  return (
    <Stack gap={4} width={width}>
      <Box>
        <MyComponent
          label={label}
          select={select}
          name={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          type="text"
          autoComplete="off"
          value={value}
          style={{ width: "100%" }}
          inputProps={{
            style: {
              fontFamily: "IRANYekan",
              color: "white",
              textAlign,
              direction: textAlign === "left" ? "ltr" : "rtl",
            },
          }}
          onBlur={onBlur}
          error={isRequired && Boolean(errorText)}
        >
          {options?.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {option.label.icon}
                  <span >{option.label.name}</span>
                </div>
              </MenuItem>
            );
          })}
        </MyComponent>
      </Box>
    </Stack>
  );
};

export default Input;
