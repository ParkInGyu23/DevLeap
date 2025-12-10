document.addEventListener("DOMContentLoaded", () => {
    const $timer = document.querySelector('.timer');
    const $score = document.querySelector('.score');
    const $life = document.querySelector('.life');
    const $gameStart = document.querySelector('.gameStart');
    const $$cells = document.querySelectorAll('.cell');

    // 게임 설정
    const config = {
        totalTime: 60,
        gopherRate: 0.4,
        bombRate: 0.4,
    };

    // 게임 상태 
    const state = {
        score: 0,
        time: config.totalTime,
        life: 3,
        started: false,
        holes: Array(9).fill(0),
        timerId: null,
        tickId: null
    };

    // 게임 현황
    function updateUI() {
        $score.textContent = `점수: ${state.score}`;
        $life.textContent = `목숨: ${state.life}`;
        $timer.textContent = `시간: ${state.time}`;
    }

    // 두더쥐, 폭탄 등장
    function showItem($element, index) {
        $element.classList.remove("hidden");
        state.holes[index] = setTimeout(() => {
            hideItem($element, index);
        }, 1000);
    }

    
    function hideItem($element, index) {
        $element.classList.add("hidden");
        clearTimeout(state.holes[index]);
        state.holes[index] = 0;
    }

    function tick() {
        state.holes.forEach((hole, index) => {
            if (hole) return;

            const rand = Math.random();
            if (rand < config.gopherRate) {
                showItem($$cells[index].querySelector(".gopher"), index);
            } else if (rand < config.gopherRate + config.bombRate) {
                showItem($$cells[index].querySelector(".bomb"), index);
            }
        });
    }

    // 게임 시작
    function startGame() {
        if (state.started) return;
        state.started = true;
        updateUI();

        state.timerId = setInterval(() => {
            state.time = (state.time * 10 - 1) / 10;
            updateUI();

            if (state.time <= 0) endGame("시간 종료");
        }, 100);

        state.tickId = setInterval(tick, 1000);
    }

    // 게임 종료
    function endGame(message) {
        clearInterval(state.timerId);
        clearInterval(state.tickId);
        alert(`${message}\n최종 점수: ${state.score}`);
        location.reload();
    }

    // 두더쥐 클릭 시
    function handleClickGopher(e, index) {
        if (!e.target.classList.contains("dead")) {
            state.score++;
        }
        e.target.classList.add("dead");
        hideItem(e.target, index);
        updateUI();

        setTimeout(() => {
            e.target.classList.remove("dead");
        }, 1000);
    }

    // 폭탄 클릭 시
    function handleClickBomb(e, index) {
        e.target.classList.add("boom");
        hideItem(e.target, index);
        state.life--;
        updateUI();

        if (state.life <= 0) endGame("목숨 종료");

        setTimeout(() => {
            e.target.classList.remove("boom");
        }, 1000);
    }

    $$cells.forEach(($cell, index) => {
        $cell.querySelector(".gopher").addEventListener("click", (e) => handleClickGopher(e, index));
        $cell.querySelector(".bomb").addEventListener("click", (e) => handleClickBomb(e, index));
    });

    $gameStart.addEventListener("click", startGame);
});
