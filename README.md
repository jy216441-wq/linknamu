# 링크나무

내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하는 link-in-bio 서비스입니다.

## 기능

- 프로필 표시 (이름, 한 줄 소개, 프로필 사진)
- 링크 카드 목록 관리 (`/dashboard`에서 추가/삭제)
- 공개 페이지 (`/<username>`)에서 링크 카드 클릭 시 클릭 수 집계 후 이동

## 기술 스택

- Next.js 16 (App Router), TypeScript, React 19
- MongoDB Atlas via Mongoose
- Tailwind CSS v4
- Auth.js (`next-auth` v5) Credentials 인증

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL 채우기
npm run dev
```

자세한 개발 가이드는 [CLAUDE.md](./CLAUDE.md)를 참고하세요.
