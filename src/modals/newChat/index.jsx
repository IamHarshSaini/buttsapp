import Image from "next/image";
import { socket } from "@/socket";
import styles from "./index.module.scss";
import { Close, User } from "@/utils/icon";
import { setChatList, setChatMessages, setSelectedChat } from "@/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

const NewChat = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { allUserList, chatList } = useSelector((state) => state.root);

  const handleNewChatClicked = async (item) => {
    socket.emit("createNewChat", item._id, ({ chat, messages }) => {
      let isAvailable = chatList.find((element) => element._id == chat._id);
      if (!isAvailable) {
        dispatch(setChatList([chat, ...chatList]));
        dispatch(setSelectedChat(chat));
        dispatch(setChatMessages(messages));
      } else {
        dispatch(setSelectedChat(chat));
        dispatch(setChatMessages(messages));
      }
      setVisible(false);
    });
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (visible) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.title}>New Chat</div>
            <Close onClick={handleClose} />
          </div>
          <ul>
            {allUserList.length > 0 &&
              allUserList.map((item, i) => (
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
                      <User />
                    )}
                  </div>
                  <div className={styles.box}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.about}>{item.about}</div>
                  </div>
                </li>
              ))}
            {allUserList.length == 0 && (
              <li className={styles.notFound}>No Contact Found</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
};

export default NewChat;
