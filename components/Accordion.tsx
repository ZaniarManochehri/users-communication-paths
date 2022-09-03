import React, { useState, useRef } from "react";
import styles from "./styles/Accordion.module.css";
import Stack from "@mui/material/Stack";
import { CustomButton, UserForm, UserPathItem } from "components";
import AddIcon from "@mui/icons-material/Add";

type Props = {};

type userPathType = {
  link: string;
  type: string;
};
type userPathsType = userPathType[];

const Accordion: React.FC<Props> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [userPaths, setUserPaths] = useState<userPathsType>([]);

  const setUserPath = ({ link, type }: userPathType) => {
    setUserPaths([...userPaths, { link, type }]);
  };

  return (
    <Stack className={styles.accordion}>
      <span className={styles.title}>مسیر های ارتباطی</span>
      <Stack alignItems="flex-start">
        <CustomButton
          onClick={() => setOpen(true)}
          customColor="rgb(121, 131, 142)"
          fontSize={12}
          StartIcon={<AddIcon />}
        >
          افزودن مسیر ارتباطی
        </CustomButton>
      </Stack>
      <Stack
        ref={contentRef}
        className={styles.content}
        style={{
          height: open ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <UserForm
          onClose={() => setOpen(false)}
          setUserPath={(userPath: userPathType) => setUserPath(userPath)}
        />
      </Stack>
      {userPaths?.map((item, index) => (
        <React.Fragment key={index}>
          <UserPathItem
            item={item}
            onDelete={(item: userPathType) =>
              setUserPaths(userPaths.filter((ele) => ele.link !== item.link))
            }
          />
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default Accordion;
