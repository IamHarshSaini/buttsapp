import Image from "next/image";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import styles from "./index.module.scss";
import { CiSearch } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
import { MdPersonAddAlt } from "react-icons/md";
import { IoFilterCircle } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { BsEmojiExpressionless } from "react-icons/bs";
import { IoFilterCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";

// scoket
import { socket } from "@/pages/_app";

function Chat() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any>([]);
  const [showUnRead, setShowUnRead] = useState<any>(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const getUserList = () => {
    let list: any = users.filter((x: any) => {
      if (showUnRead) {
        return (
          x.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
          x.count > 0
        );
      } else {
        return x.name.toLowerCase().includes(search.toLocaleLowerCase());
      }
    });
    return list;
  };

  const setUser = (item: any) => {
    setSelectedChat(item);
  };

  const GetChatBox = (item: any) => {
    return (
      <li className={styles.card} onClick={() => setUser(item)}>
        <div className={styles.avatar}>
          {item.avatar ? (
            <Image src={item.avatar} alt={item.name} />
          ) : item.isGroup ? (
            groupPlaceHolder
          ) : (
            userPlaceHolder
          )}
        </div>
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
            {item.count > 0 && <div className={styles.count}>{item.count}</div>}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chats}>
        <div className={styles.header}>
          <div className={styles.title}>Chat</div>
          <div className={styles.newChatAndSort}>
            <MdPersonAddAlt />
            {!showUnRead ? (
              <IoFilterCircleOutline
                onClick={() => setShowUnRead((prev: any) => !prev)}
              />
            ) : (
              <IoFilterCircle
                onClick={() => setShowUnRead((prev: any) => !prev)}
              />
            )}
          </div>
        </div>
        <div className={styles.filter}>
          <div className={styles.searchBox}>
            <input
              value={search}
              placeholder="Search or start new chat"
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <CiSearch />
          </div>
        </div>
        <ul>
          {getUserList().length > 0 &&
            getUserList()?.map((x: any, i: any) => (
              <GetChatBox {...x} key={`user-${i}`} />
            ))}
          {getUserList().length == 0 && (
            <li className={styles.noFound}>No Contact Found</li>
          )}
        </ul>
      </div>
      {selectedChat ? (
        <div className={styles.selectedChat}>
          <div className={styles.selectedChatHeader}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {selectedChat?.avatar ? (
                  <img src={selectedChat?.avatar} alt="avatar" />
                ) : selectedChat.isGroup ? (
                  groupPlaceHolder
                ) : (
                  userPlaceHolder
                )}
              </div>
              <div className={styles.name}>{selectedChat.name}</div>
            </div>
            <div className={styles.actions}>
              <IoMdCall />
              <IoVideocamSharp />
              <CiSearch />
              <IoMdMore />
            </div>
          </div>
          <div className={styles.messgaeBox}>
            <BsEmojiExpressionless />
            <GrAttachment />
            <div className={styles.input}>
              <CiCamera />
              <input placeholder="Type a message" id="message" />
            </div>
            <MdOutlineKeyboardVoice />
          </div>
        </div>
      ) : (
        <div className={styles.bg}>
          <Image
            alt="Bg"
            src="/assets/images/WA_BG.gif"
            height={300}
            width={100}
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
