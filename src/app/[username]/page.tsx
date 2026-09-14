import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import LinkCard from "@/components/LinkCard";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  await connectToDatabase();
  const user = await User.findOne({ username }).lean();

  if (!user) {
    notFound();
  }

  const links = [...user.links].sort((a, b) => a.order - b.order);

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card className="text-center">
        <Avatar avatarUrl={user.avatarUrl} name={user.name} />
        <h1 className="mb-1 text-xl font-bold text-slate-800">{user.name}</h1>
        {user.bio && <p className="mb-6 text-slate-500">{user.bio}</p>}

        <div className="mt-6">
          {links.map((link) => (
            <LinkCard key={link._id.toString()} id={link._id.toString()} title={link.title} />
          ))}
          {links.length === 0 && <p className="text-slate-500">등록된 링크가 없습니다.</p>}
        </div>
      </Card>
    </main>
  );
}
