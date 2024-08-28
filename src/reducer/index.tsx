export const intialStates = {
  userDetails: {},
  isConnected: false,
  isUserLoggedIn: false,
  allUserList: [],
  chatList: [],
  selectedChatId: null,
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
    default:
      break;
  }
  alert("Unknown action!");
}
