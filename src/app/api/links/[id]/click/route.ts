import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import * as logger from "@/lib/logger";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectToDatabase();
  const owner = await User.findOne({ "links._id": id }, { "links.$": 1 }).lean();
  const link = owner?.links[0];

  if (!link) {
    return NextResponse.json({ error: "링크를 찾을 수 없습니다." }, { status: 404 });
  }

  try {
    await User.updateOne({ "links._id": id }, { $inc: { "links.$.clickCount": 1 } });
  } catch (err) {
    logger.warn("click count update failed", { linkId: id, error: String(err) });
  }

  return NextResponse.redirect(link.url);
}
