"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await auth();
  if (!session?.user?.username) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
    select: { id: true },
  });
  if (!user) {
    redirect("/login");
  }
  return user.id;
}

export async function updateProfile(formData: FormData) {
  const userId = await requireUserId();

  const name = String(formData.get("name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: name || null,
      bio: bio || null,
      image: image || null,
    },
  });

  revalidatePath("/dashboard");
}

export async function createLink(formData: FormData) {
  const userId = await requireUserId();

  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!title || !url) {
    return;
  }

  const last = await prisma.link.findFirst({
    where: { userId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.link.create({
    data: { title, url, order: (last?.order ?? -1) + 1, userId },
  });

  revalidatePath("/dashboard");
}

export async function deleteLink(linkId: string) {
  const userId = await requireUserId();

  await prisma.link.deleteMany({
    where: { id: linkId, userId },
  });

  revalidatePath("/dashboard");
}
