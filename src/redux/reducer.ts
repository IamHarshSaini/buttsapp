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
    setSelectedChatId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    updateUserStatus: (
      state,
      action: PayloadAction<{
        status: boolean;
        userId: string;
        lastSeen: string;
      }>
    ) => {
      const { status, userId, lastSeen } = action.payload;
      state.chatList = state.chatList.map((item: any) => {
        if (item.chatMember?._id === userId) {
          item.chatMember.isOnline = status;
          item.chatMember.lastSeen = lastSeen;
        }
        return item;
      });
    },
    setChatMessages: (state, action: PayloadAction<any[]>) => {
      state.chatMessages = action.payload;
    },
    addNewChatMessage: (state, action: PayloadAction<any>) => {
      state.chatMessages.unshift(action.payload);
    },
    addNewChatMessageBySender: (
      state,
      action: PayloadAction<{ message: any; updatedChat: any }>
    ) => {
      const { message, updatedChat } = action.payload;
      state.chatList = [
        updatedChat,
        ...state.chatList.filter((item: any) => item._id !== updatedChat._id),
      ];
      if (state.selectedChatId === updatedChat._id) {
        state.chatMessages.unshift(message);
      }
    },
    updateChat: (state, action: PayloadAction<any>) => {
      state.chatList = [
        action.payload,
        ...state.chatList.filter(
          (item: any) => item._id !== action.payload._id
        ),
      ];
    },
  },
});

export const {
  updateChat,
  setChatList,
  setUserDetails,
  setAllUserList,
  setChatMessages,
  updateUserStatus,
  setIsUserLoggedIn,
  addNewChatMessage,
  setSelectedChatId,
  setSocketConnected,
  addNewChatMessageBySender,
} = rootSlice.actions;

export default rootSlice.reducer;
