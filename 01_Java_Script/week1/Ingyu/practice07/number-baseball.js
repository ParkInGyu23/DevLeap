document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.numberBaseball .input');
    const button = document.querySelector('.numberBaseball .button');
    const result = document.querySelector('.result_Section');

    // 배열 만들기
    const numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(i);
    }

    // 배열에서 랜덤 4자리 뽑기 중복x
    const correctArr = [];
    for (let i =  0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        correctArr.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
    }
    const correct = correctArr.join('');

    let opportunity = 10;
    let tries = [];

    button.addEventListener('click', () => {
        const inputValue = input.value;

        // 입력 확인
        if (!inputValue) {
            alert('값을 입력해주세요');
            return input.focus();
        }
        if (inputValue.length !== 4) {
            alert('4자리를 입력해주세요');
            input.value = '';
            return input.focus();
        }
        if (isNaN(inputValue)) {
            alert('숫자를 입력해주세요');
            input.value = '';
            return input.focus();
        }
        if (new Set(inputValue).size !== 4) {
            alert('중복된 숫자를 입력했습니다');
            input.value = '';
            return input.focus();
        }
        if (tries.includes(inputValue)) {
            alert('이미 시도한 값입니다');
            input.value = '';
            return input.focus();
        }

        // 기록
        tries.push(inputValue);
        opportunity--;

        let strike = 0;
        let ball = 0;

        // 볼/스크라이크 계산
        for (let i = 0; i < 4; i++) {
            if (inputValue[i] === correct[i]) {
                strike++;
            } else if (correct.includes(inputValue[i])) {
                ball++;
            }
        }

        // 결과
        if (strike === 4) {
            const el = document.createElement("div");
            el.textContent = "홈런!";
            result.prepend(el);
            button.disabled = true;
        } else {
            const el = document.createElement("div");
            el.textContent = `${inputValue} : ${strike} 스트라이크 ${ball} 볼`;
            result.prepend(el);

            if (opportunity === 0) {
                const el2 = document.createElement("div");
                el2.textContent = `패배! 정답은 ${correct}`;
                result.prepend(el2);
                button.disabled = true;
            }
        }

        input.value = '';
        input.focus();
    });
});