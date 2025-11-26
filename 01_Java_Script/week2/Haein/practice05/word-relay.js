document.addEventListener('DOMContentLoaded', () => {

const number = Number(prompt('참가자는 몇 명인가요?'));
const $input = document.querySelector('input'); // input 태그 선택
const $button = document.querySelector('button'); // button 태그 선택
const $word = document.querySelector('#word');
const $order = document.querySelector('#order'); 
let word; // 제시어
let newWord; // 현재 단어
const onInput = (event) => {
    newWord = event.target.value; // 입력한 단어를 현재 단어로 저장
};
const onClickButton = () => {
    if(!word) { // 제시어가 비어 있는가?
        // 비어 있음
        word = newWord; // 입력한 단어가 제시어가 됨
        $word.textContent = word; // 화면에 제시어 표시
        const order = Number($order.textContent);
        if(order + 1 > number) {
            $order.textContent = 1;
        } else {
            $order.textContent = order + 1;
        }
        $input.value = ''; // 입력창을 비움
        $input.focus(); // 커서를 위치시킴
    } else {
        // 비어 있지 않음
        if(word.at(-1) === newWord[0]) { // 제시어에 맞는 단어인가?
            // 맞는 단어
            word = newWord; // 현재 단어를 제시어에 저장
            $word.textContent = word; // 화면에 제시어 표시
            const order = Number($order.textContent);
            if(order + 1 > number) {
                $order.textContent = 1;
            } else {
                $order.textContent = order + 1;
            }
            $input.value = ''; // 입력창을 비움
            $input.focus(); // 커서를 위치시킴
        } else { // 틀린 단어
            alert('틀린 단어입니다!');
            $input.value = ''; // 입력창을 비움
            $input.focus(); // 커서를 위치시킴

        }
    }
};
$input.addEventListener('input', onInput); // input 이벤트 연결
$button.addEventListener('click', onClickButton); // click 이벤트 연결
});

// 나중에 코드 짤수있을 때 
// 끝말잇기 글자제한 만들어보기