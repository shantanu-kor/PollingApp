import { io } from "socket.io-client";
import SocketContext from "./SocketContext";
import { useState } from "react";

const SocketProvider = (props) => {
  const [socket, setSocket] = useState(
    io(import.meta.env.VITE_BE_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    })
  );

  const newSocketHandler = () => {
    setSocket(
      io(import.meta.env.VITE_BE_URL, {
        auth: {
          token: localStorage.getItem("token"),
        },
      })
    );
  };

  const socketProvider = {
    socket: socket,
    newSocketHandler,
  };

  return (
    <SocketContext.Provider value={socketProvider}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
