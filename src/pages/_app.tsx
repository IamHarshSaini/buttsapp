import "@/styles/globals.scss";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Work_Sans, Montserrat } from "next/font/google";

// toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// socket connection
export let socket: any = null;

const work_sans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const cookies = new Cookies(null, { path: "/" });
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<Boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<Boolean>(false);

  let props: any = {
    ...pageProps,
    toast: toast,
    socket: socket,
    isConnected: isConnected,
    userDetails: userDetails,
    setUserDetails: setUserDetails,
    setIsUserLoggedIn: setIsUserLoggedIn,
  };

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    let { butsapp }: any = cookies.getAll();
    if (butsapp && !isUserLoggedIn && typeof butsapp == "string") {
      setIsUserLoggedIn(true);
      setUserDetails(jwtDecode(butsapp));
      if (socket == null) {
        if (process.env.API_URL) {
          socket = io(process.env.API_URL, {
            query: {
              token: butsapp,
            },
          });
          socket.on("connect", onConnect);
          socket.on("disconnect", onDisconnect);
        }
      }
    } else {
      cookies.remove("butsapp");
    }
    return () => {
      if (isUserLoggedIn && socket) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
    };
  }, []);

  return (
    <main className={work_sans.className}>
      <Component {...props} />
      <ToastContainer />
    </main>
  );
}
