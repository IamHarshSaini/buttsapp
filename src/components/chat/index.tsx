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
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoFilterCircle } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { BsEmojiExpressionless } from "react-icons/bs";
import { IoFilterCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { getTime } from "@/utils/constant";

export default function Chat({
  socket,
  chatList,
  dispatch,
  userDetails,
  allUserList,
  selectedChatId,
}: any) {
  const msgRef: any = useRef();
  const [search, setSearch] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [newChat, setNewChat] = useState<Boolean>(false);
  const [showUnRead, setShowUnRead] = useState<any>(false);

  // selected chat states
  const [chatMessgaes, setChatMessages] = useState<any>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  // constant
  const userPlaceHolder = <CiUser />;
  const groupPlaceHolder = <PiUsersThree />;

  const GetChats = () => {
    let list: any = newChat ? allUserList : chatList;
    // .filter((x: any) => {
    //   if (showUnRead) {
    //     return x?.name?.toLowerCase()?.includes(search.toLocaleLowerCase());
    //   } else {
    //     return x?.name?.toLowerCase()?.includes(search.toLocaleLowerCase());
    //   }
    // });

    if (!newChat) {
      return (
        <>
          {list?.length > 0 &&
            list.map((item: any, i: Number) => {
              let isGroup = item.isGroup;
              let groupDetails = item.group;
              let chatMember = item.members?.[0];
              return (
                <li
                  key={`chat-${i}`}
                  className={styles.card}
                  onClick={() => handleChatClick(item)}
                >
                  <div className={styles.avatar}>
                    {isGroup && (
                      <>
                        {groupDetails.groupPicture ? (
                          <Image
                            src={groupDetails.groupPicture}
                            alt={groupDetails.name}
                            fill={true}
                          />
                        ) : (
                          groupPlaceHolder
                        )}
                      </>
                    )}
                    {!isGroup && (
                      <>
                        {chatMember?.profilePicture ? (
                          <Image
                            src={chatMember?.profilePicture}
                            alt={chatMember.name}
                            fill={true}
                          />
                        ) : (
                          userPlaceHolder
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.box}>
                    <div className={styles.nameAndTime}>
                      <div className={styles.name}>
                        {isGroup ? groupDetails?.name : chatMember?.name}
                      </div>
                      {item?.lastMessage?.createdAt && (
                        <div className={styles.time}>
                          {getTime(item.lastMessage.createdAt)}
                        </div>
                      )}
                    </div>
                    <div className={styles.lowerRow}>
                      <div className={styles.message}>
                        {isGroup && (
                          <span>{item.lastMessage.sender.name} :</span>
                        )}
                        {item?.lastMessage?.content && item.lastMessage.content}
                      </div>
                      {/* {item.count > 0 && (
                        <div className={styles.count}>{item.count}</div>
                      )} */}
                    </div>
                  </div>
                </li>
              );
            })}
          {list?.length == 0 && (
            <li className={styles.noFound}>No Contact Found</li>
          )}
        </>
      );
    } else {
      return (
        <>
          {list.length > 0 &&
            list.map((item: any, i: Number) => (
              <li
                key={`newChat-${i}`}
                className={styles.card}
                onClick={() => handleNewChatClicked(item)}
              >
                <div className={styles.avatar}>
                  {item?.profilePicture ? (
                    <Image
                      src={item?.profilePicture}
                      alt={item.name}
                      fill={true}
                    />
                  ) : (
                    userPlaceHolder
                  )}
                </div>
                <div className={styles.box}>
                  <div className={styles.nameAndTime}>
                    <div className={styles.name}>{item.name}</div>
                  </div>
                </div>
              </li>
            ))}
          {list.length == 0 && (
            <li className={styles.noFound}>No Contact Found</li>
          )}
        </>
      );
    }
  };

  const handleChatClick = async (item: any) => {
    if (item?._id) {
      dispatch({ type: "CHAT_ID", payload: item?._id });
    }
    // setSelectedChat(item);
    // socket.emit("getChatMessages", item._id, (msg: any) => {
    //   scrollToBottom();
    //   msgRef.current.focus();
    //   setChatMessages(msg.reverse());
    // });
  };

  const handleNewChatClicked = async (item: any) => {
    socket.emit("createNewChat", item._id, ({ chat, messages }: any) => {
      dispatch({ type: "CHAT_ID", payload: chat._id });
      dispatch({
        type: "CHAT_LIST",
        payload: [chat, ...chatList],
      });
      setNewChat(false);
      setSelectedChat(chat);
      if (messages.length > 0) {
        setChatMessages(messages.reverse());
      }
    });
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    socket.emit("sendMessage", message, selectedChatId, "text", (msg: any) => {
      setChatMessages((prev: any) => [...prev, msg]);
      setMessage("");
      scrollToBottom();
    });
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

  console.log(chatList)

  // useEffect(() => {
  //   socket.on("message", (message: any) => {
  //     setChatMessages((prev: any) => [...prev, message]);
  //     scrollToBottom();
  //   });
  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chats}>
        <div className={styles.header}>
          <div className={styles.title}>Chat</div>
          <div className={styles.newChatAndSort}>
            {newChat ? (
              <MdPersonAddAlt1
                onClick={() => setNewChat((prev: Boolean) => !prev)}
              />
            ) : (
              <MdPersonAddAlt
                onClick={() => setNewChat((prev: Boolean) => !prev)}
              />
            )}
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
          <GetChats />
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
