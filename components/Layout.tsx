import React, { useEffect } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";

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

const ColorModeContext = React.createContext({ Layout: () => {} });
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRtl, setIsRtl] = React.useState(true);
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  React.useLayoutEffect(() => {
    // document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [isRtl]);

  const ltrTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        direction: "ltr",
      }),
    [mode]
  );

  const rtlTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        direction: "rtl",
      }),
    [mode]
  );

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Layout;
