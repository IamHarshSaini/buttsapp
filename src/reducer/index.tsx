export const intialStates = {
  chatList: [],
  userDetails: {},
  allUserList: [],
  isConnected: false,
  selectedChatId: null,
  isUserLoggedIn: false
};

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case "USER_DETAILS":
      return { ...state, userDetails: action.payload };
    case "SOCKET_CONNECTED":
      return { ...state, isConnected: action.payload };
    case "IS_USER_LOGGED_IN":
      return { ...state, isUserLoggedIn: action.payload };
    case "ALL_USER_LIST":
      return { ...state, allUserList: action.payload };
    case "CHAT_LIST":
      return { ...state, chatList: action.payload };
    case "CHAT_ID":
      return { ...state, selectedChatId: action.payload };
    case "USER_STATUS_UPDATE":
      const { status, userId } = action.payload;
      return {
        ...state,
        chatList: state.chatList.map((item: any) => {
          if (item["chatMember"]?._id == userId) {
            item["chatMember"]["isOnline"] = status;
            return item;
          } else {
            return item;
          }
        }),
      };
    default:
      break;
  }
  alert("Unknown action!");
}
