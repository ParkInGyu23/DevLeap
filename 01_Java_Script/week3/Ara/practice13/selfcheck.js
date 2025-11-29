/* 정답과 비교
  1. 저는 setTimeout 함수 대신에, 시작할때 new Date 끝날때 new Date 추가해서 시간 계산해주었습니다.
  2. 입력받은 숫자의 절반만큼 컬러를 자른 배열을 두번 반복해 컬러를 넣어주었습니다.
*/
document.addEventListener('DOMContentLoaded', function() {
  const $concentration = document.querySelector('.concentration');
  
  // 카드 12장 생성 
  let total = 0;
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple', 'white', 'brown', 'gray'];
  let correctNum = 0;
  let firstClick = false;
  let startTime;
  let endTime;
  
  function settingGame() {
    total = Number(prompt('카드의 수는 몇장으로 할까요?'));
    
    // 숫자가 아니거나 0이거나 짝수가 아닐 때 계속 prompt 반복
    while(isNaN(total) || total === 0 || total > 20 || total % 2 !== 0) {
      total = Number(prompt('다시 입력해주세요. (2부터 20까지 숫자 + 짝수만 입력 가능)'));
    }
  
    newGame();
  }
  settingGame();
  
  function newGame() {
    // 초기화
    const cardList = [];
    correctNum = 0;
    $concentration.innerHTML = '';
    const copyColor = [...colors].slice(0,  total / 2); 
    const copyColors = [...copyColor, ...copyColor];
    
    for(let i = 0; i < total; i++) {
      const newElement = document.createElement('div');
      newElement.classList.add('card');
      // 랜덤으로 색 뽑기
      const index = Math.floor(Math.random() * copyColors.length);
      newElement.classList.add(copyColors[index]);
      console.log(copyColors[index])
      const elementInner = document.createElement('div');
      elementInner.classList.add('card_inner');
      const elementFront = document.createElement('div');
      elementFront.classList.add('card_front');
      elementFront.style.backgroundColor = (copyColors[index]);
      copyColors.splice(index, 1);
      const elementBack = document.createElement('div');
      elementBack.classList.add('card_back');
      elementInner.append(elementFront);
      elementInner.append(elementBack);
      newElement.append(elementInner);
      cardList.push(newElement)
    }
    
    shuffleCard(cardList);
  }
  
  // 카드 섞어서 화면에 출력
  function shuffleCard(cardList) {
    // 로또에서 쓰던 셔플 가져옴 
    for (let i = cardList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [cardList[i], cardList[j]] = [cardList[j], cardList[i]]; 
    }
    
    cardList.forEach(function(card) {
      $concentration.append(card);
    });
    
    
    showCard(cardList);
  }
  
  // 카드 앞면 보여줬다가 다시 뒤집기
  function showCard(cardList) {
    setTimeout(() => {
      cardList.forEach(function(card) {
        card.classList.add('flipped');
      })
      flipCard(cardList);
    }, 1000);
  }
  
  function flipCard(cardList) {
    setTimeout(() => {
      cardList.forEach(function(card) {
        card.classList.remove('flipped');
      })
      setCard();
    }, 3000);
  }
  
  let index = 0;
  let beforeCard = '';
  let beforeCardColor = '';
  function handleTask(step, target) {
    return new Promise(resolve => {
      setTimeout(() => {
        if(step === 1) {
          target.classList.add('flipped');
        } else if(step === 2) {
          index = target.className.indexOf(' ');
          if(beforeCard === '') {
            beforeCard = target;
            beforeCardColor = beforeCard.className.slice(index+1); 
          } else {
            if(beforeCardColor === target.className.slice(index+1)) {
              // 짝이 맞을 경우
              beforeCard.classList.add('correct');
              target.classList.add('correct');
              correctNum += 2;
            } else {
              // 안맞을 경우
              beforeCard.classList.remove('flipped');
              target.classList.remove('flipped');
            }
            index = 0;
            beforeCard = '';
            beforeCard = '';
          }
        }
        resolve();
      }, 500);
    });
  }
 
  // 카드 짝맞추기
  function setCard() {
    const cardList = document.querySelectorAll('.card');
     
    cardList.forEach(function(card) {
      card.addEventListener('click', (e) => {
        if(!firstClick) {
          startTime = new Date();
          firstClick = true;
        }
        const target = e.target.closest('.card');
        
        if (target.classList.contains('correct')) return;
        if (target.classList.contains('flipped')) return;
        
        // 프라미스 체이닝을 이용한 순차 실행
        handleTask(1, target)
        .then(() => {
          return handleTask(2, target);
        })
        .then(() => {
          if(correctNum === total) {
            endTime = new Date();
            const duration = endTime - startTime;
            const seconds = Math.floor((duration / 1000) % 60); 
            const minutes = Math.floor((duration / (1000 * 60)) % 60); 
            const hours = Math.floor(duration / (1000 * 60 * 60));
            alert(`짝을 다 맞추는데 ${hours}시간 ${minutes}분 ${seconds}초 걸리셨네요!! 🫢`);
            newGame();
          } 
        });
      });
    });
  }
  
  
});