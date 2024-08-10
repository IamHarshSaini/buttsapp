import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { red } from "@mui/material/colors";
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const work_sans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  // Create a theme instance.
  const theme = createTheme({
    palette: {
      // primary: {
      //   main: "#556cd6",
      // },
      // secondary: {
      //   main: "#19857b",
      // },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: work_sans.style.fontFamily,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <main className={work_sans.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
