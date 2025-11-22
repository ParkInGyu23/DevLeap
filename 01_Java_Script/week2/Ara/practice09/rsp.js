/* 정답과 비교
  1. 처음 컴퓨터의 이미지를 자동으로 바꿔줄때,
  정답에서는 이전의 이미지 값을 비교해 다음 이미지 값을 넣었으나 
  저는 검색을 통해 currentIndex = (currentIndex + 1) % 3 이라는 
  0,1,2 값을 무한으로 순환하는 계산 식을 넣었습니다.
  2. clickable은 문제에 없어서 답을 보고 추가했습니다.
  3. 가위바위보 결과를 비교할때 정답에서는 표를 만들어 값을 비교했으나
  저는 직접 if문을 통해 비교했습니다.
  표를 통해 비교하는 것은 다른 사람이 보기에 이해가 어려울 수 있습니다.
  4. 정답은 버튼을 누르면 일단 계산후에 재시작에 setTimeout을 걸어놨으나 
  저는 버튼으로 누르고 계산과 재시작 모두를 setTimeout에 걸어놨습니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const computer = document.querySelector('.computer');
  const rspButtons = document.querySelectorAll('.button');
  const scoreView = document.querySelector('.score');
  let score = 0;
  let clickable = true;
  
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
    } else if (
      (myValue === 'scissors' && computerValue === 'rock') ||
      (myValue === 'rock' && computerValue === 'paper') ||
      (myValue === 'paper' && computerValue === 'scissors')
    ) {
      score -= 1;
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
      
      setTimeout(() => {
        stopInterval(this.id);
        // 재시작
        startInterval();
      }, 1000);
    });
  });
  
});