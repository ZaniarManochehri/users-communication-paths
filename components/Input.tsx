import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

const CssTextField = styled(TextField)({
  "& .muirtl-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
    color: "rgb(121, 131, 142)",
  },
  "& label.Mui-focused": {
    color: "rgb(255, 168, 46)",
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
  options?: { value: string; label: { name: string; icon?: React.ReactNode } }[];
};
const Input: React.FC<Props> = (props) => {
  const { select, label, name, value = "", onChange, options } = props;

  return (
    <Stack m={2} gap={4}>
      <Box>
        <CssTextField
          label={label}
          select={select}
          name={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          type="text"
          autoComplete="off"
          value={value}
          inputProps={{
            style: { fontFamily: "IRANYekan", color: "white" },
          }}
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
                  {option.label.name}
                </div>
              </MenuItem>
            );
          })}
        </CssTextField>
      </Box>
    </Stack>
  );
};

export default Input;
