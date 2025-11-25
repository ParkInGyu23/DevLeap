// =================
//  DOM 요소 선택
// =================
const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const $result = document.querySelector('#result');
const $restart = document.querySelector('#restart');

// ===============================
//  이미지 및 위치 데이터 설정
// ===============================
const IMG_URL = './rsp.png'
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
};

// ===============================
//  컴퓨터 손 애니메이션 (자동 변경)
// ===============================
let computerChoice = 'scissors';
const changeComputerHand = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock';
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
}

let intervalId = setInterval(changeComputerHand, 50);


// ===============================
// 가위바위보 규칙 설정
// ===============================
const scoreTable = {
  scissors: 1,
  rock: 0,
  paper: -1,
};

// ===============================
// 게임 상태 변수
// ===============================
let userScore = 0;
let computerScore = 0;
let isPlaying = true;
let clickable = true;


// ===============================
// 메인 게임 함수
// ===============================
function rspGamePlay(userChoice) {
  if (!isPlaying || !clickable) return;

  clickable = false;
  $result.textContent = '';
  clearInterval(intervalId);

  const diff = scoreTable[userChoice] - scoreTable[computerChoice];
  let result;


  // diff 값으로 승패 판정
  // diff === 0 -> 비김 / diff === -1, 2 -> 이김 / 나머지 -> 짐
  if (diff === 0) {
    result = 'draw';
    $result.textContent = '비겼습니다.'
  } else if ([-1, 2].includes(diff)) {
      result = 'win';
      $result.textContent = '이겼습니다.'
    } else {
      result = 'lose';
      $result.textContent = '졌습니다.'
    }

  if (result === 'win') userScore++;
  else if (result === 'lose') computerScore++;

  $score.textContent = `Player ${userScore} : ${computerScore} Computer`;

  // ===============================
  //  게임 종료 조건
  // ===============================
  if (userScore === 3 || computerScore === 3) {
    const winner = userScore === 3 ? 'Player Win' : 'Computer Win';
    alert(winner);
    clearInterval(intervalId)
    isPlaying = false;
    clickable = true;
    $restart.style.display = 'inline-block';
    return;
  } else {
    setTimeout(() => {
      intervalId = setInterval(changeComputerHand, 50);
      clickable = true;
    }, 1000);
  }
}

[$scissors, $rock, $paper].forEach(($btn) => {
  $btn.addEventListener('click', () => rspGamePlay($btn.id));
});

// ===============================
// 다시 시작 버튼 기능
// ===============================
function restartGame() {
  userScore = 0;
  computerScore = 0;
  isPlaying = true;
  $score.textContent = 'Player 0 : 0 Computer';
  $result.textContent = '';
  $restart.style.display = 'none';
  clearInterval(intervalId);
  intervalId = setInterval(changeComputerHand, 50);
}

$restart.addEventListener('click', restartGame);

