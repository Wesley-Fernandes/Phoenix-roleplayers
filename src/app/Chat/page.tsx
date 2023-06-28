"use client";
import Bubble from "@modules/components/Bubble";
import FooterChat from "@modules/components/FooterChat";
import style from "./page.module.css";
import React, { useEffect, useRef, useState } from "react";
import { db, app } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInfo, setChatInfo] = useState<any>(null);


  const messagesRef = useRef<HTMLDivElement>(null);
  const search = useSearchParams();
  const id = search.get("id");
  const divElement = document.getElementById("messages");

  useEffect(() => {
    async function getChatInformation() {
      if (id) {
        const docRef = doc(db, "ChatsInformations", id)
        const docSnap = await getDoc(docRef)
        setChatInfo(docSnap.data());
      }
    }

    getChatInformation();
    async function fetchMessages() {
      const task = query(
        collection(db, "ChatMessages"),
        where("chatID", "==", id),
        limit(10)
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
      divElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  return (
    <>
      {id ? (
        <div className={style.Page}>
          <main className={style.Messages} id="messages" style={{backgroundImage: `url(${chatInfo?.backgroundImage})`, backgroundSize: 'cover'}}>
            {messages.map(
              ({
                chatID,
                created,
                id,
                type,
                userID,
                username,
                content,
              }: IMessage) => {
                return (
                  <Bubble
                    key={id}
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
