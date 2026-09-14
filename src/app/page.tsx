import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const username = session?.user?.username;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold">링크나무</h1>
      <p className="max-w-md text-gray-500 dark:text-gray-400">
        여러 개의 링크를 한 곳에 모아, 나만의 페이지로 공유해보세요.
      </p>
      {username ? (
        <div className="mt-4 flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            내 링크 관리
          </Link>
          <Link
            href={`/${username}`}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium dark:border-gray-700"
          >
            내 페이지 보기
          </Link>
        </div>
      ) : (
        <div className="mt-4 flex gap-3">
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium dark:border-gray-700"
          >
            회원가입
          </Link>
        </div>
      )}
    </main>
  );
}
