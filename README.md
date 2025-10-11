This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First create a postgres db. You can use these script if you have postgres installed locally.

Create a **temporary** database for testing:

```bash
npx create-db
```

copy the connection string line your `.env.local` file.

your `.env.local` will look like this:

```ini
DATABASE_URL="postgresql://prisma_user:prisma_password@db.prisma.io:5432/prisma_app_db?sslmode=require"

```

Then install the necessary dependencies:

```bash
pnpm install
```

Then generate the Prisma client:

```bash
pnpm prisma generate
```

Then run the database migrations:

```bash
pnpm prisma migrate dev
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Now open 2 pages, and try to delete the last item from one page, then click 'load more' button on the other. You see, compared to offset-based pagination, it did not skip any items on the page.
