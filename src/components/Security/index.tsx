"use client";
import { auth } from "@modules/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

export default function Security({ children }: any) {
  const [auth, setAuth] = useState<
    "loading" | "unprotected" | "not allowed" | "is allowed"
  >("loading");
  const { push } = useRouter();
  const path = usePathname();

  async function getLocalData() {
    const data = localStorage.getItem("PhoenixUser");
    if (data) {
      const stringify: any = await JSON.parse(data);

      if (data && path == "/" || data && path == "/Register") {
        setAuth("unprotected");
        return;
      } else {
        setAuth("is allowed");
      }
    } else if(!data && path=="/" || !data && path=="/Register") {
      setAuth("unprotected");
      return;
    } else if (!data && path !== "/" || !data && path !== "/Register") {
      setAuth("not allowed");
      return;
    }
  }

  useEffect(() => {
    getLocalData()
  })

  switch (auth) {
    case "loading":
      return <span>Loading...</span>;
    case "unprotected":
      return children;
    case "not allowed":
      console.log("Not allowed");
      window.location.replace("http://localhost:3000/");
      break;
    case "is allowed":
      return (
        <>
          <Navbar />
          {children}
        </>
      );
  }
}
