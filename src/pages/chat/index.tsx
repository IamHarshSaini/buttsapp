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

export default function Home({ isConnected }: any) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Layout isConnected={isConnected} />
    </div>
  );
}

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.avatar}></div>
        <div className={styles.actions}>
          <MdGroups2 />
          <PiCardsThreeDuotone />
          <MdMessage />
          <IoMdMore />
        </div>
      </div>
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
    </header>
  );
};

const Layout = ({ isConnected }: any) => {

  const List: any = Array.from({ length: 4 }).map((x, i) => {
    return {
      name: "Designers Corner",
      time: "3:11 pm",
      count: "197",
      message:
        "That’s a great news! Congratulations Congratulations Congratulations Congratulations",
      fromWhere: "2348128225157",
      isGroup: i % 2 == 0,
    };
  });

  const getChatBox = (item: any) => {
    return (
      <li key={`chat-${item.name}`} className={styles.card}>
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
    <main className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.filter}>
          <div className={styles.searchBox}>
            <input placeholder="Search or start new chat" />
            <CiSearch />
          </div>
          <IoFilterOutline />
        </div>
        <ul>
          {List.map((item: any) => {
            return getChatBox(item);
          })}
        </ul>
      </div>
      <div className={styles.right}>
        {isConnected ? "connected" : "not"}
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
    </main>
  );
};
