import moment from "moment";
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
import { BsEmojiExpressionless } from "react-icons/bs";
import { IoFilterCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";

export default function Chat({ socket, users, userDetails, allUserList }: any) {
  const msgRef: any = useRef();
  const [search, setSearch] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [newChat, setNewChat] = useState<Boolean>(false);
  const [showUnRead, setShowUnRead] = useState<any>(false);
  const [chatList, setChatList] = useState<any>(users || []);

  // selected chat states
  const [chatMessgaes, setChatMessages] = useState<any>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  // constant
  const userPlaceHolder = <CiUser />;
  const groupPlaceHolder = <PiUsersThree />;

  const getUserList = () => {
    let list: any = (newChat ? allUserList : chatList).filter((x: any) => {
      if (showUnRead) {
        return x?.name?.toLowerCase()?.includes(search.toLocaleLowerCase());
      } else {
        return x?.name?.toLowerCase()?.includes(search.toLocaleLowerCase());
      }
    });
    return list;
  };

  const GetChatBox = (item: any) => {
    return (
      <li className={styles.card} onClick={() => handleChatClick(item)}>
        <div className={styles.avatar}>
          {item?.profilePicture ? (
            <Image src={item.profilePicture} alt={item.name} fill={true} />
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

  const handleChatClick = async (item: any) => {
    setSelectedChat(item);
    if (item.isGroup) {
    } else {
      socket.emit("chatMessages", item._id, (msg: any) => {
        scrollToBottom();
        msgRef.current.focus();
        setChatMessages(msg.reverse());
      });
    }
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    socket.emit(
      "sendMessage",
      message,
      selectedChat._id,
      "text",
      (msg: any) => {
        setChatMessages((prev: any) => [...prev, msg]);
        setMessage("");
        scrollToBottom();
      }
    );
  };

  const scrollToBottom = () => {
    try {
      setTimeout(() => {
        var headerOffset = 0;
        var element: any = document.getElementById("lastChatMessageRef");
        if (element) {
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          let chats: any = document.getElementById("chats");
          chats.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 20);
    } catch (error) {}
  };

  const getTime = (time: string) => {
    return moment(time).format("hh:mm A");
  };

  useEffect(() => {
    socket.on("message", (message: any) => {
      setChatMessages((prev: any) => [...prev, message]);
      scrollToBottom();
    });
    socket.emit("chatList",  (arr: any) => {
      setChatList(arr);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chats}>
        <div className={styles.header}>
          <div className={styles.title}>Chat</div>
          <div className={styles.newChatAndSort}>
            <MdPersonAddAlt
              onClick={() => setNewChat((prev: Boolean) => !prev)}
            />
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
                {selectedChat?.profilePicture ? (
                  <Image
                    src={selectedChat?.profilePicture}
                    alt="avatar"
                    fill={true}
                  />
                ) : selectedChat.isGroup ? (
                  groupPlaceHolder
                ) : (
                  userPlaceHolder
                )}
              </div>
              <div className={styles.about}>
                <div className={styles.name}>{selectedChat.name}</div>
                {/* <div
                  className={`${styles.status} ${
                    isChatOnline ? styles.online : styles.offline
                  }`}
                >
                  {isChatOnline ? "online" : "offline"}
                </div> */}
              </div>
            </div>

            <div className={styles.actions}>
              <IoMdCall />
              <IoVideocamSharp />
              <CiSearch />
              <IoMdMore />
            </div>
          </div>
          <ul id="chats">
            {chatMessgaes?.map((item: any, i: any) => (
              <li
                key={`messgae-${i}`}
                className={item.sender == userDetails._id ? styles.right : ""}
              >
                <div className={styles.box}>
                  {item.content}
                  <span>{getTime(item.createdAt)}</span>
                </div>
              </li>
            ))}
            <div id={"lastChatMessageRef"} />
          </ul>

          <div className={styles.messgaeBox}>
            <BsEmojiExpressionless />
            <GrAttachment />
            <form onSubmit={handleSendMessage}>
              <div className={styles.input}>
                <CiCamera />
                <input
                  ref={msgRef}
                  value={message}
                  autoFocus={true}
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
