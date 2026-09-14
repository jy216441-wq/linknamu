import Link from "next/link";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-slate-800">링크나무</h1>
        <p className="mb-6 text-slate-500">내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하세요.</p>
        <div className="flex flex-col gap-2.5">
          <Link
            href="/register"
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-sky-500 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            무료로 시작하기
          </Link>
          <Link
            href="/login"
            className="flex min-h-11 w-full items-center justify-center rounded-lg border border-sky-500 text-sm font-semibold text-sky-500 transition-colors hover:bg-sky-50"
          >
            로그인
          </Link>
        </div>
      </Card>
    </main>
  );
}
