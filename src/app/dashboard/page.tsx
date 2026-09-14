import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { addLink, deleteLink, updateProfile } from "./actions";
import Card from "@/components/Card";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import LinkListItem from "@/components/LinkListItem";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectToDatabase();
  const user = await User.findById(session.user.id).lean();

  if (!user) {
    redirect("/login");
  }

  const links = [...user.links].sort((a, b) => a.order - b.order);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-1 text-2xl font-bold text-slate-800">대시보드</h1>
      <p className="mb-6 text-slate-500">
        공개 페이지:{" "}
        <a href={`/${user.username}`} className="text-sky-500 hover:underline">
          /{user.username}
        </a>
      </p>

      <Card className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">프로필</h2>
        <form action={updateProfile}>
          <FormField label="이름" htmlFor="name">
            <input id="name" name="name" type="text" defaultValue={user.name} required className="form-input" />
          </FormField>
          <FormField label="한 줄 소개" htmlFor="bio">
            <input id="bio" name="bio" type="text" defaultValue={user.bio} className="form-input" />
          </FormField>
          <FormField label="프로필 사진 URL" htmlFor="avatarUrl">
            <input
              id="avatarUrl"
              name="avatarUrl"
              type="url"
              defaultValue={user.avatarUrl ?? ""}
              className="form-input"
            />
          </FormField>
          <Button type="submit">프로필 저장</Button>
        </form>
      </Card>

      <Card className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">링크 추가</h2>
        <form action={addLink}>
          <FormField label="제목" htmlFor="title">
            <input id="title" name="title" type="text" required className="form-input" />
          </FormField>
          <FormField label="URL" htmlFor="url">
            <input id="url" name="url" type="url" placeholder="https://" required className="form-input" />
          </FormField>
          <Button type="submit">링크 추가</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">내 링크 ({links.length})</h2>
        {links.length === 0 && <p className="text-slate-500">아직 추가한 링크가 없습니다.</p>}
        {links.map((link) => (
          <LinkListItem
            key={link._id.toString()}
            id={link._id.toString()}
            title={link.title}
            url={link.url}
            clickCount={link.clickCount}
            onDelete={deleteLink}
          />
        ))}
      </Card>
    </main>
  );
}
