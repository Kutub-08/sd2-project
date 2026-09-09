# To-Let Backend (SD2)

## Prerequisites

- Node.js 22+
- PostgreSQL running with a database configured in `.env` (`DATABASE_URL`)

## Setup

```bash
npm install
npx prisma migrate dev   # create / sync database tables
npx prisma generate      # generate Prisma client
```

## Seed Database

Populates 5 users (4 landlords/tenants + 1 admin), 7 listings, 14 images, 4 favorites, and 3 inquiries:

```bash
npx prisma db seed
```

**Login credentials** for all seeded users: `password123`

| Name | Email | Role |
|------|-------|------|
| Rahim Khan | rahim@example.com | LANDLORD |
| Karim Uddin | karim@example.com | LANDLORD |
| Fatima Begum | fatima@example.com | TENANT |
| Hasan Ali | hasan@example.com | TENANT |
| Admin User | admin@example.com | ADMIN |

## Development

```bash
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values. Key groups:

| Group | Vars |
|-------|------|
| AI | `GROQ_API_KEY`, `GROQ_MODEL` |
| Database | `DATABASE_URL` |
| Images | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| Auth | `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` |
| Server | `PORT` |
| Reset links | `CLIENT_URL` — frontend origin used to build `/reset-password?token=...` links |
| Email (SMTP) | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` |

**Password reset email:** `POST /api/auth/forgot-password` sends the reset link via SMTP when `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` are set. If they are empty (or the send fails), it falls back to logging the link to the console with a `[DEV]` prefix — handy for local development.

**Email verification (landlords):** landlords must verify their email before publishing listings. `POST /api/auth/verify/request` emails a 6-digit code (10 min expiry); `POST /api/auth/verify` with `{ code }` marks the account verified. Uses the same SMTP/mailer — with SMTP unset, the code is logged with a `[DEV]` prefix.

## Available Scripts

| Script | Command |
|--------|---------|
| `npm run dev` | `tsx watch src/server.ts` |
| `npm run build` | `tsc` |
| `npm test` | `jest --runInBand` |
| `npm run prisma:generate` | `prisma generate` |
| `npm run prisma:migrate` | `prisma migrate dev` |
| `npm run prisma:seed` | `tsx prisma/seed.ts` |
| `npm run prisma:studio` | `prisma studio` |
