# 🧠 Gitmoji Commit Guide

## 🎯 목적
이 문서는 스터디 내에서 **커밋 메시지를 깔끔하고 통일성 있게 작성하기 위한 깃모지(Gitmoji) 규칙**을 안내합니다.

---

## 💡 Gitmoji란?
**Gitmoji**는 커밋 메시지 앞에 이모지를 붙여 변경 목적을 한눈에 알아볼 수 있게 만든 규칙입니다.  
예를 들어 👇

```
✨ feat: add dark mode toggle
🐛 fix: correct event handler bug
📝 docs: update README with setup guide
🎨 style: improve layout spacing
```

---

## 🚀 깃모지 설치 및 사용법

### 1️⃣ Gitmoji CLI 설치 (추천)
터미널에서 깃모지를 고를 수 있는 인터페이스를 제공합니다.

```bash
npm install -g gitmoji-cli
```

커밋 시 다음 명령어 실행:
```bash
gitmoji -c
```

그러면 아래처럼 인터페이스가 뜹니다:
```
? Choose a gitmoji: ✨  - Introduce new features.
? Enter the commit title: add dark mode toggle
? Enter the commit message: added button and state logic
```
결과:
```
✨ feat: add dark mode toggle
```

> 💡 참고: `gitmoji -i` 로 설정하면 `git commit` 시 자동 실행됩니다.

---

### 2️⃣ VS Code 확장 프로그램 사용
#### ✅ 추천 확장
- **Gitmoji Commit** → VSCode 커밋창에 버튼 추가
- **Emoji Log** → 커밋 이모지 자동 변환 지원

설치 후 커밋창에서 “Pick Gitmoji” 클릭하여 사용.

---

### 3️⃣ Git 커밋 템플릿 설정 (간단한 방법)

1. 템플릿 파일 생성:
   ```bash
   code ~/.gitmessage.txt
   ```
2. 내용 작성:
   ```
   # Gitmoji 참고
   # ✨ feat: 새로운 기능
   # 🐛 fix: 버그 수정
   # 📝 docs: 문서 수정
   # 🎨 style: 코드 포맷
   # ♻️ refactor: 코드 리팩토링
   # 🚀 chore: 설정 변경
   ```
3. 설정 반영:
   ```bash
   git config --global commit.template ~/.gitmessage.txt
   ```

---

## 🧩 깃모지 종류 요약

| 이모지 | 코드 | 설명 |
|--------|-------|------|
| ✨ | `:sparkles:` | 새로운 기능 추가 |
| 🐛 | `:bug:` | 버그 수정 |
| 📝 | `:memo:` | 문서 추가/수정 |
| 🎨 | `:art:` | 코드 포맷, 스타일 변경 |
| ♻️ | `:recycle:` | 코드 리팩토링 |
| 🔥 | `:fire:` | 코드/파일 삭제 |
| 🚀 | `:rocket:` | 배포 관련 |
| 💄 | `:lipstick:` | UI 스타일 변경 |
| 🔧 | `:wrench:` | 설정 파일 수정 |
| 🚧 | `:construction:` | 작업 진행 중 |
| ✅ | `:white_check_mark:` | 테스트 완료 |
| 🧪 | `:test_tube:` | 테스트 코드 추가 |

---

## 📘 커밋 메시지 예시

| 상황 | 메시지 예시 |
|------|--------------|
| 새 기능 추가 | ✨ feat: add signup validation |
| 버그 수정 | 🐛 fix: correct null reference bug |
| 문서 수정 | 📝 docs: update setup guide |
| 스타일 변경 | 🎨 style: adjust header spacing |
| 리팩토링 | ♻️ refactor: simplify DOM handling |
| 설정 수정 | 🔧 chore: update ESLint config |

---

## 🧠 참고 링크
- 공식 사이트: [https://gitmoji.dev](https://gitmoji.dev)
- CLI 문서: [https://github.com/carloscuesta/gitmoji](https://github.com/carloscuesta/gitmoji)
