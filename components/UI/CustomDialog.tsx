import * as React from "react";
import { CustomButton } from "components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  show: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onAccept: () => void;
};

const CustomDialog: React.FC<Props> = (props) => {
  const { show, title, content, onClose, onAccept } = props;

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <span>{title}</span>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions sx={{ padding: "0 24px 24px 0" }}>
          <CustomButton
            height={30}
            variant="outlined"
            customColor="rgb(255, 168, 46)"
            onClick={onClose}
          >
            انصراف
          </CustomButton>
          <CustomButton
            height={30}
            customColor="#000"
            variant="contained"
            backgroundColor="rgb(255, 168, 46)"
            onClick={handleAccept}
          >
            حذف
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
