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
    <div className="max-w-5xl p-10">
      <BtnSignOut />
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8">Welcome to your dashboard!</p>
      {/* Other dashboard content can go here */}

      <div>
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
