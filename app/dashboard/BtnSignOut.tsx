"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function BtnSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700" onClick={handleSignOut}>
      sign out
    </button>
  );
}
