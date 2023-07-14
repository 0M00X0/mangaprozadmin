import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import React, { ReactNode } from 'react';
import Inactive from "./Inactive";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <div className="bg-blue-900 h-screen w-screen flex items-center">
          <div className="text-center w-full">
            <h1 className="text-white text-3xl font-semibold">Loading...</h1>
          </div>
        </div>
      </>
    );
  }
  
  if (!session) {
    return (
      <>
        <div className="bg-blue-900 h-screen w-screen flex items-center">
          <div className="text-center w-full">
            <button
              className="bg-white p-2 px-4 rounded-lg"
              onClick={() => signIn("google")}
            >
              Login with Google
            </button>
            <button
              className="bg-white p-2 px-4 rounded-lg"
              onClick={() => signIn("facebook")}
            >
              Login with facebook
            </button>
            <button
              className="bg-white p-2 px-4 rounded-lg"
              onClick={() => signIn("discord")}
            >
              Login with discord
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>
        <Inactive />
      </h1>
    </>
  );
}
