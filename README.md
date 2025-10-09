This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First create a postgres db. You can use these script if you have postgres installed locally.

Follow these steps to set up your local Postgres database:

1. **Create a new database user for Prisma (safer than using `postgres`):**

```sql
CREATE USER prisma_user WITH PASSWORD 'prisma_password';
```

2. **Create the main database for your app:**

```sql
CREATE DATABASE prisma_app_db OWNER prisma_user;
```

3. **Grant privileges so Prisma can manage migrations, etc.:**

```sql
GRANT ALL PRIVILEGES ON DATABASE prisma_app_db TO prisma_user;
```

4. **(Optional but recommended) Allow schema modifications:**

```sql
ALTER USER prisma_user CREATEDB;
```

After this, add the following to your `.env.local` file:

```env
DATABASE_URL="postgresql://prisma_user:prisma_password@localhost:5432/prisma_app_db"
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
