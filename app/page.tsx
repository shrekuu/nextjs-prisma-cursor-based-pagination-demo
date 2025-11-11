import React from "react";
import { redirect } from "next/navigation";
import Auth from "./Auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div>未登录</div>
      <div>
        <Link href="/auth/sign-in">better auth ui</Link>
      </div>
      <div>
        <Auth />
      </div>
    </div>
  );
}
