"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import FormField from "@/components/FormField";

export default function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setErrorMessage(data.error ?? "회원가입에 실패했습니다.");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setErrorMessage("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card>
        <h1 className="mb-5 text-xl font-bold text-slate-800">회원가입</h1>
        <form onSubmit={handleSubmit}>
          <FormField label="이름" htmlFor="name">
            <input id="name" name="name" type="text" required className="form-input" />
          </FormField>
          <FormField label="사용자 이름 (URL에 사용)" htmlFor="username">
            <input id="username" name="username" type="text" pattern="[a-z0-9\-]+" required className="form-input" />
          </FormField>
          <FormField label="이메일" htmlFor="email">
            <input id="email" name="email" type="email" required className="form-input" />
          </FormField>
          <FormField label="비밀번호 (8자 이상)" htmlFor="password">
            <input id="password" name="password" type="password" minLength={8} required className="form-input" />
          </FormField>
          {errorMessage && <p className="mb-3 text-xs text-red-600">{errorMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "가입 중..." : "가입하기"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
