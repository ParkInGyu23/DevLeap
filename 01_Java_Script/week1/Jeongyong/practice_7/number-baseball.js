// 숫자를 하나도 못 맞추는 경우 OUT을 출력합니다.
// 3OUT이 되는 경우 패배하게 됩니다.

const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

// 정답 생성
const answer = [];
function createAnswer() {
  answer.length = 0;
  while (answer.length < 4) {
    const num = Math.floor(Math.random() * 10);
    if (!answer.includes(num)) {
      answer.push(num);
    }
  }
  console.log('정답:', answer);
}
createAnswer();

let outs = 0;
let tries = 0;
const history = [];

function resetGame() {
  outs = 0;
  tries = 0;
  history.length = 0;
  $logs.innerHTML = '';
  $input.value = '';

  console.clear();
  const p = document.createElement('p');
  p.textContent = 'New Game';
  $logs.appendChild(p);

  createAnswer();
}

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = $input.value;
  // =============================
  // 입력값 검증
  // =============================
  if (value.length !== 4) {
    alert('4자리 숫자를 입력해주세요.');
    return;
  }
  if (!/^\d+$/.test(value)) {
    alert('숫자만 입력할 수 있습니다.');
    return;
  }
  if (new Set(value).size !== 4) {
    alert('중복된 숫자가 입력되었습니다.');
    return;
  }
  if (history.includes(value)) {
    alert('이미 시도한 숫자입니다.');
    return;
  }
  history.push(value);

  // 입력값 → 배열 변환
  const guess = [];
  for (let i = 0; i < value.length; i++) {
    guess.push(Number(value[i]));
  }

  let strike = 0;
  let ball = 0;

  // =============================
  // 스트라이크/볼 판정
  // =============================
  for (let i = 0; i < 4; i++) {
    if (guess[i] === answer[i]) {
      strike++;
    } else if (answer.includes(guess[i])) {
      ball++;
    }
  }
  // 시도 1 증가
  tries++;

  // =============================
  // OUT 처리 (0S 0B)
  // =============================
  if (strike === 0 && ball === 0) {
    outs++;

    const p = document.createElement('p');
    p.textContent = `${value} -> OUT !`;
    $logs.appendChild(p);
  } else {
    // S/B 출력
    const p = document.createElement('p');
    p.textContent = `${value} -> ${strike}S ${ball}B`;
    $logs.appendChild(p);
  }

  // 정답
  if (strike === 4) {
    alert('정답입니다! 게임 종료');
    resetGame();
    return;
  }

  // OUT 3번
  if (outs === 3) {
    alert('3 OUT! 패배입니다. 게임 종료');
    resetGame();
    return;
  }

  // 기회 소모
  if (tries === 10) {
    alert('10회 모두 사용! 패배입니다. 게임 종료');
    resetGame();
    return;
  }

  $input.value = '';
  return;
});
