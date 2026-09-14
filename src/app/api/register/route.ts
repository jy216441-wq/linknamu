import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/password";
import { assertValidEmail, assertValidPassword, assertValidUsername } from "@/lib/validation";
import { AppError, ConflictError, ValidationError } from "@/lib/errors";
import * as logger from "@/lib/logger";

type RegisterRequestBody = {
  email?: unknown;
  password?: unknown;
  username?: unknown;
  name?: unknown;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterRequestBody;
    const { email, password, username, name } = body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof username !== "string" ||
      typeof name !== "string" ||
      name.trim().length === 0
    ) {
      throw new ValidationError("email, password, username, name은 필수입니다.");
    }

    const normalizedUsername = username.trim().toLowerCase();
    assertValidEmail(email);
    assertValidPassword(password);
    assertValidUsername(normalizedUsername);

    await connectToDatabase();

    const existing = await User.findOne({ $or: [{ email }, { username: normalizedUsername }] });
    if (existing) {
      throw new ConflictError("이미 사용 중인 이메일 또는 사용자 이름입니다.");
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      email,
      username: normalizedUsername,
      name: name.trim(),
      passwordHash,
      bio: "",
      links: [],
    });

    return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode });
    }
    logger.error("register failed", { error: String(err) });
    return NextResponse.json({ error: "회원가입에 실패했습니다." }, { status: 500 });
  }
}
