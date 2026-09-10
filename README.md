# 링크나무

링크나무는 여러 개의 링크를 한 곳에 모아 공유할 수 있는 프로젝트입니다.

## 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org) (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **DB / ORM**: PostgreSQL + [Prisma](https://www.prisma.io)
- **인증**: [Auth.js (NextAuth v5)](https://authjs.dev) - Credentials(아이디/비밀번호) 로그인
- **Lint**: ESLint

## 프로젝트 구조

```
linknamu/
├─ prisma/
│  ├─ schema.prisma       # User, Link 모델 정의
│  └─ migrations/         # DB 마이그레이션 기록
├─ src/
│  ├─ auth.ts              # Auth.js 설정 (Credentials Provider)
│  ├─ proxy.ts             # /dashboard 접근 제한 (구 middleware)
│  ├─ app/
│  │  ├─ page.tsx          # 메인 페이지
│  │  ├─ layout.tsx        # 공통 레이아웃
│  │  ├─ providers.tsx     # SessionProvider 래퍼
│  │  ├─ login/page.tsx    # 로그인 페이지
│  │  ├─ signup/page.tsx   # 회원가입 페이지
│  │  ├─ dashboard/page.tsx        # 로그인 시 내 링크 관리 페이지
│  │  ├─ api/auth/[...nextauth]/   # Auth.js 라우트 핸들러
│  │  ├─ api/register/     # 회원가입 API
│  │  └─ [username]/
│  │     └─ page.tsx       # 사용자별 공개 링크 모음 페이지 (/{username})
│  ├─ lib/
│  │  └─ prisma.ts         # Prisma 클라이언트 싱글턴
│  └─ types/
│     └─ next-auth.d.ts    # 세션 타입 확장 (username)
├─ .env.example             # 환경 변수 예시
└─ package.json
```

## 데이터 모델

- **User**: username, passwordHash, name, bio 등 프로필 정보
- **Link**: title, url, order 등 사용자가 등록한 링크 정보 (User와 1:N)

## 인증 흐름

- `/signup` 에서 아이디(3자 이상)/비밀번호(8자 이상)로 회원가입 → 비밀번호는 bcrypt로 해싱되어 저장됩니다.
- `/login` 에서 로그인하면 JWT 세션이 발급됩니다.
- `/dashboard` 는 로그인한 사용자만 접근 가능하며, 비로그인 상태로 접근 시 `/login` 으로 리다이렉트됩니다.
- 로그인한 사용자의 공개 프로필은 `/{username}` 에서 누구나 볼 수 있습니다.

## 시작하기

로컬에 PostgreSQL이 필요합니다 (Docker, 로컬 설치, 또는 Neon/Vercel Postgres 등 무료 플랜 모두 가능).

```bash
# 의존성 설치
npm install

# .env 파일 생성 (.env.example 참고)
cp .env.example .env
# DATABASE_URL은 사용할 Postgres 접속 정보로 변경
# AUTH_SECRET은 아래 명령어로 생성한 값을 넣어주세요
openssl rand -base64 32

# DB 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하면 확인할 수 있습니다.

## 배포 (Vercel)

1. Vercel 프로젝트 **Settings → Environment Variables** 에 `DATABASE_URL`(Postgres 접속 정보), `AUTH_SECRET`을 등록합니다.
2. **Settings → Build & Development Settings** 의 Build Command는 Override 없이 기본값(자동 감지된 `next build`)을 사용하거나, `package.json`에 정의된 `vercel-build` 스크립트(`prisma generate && prisma migrate deploy && next build`)를 그대로 사용하면 됩니다. 이 스크립트는 배포할 때마다 최신 마이그레이션을 DB에 자동 반영합니다.
3. Deploy 하면 끝입니다.
