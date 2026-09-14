---
name: deploy
description: 프로덕션 배포. "배포", "릴리스", "프로덕션 반영"을 요청할 때 사용
allowed-tools: Bash(npm *), Bash(git *)
---

# 배포 절차

1. 테스트 전체 실행: `npm run test`
2. 빌드: `npm run build`
3. 스테이징 배포 확인
4. 프로덕션 배포: `npm run deploy`
5. 완료 보고
