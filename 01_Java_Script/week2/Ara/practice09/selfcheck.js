/* 정답과 비교
  1. 이전 정답을 참고하여 setTimeout에 재시작을 걸어놓고 
  그 이전에 점수를 비교하는 코드를 추가해놓았습니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const computer = document.querySelector('.computer');
  const rspButtons = document.querySelectorAll('.button');
  const scoreView = document.querySelector('.score');
  let score = 0;
  let clickable = true;
  let gamesPlayed = 0;
  let mySum = 0;
  let computerSum = 0;
  
  // 컴퓨터 가위바위보 이미지 스프라이트 X 좌표
  const imagePositionX = ['0', '-220px', '-440px'];
  const rspValue = ['scissors', 'rock', 'paper'];
  
  // 컴퓨터 가위바위보 자동으로 이미지 바꾸기
  let computerInterval;
  let currentIndex = 0;
  function startInterval() {
    clickable = true;
    computerInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % 3;
        computer.style.backgroundPositionX = imagePositionX[currentIndex];
    }, 50);
    
  }
  
  startInterval();
  
  // 버튼을 클릭하면 이미지 회전이 멈추게
  function stopInterval(myValue) {
    // 이겼는지 졌는지 계산
    // 1. 컴퓨터는 뭘 냈는지 확인
    const computerValue = rspValue[currentIndex];
    // 2. 내가 낸 것과 비교
    if (
      (myValue === 'scissors' && computerValue === 'paper') ||
      (myValue === 'rock' && computerValue === 'scissors') ||
      (myValue === 'paper' && computerValue === 'rock')
    ) { 
      score += 1; 
      gamesPlayed++;
      mySum ++;
    } else if (
      (myValue === 'scissors' && computerValue === 'rock') ||
      (myValue === 'rock' && computerValue === 'paper') ||
      (myValue === 'paper' && computerValue === 'scissors')
    ) {
      score -= 1;
      gamesPlayed++;
      computerSum ++;
    } else {
      score += 0;
    }
    
    scoreView.innerHTML = score;
  }
  
  rspButtons.forEach(rspButton => {
    rspButton.addEventListener('click', function() {
      // 이미 계산중일때는 클릭해도 반영 안되게 
      
      if (!clickable) return;
      
      // 멈츰
      clearInterval(computerInterval);
      clickable = false;
      // 계산
      stopInterval(this.id);
      
       // 사용자나 컴퓨터가 3판 이기면 게임 종료
      if (mySum === 3 || computerSum === 3) {
          if(mySum === 3) alert('사용자가 게임을 이겼습니다!! 😍')
          else alert('컴퓨터가 게임을 이겼습니다 ㅠㅠ 🥹');
      } else {
        setTimeout(() => {
          // 재시작
          startInterval();
        }, 1000);
      }
    });
  });
  
});