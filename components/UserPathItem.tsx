import { useState, useRef } from "react";
import { CustomButton, CustomDialog, Input, UserForm } from "components";
import styles from "./styles/UserPathItem.module.css";

//icons
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  item: { link: string; type: string };
  onDelete: (item: { link: string; type: string }) => void;
};

type userPathType = {
  link: string;
  type: string;
};

const UserPathItem: React.FC<Props> = ({ item, onDelete }) => {
  const { link, type } = item;

  let title = "";
  let icon = null;

  switch (type) {
    case "Instagram":
      title = "اینستاگرام";
      icon = <InstagramIcon />;
      break;
    case "Twitter":
      title = "تویتر";
      icon = <TwitterIcon />;
      break;
    case "Facebook":
      title = "فیسبوک";
      icon = <FacebookIcon />;
      break;
    case "Web":
      title = "وبسایت";
      icon = <PublicIcon />;
      break;
    case "Linkedin":
      icon = <LinkedinIcon />;
      break;
    case "Telegram":
      icon = <TelegramIcon />;
      title = "تلگرام";
      break;

    default:
      break;
  }

  const contentRef = useRef<HTMLDivElement>(null);
  const [openForm, setOpenForm] = useState(false);
  const [userPath, setPath] = useState<userPathType>({ type: "", link: "" });
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const setUserPath = ({ link, type }: userPathType) => {
    setPath({ link, type });
  };

  const handleEdit = () => {
    setOpenForm(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.section}>
          {icon}
          <span>{title}</span>
          <span>لینک:</span>
          <a href={link} style={{ color: "rgb(255, 168, 46)" }}>
            {link}
          </a>
        </div>
        <div className={styles.section}>
          <CustomButton
            onClick={handleEdit}
            customColor="rgb(255, 168, 46)"
            gap={2}
            StartIcon={<EditIcon />}
          >
            ویرایش
          </CustomButton>
          <CustomButton
            onClick={handleDelete}
            customColor="rgb(244, 67, 54)"
            gap={2}
            StartIcon={<DeleteIcon />}
          >
            حذف
          </CustomButton>
        </div>
      </div>
      <div
        className={styles.formContainer}
        ref={contentRef}
        style={{
          height: openForm ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <UserForm
          isEdit
          data={item}
          onClose={() => setOpenForm(false)}
          setUserPath={(userPath: userPathType) => setUserPath(userPath)}
        />
      </div>
      <CustomDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onAccept={() => onDelete(item)}
        title="آیا از تصمیم خود مطمئن هستید؟"
        content={
          <DeleteDialogContent
            contentText={`برای حذف مسیر ارتباطی ${item.type} لطفا "تایید" را وارد کنید`}
          />
        }
      />
    </div>
  );
};

const DeleteDialogContent: React.FC<{ contentText: string }> = ({
  contentText,
}) => {
  return (
    <div className={styles.deleteDialog}>
      <span>{contentText}</span>
      <Input label="تایید*" value="" onChange={() => {}} />
    </div>
  );
};

export default UserPathItem;
