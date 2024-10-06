import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatList: [],
  userDetails: {},
  allUserList: [],
  chatMessages: [],
  isConnected: false,
  selectedChat: null,
  isUserLoggedIn: false,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setAllUserList: (state, action) => {
      state.allUserList = action.payload;
    },
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
    newMessages: (state, action) => {
      const { message, updatedChat } = action.payload;
      if (updatedChat?._id == state?.selectedChat?._id) {
        state.chatMessages.unshift(message);
      }
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    userStatusUpdate: (state, action) => {
      let { chatList, selectedChat } = JSON.parse(JSON.stringify(state));
      state.chatList = chatList = chatList.map((chat) => {
        if (!chat?.isGroup) {
          chat["members"][0]["isOnline"] = action["payload"]["status"];
        }
        return chat;
      });
      if (
        selectedChat &&
        !selectedChat["isGroup"] &&
        selectedChat["members"][0]["_id"] == action["payload"]["userId"]
      ) {
        state.selectedChat["members"][0]["isOnline"] =
          action["payload"]["status"];
      }
    },
    updateChat: (state, action) => {
      const {
        payload: { updatedChat: updatedChatData },
      } = action;
      if (!updatedChatData["isGroup"]) {
        const { chatList, userDetails } = JSON.parse(JSON.stringify(state));
        state.chatList = chatList.map((chat) => {
          if (chat["_id"] == updatedChatData["_id"]) {
            updatedChatData["members"] = updatedChatData["members"].filter(
              (member) => member["_id"] != userDetails["_id"]
            );
            return updatedChatData;
          } else {
            return chat;
          }
        });
      }
    },
  },
});

export const {
  updateChat,
  setChatList,
  newMessages,
  setUserDetails,
  setAllUserList,
  setSelectedChat,
  setChatMessages,
  userStatusUpdate,
  setIsUserLoggedIn,
  setSocketConnected,
} = rootSlice.actions;

export default rootSlice.reducer;
