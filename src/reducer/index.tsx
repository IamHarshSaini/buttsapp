

export const intialStates = {
  chatList: [],
  userDetails: {},
  allUserList: [],
  chatMessages: [],
  isConnected: false,
  selectedChatId: null,
  isUserLoggedIn: false,
};

export default function reducer(state: any, action: any) {
  const { type, payload }: any = action;
  switch (type) {
    case "USER_DETAILS":
      return { ...state, userDetails: payload };

    case "SOCKET_CONNECTED":
      return { ...state, isConnected: payload };

    case "IS_USER_LOGGED_IN":
      return { ...state, isUserLoggedIn: payload };

    case "ALL_USER_LIST":
      return { ...state, allUserList: payload };

    case "CHAT_LIST":
      return { ...state, chatList: payload };

    case "CHAT_ID":
      return { ...state, selectedChatId: payload };

    case "USER_STATUS_UPDATE":
      const { status, userId, lastSeen } = payload;
      return {
        ...state,
        chatList: state.chatList.map((item: any) => {
          if (item["chatMember"]?._id == userId) {
            item["chatMember"]["isOnline"] = status;
            item["chatMember"]["lastSeen"] = lastSeen;
            return item;
          } else {
            return item;
          }
        }),
      };

    case "SET_CHAT_MESSAGES":
      return { ...state, chatMessages: payload };

    case "ADD_NEW_CHAT_MESSAGES":
      return {
        ...state,
        chatMessages: [payload, ...state.chatMessages],
      };

    case "ADD_NEW_CHAT_MESSAGES_BY_SENDER":
      const { message, updatedChat } = payload;
      let updatedChatList = state.chatList.filter(
        (item: any) => item._id != updatedChat._id
      );
      updatedChatList = [updatedChat, ...updatedChatList];
      if (state.selectedChatId == updatedChat._id) {
        return {
          ...state,
          chatList: updatedChatList,
          chatMessages: [message, ...state.chatMessages],
        };
      } else {
        return { ...state, chatList: updatedChatList };
      }

    case "UPDATE_CHAT":
      let updatedList = state.chatList.filter(
        (item: any) => item._id != payload._id
      );
      updatedList = [payload, ...updatedList];
      return { ...state, chatList: updatedList };

    default:
      console.error("unknown action");
      return state;
  }
}
