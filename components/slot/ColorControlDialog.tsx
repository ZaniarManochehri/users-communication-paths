import React from "react";
import { CustomButton } from "components";
import Radio from "@mui/material/Radio";

const ColorControlDialog: React.FC<{
  onChange: (val: string) => void;
  onClose: () => void;
}> = ({ onChange, onClose }) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };
  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  return (
    <div
      style={{
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <span>زمینه</span>
        <Radio
          {...controlProps("blue")}
          sx={{
            color: "blue",
            "&.Mui-checked": {
              color: "blue",
            },
          }}
        />
        <Radio
          {...controlProps("purple")}
          color="success"
          sx={{
            color: "purple",
            "&.Mui-checked": {
              color: "purple",
            },
          }}
        />
        <Radio
          {...controlProps("black")}
          color="default"
          sx={{
            color: "black",
            "&.Mui-checked": {
              color: "black",
            },
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <CustomButton
          variant="contained"
          customColor="#000"
          backgroundColor="rgb(255, 168, 46)"
          onClick={onClose}
        >
          بستن
        </CustomButton>
      </div>
    </div>
  );
};

export default ColorControlDialog;
