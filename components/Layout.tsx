import React, { useEffect } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import { useTranslation } from "react-i18next";
import { createServer } from "miragejs";
import deepOrange from "@material-ui/core/colors/deepOrange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { blue } from "@material-ui/core/colors";
import purple from "@material-ui/core/colors/purple";
import {
  CustomButton,
  CustomDialog,
  Header,
  ColorControlDialog,
} from "components";

const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  //  overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n, ready } = useTranslation();
  const [showDialogTheme, setShowDialogTheme] = React.useState<boolean>(false);
  const [isRtl, setIsRtl] = React.useState(true);
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const [defaultBg, setDefaultBg] = React.useState<{
    default: string;
    paper: string;
  }>({ default: "#080808", paper: "#121212" });

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.body.setAttribute("lang", isRtl ? "fa" : "en");
  }, [isRtl]);

  const handleChangeThem = (val: string) => {
    let bg = "";
    let paper = "";
    switch (val) {
      case "blue":
        bg = blue[600];
        paper = blue[500];
        break;
      case "purple":
        bg = purple[600];
        paper = purple[500];
        break;
      case "black":
        bg = "#080808";
        paper = "#121212";
        break;

      default:
        break;
    }
    setDefaultBg({ default: bg, paper: paper });
  };

  const handleConfigColors = () => {
    setShowDialogTheme(true);
  };

  const ltrTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: defaultBg,
          primary: deepOrange,
          secondary: blueGrey,
        },
        direction: "ltr",
      }),
    [mode, defaultBg]
  );

  const rtlTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: defaultBg,
          primary: deepOrange,
          secondary: blueGrey,
        },
        direction: "rtl",
      }),
    [mode, defaultBg]
  );

  const handleChangeDarkMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
    if (mode === "dark") {
      setDefaultBg({ default: "#fff", paper: "#fff" });
    } else {
      setDefaultBg({ default: "#080808", paper: "#121212" });
    }
  };

  const handleChangeLang = (val: boolean) => {
    setIsRtl(val);
    i18n.changeLanguage(val ? "fa" : "en");
  };

  const createVirtualServer = () => {
    createServer({
      routes() {
        this.get("/api/user", () => ({
          user: {
            name: "Zaniar Manochehri",
            socials: [
              { id: 1, link: "https://test.com", type: "Instagram" },
              { id: 2, link: "https://test1.com", type: "Telegram" },
            ],
          },
        }));

        this.post("/api/social", (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          return { social: attrs };
        });

        this.delete("/api/social/:id", (schema, request) => {
          let id = request.params.id;
          return { socialId: id };
        });
      },
    });
  };

  useEffect(() => {
    createVirtualServer();
  }, []);

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 66,
          }}
        >
          <Header
            handleChangeDarkMode={handleChangeDarkMode}
            handleChangeLang={handleChangeLang}
          />
        </div>
        {children}
        <button
          onClick={handleConfigColors}
          style={{
            position: "absolute",
            top: 35,
            right: "50%",
            width: 80,
            height: 48,
            borderRadius: 8,
            backgroundImage: "linear-gradient(to right, red , yellow)",
          }}
        ></button>
        <CustomDialog
          show={showDialogTheme}
          title="تنظیمات"
          onClose={() => setShowDialogTheme(false)}
          content={
            <ColorControlDialog
              onChange={handleChangeThem}
              onClose={() => setShowDialogTheme(false)}
            />
          }
          defaultButtons={false}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Layout;
