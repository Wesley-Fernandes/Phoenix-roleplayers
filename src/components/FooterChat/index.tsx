import React, { useRef } from "react";
import InputChat from "../InputChat";
import { RiSendPlaneFill } from "react-icons/ri";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@modules/app/firebase/firebase";

interface IFooter {
  chatID: string;
}
export default function FooterChat({ chatID }: IFooter) {
  const formRef = useRef<HTMLFormElement>(null);

  async function sendNewMessage(e: any) {
    e.preventDefault();
    const data = new Date();

    const localstorage = localStorage.getItem("PhoenixUser");
    const target = e.target as typeof e.target & {
      content: { value: string };
    };

    const content = target.content.value;

    if (!content) {
      throw new Error("missing content.");
    }
    if (localstorage) {
      const user = await JSON.parse(localstorage);
      if (user) {
        const dataAtual = new Date();
        const timestampMilissegundos = dataAtual.getTime();

        try {
          const messageDocument = await addDoc(collection(db, "ChatMessages"), {
            chatID: chatID,
            content: content,
            type: "message",
            userID: user.uid,
            created: timestampMilissegundos,
            username: user.email.split("@")[0],
          });
          formRef?.current?.reset();
          return;
        } catch (error) {
          console.error(error);
          return;
        }
      } else {
        throw new Error("User don't exist.");
      }
    } else {
      throw new Error("User don't exist.");
    }
  }
  return (
    <form
      ref={formRef}
      className="border-t-2 flex bg-indigo-900 p-3"
      onSubmit={sendNewMessage}
    >
      <InputChat />
      <button className="btn btn-ghost">
        <RiSendPlaneFill size={32} />
      </button>
    </form>
  );
}
