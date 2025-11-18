document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('.bullsandcows .input');
  const button = document.querySelector('.bullsandcows .button');
  const result = document.querySelector('.result_wrap');
  
  // 랜덤 4자리의 정답 만들기 (중복X)
  let correct = '';
  let random = '';  
  const numbers = [];
  for(let n = 1; n <= 9; n++) {
    numbers.push(n);
  }
  
  for(let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * 10);
    correct += random;
    numbers.splice(random, 1);
  }

  let strike = 0;
  let ball = 0;
  let opportunity = 10;
  let outCount = 0;
  let tries = [];
  
  button.addEventListener('click', () => {
    let inputValue = input.value;
    if(inputValue === '') {
      alert('값을 입력해주세요.');
      input.focus();
    } else if(inputValue.length !== 4) {
      alert('4자리를 입력해주세요.');
      input.focus();
      input.value = '';
    } else if (isNaN(inputValue)) {
      alert('숫자를 입력해주세요.');
      input.focus();
      input.value = '';
    } else if(inputValue.length !== new Set(inputValue).size) {
      alert('중복값 없이 입력해주세요.');
      input.focus();
      input.value = '';
    } else if (tries.indexOf(inputValue) !== -1) {
      alert('이미 시도한 값입니다.');
      input.focus();
      input.value = '';
    } else {
      opportunity --;
      tries.push(inputValue);

      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
          if(correct.slice(j, j+1).indexOf(inputValue.slice(i, i+1)) !== -1) {
            // 값이 맞을때
            if(i === j) {
              // 같은 자리 : 스트라이크, 볼
              strike++;
              ball++;
            } else {
              // 다른 자리 : 볼
              ball++;
            }
          } 
        }
      }
      
      // 결과
      if(strike === 4 && ball === 4) {
        // 홈런
        let resultElement = document.createElement('div');
        resultElement.textContent = '홈런!'
        result.prepend(resultElement);
        button.disabled = true;
      } else {
        // 홈런 아닐때
        let resultElement = document.createElement('div');
        resultElement.textContent = inputValue + ': ' + strike + ' 스트라이크 ' + ball + ' 볼'
        result.prepend(resultElement);
        
        if (strike == 0 && ball === 0) {
          outCount++;
          if(outCount == 3) {
            let resultElement = document.createElement('div');
            resultElement.textContent = '3아웃 패배! 정답은 ' + correct;
            result.prepend(resultElement);
            button.disabled = true;
          }
        }
        
        if(opportunity === 0) {
          let resultElement = document.createElement('div');
          resultElement.textContent = '패배! 정답은 ' + correct;
          result.prepend(resultElement);
          button.disabled = true;
        }
      }
      input.value = '';
      input.focus();
      strike = 0;
      ball = 0;
    }
  });
});
