/* 정답과 다른점
  1. 저는 addEventListener click 이벤트를 여러번 해주기보다는 
  forEach 문을 사용해 코드를 간소화했습니다.
  2. 숫자와 기호 입력시 각각 이벤트를 만들어줬다면 
  저는 버튼 전체 클릭 이벤트 안에서 if else 문으로 나눠줬습니다. 
  하지만, 가독성에는 각각 사용하는 것이 더 좋을 듯합니다.
  3. 정답에서는 textContent로 값을 버튼의 값을 가져왔지만 
  html 에서 data-value 값을 주어 가져왔습니다.
  4. 저는 우리가 보통 사용하는 계산기처럼 
  numOne에 숫자를 입력하지 않고 기호를 먼저 누르더라도,
  numTwo에 숫자를 입력하지 않고 계산을 하더라도 값이 나오도록 만들었습니다.
  
  정답을 보고 수정한 부분 
  1. 처음에 정답을 보기전 계산과정을 eval() 함수 사용으로 간소화하였으나, 
  정답을 확인해보니 보안상 eval 함수 사용은 좋지 않다고 하여 수정하였습니다.
  2. 기호 계산시에 전부 parseInt 를 해줬으나 
  + 를 제외하고는 예상치 못한 NaN 값 반환으로 인해 
  사용하면 안된다는 것읋 확인하고 수정하였습니다.
*/
  
document.addEventListener('DOMContentLoaded', function() {
  // 버튼 클릭 시 이벤트
  const buttons = document.querySelectorAll('.calculator button');
  const valueInput = document.querySelector('input.number');
  const operatorInput = document.querySelector('input.operator');
  let numOne = '';
  let operator = '';
  let numTwo = '';
  
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
            
            // 처음에 책을 보지 않고 만든 코드 ; eval() 함수는 보안상 위험할 수 있으므로 사용X
            // numOne = eval(numOne + operator + numTwo);
            
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
        } else {
          // 그 외의 나머지 기호를 입력했을 경우
          if(numOne === '') {
            // 기호부터 입력했을 경우
            numOne = '0';
          }
          operator = button.dataset.value;
          operatorInput.value = operator;
        }
      }
    });
  });  
});