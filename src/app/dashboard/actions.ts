"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User, type LinkSubdocument } from "@/models/User";
import { assertValidUrl } from "@/lib/validation";
import { UnauthorizedError, ValidationError } from "@/lib/errors";
import * as logger from "@/lib/logger";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return session.user.id;
}

export async function updateProfile(formData: FormData): Promise<void> {
  const userId = await requireUserId();
  const name = String(formData.get("name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();

  if (name.length === 0) {
    throw new ValidationError("이름은 필수입니다.");
  }

  await connectToDatabase();
  await User.findByIdAndUpdate(userId, { name, bio, avatarUrl: avatarUrl || null });

  revalidatePath("/dashboard");
}

export async function addLink(formData: FormData): Promise<void> {
  const userId = await requireUserId();
  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (title.length === 0) {
    throw new ValidationError("링크 제목은 필수입니다.");
  }
  assertValidUrl(url);

  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthorizedError();
  }

  const lastOrder = user.links.reduce((max: number, link: LinkSubdocument) => Math.max(max, link.order), -1);
  user.links.push(user.links.create({ title, url, order: lastOrder + 1, clickCount: 0 }));
  await user.save();

  revalidatePath("/dashboard");
}

export async function deleteLink(formData: FormData): Promise<void> {
  const userId = await requireUserId();
  const linkId = String(formData.get("linkId") ?? "");

  await connectToDatabase();
  const result = await User.updateOne({ _id: userId }, { $pull: { links: { _id: linkId } } });

  if (result.modifiedCount === 0) {
    logger.warn("attempted to delete link not owned by user or not found", { userId, linkId });
    return;
  }

  revalidatePath("/dashboard");
}
