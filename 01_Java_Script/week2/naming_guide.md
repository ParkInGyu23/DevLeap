# 변수 네이밍 컨벤션 가이드 (JavaScript)

## 🎯 1. 기본 원칙

### ✔ 이름만 보고도 의미가 전달되어야 한다
- ❌ `a, b, x1, temp`
- ✔ `userName`, `scoreBoard`, `isRunning`

### ✔ 카멜케이스(camelCase) 사용
```js
let userName;
let currentScore;
let maxSpeed;
```

### ✔ 변수는 구체적일수록 좋다
- ❌ `value`
- ✔ `inputValue`
- ❌ `result`
- ✔ `winningResult`

---

## 🎯 2. 접두사(prefix) 규칙

### ✔ DOM 요소 → `$` 사용
```js
const $button = document.querySelector('.btn');
const $input = document.querySelector('#userInput');
```

### ✔ Boolean → is / has / can / should
```js
let isLoading = false;
let hasPermission = true;
```

### ✔ 숫자 → count / total / length / index
```js
let count = 0;
let totalScore = 120;
let currentIndex = 2;
```

### ✔ 배열 → 복수형 (s로 끝나기)
```js
let users = [];
let items = [];
```

### ✔ 함수 → 동사로 시작
```js
function getUser() {}
function setScore() {}
function renderUI() {}
```

### ✔ 클래스/생성자 → PascalCase
```js
class UserProfile {}
class GameManager {}
```

### ✔ 상수(CONSTANT) → 전체 대문자 + 스네이크 케이스
```js
const API_URL = "https://...";
const TIME_LIMIT = 30;
```

---

## 🎯 3. 역할별 네이밍 패턴

### ✔ 상태(state) 객체로 관리
```js
const state = {
  score: 0,
  round: 0,
  isRunning: false,
  currentUser: null,
};
```

### ✔ 이벤트 핸들러 → on + 동작 이름
```js
function onClickButton() {}
function onSubmitForm() {}
function onInputChange() {}
```

### ✔ DOM 조작 함수 → render / update / show / hide
```js
function renderScoreboard() {}
function updateUserInfo() {}
function showModal() {}
function hideMenu() {}
```

---

## 🎯 4. 피해야 하는 네이밍

- ❌ 지나치게 짧은 이름 (`a, b, c`)
- ❌ 의미 없는 이름 (`temp, data, value`)
- ❌ 타입 중복 (`arrayList`, `userObject`)
- ❌ 타입을 이름에 넣기 (`userArray` 대신 `users`)

---

## 🎯 5. 실전 예시

```js
const $computer = document.querySelector('.computer');
const $scoreBoard = document.querySelector('.score');

let userWinCount = 0;
let computerWinCount = 0;
let currentRound = 0;
let isClickable = true;

function startGame() {}
function stopGame() {}
function renderComputerHand() {}
function judgeWinner() {}
```

---

## 🎉 결론

좋은 변수 네이밍은 코드 퀄리티를 크게 올린다.

✔ 역할이 명확한 이름  
✔ camelCase  
✔ boolean → is/has  
✔ DOM → $  
✔ 배열 → 복수형  
✔ 함수 → 동사  
✔ 상수 → 대문자  