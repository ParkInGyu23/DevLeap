document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".lotto_form");
    const myNumbersBox = document.querySelector(".my_numbers");
    const result = document.querySelector(".result");
    const bonusBox = document.querySelector(".bonus");
    const input = form.number;

    // 입력 된 숫자 저장용 배열
    let myNumbers = []; 

    // 로또 생성
    function drawBall(number, parent) {
        const ball = document.createElement("div");
        ball.className = "ball";
        let color = "";
        if (number < 10) color = "red";
        else if (number < 20) color = "orange"
        else if (number < 30) color = "yellow"
        else if (number < 40) color = "blue"
        else color = "green"

        ball.dataset.color = color
        ball.textContent = number;
        parent.appendChild(ball);
    }
    // Promise 딜레이 함수
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    // 입력 이벤트 
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const num = Number(input.value);
        // 입력값 검증
        if (!num) return alert("숫자를 입력하세요!");
        if (num < 1 || num > 45) return alert("1~45 사이 숫자만 입력!");
        if (myNumbers.includes(num)) return alert("숫자가 중복되었습니다!");

        myNumbers.push(num);
        drawBall(num, myNumbersBox);
        input.value = "";
        input.focus();

        // 6개 다 입력되면 추첨 시작
        if (myNumbers.length === 6) {

            // 후보 숫자 만들고 랜덤 섞기
            const candidate = Array(45).fill().map((_, i) => i + 1);
            const shuffle = [];

            while (candidate.length > 0) {
                const random = Math.floor(Math.random() * candidate.length);
                shuffle.push(candidate.splice(random, 1)[0]);
            }

            const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
            const bonusNumber = shuffle[6];

            // 당첨 번호 애니메이션
            for (let i = 0; i < winBalls.length; i++) {
                await delay(700);
                drawBall(winBalls[i], result);
            }

            // 보너스 번호
            await delay(700);
            const bounsBall = document.createElement("div");
            bounsBall.className = "ball";
            bounsBall.dataset.color = "purple";
            bounsBall.textContent = bonusNumber;
            bonusBox.appendChild(bounsBall);

            // 공이 다 나온 뒤
            await delay(100);

            // 등수 계산
            let count = myNumbers.filter(n => winBalls.includes(n)).length;

            if (count === 6) {
                alert("🥇 1등!!");
            } else if (count === 5 && myNumbers.includes(bonusNumber)) {
                alert("🥈 2등!!");
            } else if (count === 5) {
                alert("🥉 3등!");
            } else if (count === 4) {
                alert("4등!");
            } else if (count === 3) {
                alert("5등!");
            } else {
                alert("풉ㅋ😂");
            }
        }
    });
});
