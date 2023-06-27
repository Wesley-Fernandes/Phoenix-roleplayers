"use client";
import Bubble from "@modules/components/Bubble";
import FooterChat from "@modules/components/FooterChat";
import style from "./page.module.css";
import React, { useEffect, useRef, useState } from "react";
import { db, app } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null)
  const search = useSearchParams();
  const id = search.get("id");
  const divElement = document.getElementById('messages')

  useEffect(() => {
    async function fetchMessages() {
      const task = query(
        collection(db, "ChatMessages"),
        where("chatID", "==", id)
      );
      const unsubscribe = onSnapshot(task, (querySnapshot) => {
        querySnapshot.docChanges().forEach((doc) => {
          setMessages((prev) => [
            ...prev,
            { id: doc.doc.id, ...doc.doc.data() },
          ]);
        });
      });
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    if (divElement) {
      divElement.scrollTop = divElement.scrollHeight;
      divElement.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  }, [messages])
  return (
    <>
      {id ? (
        <div className={style.Page}>
          <main className={style.Messages} id="messages">
            {messages.map(
              (
                {
                  chatID,
                  created,
                  id,
                  type,
                  userID,
                  username,
                  content,
                }: IMessage,
                index: number
              ) => {
                return (
                  <Bubble
                    key={index}
                    type={type}
                    userID={userID}
                    chatID={chatID}
                    content={content}
                    created={created}
                    id={id}
                    username={username}
                  />
                );
              }
            )}
          </main>
          <FooterChat chatID={String(id)} />
        </div>
      ) : (
        <h1>O chat não existe!</h1>
      )}
    </>
  );
}
