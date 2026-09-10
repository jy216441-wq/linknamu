import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold">링크나무</h1>
      <p className="max-w-md text-gray-500">
        여러 개의 링크를 한 곳에 모아 공유할 수 있는 프로젝트입니다.
      </p>
      <div className="mt-4 flex gap-3">
        <Link
          href="/login"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
}
