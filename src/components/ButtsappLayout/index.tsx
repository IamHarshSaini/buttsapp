import React from "react";
import styles from "./index.module.scss";
import { FaRegStar } from "react-icons/fa";
import { PiSlideshow } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";

function ButtsappLayout({ children }: any) {
  const router = useRouter();

  const items: any = [
    {
      link: "chat",
      icon: <LuMessagesSquare />,
    },
    {
      link: "phone",
      icon: <IoCallOutline />,
    },
    {
      link: "stories",
      icon: <PiSlideshow />,
    },
    {
      icon: <hr />,
    },
    {
      link: "archives",
      icon: <IoArchiveOutline />,
    },
    {
      link: "starred",
      icon: <FaRegStar />,
    },
    {
      link: "settings",
      icon: <IoSettingsOutline />,
    },
  ];

  const getActiveRoute = (link: any) => {
    let path: any = router?.asPath?.split("/")[2];
    return path == link ? styles.active : "";
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sideNav}>
        {items.map((x: any, i: any) => {
          if (x.link) {
            return (
              <Link
                prefetch={false}
                key={`link-${i}`}
                href={`/buttsapp/${x.link}`}
                className={getActiveRoute(x.link)}
              >
                {x.icon}
              </Link>
            );
          } else {
            return <div key={`link-${i}`}>{x.icon}</div>;
          }
        })}
      </div>
      {children}
    </div>
  );
}

export default ButtsappLayout;
