import React, { useRef } from "react";
import InputChat from "../InputChat";

//icons
import { RiSendPlaneFill, RiSwordLine, RiPhoneFill } from "react-icons/ri";
import { GiPerspectiveDiceFive, GiBackpack } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";

//firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "@modules/app/firebase/firebase";

interface IFooter {
  chatID: string;
}
export default function FooterChat({ chatID }: IFooter) {
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

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
      className="border-t-2 flex justify-between items-center bg-indigo-900 pt-1 pb-1"
      onSubmit={sendNewMessage}
    >
      <dialog id="chatModal" className="modal" ref={modalRef}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-2">Ações</h3>
          <p className="mb-3">Em desenvolvimento</p>
          <div className="flex gap-3 items-center justify-center">
            <button type="button" className="btn">
              <RiSwordLine size={35} />
            </button>
            <button type="button" className="btn">
              <GiPerspectiveDiceFive size={35} />
            </button>
            <button type="button" className="btn">
              <RiPhoneFill size={35} />
            </button>
            <button type="button" className="btn">
              <GiBackpack size={35} />
            </button>
          </div>
          <div className="modal-action">
            <button className="btn">Fechar</button>
          </div>
        </form>
      </dialog>

      <button
        type="button"
        onClick={() => {
          modalRef.current?.showModal();
        }}
        className="btn btn-ghost flex items-center justify-center"
      >
        <SlOptionsVertical size={32} />
      </button>
      <InputChat />
      <button type="submit" className="btn btn-ghost">
        <RiSendPlaneFill size={32} />
      </button>
    </form>
  );
}
