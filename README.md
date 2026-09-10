# 링크나무

링크나무는 여러 개의 링크를 한 곳에 모아 공유할 수 있는 프로젝트입니다.

## 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org) (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **DB / ORM**: SQLite + [Prisma](https://www.prisma.io)
- **Lint**: ESLint

## 프로젝트 구조

```
linknamu/
├─ prisma/
│  ├─ schema.prisma       # User, Link 모델 정의
│  └─ migrations/         # DB 마이그레이션 기록
├─ src/
│  ├─ app/
│  │  ├─ page.tsx         # 메인 페이지
│  │  ├─ layout.tsx       # 공통 레이아웃
│  │  └─ [username]/
│  │     └─ page.tsx      # 사용자별 링크 모음 페이지 (/{username})
│  └─ lib/
│     └─ prisma.ts        # Prisma 클라이언트 싱글턴
├─ .env.example            # 환경 변수 예시
└─ package.json
```

## 데이터 모델

- **User**: username, name, bio 등 프로필 정보
- **Link**: title, url, order 등 사용자가 등록한 링크 정보 (User와 1:N)

## 시작하기

```bash
# 의존성 설치
npm install

# .env 파일 생성 (.env.example 참고)
cp .env.example .env

# DB 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하면 확인할 수 있습니다.
