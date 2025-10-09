"use server";

import { prisma } from "@/lib/prisma";

export async function deleteUserById(id: number) {
  await prisma.users.delete({
    where: { id },
  });
}
