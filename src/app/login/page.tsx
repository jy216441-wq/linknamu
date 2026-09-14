"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import FormField from "@/components/FormField";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const result = await signIn("credentials", { email, password, redirect: false });

    setIsSubmitting(false);

    if (!result || result.error) {
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card>
        <h1 className="mb-5 text-xl font-bold text-slate-800">로그인</h1>
        <form onSubmit={handleSubmit}>
          <FormField label="이메일" htmlFor="email">
            <input id="email" name="email" type="email" required className="form-input" />
          </FormField>
          <FormField label="비밀번호" htmlFor="password">
            <input id="password" name="password" type="password" required className="form-input" />
          </FormField>
          {errorMessage && <p className="mb-3 text-xs text-red-600">{errorMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
