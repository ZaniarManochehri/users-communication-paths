import Button from "@mui/material/Button";

type Props = {
  children: string;
  variant?: "contained" | "outlined";
  disableRipple?: boolean;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  endIcon?: React.ReactNode;
  StartIcon?: React.ReactNode;
  width?: string | number;
  maxWidth?: string | number;
  gap?: number;
};

const CustomButton: React.FC<Props> = (props) => {
  const {
    children,
    variant,
    disableRipple = false,
    color,
    backgroundColor,
    disabled = false,
    size = "large",
    endIcon,
    StartIcon,
    width,
    maxWidth,
    gap = 16,
  } = props;

  return (
    <Button
      size={size}
      variant={variant}
      disableRipple={disableRipple}
      disabled={disabled}
      endIcon={endIcon}
      startIcon={StartIcon}
      style={{
        textTransform: "none",
        fontFamily: "IRANYekan",
        color,
        backgroundColor,
        width,
        maxWidth,
        gap,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
