import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.scss";
import { IoMdCall } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { GrAttachment } from "react-icons/gr";
import { IoVideocamSharp } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { PiCardsThreeDuotone } from "react-icons/pi";
import { BsEmojiExpressionless } from "react-icons/bs";
import { MdOutlineKeyboardVoice } from "react-icons/md";

export default function Home({ userDetails }: any) {
  const [List, setList] = useState<[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const GetChatBox = (item: any) => {
    return (
      <li className={styles.card}>
        <div className={styles.avatar}></div>
        <div className={styles.box}>
          <div className={styles.nameAndTime}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.time}>{item.time}</div>
          </div>
          <div className={styles.lowerRow}>
            <div className={styles.message}>
              {item?.isGroup && <span>{item.name} :</span>}
              {item.message}
            </div>
            <div className={styles.count}>{item.count}</div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            {userDetails?.dp && (
              <Image src={userDetails?.dp} fill={true} alt="user" />
            )}
          </div>
          <div className={styles.actions}>
            <MdGroups2 />
            <PiCardsThreeDuotone />
            <MdMessage />
            <IoMdMore />
          </div>
        </div>
        {selectedUser && (
          <div className={styles.right}>
            <div className={styles.selectedUser}>
              <div className={styles.avatar}></div>
              <div className={styles.name}>Harsh Saini</div>
            </div>
            <div className={styles.actions}>
              <IoMdCall />
              <IoVideocamSharp />
              <CiSearch />
              <IoMdMore />
            </div>
          </div>
        )}
      </header>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.filter}>
            <div className={styles.searchBox}>
              <input placeholder="Search or start new chat" />
              <CiSearch />
            </div>
            <IoFilterOutline />
          </div>
          <ul>
            {List.map((item: any, i: Number) => (
              <GetChatBox {...item} key={i} />
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          {selectedUser && (
            <div className={styles.messgaeBox}>
              <BsEmojiExpressionless />
              <GrAttachment />
              <div className={styles.input}>
                <CiCamera />
                <input placeholder="Type a message" id="message" />
              </div>
              <MdOutlineKeyboardVoice />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
