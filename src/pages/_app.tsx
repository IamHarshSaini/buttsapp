import "@/styles/globals.scss";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Work_Sans, Montserrat } from "next/font/google";

// socket connection
export let socket: any = null;

const work_sans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const cookies = new Cookies(null, { path: "/" });
  const [loading, setLoading] = useState<Boolean>(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<Boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<Boolean>(false);

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
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChanged);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, []);

  useEffect(() => {
    let { butsapp }: any = cookies.getAll();
    if (butsapp && !isUserLoggedIn) {
      setLoading(true)
      setIsUserLoggedIn(true);
      setUserDetails(jwtDecode(butsapp));
      if (socket == null) {
        socket = io("http://localhost:8080");
        if (socket.connected) onConnect();
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
      }
      setLoading(false)
    }
    return () => {
      if (butsapp) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
    };
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      {loading && <h1>Loading</h1>}
      {!loading && (
        <main className={work_sans.className}>
          <Component
            {...pageProps}
            isConnected={isConnected}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
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
