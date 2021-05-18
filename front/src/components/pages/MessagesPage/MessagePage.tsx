import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const MessagePage = () => {
  // const [socket, setSocket] = useState<any>();

  // useEffect(() => {
  //   const s = io("http://localhost:3002");
  //   setSocket(s);
  //   return () => {
  //     setSocket(null);
  //     s.disconnect();
  //   };
  // }, []);
  // useEffect(() => {
  //   if (!socket) {
  //     console.log("null");
  //   }
  // }, [socket]);
  return <div>messages</div>;
};

export default MessagePage;
