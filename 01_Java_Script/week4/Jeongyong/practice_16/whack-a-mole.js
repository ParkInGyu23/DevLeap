// 책의 html, css를 작성하고 나니 js에서는 할게 많이 없더라구요
// 셀프체크 목숨 기능을 추가했습니다. (3개 목숨, 목숨이 끝나면 그 즉시 게임오버)

const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $game = document.querySelector("#game");
const $start = document.querySelector("#start");
const $$cells = document.querySelectorAll(".cell");

let time = 60;
let timerId = null; // setInterval ID 저장용
let tickId = null;
let score = 0;
let life = 3;
let isGameOver = false;

$start.addEventListener("click", () => {
  if (timerId) return; // 이미 타이머가 시작되었는데 중복 클릭 되는 것을 방지

  time = 60;
  score = 0;
  life = 3;
  $timer.textContent = time;
  $score.textContent = score;
  updateLifeDisplay();
  isGameOver = false; // 재시작 대응 변수 재설정
  timerId = setInterval(() => {
    time--;
    $timer.textContent = time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);

  tickId = setInterval(showRandomMole, 1000);
});

function showRandomMole() {
  if (isGameOver) return;
  const randomCell = $$cells[Math.floor(Math.random() * $$cells.length)];
  const $gopher = randomCell.querySelector(".gopher");
  const $bomb = randomCell.querySelector(".bomb");

  const rand = Math.random();
  if (rand < 0.3) {
    appear($gopher);
  } else if (rand < 0.5) {
    appear($bomb);
  }
}

function appear(element) {
  if (!element.classList.contains("hidden")) return; // 이미 올라와 있는 요소에 대해서는 무시하고 진행

  element.classList.remove("hidden");
  setTimeout(() => {
    element.classList.add("hidden");
  }, 1000);
}

$$cells.forEach((cell) => {
  const gopher = cell.querySelector(".gopher");
  const bomb = cell.querySelector(".bomb");

  gopher.addEventListener("click", () => {
    if (gopher.classList.contains("hidden")) return;
    gopher.classList.add("dead");
    setTimeout(() => {
      gopher.classList.remove("dead");
      gopher.classList.add("hidden");
    }, 500);

    score++;
    $score.textContent = score;
  });

  bomb.addEventListener("click", () => {
    if (bomb.classList.contains("hidden")) return;
    bomb.classList.add("boom");
    setTimeout(() => {
      bomb.classList.remove("boom");
      bomb.classList.add("hidden");
    }, 500);

    score--;
    if (score < 0) score = 0;
    $score.textContent = score;

    life--;
    updateLifeDisplay();

    if (life <= 0) {
      endGame();
    }
  });
});

const $lifeContainer = document.createElement("div");
$lifeContainer.id = "life";
document.body.prepend($lifeContainer);

function updateLifeDisplay() {
  $lifeContainer.textContent = "♥".repeat(life);
}
updateLifeDisplay();

function endGame() {
  clearInterval(timerId);
  clearInterval(tickId);
  timerId = null;
  tickId = null;
  isGameOver = true;
  alert(`Game over! 점수: ${score}`);
}
