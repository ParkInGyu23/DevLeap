const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = 'rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

/* 
// 이 변수들은 모두 X 좌표라는 공통점이 있다.
// 따라서 객체로 묶을 수 있다.
// 나중에 점수 계산시 객체로 묶은 것이 빛을 발한다.
const scissorsX = '0'; // 가위
const rockX = '-220px'; // 바위
const paperX = '-440px'; // 보
*/

const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
};

// 0.05(50밀리초)마다 이미지를 바꿔보자
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
};

// 50밀리초(1초에 20번)마다 가위, 바위, 보 이미지가 바뀐다.
// setInterval(changeComputerHand, 50);

// 타이머 멈췄다 다시 실행하기
let intervalId = setInterval(changeComputerHand, 50);
const scoreTable = {
  scissors: 1,
  rock: 0,
  paper: -1,
};
let clickable = true;
let score = 0;
const clickButton = (event) => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    const myChoice =
      event.target.textContent === '바위'
        ? 'rock'
        : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';

    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;

    let message;
    if ([2, -1].includes(diff)) {
      score += 1;
      message = '승리';
    } else if ([-2, 1].includes(diff)) {
      score -= 1;
      message = '패배';
    } else {
      message = '무승부';
    }
    $score.textContent = `${message} 총: ${score}점`;

    // 점수 계단 및 화면 표시
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};
$rock.addEventListener('click, clickButton');
$scissors.addEventListener('click, clickButton');
$paper.addEventListener('click, clickButton');
