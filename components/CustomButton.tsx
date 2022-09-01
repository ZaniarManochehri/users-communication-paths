import Button from "@mui/material/Button";

type Props = {
  children: string;
  variant?: "contained" | "outlined";
  disableRipple?: boolean;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
};

const CustomButton: React.FC<Props> = (props) => {
  const {
    children,
    variant,
    disableRipple = false,
    color,
    backgroundColor,
    disabled = false,
  } = props;

  return (
    <Button
      size="large"
      variant={variant}
      disableRipple={disableRipple}
      disabled={disabled}
      style={{
        textTransform: "none",
        fontFamily: "IRANYekan",
        color,
        backgroundColor,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
