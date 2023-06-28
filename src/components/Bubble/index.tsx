"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Bubble({
  chatID,
  created,
  id,
  type,
  userID,
  username,
  content,
}: IMessage) {
  
  const [isMine, setIsMine] = useState<boolean>(false);
  async function verifyAuthor(): Promise<boolean> {
    const localstorage = localStorage.getItem("PhoenixUser");
    if (localstorage) {
      const user = await JSON.parse(localstorage);
      if (user.uid == userID) {
        console.log(user.email.split("@")[0])
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const data = new Date(created);
  const hora = data.getHours();
  const minutos = data.getMinutes();
  const time = `${hora.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;

  async function mecanismOfVerification() {
    const result = await verifyAuthor()
    setIsMine(result)
  }
  useEffect(() => {
    mecanismOfVerification()
  }, []);
  return (
    <>
      {isMine ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pinimg.com/736x/65/b8/62/65b8626e1194e2d2631d18189a0e8c1f.jpg" />
            </div>
          </div>
          <div className="chat-header">
            {username}
            <time className="text-xs opacity-50 ml-3">{time}</time>
          </div>
          <pre className="chat-bubble">{content}</pre>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pinimg.com/736x/65/b8/62/65b8626e1194e2d2631d18189a0e8c1f.jpg" />
            </div>
          </div>
          <div className="chat-header">
            {username}
            <time className="text-xs ml-3 opacity-50">{time}</time>
          </div>
          <p className="chat-bubble">{content}</p>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      )}
    </>
  );
}
