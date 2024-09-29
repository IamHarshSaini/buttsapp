import { markAsRead } from "@/socket";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setUserDetails: (state, action ) => {
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
    // updateUserStatus: (
    //   state,
    //   action<{
    //     status;
    //     userId;
    //     lastSeen;
    //   }>
    // ) => {
    //   const { status, userId, lastSeen } = action.payload;
    //   state.chatList = state.chatList.map((item) => {
    //     if (item.chatMember?._id === userId) {
    //       item.chatMember.isOnline = status;
    //       item.chatMember.lastSeen = lastSeen;
    //     }
    //     return item;
    //   });
    //   if (
    //     state?.selectedChat &&
    //     state?.selectedChat?.chatMember?._id == userId
    //   ) {
    //     state.selectedChat = {
    //       ...state.selectedChat,
    //       chatMember: {
    //         ...state.selectedChat["chatMember"],
    //         isOnline: status,
    //         lastSeen,
    //       },
    //     };
    //   }
    // },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
    addNewMessages: (state, action) => {
      const { message, updatedChat } = action.payload;
      if (updatedChat?._id == state?.selectedChat?._id) {
        state.chatMessages.unshift(message);
      } else {
      }
    },
    // updateChat: (state, action) => {
    //   state.chatList = [
    //     action.payload,
    //     ...state.chatList.filter(
    //       (item) => item._id !== action.payload._id
    //     ),
    //   ];
    // },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    // updateChatMessage: (state, action) => {
    //   state.chatMessages = state.chatMessages.map((item) => {
    //     if (item._id == action.payload._id) {
    //       return action.payload;
    //     } else {
    //       return item;
    //     }
    //   });
    // },
  },
});

export const {
  // updateChat,
  setChatList,
  setUserDetails,
  setAllUserList,
  setSelectedChat,
  setChatMessages,
  // updateUserStatus,
  setIsUserLoggedIn,
  // updateChatMessage,
  setSocketConnected,
  addNewMessages,
} = rootSlice.actions;

export default rootSlice.reducer;
