/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { styled } from "@mui/material/styles";
import { TextField, Button, colors, Divider } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

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
      props: { error: error?.error_description || error.error || error },
    };
  }
};

export default function Login({ token, user, toast, error, children }: any) {
  let activeIndex = 0;
  const router = useRouter();
  const outerTheme = useTheme();
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

  const InputField = ({ control, label, name }: any) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            value={value}
            label={label}
            error={!!error}
            variant="outlined"
            onChange={onChange}
            helperText={error ? error.message : null}
          />
        )}
      />
    );
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
      router.push("/chat");
    }
    console.log(error);
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
              <ThemeProvider theme={customTheme(outerTheme)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {!isLogin && (
                    <InputField
                      label="User Name"
                      control={control}
                      name="userName"
                    />
                  )}
                  <InputField
                    label="Email Address"
                    control={control}
                    name="email"
                  />
                  <InputField
                    label="Password"
                    control={control}
                    name="password"
                  />
                  <ColorButton
                    size="large"
                    type="submit"
                    loading={loading}
                    variant="outlined"
                    disabled={!isValid}
                  >
                    {isLogin ? "Login" : "Create Account"}
                  </ColorButton>
                  <GetSocialIcons />
                </form>
              </ThemeProvider>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
}

const GetSocialIcons = () => {
  const socialButtonClicked = async (social: any) => {
    try {
      const { url }: any = await getSocialurl(social);
      window.open(url, "_self");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.socialContainer}>
      <Divider className={styles.divider}>Or</Divider>
      <div className={styles.socialWrapper}>
        <FaGoogle onClick={() => socialButtonClicked("google")} />
        <FaGithub onClick={() => socialButtonClicked("github")} />
        <FaXTwitter onClick={() => socialButtonClicked("facebook")} />
      </div>
    </div>
  );
};

const ColorButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  color: "var(--login-color)",
  borderColor: "var(--login-color)",
  backgroundColor: "transparent",
  "&:hover": {
    color: "#fff",
    borderColor: "var(--login-color)",
    backgroundColor: "var(--login-color)",
  },
  "&:disabled": {
    opacity: "0.5",
    color: "var(--login-color)",
    backgroundColor: "transparent",
    borderColor: "var(--login-color)",
  },
}));

const customTheme = (outerTheme: any) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "var(--login-color)",
            "--TextField-brandBorderHoverColor": "var(--login-color)",
            "--TextField-brandBorderFocusedColor": "var(--login-color)",
            "& label.Mui-focused": {
              color: "var(--login-color)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--login-color)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--login-color)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--login-color)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--login-color)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--login-color)",
            },
            "&.Mui-focused:after": {
              borderBottom: "2px solid var(--login-color)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--login-color)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--login-color)",
            },
            "&.Mui-focused:after": {
              borderBottom: "2px solid var(--login-color)",
            },
          },
        },
      },
    },
  });
