/* 정답과 비교
  1. 정답에서는 입력한 숫자들을 parseInt를 통해 문자를 숫자로 변환했으나
  저는 map(Number) 을 통해 변환했습니다.
  2. 공을 섞을때, 방식은 조금 다르나 둘다 나쁘지 않습니다.
  3. 순차적으로 진행하기위해 asyan await을 써준 것은 동일하지만,
  마지막에 내 번호와 비교하기 전 정답은 await setTimeoutPromist(1000); 
  저는 setTimeout(() => checkmyNumers(), 0);
  둘다 alert가 보너스 볼을 그리기 전에 뜨는게 문제이기 때문에 사용해도 좋을 듯 합니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const lottoInput = document.querySelector('.lotto input');
  const lottoButton = document.querySelector('.lotto button');
  const winningNumbersResult = document.querySelector('.winning_numbers');
  const bonumNumberResult = document.querySelector('.bonus_number');
  
  // 로또 번호 섞기
  let lottoBox = [];
  let shuffleBox = [];
  async function shuffleNumbers() {
    for(let i = 1; i < 46; i++) {
      lottoBox.push(i);
    }
    
    shuffleBox = [...lottoBox];
    for (let i = shuffleBox.length - 1; i > 0; i--) {
      // 0부터 i까지의 무작위 인덱스 j 선택
      const j = Math.floor(Math.random() * (i + 1)); 
      // 현재 요소(i)와 무작위 요소(j) 교환
      [shuffleBox[i], shuffleBox[j]] = [shuffleBox[j], shuffleBox[i]]; 
    }
    await pickingNumbers();
  }
  
  // 로또 번호 뽑기
  let winningNumbers = [];
  async function pickingNumbers (){
    let winningNumber;
    
    for (let i = 0; i < 7; i++) {
      // 1초 기다렸다가 다음 공 뽑기 **핵심 코드**
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      winningNumber = shuffleBox[Math.floor(Math.random() * shuffleBox.length)];
      winningNumbers.push(winningNumber);
      const ball = document.createElement('span');
      ball.textContent = winningNumber;
    
      if(i !== 6) {
        winningNumbersResult.appendChild(ball);
      } else {
        // 보너스볼
        bonumNumberResult.appendChild(ball);
      }
      
      shuffleBox.splice(shuffleBox.indexOf(winningNumber), 1);
    }
    
    setTimeout(() => checkmyNumers(), 0);
  }
  
  // 내 번호와 로또 당첨 번호 비교 
  let myNumbers;
  function checkmyNumers() {
    // 당첨번호 6개 있는지 확인
    let winningCount = 0;
    let winningBouns = 0;
    
    winningNumbers.forEach((value, index) => {
      if(myNumbers.indexOf(value) !== -1) {
        if (index !== 6) winningCount ++;
        else winningBouns++;
      }
    });
    
    // 당첨 결과 알려주기
    if(winningCount === 6) {
      alert('로또 1등 당첨!!!😍');
    } else if (winningCount === 5 && winningBouns === 1) {
      alert('로또 2등 당첨!!!');
    } else if (winningCount === 5) {
      alert('로또 3등 당첨!!!');
    } else if (winningCount === 4) {
      alert('로또 4등 당첨!!!');
    } else if (winningCount === 3) {
      alert('로또 5등 당첨!!!');
    } else {
      alert('아쉽게도 당첨되지 않았습니다🥹')
    }
  }
  
  // 로또 번호 입력하기
  lottoButton.addEventListener('click', async function () {
    myNumbers = lottoInput.value.split(',').map(Number);
    
    // 로또 번호 입력 유효성 검사
    if (lottoInput.value === '' || myNumbers.includes(NaN)) {
      alert('숫자를 입력해주세요.');
      lottoInput.focus();
    } else if (myNumbers.length < 6 || myNumbers.length > 6) {
      alert('6개의 숫자를 입려해주세요.');
      lottoInput.focus();
    } else if (new Set(myNumbers).size !== myNumbers.length) {
      alert('중복값이 존재합니다.');
      lottoInput.focus();
    } else if (myNumbers.some(val => val < 1 || val > 45)) {
      alert('1부터 45까지만 입력할 수 있습니다.');
      lottoInput.focus();
    } else {
      lottoButton.disabled = true;
      await shuffleNumbers();
    }
  });

});