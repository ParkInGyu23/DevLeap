document.addEventListener("DOMContentLoaded", () => {
    const $computer = document.querySelector(".computer");
    const $buttons = document.querySelectorAll(".button");
    const $score = document.querySelector(".score");
    const $round = document.querySelector("#round");
    const $myWin = document.querySelector("#myWin");
    const $comWin = document.querySelector("#comWin");
    const $final = document.querySelector(".final");
    // $DOM 요소
    
    // sprite X좌표
    const rspX = ["0", "-220px", "-440px"];
    const rsp = ["scissors", "rock", "paper"];

    // 게임 상태
    const state = {
        index: 0, // 컴퓨터 이미지 인덱스
        clickable: true,
        intervalId: null,
        myWin: 0,
        comWin: 0,
        round: 0,
    };

    // 컴퓨터 손 UI 업데이트
    function renderComputer() {
        $computer.style.background = `url(./assets/rsp.png) ${rspX[state.index]} 0`;
        $computer.style.backgroundSize = "auto 200px";
    }

    // 컴퓨터 손 자동 회전
    function start() {
        state.clickable = true;
        state.intervalId = setInterval(() => {
            state.index = (state.index + 1) % 3;
            renderComputer();
        }, 50);
    }

    function stop() {
        clearInterval(state.intervalId);
        state.clickable = false;
    }

    // 승패 계산 (1=승, 0=무승부, -1=패)
    const scoreTable = {
        rock: { scissors: 1, rock: 0, paper: -1 },
        scissors: { paper: 1, scissors: 0, rock: -1 },
        paper: { rock: 1, paper: 0, scissors: -1 },
    };

    // 최종 종료
    function gameEnd(message) {
        $final.textContent = message;
        stop();
    }

    // 한 판 진행
    function play(myChoice) {
        if (!state.clickable) return;

        stop();

        const comChoice = rsp[state.index];
        const result = scoreTable[myChoice][comChoice];

        if (result === 1) {        // 승
            state.myWin++;
            state.round++;
            $score.textContent = "승!";
        } else if (result === -1) { // 패
            state.comWin++;
            state.round++;
            $score.textContent = "패!";
        } else {
            // 무승부 → round 증가 없음
            $score.textContent = "무승부 (무효)";
        }

        // UI 업데이트
        $round.textContent = state.round;
        $myWin.textContent = state.myWin;
        $comWin.textContent = state.comWin;

        // 종료 조건
        if (state.myWin === 3) return gameEnd("🎉 당신의 승리! (3선승)");
        if (state.comWin === 3) return gameEnd("😢 컴퓨터의 승리! (3선승)");

        if (state.round === 5) {
            if (state.myWin > state.comWin) gameEnd("🎉 당신의 최종 승리!");
            else if (state.comWin > state.myWin) gameEnd("😢 컴퓨터 최종 승리");
            else gameEnd("🤝 5판 동률(무승부)");
            return;
        }

        // 1초 뒤 재시작
        setTimeout(start, 1000);
    }

    // 버튼 이벤트
    $buttons.forEach((btn) =>
        btn.addEventListener("click", () => play(btn.id))
    );

    // 게임 시작
    start();
});
