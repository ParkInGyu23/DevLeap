/*
  내용 
  - html,css 내용은 책을 보고 그대로 작성하였습니다.
  나머지 내용은 게임의 설명만 읽고 
  코드는 제 방식으로 작성해 코드가 많이 다릅니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const $board = document.querySelector('.board');
  const $timer = document.querySelector('.timer');
  const $score = $board.querySelector('.score');
  const $startButton = $board.querySelector('.start');
  const $game = document.querySelector('.game');
  const $cells = $game.querySelectorAll('.cell');
  let score = 0;
  let timeLeft = 10;
  let neckCount = 3;
  let timeInterval = null;
  let roundLoop = null;

  let isStart = false;
  $startButton.addEventListener('click', function () {
    if(isStart) return; // 게임 진행중이면 클릭해도 소용 X
    
    isStart = true;
    StartGame();
  })
  
  function StartGame() {
    score = 0;
    $score.textContent = score;
    timeLeft = 10;
    $timer.textContent = timeLeft;
    
    startTimer(); // 타이머 시작 함수
    generateRound(); // 두더지, 폭탄 나타나는 함수
    scheduleNextRound(); // 무한반복 함수
  }
  
  // 타이머 시작
  function startTimer() {
    timeInterval = setInterval(() => {
      timeLeft--;
      $timer.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }
  
  function endGame() {
    isStart = false;

    clearInterval(timeInterval);
    clearInterval(roundLoop);

    // 모든 appear/disappear 타이머 제거
    for (let key in timers) {
      clearTimeout(timers[key]);
    }

    // 화면 초기화
    $cells.forEach(cell => {
      cell.classList.remove('active');
      cell.querySelector('.gopher').classList.add('hidden');
      cell.querySelector('.bomb').classList.add('hidden');
    });

    alert("⏰ 게임 종료! 점수: " + score);
  }
  
  // 무한 반복
  function scheduleNextRound() {
    generateRound();
    roundLoop = setTimeout(() => {
      scheduleNextRound();
    }, 2000);
  }
  
  const HOLECOUNT = $cells.length;
  const gopherPercent = 0.3;
  const bombPercent = 0.5;
  
  // 구멍에서 보여주기
  function generateRound() {
    $cells.forEach((value, index) => {
      const random = Math.random();
      if(random < gopherPercent) {
        appear(index, 'gopher');
      } else if(random < bombPercent) {
        appear(index, 'bomb');
      } 
    });
  }
  
  const timers = {};
  function appear(index, target) {
      const spot = $cells[index];
      
      // 이전에 클릭했던 이미지가 돌아오지 않는 경우가 있어서 한번 더 확실하게 초기화
      spot.classList.remove('active');
      spot.querySelector('.gopher').classList.add('hidden');
      spot.querySelector('.bomb').classList.add('hidden');
      
      clearTimeout(timers["appear" + index]);
      clearTimeout(timers["disappear" + index]);
  
      timers["appear" + index] = setTimeout(() => {
        spot.classList.add('active');
        spot.querySelector('.' + target).classList.remove('hidden');
        disappear(index, target);
      }, 1000);
    }
    
    function disappear(index, target) {
      const spot = $cells[index];
      timers["disappear" + index] = setTimeout(() => {
        spot.classList.remove('active');
        spot.querySelector('.' + target).classList.add('hidden');
      }, 1000);
    }
  
  // 클릭 시 
  $cells.forEach((cell, index) => {
    let clickable = true;
    cell.addEventListener('click', function () {
      if(!clickable) return;
      if (!cell.classList.contains('active')) return;
      
      clickable = false;
      
      const gopher = cell.querySelector('.gopher');
      const bomb   = cell.querySelector('.bomb');
    
      if (gopher && !gopher.classList.contains('hidden')) {
        score++;
        $score.textContent = score;
        gopher.classList.add('dead');
        gopher.classList.add('hidden');
      }
      if (bomb && !bomb.classList.contains('hidden')) {
        neckCount--;
        if(neckCount === 0) endGame();
        bomb.classList.add('boom');
        bomb.classList.add('hidden');
      }

      clearTimeout(timers["appear" + index]);
      clearTimeout(timers["disappear" + index]);
      
      setTimeout(() => {
        cell.classList.remove('active');
        clickable = true;
    
        // 내려간 후에 이미지 바꿀 수 있도록 settimeout
        if (gopher.classList.contains('dead')) {
          gopher.classList.remove('dead');
        }
        if (bomb.classList.contains('boom')) {
          bomb.classList.remove('boom');
        }
      }, 500); 
    });
  });
  
});