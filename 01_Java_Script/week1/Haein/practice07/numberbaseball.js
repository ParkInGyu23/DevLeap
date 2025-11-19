const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');
// 1 <= Math.random() * 9 + 1 < 10 // 이걸하면 1~9까지 숫자가 랜덤으로 나올 수 있다.
// Math.floor(Math.random() * 9 + 1) // 이걸하면 소수점을 다 내려버린다.

const numbers = []; // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
for(let n = 0; n < 9; n += 1) {
    numbers.push(n + 1);
}

const answer = []; // [ 3, 1, 4, 6 ]
for (let n = 0; n < 4; n += 1) { // 네 번 반복
    // const index = Math.floor(Math.random() * (9 - n)); // 0-8정수
    const index = Math.floor(Math.random() * numbers.length); // 0-8정수
    answer.push(numbers[index]);
    numbers.splice(index, 1);
}
// numbers [ 2, 5, 6, 7, 8, 9 ]
// answer [ 3, 1, 4, undefined ]
console.log(answer);
/*
// 책에 없는 내용인데 한번 보여준 예시들
$form.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본 동작 막기
    console.log('서브밋')
    // 홈은 새로고침이 되는 현상이있다...? 기본동작은 수정이 불가능 / 기본동작을 취소는 할수있다.
    // 홈의기본동작은 새로고침, 새로고침하면 내용이 날라가는데 날라가는것도 막을 수있따. event
    // 대표적인게 폼이랑 에이태그가 있다.
});
*/
// new Set(input) > 중복이 없는 배열이라고 생각하자.
// 얘는 length가 아닌 size로 계산을 한다.

const tries = [];
// function checkInput(input) {} // 검사하는 코드


// checkInput 태그예시
function checkInput(input) { // 3146, 314, 3144
    if(input.length !== 4) { // 길이는 4가 아닌가
        return alert('4자리 숫자를 입력해 주세요.')
    }
    if (new Set(input).size !== 4) { // 중복된 숫자가 있는가
        return alert('중복되지 않게 입력해 주세요.');
    }
    if (tries.includes(input)) { // 이미 시도한 값은 아닌가
        return alert('이미 시도한 값입니다.');
    }
    return true;
} // 검사하는 코드


$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $input.value;
    $input.value = '';
    // const valid = checkInput(value);
    if (!checkInput(value)) {
        return;
    }
    //입력값 문제없음
    if (answer.join('') === value) { // join [3,1,4,6] -> '3146'
        // '3146'.split(); -> 문자열을 배열로 변경해주는코드
        // 만약에 1볼 1스트라이크<br>홈런 을 보여주고싶다면
        // $logs.innerHTML = $logs.textContent + <br> '홈런';
        // innerHTML 은 텍스트에 html 코드가 있으면 태그로 인식을해서 br도 인식을한다. textcontent는 진짜 모든글자들을 텍스트만 있는걸로인식
        // $logs.append(document.createElement('br')); // 줄바꿈
        $logs.textContent = '홈런!';
        return;
    }
    if (tries.length >= 9) {
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
        $logs.appendChild(message); // 추가할 글자
        return;
    }
    // 몇 스트라이크 몇 볼인지 검사
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if (index > -1) { // 일치하는 숫자 발견
            if (index === i) { // 자릿수도 같음
                strike += 1;
            } else { // 숫자만 같음
                ball =+ 1;
            }
        }
    }
    $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
    tries.push(value); // 한번시도할때마다 값을 기록하면서 몇번시도했는지 세는역활도 한다.
});