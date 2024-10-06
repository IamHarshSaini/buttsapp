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

import Image from "next/image";
import NewChat from "@/modals/newChat";
import styles from "./index.module.scss";
import { getTime } from "@/utils/constant";
import React, { useRef, useState } from "react";
import { socket, toggleConnection } from "@/socket";
import { useDispatch, useSelector } from "react-redux";
import { setChatMessages, setSelectedChat } from "@/redux/reducer";

function Chat() {
  const msgRef = useRef(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [showUnRead, setShowUnRead] = useState(false);
  const [newChatVisible, setNewChatVisible] = useState(false);

  const { chatList, userDetails, chatMessages, selectedChat } = useSelector(
    (state) => state.root
  );

  const userPlaceHolder = <User />;
  const groupPlaceHolder = <Group />;

  // selectedChat
  let selectedChatMember = selectedChat?.["members"]?.[0] || false;
  let isSelectedChatGroup = selectedChat?.["isGroup"];
  let selectedChatImage = selectedChatMember?.profilePicture;

  const handleChatClick = async (item) => {
    if (selectedChat?._id != item._id) {
      socket.emit("getChatMessages", item._id, (Messages) => {
        dispatch(setSelectedChat(item));
        dispatch(setChatMessages(Messages));
      });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await socket.emit("sendMessage", {
      message,
      type: "text",
      chatId: selectedChat._id,
      isGroup: selectedChat.isGroup,
      receiverId: selectedChat["members"][0]["_id"],
    });
    setMessage("");
  };

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

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.chats}>
          <div className={styles.header}>
            <div className={styles.title}>Chat</div>
            <div className={styles.newChatAndSort}>
              {newChatVisible ? (
                <PersonAddFill
                  onClick={() => setNewChatVisible((prev) => !prev)}
                />
              ) : (
                <PersonAddOutline
                  onClick={() => setNewChatVisible((prev) => !prev)}
                />
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
            {chatList?.length > 0 &&
              chatList.map((item, i) => {
                let { isGroup, members, unreadCounts } = item;
                let chatDeatils = members[0];
                let name = chatDeatils?.name;
                let image = chatDeatils?.profilePicture;
                let unreadCount =
                  unreadCounts?.filter(
                    (item) => item.userId == userDetails?._id
                  )?.[0]?.["count"] || 0;

                return (
                  <li
                    key={`chat-${i}`}
                    className={`${styles.card} ${
                      selectedChat?._id == item._id ? styles.active : ""
                    }`}
                    onClick={() => handleChatClick(item)}
                  >
                    <div className={styles.avatar}>
                      {image ? (
                        <Image src={image} alt={chatDeatils.name} fill={true} />
                      ) : isGroup ? (
                        groupPlaceHolder
                      ) : (
                        userPlaceHolder
                      )}
                    </div>
                    <div className={styles.box}>
                      <div className={styles.nameAndTime}>
                        <div className={styles.name}>{name}</div>
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
                        {unreadCount > 0 && (
                          <div className={styles.count}>{unreadCount}</div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            {chatList?.length == 0 && (
              <li className={styles.noFound}>No Contact Found</li>
            )}
          </ul>
        </div>
        {selectedChat && (
          <div className={styles.selectedChat} id="chat-container">
            <div className={styles.selectedChatHeader}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  {selectedChatImage ? (
                    <Image src={selectedChatImage} alt="avatar" fill={true} />
                  ) : isSelectedChatGroup ? (
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
                    {selectedChatMember?.name}
                  </div>
                  <div
                    className={`${styles.status} ${
                      selectedChatMember?.isOnline
                        ? styles.online
                        : styles.offline
                    }`}
                  >
                    {selectedChatMember?.isOnline
                      ? "online"
                      : `Last online ${getTime(selectedChatMember?.lastSeen)}`}
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
        )}
        {!selectedChat && (
          <div className={styles.default}>
            <Image
              alt="Bg"
              src="/assets/icons/logo.svg"
              height={300}
              width={100}
            />
            {/* <button onClick={() => toggleConnection()}>{socket.connected ? "yes": "no"}</button> */}
          </div>
        )}
      </div>
      {newChatVisible && (
        <NewChat visible={newChatVisible} setVisible={setNewChatVisible} />
      )}
    </>
  );
}

export default Chat;
