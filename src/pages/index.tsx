import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FaRegStar } from "react-icons/fa";
import { PiSlideshow } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

// components
const Chat = dynamic(() => import("@/components/chat"), { ssr: false });
const Phone = dynamic(() => import("@/components/phone"), { ssr: false });
const Stories = dynamic(() => import("@/components/stories"), { ssr: false });
const Starred = dynamic(() => import("@/components/starred"), { ssr: false });
const Archives = dynamic(() => import("@/components/archives"), { ssr: false });
const Settings = dynamic(() => import("@/components/settings"), { ssr: false });

export default function Buttsapp(props: any) {
  const { isConnected, socket, dispatch } = props;
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<any>(0);

  const items: any = [
    {
      comp: <Chat {...props} />,
      icon: <LuMessagesSquare />,
    },
    {
      comp: <Phone {...props} />,
      icon: <IoCallOutline />,
    },
    {
      comp: <Stories {...props} />,
      icon: <PiSlideshow />,
    },
    {
      icon: <hr />,
    },
    {
      comp: <Archives {...props} />,
      icon: <IoArchiveOutline {...props} />,
    },
    {
      comp: <Starred {...props} />,
      icon: <FaRegStar />,
    },
    {
      comp: <Settings {...props} />,
      icon: <IoSettingsOutline />,
    },
  ];

  const handleModuleClick = (item: any, index: Number) => {
    if (item?.comp) {
      setSelectedModuleIndex(index);
    }
  };

  useEffect(() => {
    if (isConnected) {
      socket.emit("getAllUserList", (list: any) => {
        dispatch({ type: "ALL_USER_LIST", payload: list });
      });
      socket.emit("chatList", (list: any) => {
        dispatch({ type: "CHAT_LIST", payload: list });
      });
      // socket.on("updateChatList", (item: any) => {
      //   dispatch({ type: "UPDATE_CHAT_LIST", payload: item });
      // });
    }
    return () => {
      // socket.off("updateChatList");
    };
  }, [isConnected]);

  return (
    <div className={styles.layout}>
      <ul className={styles.list}>
        {items.map((x: any, i: Number) => (
          <li
            className={`${styles.item} ${
              i == selectedModuleIndex ? styles.active : ""
            } ${!x.comp ? styles.hideCursor : ""}`}
            onClick={() => handleModuleClick(x, i)}
            key={`module-${i}`}
          >
            {x.icon}
          </li>
        ))}
      </ul>
      {isConnected && items[selectedModuleIndex].comp}
    </div>
  );
}
