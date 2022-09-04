import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/Accordion.module.css";
import Stack from "@mui/material/Stack";
import { CustomButton, UserForm, UserPathItem } from "components";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { createServer, Model } from "miragejs";
import { useTranslation } from "react-i18next";
import api from "./../services/axios";

type userPathType = {
  id: number;
  link: string;
  type: string;
};
type userPathsType = userPathType[];

type Props = {
  socials: userPathsType;
};

const Accordion: React.FC<Props> = (props) => {
  const { socials } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [userPaths, setUserPaths] = useState<userPathsType>(socials);
  const [texts, setTexts] = useState({
    addSocial: "",
  });

  const updateTexts = (obj: any) => {
    let mObj = { ...texts };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        mObj = { ...mObj, [key]: obj[key] };
      }
    }
    setTexts(mObj);
  };

  const setUserPath = ({ link, type }: userPathType) => {
    const lastId = userPaths[userPaths.length - 1].id;
    api
      .post("/social", {
        id: lastId ? lastId + 1 : 1,
        link: "https://test11.com",
        type: "Web",
      })
      .then(({ data }) => {
        const { social } = data;
        setUserPaths([...userPaths, social]);
      });
  };

  useEffect(() => {
    updateTexts({
      addSocial: t("ADD_SOCIAL"),
    });
    setUserPaths(socials);
  }, [theme.direction, socials]);

  return (
    <Stack
      className={styles.accordion}
      style={{
        backgroundColor:
          theme.palette.mode === "light" ? "#fff" : "rgb(33, 43, 53)",
      }}
    >
      <span className={styles.title}>{texts.addSocial}</span>
      <Stack alignItems="flex-start">
        <CustomButton
          onClick={() => setOpen(true)}
          customColor="rgb(121, 131, 142)"
          fontSize={12}
          StartIcon={<AddIcon />}
        >
          {texts.addSocial}
        </CustomButton>
      </Stack>
      <Stack
        ref={contentRef}
        className={styles.content}
        style={{
          height: open ? contentRef.current?.scrollHeight : 0,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgb(52, 61, 72)"
              : "rgb(244, 246, 248)",
        }}
      >
        <UserForm
          socials={userPaths}
          onClose={() => setOpen(false)}
          setUserPath={(userPath: userPathType) => setUserPath(userPath)}
        />
      </Stack>
      {userPaths?.map((item, index) => (
        <React.Fragment key={index}>
          <UserPathItem
            item={item}
            onDelete={(item: userPathType) => {
              api.delete(`/social/${item.id}`).then(({data}) => {
                setUserPaths(userPaths.filter((ele) => ele.id !== item.id));
              });
            }}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default Accordion;
