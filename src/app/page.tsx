"use client";

import { FormEvent, useState } from "react";
import style from "./page.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "./firebase/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  async function submiter(event: FormEvent) {
    event.preventDefault();
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("PhoenixUser", JSON.stringify(user));
        push("/Chat?id=K1OwIuzMLYH2mouoclAU");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        return;
      });
  }
  return (
    <div className="flex h-screen justify-center items-center bg-base-200">
      <form
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={submiter}
      >
        <h1 className="text-5xl text-center mt-5 font-bold mb-4 drop-shadow-smhx">
          PHOENIX
        </h1>
        <small className="text-center uppercase">Fazendo seu login</small>
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-3">
            <button type="submit" className="btn btn-primary border-base-200">
              {isLoading ? (
                <>
                  <span className="loading loading-spinner" />
                  Carregando...
                </>
              ) : (
                <>
                  <span>Fazer login</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                push("/Register");
              }}
              className="btn btn-dark mt-3 border-violet-900"
            >
              Fazer registro
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/*
<button className="btn btn-primary drop-shadow-sm">
          {isLoading ? (
            <>
              <span className="loading loading-spinner" />
              Carregando...
            </>
          ) : (
            <>
              <FcGoogle size={35} />
              <span>Fazer login</span>
            </>
          )}
        </button>
        */
