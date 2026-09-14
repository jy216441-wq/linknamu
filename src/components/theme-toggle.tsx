"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="테마 전환"
      suppressHydrationWarning
      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700"
    >
      {dark ? "☀️ 라이트 모드" : "🌙 다크 모드"}
    </button>
  );
}
