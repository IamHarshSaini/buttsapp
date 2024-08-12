import "@/styles/globals.scss";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Work_Sans, Montserrat } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

// socket connection
export const socket = io("http://localhost:8080");

const work_sans = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);
  const [isConnected, setIsConnected] = useState<Boolean>(false);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  const handleRouteChange = (url: any, { shallow }: any) => {
    setLoading(true);
  };

  const handleRouteChanged = (url: any, { shallow }: any) => {
    setLoading(false);
  };

  useEffect(() => {
    if (socket.connected) onConnect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChanged);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading && <h1>Loading</h1>}
      {!loading && (
        <main className={work_sans.className}>
          <Component {...pageProps} isConnected={isConnected} />
        </main>
      )}
    </ThemeProvider>
  );
}

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
