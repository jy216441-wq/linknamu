import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "./sign-out-button";
import { createLink, deleteLink, updateProfile } from "./actions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.username) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
    include: { links: { orderBy: { order: "asc" } } },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{user.username}님, 환영합니다</h1>
        <SignOutButton />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        내 링크 모음 페이지:{" "}
        <a href={`/${user.username}`} className="font-medium underline">
          /{user.username}
        </a>
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">프로필</h2>
        <form action={updateProfile} className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-gray-400 dark:bg-gray-800">
                {(user.name ?? user.username).slice(0, 1).toUpperCase()}
              </div>
            )}
            <input
              type="url"
              name="image"
              placeholder="프로필 사진 URL"
              defaultValue={user.image ?? ""}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-transparent"
            />
          </div>
          <input
            type="text"
            name="name"
            placeholder="이름"
            defaultValue={user.name ?? ""}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-transparent"
          />
          <input
            type="text"
            name="bio"
            placeholder="한 줄 소개"
            defaultValue={user.bio ?? ""}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-transparent"
          />
          <button
            type="submit"
            className="self-start rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            프로필 저장
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">링크</h2>

        <form
          action={createLink}
          className="flex flex-col gap-3 rounded-md border border-gray-200 p-4 dark:border-gray-800"
        >
          <input
            type="text"
            name="title"
            placeholder="링크 제목"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-transparent"
          />
          <input
            type="url"
            name="url"
            placeholder="https://..."
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-transparent"
          />
          <button
            type="submit"
            className="self-start rounded-md border border-gray-300 px-4 py-2 text-sm font-medium dark:border-gray-700"
          >
            링크 추가
          </button>
        </form>

        <div className="flex flex-col gap-3">
          {user.links.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              아직 등록된 링크가 없습니다.
            </p>
          ) : (
            user.links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between gap-3 rounded-md border border-gray-200 px-4 py-3 dark:border-gray-800"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{link.title}</p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {link.url}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    클릭 {link.clicks}회
                  </p>
                </div>
                <form action={deleteLink.bind(null, link.id)}>
                  <button
                    type="submit"
                    className="shrink-0 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                  >
                    삭제
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
