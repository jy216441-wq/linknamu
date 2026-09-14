# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

"링크나무" — a Linktree-style link-in-bio service. Users register with
email/password, manage a profile (name, bio, avatar) and an ordered list of
links from `/dashboard`, and share a public page at `/<username>` that lists
their links as clickable cards. Each click increments that link's
`clickCount` and redirects to the target URL.

## Tech stack

- Next.js 16 (App Router), TypeScript, React 19
  (originally specified as Next.js 14, but that major version has unpatched
  critical CVEs as of this writing — see `npm audit`. Upgraded to the latest
  stable 16.x with explicit user consent.)
- MongoDB Atlas via Mongoose (links are embedded as a subdocument array on
  `User`, not a separate collection — see `src/models/User.ts`)
- Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`, no
  `tailwind.config.js` needed); reusable UI lives in `src/components/`
- Auth: Auth.js (`next-auth` v5) Credentials provider, JWT session strategy,
  bcrypt password hashing (kept from the original spec even though the
  latest feature list didn't mention it — profile/link management requires
  an account)
- Deploy target: Vercel
- Testing: Jest + Testing Library (not yet wired up)

## Commands

- `npm run dev` / `npm run build` / `npm run start` — Next.js dev/build/start
- `npm run lint` / `npm run lint:fix` — ESLint (flat config)
- `npm run format` / `npm run format:check` — Prettier
- Requires `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` in `.env.local`
  (copy `.env.local.example`); no local DB tooling needed since it's Atlas
  in production, but any reachable MongoDB instance works for local dev

## Commit conventions

- Commit messages must follow Conventional Commits (`feat`, `fix`, `docs`,
  `refactor`, `test`, ...)
- PR titles must use the same format

## Coding conventions

- Use `function` declarations instead of arrow functions
- Handle errors with custom error classes, not raw `Error`/string throws
- Never use the `any` type
- Use the project's logger module instead of `console.log`

## Prohibited

- Never commit `.env` or `.env.local` files

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
