import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CircleIcon from "@mui/icons-material/Circle";

type Props = {
  breadList: { name: string; link: string; onClick?: () => void }[];
};

const Breadcrumb: React.FC<Props> = ({ breadList }) => {
  const breadcrumbs = breadList?.map((bread, index) => (
    <Link
      underline="none"
      href={bread.link}
      onClick={bread.onClick}
      // color="inherit"
      key={index++}
      sx={{
        display: "flex",
        alignItems: "center",
        fontFamily: 'IRANYekan',
        color: "rgb(121, 131, 142)",
      }}
    >
      <CircleIcon sx={{ ml: 1 }} fontSize="inherit" />
      {bread.name}
    </Link>
  ));

  return (
    <Stack spacing={10}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default Breadcrumb;
