// 버튼 태그들은 forEach를 사용해서 간결하게 만들어줬습니다.
// 연속 계산 가능합니다. ex) 2 + 5 + 8 - 3
// 숫자 입력 후 연산자를 잘못 입력했어도 다른 연산자로 변경 가능합니다.

// ============================
//      상태 변수 선언
// ============================
// 첫 번째 숫자, 두 번째 숫자, 연산자를 저장할 변수들
let firstNumber = '';
let secondNumber = '';
let operator = '';

// ============================
//      DOM 요소 선택
// ============================
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const calculate = document.querySelector('#calculate');
const clear = document.querySelector('#clear');

// 숫자 버튼 (id가 num- 으로 시작하는 버튼들)
const numberButtons = document.querySelectorAll('[id^="num-"]');

// ============================
//      숫자 버튼 클릭 이벤트
// ============================
// 연산자 선택 전 → firstNumber
// 연산자 선택 후 → secondNumber
numberButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.textContent;

    // 연산자가 선택되지 않은 경우 → 첫 번째 숫자 입력
    if (!operator) {
      firstNumber += value;
      $result.value = firstNumber;

      // 연산자가 선택된 후 → 두 번째 숫자 입력
    } else {
      secondNumber += value;
      $result.value = secondNumber;
    }
  });
});

// ============================
//      연산자 버튼 로직
// ============================
function clickOperator(op) {
  // 첫 번째 숫자가 없으면 연산자 선택 불가
  if (!firstNumber) {
    return;
    // 아직 연산자가 지정되지 않은 경우 → 연산자 설정
  } else if (!operator) {
    operator = op;
    $operator.value = operator;
    return;
    // 연산자를 이미 눌렀지만 두 번째 숫자는 아직 없음 → 연산자 변경만 허용
  } else if (!secondNumber) {
    operator = op;
    $operator.value = operator;
    return;
    // 첫 숫자 + 연산자 + 두 번째 숫자 모두 있는 경우 → 즉시 계산(연속 계산)
  } else {
    let result;
    switch (operator) {
      case '+':
        result = Number(firstNumber) + Number(secondNumber);
        break;
      case '-':
        result = Number(firstNumber) - Number(secondNumber);
        break;
      case '*':
        result = Number(firstNumber) * Number(secondNumber);
        break;
      case '/':
        result = Number(firstNumber) / Number(secondNumber);
        break;
    }

    // 계산 결과를 첫 번째 숫자로 저장 → 다음 연속 계산 가능
    firstNumber = result;
    secondNumber = '';
    $result.value = result;

    // 선택한 새 연산자로 교체
    operator = op;
    $operator.value = operator;
  }
}

// 각 연산자 버튼에 클릭 이벤트 연결
plus.addEventListener('click', () => clickOperator('+'));
minus.addEventListener('click', () => clickOperator('-'));
multiply.addEventListener('click', () => clickOperator('*'));
divide.addEventListener('click', () => clickOperator('/'));

// ============================
//      계산 (=) 버튼 로직
// ============================
function clickCalculate() {
  // 두 숫자와 연산자가 모두 있어야 계산 가능
  if (!firstNumber || !operator || !secondNumber) {
    return;
  } else {
    let result;
    switch (operator) {
      case '+':
        result = Number(firstNumber) + Number(secondNumber);
        break;
      case '-':
        result = Number(firstNumber) - Number(secondNumber);
        break;
      case '*':
        result = Number(firstNumber) * Number(secondNumber);
        break;
      case '/':
        result = Number(firstNumber) / Number(secondNumber);
        break;
    }

    // 결과를 화면에 표시
    $result.value = result;
    // 계산기 상태 초기화 + 결과는 firstNumber에 저장하여 연속 계산 허용
    firstNumber = result;
    secondNumber = '';
    operator = '';
    $operator.value = '';
  }
}

calculate.addEventListener('click', clickCalculate);

// ============================
//      C (초기화) 버튼
// ============================
function clickClear() {
  // 모든 내부 상태 초기화
  firstNumber = '';
  secondNumber = '';
  operator = '';
  // 화면도 초기화
  $result.value = '';
  $operator.value = '';
}

clear.addEventListener('click', clickClear);
