import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const cursorId = searchParams.get("cursor_id") ? parseInt(searchParams.get("cursor_id")!, 10) : undefined;

  let users;

  if (cursorId) {
    users = await prisma.users.findMany({
      where: { id: { lt: cursorId } }, // because you're ordering DESC
      orderBy: { id: "desc" },
      take: limit,
    });
  } else {
    users = await prisma.users.findMany({
      orderBy: { id: "desc" },
      take: limit,
    });
  }

  return NextResponse.json(users);
}
