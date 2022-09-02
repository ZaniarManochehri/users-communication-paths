// @ts-nocheck
import Stack from "@mui/material/Stack";
import { maxWidth } from "@mui/system";
import { Header, Breadcrumb, Accordion } from "components";
import Box from "@mui/material/Box";
import styles from "../styles/Home.module.css";

export default function Home() {
  const breadList = [
    { name: "خانه", link: "http://116.203.243.155:3082/" },
    { name: "کاربر", link: "http://116.203.243.155:3082/" },
    { name: "تنظیمات کاربری", link: "http://116.203.243.155:3082/" },
  ];
  return (
    <Stack alignItems="center" pt={10}>
      <Stack style={{ width: "100%", maxWidth: 900 }} spacing={1} gap={6}>
        <Stack spacing={1}>
          <Header />
          <Breadcrumb breadList={breadList} />
        </Stack>
        <Accordion ></Accordion>
      </Stack>
    </Stack>
  );
}
