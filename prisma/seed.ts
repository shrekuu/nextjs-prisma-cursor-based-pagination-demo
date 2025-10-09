import { DateTime } from "luxon";
import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
async function main() {
  const createdAt = DateTime.now().minus({ month: 1 });

  // Generate 100 unique fake users and upsert them by email.
  const users = Array.from({ length: 100 }).map((_, i) => {
    const nextCreatedAtString = createdAt.plus({ hour: i }).toISO();
    return {
      email: `user-${i + 1}@example.com`,
      name: faker.person.fullName(),
      created_at: nextCreatedAtString,
      updated_at: nextCreatedAtString,
    };
  });

  // insert many users
  await prisma.users.createMany({
    data: users,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
