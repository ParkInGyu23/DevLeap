/* 정답과 비교
  1. 기존에 참가자를 입력하지 않는 경우를 추가해줬기 때문에 별도의 작업은 하지 않았습니다.
  2. 기존 코드에서 사이에 else if 문으로 3글자가 아닐때 한번 더 거르는 코드 추가했습니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const orderInput = document.querySelector('.order span');
  const wordText = document.querySelector('.word span');
  const inputWrap = document.querySelector('.input_wrap');
  const userInput = inputWrap.querySelector('input');
  const userButton = inputWrap.querySelector('button');
  
  // 참가자 수 
  let number = Number(prompt('참가자는 몇 명인가요?'));
  
  // 참가자수 제대로 입력 안했을 때
  while(isNaN(number) || number === 0) {    
    number = Number(prompt('참가자수를 입력해주세요.'));
  }
  
  // 제시어 목록이 없어서 인터넷에서 하나 가져와서 생성
  const wordList = [
      "기차", "차고", "고양이", "이빨", "빨래", "래디오", "오리", "리본",
      "본문", "문장", "장소", "소리", "리마", "마차", "차도", "도토리",
      "리듬", "듬뿍", "뿍스", 
      "스키", "기러기", "기린", "린스", "스케치", "치약", "약속", "속도",
      "도시", "시계", "계단", "단어", "어휘", "희망", "망치", "치즈",
      "즈크", "크기", "기분", "분수", "수박", "박수"
  ];

  // 내가 몇번째 참가자인지 
  let order = Math.floor(Math.random() * (number - 1 + 1)) + 1;
  orderInput.textContent = order;
  
  // 만약 첫번째 순서가 아니면 무작위 제시어 생성
  let word;
  if(order !== 1) {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordText.textContent = word;
  }
  
  // 입력 버튼을 눌렀을 때
  function checkWordInput(inputValue) {
    if(inputValue === '') {
        alert('단어를 입력해주세요.');
        userInput.focus();
    } else if (inputValue.length !== 3) {
        alert('단어의 글자수는 3글자입니다.');
        userInput.focus();
    } else {
      if(order === 1) {
        // 만약 내가 첫번째 참가자이면 제시어 생성
        word = inputValue;
        wordText.textContent = word;
        order ++;
        orderInput.textContent = order;
        alert('제시어를 입력했습니다 😀');
      } else {
        // 아니면 제시어의 끝글자와 입력의 첫글자 비교
        if (word.slice(word.length -1, word.length) !== inputValue.slice(0, 1)) {
          alert('틀렸습니다 🤩');
        } else {
          word = inputValue;
          wordText.textContent = word;
          alert('통과입니다 🥳');
          if (order + 1 > number) order = 1;
          else order ++;
          orderInput.textContent = order;
        }
      }
      userInput.value = '';
      userInput.focus();
    }
  }
  
  userButton.addEventListener('click', function () {
    checkWordInput(userInput.value);
  });
  
});