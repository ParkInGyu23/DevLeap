let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');
const onClickNumber = (event) => {
    if (!operator) { //비어있지 않다
        numOne += event.target.textContent;
        $result.value = + event.target.textContent;
        return;
    }
    //이하 코드는 operator에 값이 저장되어 있는 경우에만 실행됨
    if (!numTwo) {
        $result.value = '';
    }
    numTwo += event.target.textContent;
    $result.value = + event.target.textContent;
}; 
// 고차함수 (high order function)
// const a 
document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);
const onClickOperator = (op) => () => {
    if (numOne) {
        operator = op;
        $operator.value = op; // 화면에 연산자 표시
    } else {
        alert('숫자를 먼저 입력하세요.');
    }
};
document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#calculate').addEventListener('click', () => {
    if(numTwo) {
        switch (operator) {
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                break;
            case '-':
                $result.value = parseInt(numOne) - parseInt(numTwo);
                break;
            case '*':
                $result.value = parseInt(numOne) * parseInt(numTwo);
                break;
            case '/':
                $result.value = parseInt(numOne) / parseInt(numTwo);
                break;
            default:
                break;
        }
    } else {
        alert('숫자를 먼저 입력하세요.');
    }
});
document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator.value = '';
    $result.value = '';
});