// icons
import {
  Mic,
  Send,
  User,
  More,
  Video,
  Group,
  Phone,
  Check,
  Emoji,
  Camera,
  Search,
  FilterFill,
  Attachment,
  DoubleCheck,
  FilterOutLine,
  PersonAddFill,
  PersonAddOutline,
} from "@/utils/icon";

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
import { socket } from "@/socket";
import { getTime } from "@/utils/constant";

function Chat() {
  const { chatList, userDetails, allUserList, chatMessages, selectedChat } =
    useSelector((state) => state.root);

  const dispatch = useDispatch();
  const msgRef = useRef(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [showUnRead, setShowUnRead] = useState(false);

  // constant
  const userPlaceHolder = <User />;
  const groupPlaceHolder = <Group />;

  const handleChatClick = async (item) => {
    if (selectedChat?._id != item._id) {
      socket.emit("getChatMessages", item._id, (Messages) => {
        dispatch(setSelectedChat(item));
        dispatch(setChatMessages(Messages));
      });
    }
  };

  const handleNewChatClicked = async (item) => {
    // socket.emit("createNewChat", item._id, ({ chat, messages }) => {
    //   let isAvailable = chatList.some(
    //     (element) => element._id == chat._id
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

  const handleSendMessage = async (e) => {
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
    let list = newChat ? allUserList : chatList;

    return (
      <div className={styles.chats}>
        <div className={styles.header}>
          <div className={styles.title}>Chat</div>
          <div className={styles.newChatAndSort}>
            {newChat ? (
              <PersonAddFill onClick={() => setNewChat((prev) => !prev)} />
            ) : (
              <PersonAddOutline onClick={() => setNewChat((prev) => !prev)} />
            )}
            {!showUnRead ? (
              <FilterOutLine onClick={() => setShowUnRead((prev) => !prev)} />
            ) : (
              <FilterFill onClick={() => setShowUnRead((prev) => !prev)} />
            )}
          </div>
        </div>
        <div className={styles.filter}>
          <div className={styles.searchBox}>
            <input
              value={search}
              placeholder="Search or start new chat"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search />
          </div>
        </div>
        <ul>
          {!newChat && (
            <>
              {list?.length > 0 &&
                list.map((item, i) => {
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
                list.map((item, i) => (
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
    const GetMessageStatus = (item) => {
      const { sender } = item;
      if (sender == userDetails._id) {
        if (item?.readBy?.length > 0) {
          return <DoubleCheck color="#4FB6EC" />;
        } else if (item?.deliveredTo?.length > 0) {
          return <DoubleCheck />;
        } else {
          return <Check />;
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
                  onClick={() => setShowAbout((prev) => !prev)}
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
              <Phone />
              <Video />
              <Search />
              <More />
            </div>
          </div>
          <ul>
            {chatMessages?.map((item, i) => (
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
            <Emoji />
            <Attachment />
            <form onSubmit={handleSendMessage}>
              <div className={styles.input}>
                <Camera />
                <input
                  ref={msgRef}
                  value={message}
                  autoFocus={true}
                  placeholder="Type a message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              {message?.length > 0 ? <Send type="submit" /> : <Mic />}
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.default}>
          <Image
            alt="Bg"
            src="/assets/icons/logo.svg"
            height={300}
            width={100}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <ChatList />
      <ChatInfo />
    </div>
  );
}

export default Chat;
