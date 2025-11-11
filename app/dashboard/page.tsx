import { redirect } from "next/navigation";
import React from "react";
import BtnSignOut from "./BtnSignOut";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome back, {session.user.name}!</h1>

      <div>
        <div>{JSON.stringify(session)}</div>

        <div>
          <h2>Your Details:</h2>
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
      </div>

      <div>
        <BtnSignOut />
      </div>
    </div>
  );
}
