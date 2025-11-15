/* 정답과 다른점
  1. 정답 숫자뽑기
  정답은 배열에 숫자를 넣어놓고 숫자를 하나 뽑은 다음 
  중복되지 않게 배열에서 숫자를 제거하고 다음 숫자를 뽑았습니다.
  하지만 저는 while 반복문을 통해 숫자가 중복되면 뽑기를 다시했습니다.
  코드의 간결성을 생각한다면 정답의 방식으로 해야합니다.
  2. 일치하는 값을 검사할때 
  정답은 for문을 4번 돌리며 결과값에 값이 있는지 없는지 판단 후 
  볼과 스트라이크를 찾았으나,
  저는 이중 for문을 돌려 찾았습니다. 
  또다른 정답에 forEach 문과 같은 경우 입니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('.bullsandcows .input');
  const button = document.querySelector('.bullsandcows .button');
  const result = document.querySelector('.result_wrap');
  
  // 랜덤 4자리의 정답 만들기 (중복X)
  let correct = '';
  let random = '';  
  let count = 0;
  
  while (true) {
    random = Math.floor(Math.random() * 10); 
    if(correct === '') {
      correct += random; 
      count ++;
    }
    else {
      if (correct.indexOf(random) === -1) {
        correct += random; 
        count ++;
        if (count == 4) break;
      }
    }
  }
  
  let strike = 0;
  let ball = 0;
  let opportunity = 10;
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
