document.addEventListener('DOMContentLoaded', function() {
  // 버튼 클릭 시 이벤트
  const buttons = document.querySelectorAll('.calculator button');
  const valueInput = document.querySelector('input.number');
  const operatorInput = document.querySelector('input.operator');
  let numOne = '';
  let operator = '';
  let numTwo = '';
  
  // 계산해주는 함수
  function calculate(operator) {
    switch (operator) {
      case ('+') :
        numOne = parseInt(numOne) + parseInt(numTwo);
        break;
      case ('-') :
        numOne = numOne - numTwo;
        break;
      case ('*') :
        numOne = numOne * numTwo;
        break;
      case ('/') :
        numOne = numOne / numTwo;
        break;
      default :
        break;
    }
    valueInput.value = numOne;
    operatorInput.value = '=';
    numTwo = '';
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.classList.contains('number')) {
        // 숫자일때
        if(operator === '') {
          // 기호 입력 전
          numOne += button.dataset.value;
          valueInput.value = numOne;
        } else {
          // 기호 입력 후
          numTwo += button.dataset.value;
          valueInput.value = numTwo;
        }
      } else {
        // 기호일때
        if (button.dataset.value === 'C') {
          // 취소 입력했을 경우
          valueInput.value = '';
          operatorInput.value = '';
          numOne = '';
          operator = '';
          numTwo = '';
        } else if (button.dataset.value === '=') {
          // = 을 입력했을 경우
          if(numTwo === '') {
            // 기호 이후 입력 없이 = 버튼을 클릭했을 경우
            valueInput.value = numOne;
            operatorInput.value = '=';
            operator = '';
            numTwo = numOne;
          } else {
            // 계산 
            calculate(operator);
          }
        } else {
          // 그 외의 나머지 기호를 입력했을 경우
          if(numOne === '') {
            // 기호부터 입력했을 경우
            numOne = '0';
          } else if (operator !== '') {
            // = 입력 전 다른 기호 입력 시
            calculate(operator);
          }
          operator = button.dataset.value;
          operatorInput.value = operator;
        }
      }
    });
  });  
});