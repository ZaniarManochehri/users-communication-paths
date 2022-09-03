// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type Props = {
  onClick?: () => void;
  children: string;
  variant?: "contained" | "outlined";
  disableRipple?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  customColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  endIcon?: React.ReactNode;
  StartIcon?: React.ReactNode;
  width?: string | number;
  maxWidth?: string | number;
  gap?: number;
  height?: number | string;
  fontSize?: number;
};

const CustomButton: React.FC<Props> = (props) => {
  const {
    children,
    variant,
    disableRipple = false,
    customColor,
    color = "primary",
    backgroundColor,
    disabled = false,
    size = "large",
    endIcon,
    StartIcon,
    width,
    maxWidth,
    gap = 8,
    height,
    fontSize = 14,
    onClick,
  } = props;

  let background = "";
  if (disabled) {
    background = "rgba(255, 255, 255, 0.12)";
  } else if (variant === "outlined") {
    background = "transparent";
  } else {
    background = backgroundColor;
  }
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: disabled ? "rgba(255, 255, 255, 0.3)" : customColor,
    border: `${variant === "outlined" ? "1px" : "0"} solid ${customColor}`,
    backgroundColor: background,
    gap,
    fontFamily: "IRANYekan",
    fontSize,
    maxWidth,
    width,
    height,
    "&:hover": {
      opacity: variant === "outlined" ? 0.7 : 1,
      backgroundColor: background,
    },
  }));

  return (
    <ColorButton
      disableRipple={disableRipple}
      disabled={disabled}
      size={size}
      endIcon={endIcon}
      startIcon={StartIcon}
      color={color}
      onClick={onClick}
    >
      {children}
    </ColorButton>
  );
};

export default CustomButton;
