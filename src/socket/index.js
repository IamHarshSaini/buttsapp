import { store } from "@/redux";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";

// redux
import {
  setChatList,
  newMessages,
  setAllUserList,
  userStatusUpdate,
  setSocketConnected,
  updateChat,
} from "@/redux/reducer";

const { dispatch } = store;

export let socket = null;

export const initializeSocket = () => {
  const cookies = new Cookies();
  let { butsapp } = cookies.getAll();

  if (socket) {
    return socket;
  }

  if (process.env.API_URL) {
    socket = io(process.env.API_URL, {
      query: {
        token: butsapp,
      },
    });
  }
  setupListeners();
  return socket;
};

export const setupListeners = () => {
  if (!socket) return;

  function onConnect() {
    dispatch(setSocketConnected(true));

    socket.emit("getAllUserList", (list) => {
      dispatch(setAllUserList(list));
    });

    socket.emit("chatList", (list) => {
      dispatch(setChatList(list));
    });

    socket.on("message", (res) => {
      dispatch(newMessages(res));
      dispatch(updateChat({ updatedChat: res?.updatedChat }));
    });

    socket.on("userStatusUpdate", (res) => {
      dispatch(userStatusUpdate(res));
    });

    socket.on("updateChat", (res) => {
      dispatch(updateChat(res));
    });

    addToSocketListeners("message");
    addToSocketListeners("userStatusUpdate");
  }

  function onDisconnect() {
    dispatch({ type: "SOCKET_CONNECTED", payload: false });
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  addToSocketListeners("connect", onConnect);
  addToSocketListeners("disconnect", onDisconnect);
};

const addToSocketListeners = (name, fun) => {
  if (!socket) return;
  if (Array.isArray(socket.listeners)) {
    socket.listeners = [...socket.listeners, { name, fun }];
  } else {
    socket.listeners = [{ name, fun }];
  }
};

export const removeListners = () => {
  if (!socket) return;
  socket?.listeners?.forEach((item) => {
    if (item.fnc) {
      socket.off(item.name, item.fnc);
    } else {
      socket.off(item.name);
    }
  });
};

export const toggleConnection = () => {
  if (!socket) return;
  if (socket?.connected) {
    dispatch(setSocketConnected(false));
    socket.disconnect();
  } else {
    socket.connect();
    dispatch(setSocketConnected(true));
  }
};

// custom events 
export const markAsRead = (messageId, userId, senderId) => {
  // socket.emit("markAsRead", messageId, userId, senderId);
};
