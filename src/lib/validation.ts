import { ValidationError } from "@/lib/errors";

const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;
const RESERVED_USERNAMES = new Set(["api", "login", "register", "dashboard", "www", "admin"]);

export function assertValidUsername(username: string): void {
  if (!USERNAME_PATTERN.test(username)) {
    throw new ValidationError(
      "사용자 이름은 영문 소문자, 숫자, 하이픈(-)만 사용할 수 있고 3~30자여야 합니다.",
    );
  }
  if (RESERVED_USERNAMES.has(username)) {
    throw new ValidationError("사용할 수 없는 사용자 이름입니다.");
  }
}

export function assertValidEmail(email: string): void {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ValidationError("올바른 이메일 형식이 아닙니다.");
  }
}

export function assertValidPassword(password: string): void {
  if (password.length < 8) {
    throw new ValidationError("비밀번호는 8자 이상이어야 합니다.");
  }
}

export function assertValidUrl(url: string): void {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("invalid protocol");
    }
  } catch {
    throw new ValidationError("올바른 URL이 아닙니다 (http/https만 허용).");
  }
}
