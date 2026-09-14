import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;

  const link = await prisma.link
    .update({
      where: { id },
      data: { clicks: { increment: 1 } },
    })
    .catch(() => null);

  if (!link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(link.url);
}
