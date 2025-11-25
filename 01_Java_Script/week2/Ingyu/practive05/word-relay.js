document.addEventListener("DOMContentLoaded" , () => {

    // 참가자 수 정하기
    let number = Number(prompt('참가자는 몇 명인가요?'));
    // 참가자 수 오입력
    while (Number.isNaN(number) || number < 1) {
    number = Number(prompt("참가자 수를 다시 입력해주세요."));
    }

    // DOM 요소 가져오기
    const input = document.querySelector('.input_wrap input');
    const button = document.querySelector('.input_wrap button');
    const word = document.querySelector('.word span');
    const gamer = document.querySelector('.gamer span');

    // 첫번째 참가자 설정
    gamer.textContent = 1;

    // 단어 검증 함수
    const isValidWord = (prev, current) => {
        return prev.at(-1) === current[0];
    };

    // 입력 처리
    const handleInput = () => {
        const newWord = input.value;
        const prevWord = word.textContent;
        let gamerNum = Number(gamer.textContent.trim());

        if (!newWord) return alert("단어를 입력해주세요");
        
        if (!prevWord) {
            word.textContent = newWord;
        }
        else { // 규칙 체크
            if (!isValidWord(prevWord, newWord)) {
                alert("틀린 단어입니다");
                input.value = "";
                return input.focus();
            }
            word.textContent = newWord;
        }
        // 순서 증가
        gamerNum = gamerNum + 1 > number ? 1 : gamerNum + 1;
        gamer.textContent = gamerNum;

        input.value = "";
        input.focus();
    };

    button.addEventListener('click', handleInput);
    input.addEventListener('keydown', (e) => {
        if (e.key === "Enter") handleInput();
    });
});