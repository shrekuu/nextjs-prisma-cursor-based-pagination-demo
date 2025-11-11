"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

export default function SocialLogin() {
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    router.push("/dashboard");
  };

  return (
    <div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={handleSignInWithGoogle}>
        sign in with google
      </button>
    </div>
  );
}
