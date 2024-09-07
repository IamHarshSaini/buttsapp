import { io } from "socket.io-client";
import Cookies from "universal-cookie";

export let socket: any = null;

export const initializeSocket = ({ dispatch }: any) => {
  const cookies = new Cookies();
  let { butsapp }: any = cookies.getAll();

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
  setupListeners({ dispatch });
  return socket;
};

export const setupListeners = ({ dispatch }: any) => {
  if (!socket) return;

  function onConnect() {
    dispatch({ type: "SOCKET_CONNECTED", payload: true });

    socket.emit("getAllUserList", (list: any) => {
      dispatch({ type: "ALL_USER_LIST", payload: list });
    });

    socket.emit("chatList", (list: any) => {
      dispatch({ type: "CHAT_LIST", payload: list });
    });

    socket.on("message", (res: any) => {
      dispatch({ type: "ADD_NEW_CHAT_MESSAGES_BY_SENDER", payload: res });
    });

    socket.on("userStatusUpdate", (res: any) => {
      dispatch({ type: "USER_STATUS_UPDATE", payload: res });
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

const addToSocketListeners = (name: any, fun?: any) => {
  if (!socket) return;
  if (Array.isArray(socket.listeners)) {
    socket.listeners = [...socket.listeners, { name, fun }];
  } else {
    socket.listeners = [{ name, fun }];
  }
};

export const removeListners = () => {
  if (!socket) return;
  socket?.listeners?.forEach((item: any) => {
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
    socket.disconnect();
  } else {
    socket.connect();
  }
};
