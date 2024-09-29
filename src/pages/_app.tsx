import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { Work_Sans, Montserrat } from "next/font/google";
import { initializeSocket, removeListners } from "@/socket";

// css
import "@/styles/globals.scss";

// toast and redux
import { store } from "@/redux";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setIsUserLoggedIn, setUserDetails } from "@/redux/reducer";
import { useRouter } from "next/router";
import Loader from "@/components/loader";

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

  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteChanged = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChanged);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, []);

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
      removeListners();
    };
  }, []);

  if (loading) {
    return <Loader />
  } else {
    return (
      <main className={work_sans.className}>
        <Provider store={store}>
          <Component {...pageProps} toast={toast} />
          <ToastContainer />
        </Provider>
      </main>
    );
  }
}
