const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $game = document.querySelector("#game");
const $start = document.querySelector("#start");
const $$cells = document.querySelectorAll(".cell");

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 10; // 기본60

$start.addEventListener("click", () => {
  if (started) return; // 이미 시작했으면 무시
  started = true;
  console.log("시작");
  const timerId = setInterval(() => {
    time = (time * 10 - 1) / 10; // 소수점 계산 시 문제있음
    $timer.textContent = time;
    if (time === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        alert(`게임 오버! 점수는${score}점`);
      }, 50);
    }
  }, 100);
  const tickId = setInterval(tick, 1000);
  tick();
});

// 화면: hidden
// 호출스택:
// 백그라운드 : interval(tick, 1000)
// 태스크큐:
let gopherPercent = 0.3;
let bombPercent = 0.5;
// 0,1,2,3,4,5,6,7,8,9
function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const randomValue = Math.random();
    if (randomValue < gopherPercent) {
      const $gopher = $$cells[index].querySelector(".gopher");
      holes[index] = setTimeout(() => {
        // 1초 뒤에 사라짐
        $gopher.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove("hidden");
    } else if (randomValue < bombPercent) {
      const $bomb = $$cells[index].querySelector(".bomb");
      holes[index] = setTimeout(() => {
        // 1초 뒤에 사라짐
        $bomb.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove("hidden");
    }
  });
}

$$cells.forEach(($cell, index) => {
  $cell.querySelector(".gopher").addEventListener("click", (event) => {
    // 두더지 1번이외에 더 클릭해도 점수반영이 되는 버그있어서 고치는코드
    if (!event.target.classList.contains("dead")) {
      score += 1;
      $score.textContent = score;
    }
    event.target.classList.add("dead");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("dead");
    }, 1000);
  });
  $cell.querySelector(".bomb").addEventListener("click", (event) => {
    event.target.classList.add("boom");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("boom");
    }, 1000);
  });
});

// 게임 재시작 로직 추가
/* 
게임 종료 시 상태 초기화 : time이 0이 되어 게임이 끝나쓸 때 게임 상태를 처음 상태로 되돌립니다.
시작 버튼의 활성화 : started 변수를 false로 바꿔서 버튼이 다시 작동하게 만듭니다.
UI 업데이트 : 시간과 점수를 초기값으로 되돌리고 두더지/폭탄이 모두 사라지게 합니다.
*/
