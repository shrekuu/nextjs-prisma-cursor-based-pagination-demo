"use client";

import React from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Auth() {
  const router = useRouter();

  const handleSignUp = async () => {
    const email = "user2@example.com";
    const password = "password123";
    const name = "John Doe";

    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page

          router.push("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const handleLogin = async () => {
    const email = "user2@example.com";
    const password = "password123";

    const { data, error } = await authClient.signIn.email({
      /**
       * The user email
       */
      email,
      /**
       * The user password
       */
      password,
      /**
       * A URL to redirect to after the user verifies their email (optional)
       */
      callbackURL: "/dashboard",
      /**
       * remember the user session after the browser is closed.
       * @default true
       */
      rememberMe: true,
    });
  };

  const handleSignInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    console.log("data", data);

    router.push("/dashboard");
  };

  return (
    <div className="font-sans">
      <Link className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" href="/auth/sign-in">
        Better Auth UI
      </Link>

      {/* <div className="mx-auto  max-w-4xl flex flex-col gap-4 p-4">
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={handleSignUp}>
          Sign Up
        </button>

        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={handleLogin}>
          Login
        </button>

        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={handleSignInWithGoogle}>
          sign in with google
        </button>
      </div> */}
    </div>
  );
}
