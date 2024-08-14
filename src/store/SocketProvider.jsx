import { io } from "socket.io-client";
import SocketContext from "./SocketContext";

const SocketProvider = (props) => {
  const socketProvider = {
    socket: io(import.meta.env.VITE_BE_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    }),
  };

  return (
    <SocketContext.Provider value={socketProvider}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
