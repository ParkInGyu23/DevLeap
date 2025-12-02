// 얼마나 걸렸는지 시간 표시, 플레이어로부터 카드 갯수를 입력 받아 사용(기본값 12, 셀프체크)
// alert는 성능 저하를 유발할 수 있다고해서 메시지는 div를 사용해서 출력

//설정 상수
const CARD_SHOW_DELAY = 1000;
const CARD_HIDE_DELAY = 5000;
const WRONG_PAIR_HIDE_DELAY = 500;

//최대 10쌍(20개)
const BASE_COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "white",
  "pink",
  "blue",
  "purple",
  "gray",
  "brown",
];

const $wrapper = document.querySelector("#wrapper");

// 상태 변수
const gameState = {
  total: 0,
  colors: [],
  shuffled: [],
  clicked: [],
  completed: [],
  clickable: false,
  startTime: null,
  endTime: null,
};

// 유틸 함수
// 카드 갯수 입력
function askCardCount() {
  let input = prompt(
    "카드의 개수를 입력하세요. (최대 20장, 짝수만 가능)",
    "12"
  );
  let number = parseInt(input);

  if (isNaN(number) || number < 2 || number > 20 || number % 2 !== 0) {
    alert(`2 ~ 20 사이의 짝수만 입력하세요. 기본값(12장)으로 진행됩니다.`);
    number = 12;
  }
  gameState.total = number;
  const needed = gameState.total / 2;
  gameState.colors = BASE_COLORS.slice(0, needed);
}
// 색상 섞기(피셔예이츠)
function shuffleColors() {
  const colorPool = gameState.colors.concat(gameState.colors);
  const shuffled = [];
  while (colorPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * colorPool.length);
    shuffled.push(colorPool.splice(randomIndex, 1)[0]);
  }
  gameState.shuffled = shuffled;
}

//카드 DOM 생성
function createCardElement(i) {
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  cardFront.style.backgroundColor = gameState.shuffled[i];
  cardInner.append(cardBack, cardFront);
  card.appendChild(cardInner);
  return card;
}

// 게임 로직
// 클릭 함수
function handleCardClick(card) {
  if (
    !gameState.clickable ||
    gameState.completed.includes(card) ||
    gameState.clicked[0] === card
  )
    return;
  card.classList.toggle("flipped");
  gameState.clicked.push(card);
  if (gameState.clicked.length !== 2) return;
  const [first, second] = gameState.clicked;
  const color1 = first.querySelector(".card-front").style.backgroundColor;
  const color2 = second.querySelector(".card-front").style.backgroundColor;
  if (color1 === color2) {
    gameState.completed.push(first, second);
    gameState.clicked = [];
    if (gameState.completed.length === gameState.total) {
      gameState.endTime = new Date();
      const timeTaken = (
        (gameState.endTime - gameState.startTime) /
        1000
      ).toFixed(2);
      setTimeout(() => {
        showMessage(`축하합니다! 소요 시간: ${timeTaken}초`);
        setTimeout(() => resetGame(), 1000);
      }, CARD_SHOW_DELAY);
      return;
    }
  } else {
    gameState.clickable = false;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      gameState.clicked = [];
      gameState.clickable = true;
    }, WRONG_PAIR_HIDE_DELAY);
  }
}

//카드 렌더링
function renderCards() {
  for (let i = 0; i < gameState.total; i++) {
    const card = createCardElement(i);
    $wrapper.appendChild(card);
  }
}

// 게임 시작
function showAllCardsTemporarily() {
  const cards = document.querySelectorAll(".card");
  gameState.startTime = new Date();
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, CARD_SHOW_DELAY + 100 * index);
  });
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flipped"));
    gameState.clickable = true;
  }, CARD_HIDE_DELAY);
}

// 게임 초기화
function initGame() {
  $wrapper.innerHTML = "";
  gameState.clicked = [];
  gameState.completed = [];
  gameState.clickable = false;
  shuffleColors();
  renderCards();
}

// 게임 시작
function startGame() {
  askCardCount();
  initGame();
  showAllCardsTemporarily();
}

// 게임 재시작
function resetGame() {
  askCardCount();
  initGame();
  showAllCardsTemporarily();
}

// 메시지 표시
function showMessage(text) {
  const msg = document.createElement("div");
  msg.textContent = text;
  $wrapper.insertAdjacentElement("afterend", msg);
  setTimeout(() => msg.remove(), 4000);
}

// 이벤트 핸들러(위임 이용)
$wrapper.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || !gameState.clickable) return;
  handleCardClick(card);
});

startGame();
