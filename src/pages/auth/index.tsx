/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// api
import { getSocialurl, verifySocialAuth } from "@/api.service";
import Cookies from "universal-cookie";

export const getServerSideProps = async ({ params, query }: any) => {
  try {
    const { social, code } = query;
    if (social && code) {
      let { token, ...rest }: any = await verifySocialAuth(social, code);
      if (token) {
        return {
          props: {
            token,
          },
        };
      } else {
        throw rest;
      }
    } else {
      return {
        props: {},
      };
    }
  } catch (error: any) {
    return {
      props: { error: error?.message || error },
    };
  }
};

export default function Login({ token, user, toast, error, children }: any) {
  let activeIndex = 0;
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const [rowCount, setRowCount] = useState<any>(30);
  const [clientSide, setClientSide] = useState(false);
  const [columnCount, setColumnCount] = useState<any>();

  const colorOptions: any = [
    { color: "#0f0", gradient: "linear-gradient(#000, #0f0, #000)" },
    {
      color: "rgba(0,212,255,1)",
      gradient:
        "linear-gradient( rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    },
    {
      color: "#e01c34",
      gradient: "linear-gradient(#acabb0 0%, #e01c34 74%)",
    },
    {
      color: "#e8c547",
      gradient: "linear-gradient(147deg, #c20114 0%, #e8c547 74%)",
    },
  ];

  let colorIntervalFnc = (frezze: any) => {
    if (!frezze) {
      activeIndex++;
      if (!colorOptions[activeIndex]) {
        activeIndex = 0;
      }
    }
    document.documentElement.style.setProperty(
      "--login-color",
      colorOptions[activeIndex].color
    );
    document.documentElement.style.setProperty(
      "--login-gradient",
      colorOptions[activeIndex].gradient
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    defaultValues: {
      userName: "Harsh Saini",
      email: "hs7222867@gmail.com",
      password: "123456",
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    setLoading(true);
    try {
      if (isLogin) {
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRowCount(("" + window?.innerHeight)[0]);
    if (window.innerWidth < 768) {
      setColumnCount(10);
    } else if (window.innerWidth < 1024) {
      setColumnCount(20);
    } else {
      setColumnCount(30);
    }
    colorIntervalFnc(true);
    setClientSide(true);
    let colorInterval = setInterval(colorIntervalFnc, 5000);
    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  useEffect(() => {
    if (token) {
      cookies.set("butsapp", token);
      router.push("/");
    }
    if (error) {
      toast(error);
    }
  }, []);

  if (clientSide) {
    return (
      <div className={styles.wrapper}>
        <section style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
          {Array.from({ length: rowCount * 2.5 }).map((x, i) => {
            return Array.from({ length: columnCount }).map((x, i1) => (
              <span key={`box-${(i + 1) * (i1 + 1)}`} />
            ));
          })}
        </section>
        {!children ? (
          <div className={styles.loginContainer}>
            <div className={styles.leftSection}>
              {isLogin && (
                <Image src="/assets/svg/Sign.svg" alt="login" fill={true} />
              )}
              {!isLogin && (
                <Image src="/assets/svg/Signup.svg" alt="login" fill={true} />
              )}
            </div>
            <div className={styles.rightSection}>
              <h2>Get's started.</h2>
              <div className={styles.dontHaveAccount}>
                <span>{isLogin ? "Don't" : "Already"} have an account?</span>
                <span onClick={() => setIsLogin((prev) => !prev)}>
                  {isLogin ? "Signup" : "Signin"}
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {!isLogin && (
                  <input
                    {...register("userName", { required: true })}
                    placeholder="User Name"
                    required={true}
                  />
                )}
                <input
                  {...register("email", { required: true })}
                  placeholder="Email Address"
                  required={true}
                  type="email"
                />
                <input
                  {...register("password", { required: true })}
                  placeholder="Password"
                  required={true}
                  type="password"
                />
                <button type="submit" disabled={!isValid}>
                  {isLogin ? "Login" : "Create Account"}
                </button>
                <GetSocialIcons toast={toast} />
              </form>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
}

const GetSocialIcons = ({ toast }: any) => {
  const socialButtonClicked = async (social: any) => {
    try {
      const { url }: any = await getSocialurl(social);
      window.open(url, "_self");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.socialContainer}>
      <div className={styles.divider}>Or</div>
      <div className={styles.socialWrapper}>
        <FaGoogle onClick={() => socialButtonClicked("google")} />
        <FaGithub onClick={() => socialButtonClicked("github")} />
        <FaXTwitter onClick={() => socialButtonClicked("facebook")} />
      </div>
    </div>
  );
};
