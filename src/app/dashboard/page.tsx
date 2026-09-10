import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "./sign-out-button";

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
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{user.username}님, 환영합니다</h1>
        <SignOutButton />
      </div>

      <p className="text-sm text-gray-500">
        내 링크 모음 페이지:{" "}
        <a href={`/${user.username}`} className="font-medium underline">
          /{user.username}
        </a>
      </p>

      <div className="flex flex-col gap-3">
        {user.links.length === 0 ? (
          <p className="text-sm text-gray-500">아직 등록된 링크가 없습니다.</p>
        ) : (
          user.links.map((link) => (
            <div key={link.id} className="rounded-md border border-gray-200 px-4 py-3">
              <p className="font-medium">{link.title}</p>
              <p className="text-sm text-gray-500">{link.url}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
