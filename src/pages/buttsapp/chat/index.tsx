import Image from "next/image";
import { CiUser } from "react-icons/ci";
import styles from "./index.module.scss";
import { CiSearch } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
import { MdPersonAddAlt } from "react-icons/md";
import { IoFilterCircle } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { BsEmojiExpressionless } from "react-icons/bs";
import { IoFilterCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { getAllUsers, getChatMessage, setToken } from "@/api.service";

export const getServerSideProps = async ({ req }: any) => {
  setToken(req);
  let users = await getAllUsers();
  return {
    props: {
      users,
    },
  };
};

export default function Chat({ isConnected, socket, users, userDetails }: any) {
  const [search, setSearch] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [showUnRead, setShowUnRead] = useState<any>(false);
  const [chatMessgaes, setChatMessages] = useState<any>([]);
  const [chatList, setChatList] = useState<any>(users || []);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  // constant
  const userPlaceHolder = <CiUser />;
  const groupPlaceHolder = <PiUsersThree />;

  const getUserList = () => {
    let list: any = chatList.filter((x: any) => {
      if (showUnRead) {
        return (
          x?.userName?.toLowerCase()?.includes(search.toLocaleLowerCase()) &&
          x?.count > 0
        );
      } else {
        return x?.userName?.toLowerCase()?.includes(search.toLocaleLowerCase());
      }
    });
    return list;
  };

  const GetChatBox = (item: any) => {
    return (
      <li className={styles.card} onClick={() => handleChatClick(item)}>
        <div className={styles.avatar}>
          {item?.avatar ? (
            <Image src={item.avatar} alt={item.userName} fill={true} />
          ) : item.isGroup ? (
            groupPlaceHolder
          ) : (
            userPlaceHolder
          )}
        </div>
        <div className={styles.box}>
          <div className={styles.nameAndTime}>
            <div className={styles.name}>{item.userName}</div>
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

  const handleChatClick = async (item: any) => {
    setSelectedChat(item);
    let res = await getChatMessage(userDetails._id, item._id);
    setChatMessages(res);
  };

  const handleSendMessgae = (e: any) => {
    e.preventDefault();
    socket.emit("sendMessage", { message, id: selectedChat._id });
    setChatMessages((prev: any) => [
      ...prev,
      { content: message, sender: userDetails._id },
    ]);
    setMessage("");
  };

  useEffect(() => {
    if (isConnected) {
      socket.on("message", (message: any) => {
        setChatMessages((prev: any) => [
          ...prev,
          { content: message, receiver: selectedChat?._id },
        ]);
      });
    }
  }, []);

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
                  <Image src={selectedChat?.avatar} alt="avatar" fill={true} />
                ) : selectedChat.isGroup ? (
                  groupPlaceHolder
                ) : (
                  userPlaceHolder
                )}
              </div>
              <div className={styles.name}>{selectedChat.userName}</div>
            </div>

            <div className={styles.actions}>
              <IoMdCall />
              <IoVideocamSharp />
              <CiSearch />
              <IoMdMore />
            </div>
          </div>
          <ul>
            {chatMessgaes?.map((item: any, i: any) => (
              <li
                key={`messgae-${i}`}
                className={item.sender == userDetails._id ? styles.right : ""}
              >
                <div className={styles.box}>{item.content}</div>
              </li>
            ))}
          </ul>
          <div className={styles.messgaeBox}>
            <BsEmojiExpressionless />
            <GrAttachment />
            <form onSubmit={handleSendMessgae}>
              <div className={styles.input}>
                <CiCamera />
                <input
                  value={message}
                  placeholder="Type a message"
                  onChange={(e: any) => setMessage(e.target.value)}
                />
              </div>
              {message?.length > 0 ? (
                <IoMdSend type="submit" />
              ) : (
                <MdOutlineKeyboardVoice />
              )}
            </form>
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
