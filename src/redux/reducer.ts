import { markAsRead } from "@/socket";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
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
    setUserDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.userDetails = action.payload;
    },
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
    setAllUserList: (state, action: PayloadAction<any[]>) => {
      state.allUserList = action.payload;
    },
    setChatList: (state, action: PayloadAction<any[]>) => {
      state.chatList = action.payload;
    },
    // updateUserStatus: (
    //   state,
    //   action: PayloadAction<{
    //     status: boolean;
    //     userId: string;
    //     lastSeen: string;
    //   }>
    // ) => {
    //   const { status, userId, lastSeen } = action.payload;
    //   state.chatList = state.chatList.map((item: any) => {
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
    // setChatMessages: (state, action: PayloadAction<any[]>) => {
    //   state.chatMessages = action.payload;
    // },
    // addNewChatMessage: (state, action: PayloadAction<any>) => {
    //   state.chatMessages.unshift(action.payload);
    // },
    // addNewChatMessageBySender: (
    //   state,
    //   action: PayloadAction<{ message: any; updatedChat: any }>
    // ) => {
    //   const { message, updatedChat } = action.payload;
    //   state.chatList = [
    //     updatedChat,
    //     ...state.chatList.filter((item: any) => item._id !== updatedChat._id),
    //   ];
    //   if (state?.selectedChat?._id === updatedChat?._id) {
    //     state.chatMessages.unshift(message);
    //     markAsRead(
    //       message._id,
    //       state.userDetails._id,
    //       updatedChat.chatMember._id
    //     );
    //   }
    // },
    // updateChat: (state, action: PayloadAction<any>) => {
    //   state.chatList = [
    //     action.payload,
    //     ...state.chatList.filter(
    //       (item: any) => item._id !== action.payload._id
    //     ),
    //   ];
    // },
    // setSelectedChat: (state, action: PayloadAction<any>) => {
    //   state.selectedChat = action.payload;
    // },
    // updateChatMessage: (state, action: PayloadAction<any>) => {
    //   state.chatMessages = state.chatMessages.map((item: any) => {
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
  // setSelectedChat,
  // setChatMessages,
  // updateUserStatus,
  setIsUserLoggedIn,
  // updateChatMessage,
  // addNewChatMessage,
  setSocketConnected,
  // addNewChatMessageBySender,
} = rootSlice.actions;

export default rootSlice.reducer;
