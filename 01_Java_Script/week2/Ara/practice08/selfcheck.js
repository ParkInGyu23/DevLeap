/* 정답과 비교
  1. 정답에서는 처음 버튼을 눌렀을때 결과 값을 비워주지만 
  저는 만약 재추첨의 경우 이전 결과를 비워주는 lottoReset 함수를 만들었습니다.
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
    let backgroundColor;
    let fontColor;
    
    for (let i = 0; i < 7; i++) {
      // 1초 기다렸다가 다음 공 뽑기 **핵심 코드**
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      winningNumber = shuffleBox[Math.floor(Math.random() * shuffleBox.length)];
      
      // 숫자에 따라 컬러 다르게 
      if (winningNumber < 10) {
        backgroundColor = 'red';
        fontColor = 'white';
      } else if (winningNumber < 20) {
        backgroundColor = 'orange';
        fontColor = 'black';
      } else if (winningNumber < 30) {
        backgroundColor = 'blue';
        fontColor = 'white';
      } else {
        backgroundColor = 'green';
        fontColor = 'white';
      }
      winningNumbers.push(winningNumber);
      const ball = document.createElement('span');
      ball.style.backgroundColor = backgroundColor;
      ball.style.color = fontColor;
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
    
    lottoButton.disabled = false;
  }
  
  // 로또 리셋
  function lottoReset() {
    winningNumbers = [];
    const winningElement = winningNumbersResult.querySelectorAll('span'); 
    winningElement.forEach(element => {
        element.remove(); 
    });
    const targetElement = bonumNumberResult.querySelectorAll('span');
    targetElement.forEach(element => {
        element.remove(); 
    });
  }
  
  // 로또 번호 입력하기
  lottoButton.addEventListener('click', async function () {
    myNumbers = lottoInput.value.split(',').map(Number);
    
    // 다시 로또 추첨하는 경우
    if (winningNumbers.length > 1) lottoReset();
    
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