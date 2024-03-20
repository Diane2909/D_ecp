import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import ModalChat from "./ModalChat";
import { Outlet } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { heartOutline, trashOutline } from 'ionicons/icons';
import "@ionic/react/css/core.css";

export default function CardMattch({ match, currentUserId }) {
  const [chatting, setChatting] = useState(false)
  const [socket, setSocket] = useState(undefined)

  useEffect(() => {
    if (socket !== undefined) {
      console.log("User Id =>", currentUserId)
      socket.emit('authenticate', { userId: currentUserId });
    }
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket, currentUserId])

  useEffect(() => {
    setSocket(io('http://localhost:3001'));

    

    
  }, []);

  const handleChatInit = () => {
    const user1Id = currentUserId;
    const user2Id = match.user1._id === currentUserId ? match.user2._id : match.user1._id;

    console.log('Initiate chat with:', user2Id);
    setChatting(true)
  };
  
  delete match._id;

  const otherUserKey = match.user1._id === currentUserId ? 'user2' : 'user1';
  const otherUser = match[otherUserKey];

  if (chatting === true) {
    return <ModalChat setChatting={setChatting} socket={socket}/>
  }
  return (
    <div className="flex items-center shadow-xl rounded-full p-2">
      <div className="rounded-full mr-2 bg-gradient-to-r from-[#020011] to-violet-950 text-white w-[40px] h-[40px] items-center justify-center flex">
      <IonIcon icon={heartOutline} /> {}
      </div>
      {otherUser && (
        <span className="text-white">
          You've Matched with 
          <button onClick={handleChatInit} className="ml-2 text-pink-500">{otherUser.username}</button>
        </span>
      )}
      <button className="text-lg text-pink-500 ml-4">
      <IonIcon icon={trashOutline} /> {}
      </button>
    </div>
  );
}
