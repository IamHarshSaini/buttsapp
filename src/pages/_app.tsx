import { useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { Work_Sans, Montserrat } from "next/font/google";
import { initializeSocket, removeListners } from "@/socket";

// css
import "@/styles/globals.scss";

// toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/redux";
import { setIsUserLoggedIn, setUserDetails } from "@/redux/reducer";

const work_sans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const cookies = new Cookies(null, { path: "/" });
  const { getState, dispatch } = store;
  const {
    root: { isUserLoggedIn },
  } = getState();

  useEffect(() => {
    let { butsapp }: any = cookies.getAll();
    if (butsapp && typeof butsapp == "string") {
      if (!isUserLoggedIn) {
        dispatch(setIsUserLoggedIn(true));
        dispatch(setUserDetails(jwtDecode(butsapp)));
        initializeSocket();
      }
    } else {
      cookies.remove("butsapp");
    }
    return () => {
      if (isUserLoggedIn) {
        removeListners();
      }
    };
  }, []);

  return (
    <main className={work_sans.className}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </main>
  );
}
