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

  const displayName = user.name ?? user.username;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-6 px-6 py-16">
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt={displayName}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-2xl font-semibold text-gray-400 dark:bg-gray-800">
          {displayName.slice(0, 1).toUpperCase()}
        </div>
      )}

      <div className="text-center">
        <h1 className="text-2xl font-bold">{displayName}</h1>
        {user.bio && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{user.bio}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-3">
        {user.links.map((link) => (
          <a
            key={link.id}
            href={`/r/${link.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-center font-medium transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            {link.title}
          </a>
        ))}
      </div>
    </main>
  );
}
