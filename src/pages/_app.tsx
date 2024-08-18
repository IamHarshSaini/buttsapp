import "@/styles/globals.scss";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import RouterLoader from "@/components/RouterLoader";
import { Work_Sans, Montserrat } from "next/font/google";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtsappLayout from "@/components/ButtsappLayout";

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

  let props: any = {
    ...pageProps,
    toast: toast,
    isConnected: isConnected,
    userDetails: userDetails,
    setUserDetails: setUserDetails,
    setIsUserLoggedIn: setIsUserLoggedIn,
  };

  function onConnect(e?: any) {
    console.log(e);
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
      setLoading(true);
      setIsUserLoggedIn(true);
      setUserDetails(jwtDecode(butsapp));
      if (socket == null) {
        if (process.env.API_URL) {
          socket = io(process.env.API_URL, {
            query: {
              token: butsapp,
            },
          });
          if (socket.connected) onConnect();
          socket.on("connect", onConnect);
          socket.on("disconnect", onDisconnect);
        }
      }
      setLoading(false);
    }
    return () => {
      if (butsapp) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
    };
  }, [router]);

  const GetLayout = () => {
    let path: any = router?.asPath?.split("/")[1];
    switch (path) {
      case "buttsapp":
        return (
          <ButtsappLayout loading={loading}>
            <Component {...props} />
          </ButtsappLayout>
        );
      default:
        return (
          <>
            {loading && <RouterLoader />}
            {!loading && <Component {...props} />}
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={work_sans.className}>
        <GetLayout />
        <ToastContainer />
      </main>
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
    // error: {
    //   main: red.A400,
    // },
  },
  typography: {
    fontFamily: work_sans.style.fontFamily,
  },
});
