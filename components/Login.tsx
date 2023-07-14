import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import React, { ReactNode } from 'react';
import Inactive from "./Inactive";
import Head from "next/head";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <link rel="icon" href="./favicon.ico" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`Loading...`} />
          <meta property="og:description" content="Loading..." />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
          <meta property="og:image:alt" content="Loading..." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
          <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
          <meta name="twitter:title" content={`Loading...`} />
          <meta name="twitter:description" content="Loading..." />
          <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
          <meta name="twitter:image:alt" content="Loading..." />

        </Head>
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
        <Head>
          <title>Login</title>
          <link rel="icon" href="./favicon.ico" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`Login`} />
          <meta property="og:description" content="Login to your account" />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
          <meta property="og:image:alt" content="Login to your account" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
          <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
          <meta name="twitter:title" content={`Login`} />
          <meta name="twitter:description" content="Login to your account" />
          <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
          <meta name="twitter:image:alt" content="Login to your account" />
        </Head>
        <div className="bg-blue-900 h-screen w-screen flex items-center">
          <div className="text-center w-full">
            <div className="flex justify-center items-center">
              <h1 className="text-white text-3xl font-semibold">
                You are not signed in
              </h1>
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
