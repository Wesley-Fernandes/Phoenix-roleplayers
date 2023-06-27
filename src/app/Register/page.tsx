"use client";

import { FormEvent, useState } from "react";
import style from "./page.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebase";

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  async function submiter(event: FormEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
          alert("User created.");
          push("/");
        })
        .catch((error) => {
          alert(error.message);
          return;
        });
    } else {
      throw new Error("Please enter all required fields.");
    }
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
        <small className="text-center uppercase">Fazendo seu registro</small>
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
            <button type="submit" className="btn btn-primary">
              Criar conta
                      </button>
                      
            <button
              type="button"
              onClick={() => {
                push("/");
              }}
              className="btn btn-dark mt-3 border-violet-900"
            >
              Fazer login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
