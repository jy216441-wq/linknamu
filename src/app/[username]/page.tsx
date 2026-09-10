import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserLinkPage({ params }: Props) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: { links: { orderBy: { order: "asc" } } },
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center gap-6 px-6 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{user.name ?? user.username}</h1>
        {user.bio && <p className="mt-2 text-sm text-gray-500">{user.bio}</p>}
      </div>

      <div className="flex w-full flex-col gap-3">
        {user.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-gray-200 px-4 py-3 text-center font-medium transition hover:bg-gray-50"
          >
            {link.title}
          </a>
        ))}
      </div>
    </main>
  );
}
