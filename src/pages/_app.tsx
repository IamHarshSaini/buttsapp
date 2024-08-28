import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { useEffect, useReducer } from "react";
import reducer, { intialStates } from "@/reducer";
import { Work_Sans, Montserrat } from "next/font/google";

// css
import "@/styles/globals.scss";

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
  const [state, dispatch] = useReducer(reducer, intialStates);

  function onConnect() {
    dispatch({ type: "SOCKET_CONNECTED", payload: true });
  }

  function onDisconnect() {
    dispatch({ type: "SOCKET_CONNECTED", payload: false });
  }

  useEffect(() => {
    let { butsapp }: any = cookies.getAll();
    if (butsapp && !state.isUserLoggedIn && typeof butsapp == "string") {
      dispatch({ type: "IS_USER_LOGGED_IN", payload: true });
      dispatch({ type: "USER_DETAILS", payload: jwtDecode(butsapp) });
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
      if (state.isUserLoggedIn && socket) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
    };
  }, []);

  return (
    <main className={work_sans.className}>
      <Component
        toast={toast}
        socket={socket}
        dispatch={dispatch}
        {...{ ...state, ...pageProps }}
      />
      <ToastContainer />
    </main>
  );
}
