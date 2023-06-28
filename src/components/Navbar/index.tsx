"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@modules/app/firebase/firebase";
export default function Navbar() {
  const path = usePathname();
  const { push } = useRouter();

  async function Exit() {
    signOut(auth)
      .then((response) => {
        localStorage.removeItem("PhoenixUser");
        push("/");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  return (
    <>
      {path == "/" ? (
        ""
      ) : (
        <div className="navbar bg-base-100 border-b-2">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Procurar chats</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">PHOENIX</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-sm badge-primary indicator-item">
                    8
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">1 Notification</span>
                  <span className="text-info">Will change later</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      No action avaliable
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pinimg.com/736x/65/b8/62/65b8626e1194e2d2631d18189a0e8c1f.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Perfil
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a className="justify-between">
                    Meus chats
                    <span className="badge ">New</span>
                  </a>
                </li>
                <li className="mt-2 border-t-2">
                  <a>Configurações</a>
                </li>
                <li>
                  <span onClick={Exit}>Sair</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
