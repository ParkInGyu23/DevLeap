/* 정답과 비교
  1. 정답과 카드 생성, 셔플, 카드 비교까지는 비슷하지만 
  저는 setTimeout 대신에 순차적으로 진행하기 위해 promise 를 사용했습니다.
  그래서 카드가 빠르게 뒤집히지 않고 alert 가 먼저 뜨는 일은 발생하지 않았습니다.
  2. 버그 해결하기 부분에서는 
  3번 한 카드를 두번 연이어 클릭할때 발생하는 버그 이외에는 다른 버그가 없었습니다.
  그래서 같은 카드를 두번 클릭할때 발생하는 버그는 
  flipped 클래스 여부를 확인하는 if문을 추가하였습니다.
*/
document.addEventListener('DOMContentLoaded', function() {
  const $concentration = document.querySelector('.concentration');
  
  // 카드 12장 생성 
  const total = 12;
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink'];
  let correctNum = 0;
  
  function newGame() {
    // 초기화
    const copyColors = [...colors, ...colors];
    const cardList = [];
    correctNum = 0;
    $concentration.innerHTML = '';
    for(let i = 0; i < total; i++) {
      const newElement = document.createElement('div');
      newElement.classList.add('card');
      // 랜덤으로 색 뽑기
      const index = Math.floor(Math.random() * copyColors.length);
      newElement.classList.add(copyColors[index]);
      const elementInner = document.createElement('div');
      elementInner.classList.add('card_inner');
      const elementFront = document.createElement('div');
      elementFront.classList.add('card_front');
      elementFront.style.backgroundColor = (copyColors[index])
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
  
  newGame();
  
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
        const target = e.target.closest('.card');
        
        if (target.classList.contains('correct')) return;
        if (target.classList.contains('flipped')) return;
        
        // 프라미스 체이닝을 이용한 순차 실행
        handleTask(1, target)
        .then(() => {
          return handleTask(2, target);
        })
        .then(() => {
          if(correctNum === 12) {
            alert('다 맞추셨네요!! 🫢');
            newGame();
          } 
        });
      });
    });
  }
  
  
});