import dynamic from "next/dynamic";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { FaRegStar } from "react-icons/fa";
import { PiSlideshow } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";

// components
const Chat = dynamic(() => import("@/components/chat"), { ssr: false });
const Phone = dynamic(() => import("@/components/phone"), { ssr: false });
const Stories = dynamic(() => import("@/components/stories"), { ssr: false });
const Starred = dynamic(() => import("@/components/starred"), { ssr: false });
const Archives = dynamic(() => import("@/components/archives"), { ssr: false });
const Settings = dynamic(() => import("@/components/settings"), { ssr: false });

export default function Buttsapp(props: any) {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<any>(0);
  const { isConnected } = useSelector((state: any) => state.root);

  const items: any = [
    {
      comp: <Chat />,
      icon: <LuMessagesSquare />,
    },
    {
      comp: <Phone />,
      icon: <IoCallOutline />,
    },
    {
      comp: <Stories />,
      icon: <PiSlideshow />,
    },
    {
      icon: <hr />,
    },
    {
      comp: <Archives />,
      icon: <IoArchiveOutline />,
    },
    {
      comp: <Starred />,
      icon: <FaRegStar />,
    },
    {
      comp: <Settings />,
      icon: <IoSettingsOutline />,
    },
  ];

  const handleModuleClick = (item: any, index: Number) => {
    if (item?.comp) {
      setSelectedModuleIndex(index);
    }
  };

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
