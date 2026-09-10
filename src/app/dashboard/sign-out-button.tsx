"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
    >
      로그아웃
    </button>
  );
}
