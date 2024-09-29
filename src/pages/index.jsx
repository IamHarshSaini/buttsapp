import dynamic from "next/dynamic";
import React, { useState } from "react";
import styles from "./index.module.scss";

import {
  Status,
  Setting,
  Chat as ChatIcon,
  Phone as PhoneIcon,
  Starred as StarredIcon,
  Archives as ArchivesIcon,
} from "@/utils/icon";

// components
const Chat = dynamic(() => import("@/components/chat"), { ssr: false });
const Phone = dynamic(() => import("@/components/phone"), { ssr: false });
const Stories = dynamic(() => import("@/components/stories"), { ssr: false });
const Starred = dynamic(() => import("@/components/starred"), { ssr: false });
const Archives = dynamic(() => import("@/components/archives"), { ssr: false });
const Settings = dynamic(() => import("@/components/settings"), { ssr: false });

export default function HomePage() {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const items = [
    {
      comp: <Chat />,
      icon: <ChatIcon />,
    },
    {
      comp: <Phone />,
      icon: <PhoneIcon />,
    },
    {
      comp: <Stories />,
      icon: <Status />,
    },
    {
      icon: <hr />,
    },
    {
      comp: <Archives />,
      icon: <ArchivesIcon />,
    },
    {
      comp: <Starred />,
      icon: <StarredIcon />,
    },
    {
      comp: <Settings />,
      icon: <Setting />,
    },
  ];

  const handleModuleClick = (item, index) => {
    if (item?.comp) {
      setSelectedModuleIndex(index);
    }
  };

  return (
    <div className={styles.layout}>
      <ul className={styles.list}>
        {items.map((x, i) => (
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
      {items[selectedModuleIndex].comp}
    </div>
  );
}
