import { redirect } from "next/navigation";
import React from "react";
import BtnSignOut from "./BtnSignOut";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AccountView } from "@daveyplate/better-auth-ui";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("session", session);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-5xl p-10">
      <AccountView />

      <BtnSignOut />
    </div>
  );
}
