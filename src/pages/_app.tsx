import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { useEffect, useReducer } from "react";
import reducer, { intialStates } from "@/reducer";
import { Work_Sans, Montserrat } from "next/font/google";
import { socket, initializeSocket, removeListners } from "@/socket";

// css
import "@/styles/globals.scss";

// toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const work_sans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const cookies = new Cookies(null, { path: "/" });
  const [state, dispatch] = useReducer(reducer, intialStates);

  useEffect(() => {
    let { butsapp }: any = cookies.getAll();
    if (butsapp && typeof butsapp == "string") {
      if (!state.isUserLoggedIn) {
        dispatch({ type: "IS_USER_LOGGED_IN", payload: true });
        dispatch({ type: "USER_DETAILS", payload: jwtDecode(butsapp) });
        initializeSocket({ dispatch });
      }
    } else {
      cookies.remove("butsapp");
    }
    return () => {
      if (state.isUserLoggedIn) {
        removeListners();
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
