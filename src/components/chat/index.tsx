// icons
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { getTime } from "@/utils/constant";
import { GrAttachment } from "react-icons/gr";
import { IoCheckmark } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdPersonAddAlt } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoFilterCircle } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsEmojiExpressionless } from "react-icons/bs";
import { IoFilterCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";

// next and styles
import Image from "next/image";
import styles from "./index.module.scss";
import React, { useRef, useState } from "react";

// redux
import {
  // updateChat,
  // setChatList,
  setChatMessages,
  // addNewChatMessage,
  setSelectedChat,
} from "@/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

// common
import { socket, toggleConnection } from "@/socket";

function Chat() {
  const { chatList, userDetails, allUserList, chatMessages, selectedChat } =
    useSelector((state: any) => state.root);

  const dispatch = useDispatch();
  const msgRef: any = useRef(null);
  const [search, setSearch] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [showAbout, setShowAbout] = useState<any>(false);
  const [newChat, setNewChat] = useState<Boolean>(false);
  const [showUnRead, setShowUnRead] = useState<Boolean>(false);

  // constant
  const userPlaceHolder = <CiUser />;
  const groupPlaceHolder = <PiUsersThree />;

  const handleChatClick = async (item: any) => {
    if (selectedChat?._id != item._id) {
      socket.emit("getChatMessages", item._id, (Messages: any[]) => {
        dispatch(setSelectedChat(item));
        dispatch(setChatMessages(Messages));
      });
    }
  };

  const handleNewChatClicked = async (item: any) => {
    // socket.emit("createNewChat", item._id, ({ chat, messages }: any) => {
    //   let isAvailable = chatList.some(
    //     (element: any) => element._id == chat._id
    //   );
    //   if (!isAvailable) {
    //     dispatch(setChatList([chat, ...chatList]));
    //   }
    //   setNewChat(false);
    //   dispatch(setSelectedChat(chat));
    //   if (messages.length > 0) {
    //     dispatch(setChatMessages(messages));
    //   }
    // });
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    await socket.emit("sendMessage", {
      message,
      type: "text",
      chatId: selectedChat._id,
      isGroup: selectedChat.isGroup,
      receiverId: selectedChat.chatMember._id,
    });
    setMessage("");
  };

  const ChatList = () => {
    let list: any = newChat ? allUserList : chatList;
    // .filter((x: any) => {
    //   if (showUnRead) {
    //     return x?.name?.toLowerCase()?.includes(search.toLocaleLowerCase());
    //   } else {
    //     return x?.name?.toLowerCase()?.includes(search.toLocaleLowerCase());
    //   }
    // });

    return (
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
          {!newChat && (
            <>
              {list?.length > 0 &&
                list.map((item: any, i: Number) => {
                  let { isGroup, groupDetails, chatMember } = item;
                  return (
                    <li
                      key={`chat-${i}`}
                      className={`${styles.card} ${
                        selectedChat?._id == item._id ? styles.active : ""
                      }`}
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
                        <div className={styles.lastMessage}>
                          <div className={styles.message}>
                            {isGroup && (
                              <span>{item.lastMessage.sender.name} :</span>
                            )}
                            {item?.lastMessage?.content &&
                              item.lastMessage.content}
                          </div>
                          {/*{item.count > 0 && (
                          <div className={styles.count}>{item.count}</div>
                        )}*/}
                        </div>
                      </div>
                    </li>
                  );
                })}
              {list?.length == 0 && (
                <li className={styles.noFound}>No Contact Found</li>
              )}
            </>
          )}
          {newChat && (
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
          )}
        </ul>
      </div>
    );
  };

  const ChatInfo = () => {
    const GetMessageStatus = (item: any) => {
      const { sender } = item;
      if (sender == userDetails._id) {
        if (item?.readBy?.length > 0) {
          return <IoCheckmarkDone style={{ color: "#4FB6EC" }} />;
        } else if (item?.deliveredTo?.length > 0) {
          return <IoCheckmarkDone />;
        } else {
          return <IoCheckmark />;
        }
      } else {
        return <></>;
      }
    };

    if (selectedChat) {
      return (
        <div className={styles.selectedChat} id="chat-container">
          <div className={styles.selectedChatHeader}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {!selectedChat.isGroup && (
                  <>
                    {selectedChat.chatMember?.profilePicture ? (
                      <Image
                        src={selectedChat.chatMember?.profilePicture}
                        alt={selectedChat.chatMember.name}
                        fill={true}
                      />
                    ) : (
                      userPlaceHolder
                    )}
                  </>
                )}

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
                <div
                  className={styles.name}
                  onClick={() => setShowAbout((prev: any) => !prev)}
                >
                  {selectedChat.chatMember.name}
                </div>
                <div
                  className={`${styles.status} ${
                    selectedChat?.chatMember?.isOnline
                      ? styles.online
                      : styles.offline
                  }`}
                >
                  {selectedChat?.chatMember?.isOnline
                    ? "online"
                    : `Last online ${getTime(
                        selectedChat.chatMember.lastSeen
                      )}`}
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <IoMdCall />
              <IoVideocamSharp />
              <CiSearch />
              <IoMdMore />
            </div>
          </div>
          <ul>
            {chatMessages?.map((item: any, i: any) => (
              <li
                key={`messgae-${i}`}
                className={item.sender == userDetails._id ? styles.right : ""}
              >
                <div className={styles.box}>
                  <GetMessageStatus {...item} />
                  {item.content}
                  <span>{getTime(item.createdAt)}</span>
                </div>
              </li>
            ))}
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
      );
    } else {
      return (
        <div className={styles.default}>
          <Image
            alt="Bg"
            src="/assets/images/WA_BG.gif"
            height={300}
            width={100}
          />
          {/* <button onClick={() => toggleConnection()}>
            {socket?.connected ? "true" : "false"}
          </button> */}
        </div>
      );
    }
  };

  const About = () => {
    if (selectedChat?.isGroup) {
    } else {
      return <div className={styles.aboutWrapper}></div>;
    }
  };

  return (
    <div className={styles.wrapper}>
      <ChatList />
      <ChatInfo />
      {showAbout && <About />}
    </div>
  );
}

export default React.memo(Chat);
