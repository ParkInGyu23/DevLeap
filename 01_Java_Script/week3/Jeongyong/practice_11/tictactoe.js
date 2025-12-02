// 컴퓨터는 랜덤한 위치에 X를 추가함(셀프체크)

const { body } = document;
const $table = document.createElement("table");
const $result = document.createElement("div");
const $reset = document.querySelector("#reset");

// 상태 관리
const gameState = {
  turn: "O", // 현재 차례
  finished: false, // 게임 종료(클릭 불가)
  board: Array.from({ length: 3 }, () => Array(3).fill("")), // 3x3 보드
};

// 렌더링 변수
const rows = [];

// 초기화 및 UI 생성
function createBoard() {
  // HTML <table>을 생성해서 body에 추가, 각 <td>에는 data-* 속성으로 위치 표시
  for (let i = 0; i < 3; i++) {
    const $tr = document.createElement("tr");
    const cells = [];
    for (let j = 0; j < 3; j++) {
      const $td = document.createElement("td");
      $td.dataset.i = i;
      $td.dataset.j = j;
      $td.addEventListener("click", onUserClick); // 각 <td> 클릭 시 onUserClick 함수 호출
      cells.push($td);
      $tr.appendChild($td);
    }
    rows.push(cells);
    $table.appendChild($tr);
  }
  body.append($table, $result);
}

createBoard();

// 유틸 함수
function place(i, j, symbol) {
  const { finished, board } = gameState;
  if (finished || board[i][j]) return false;
  board[i][j] = symbol;
  rows[i][j].textContent = symbol;
  return true;
}

function getLines() {
  const lines = [];
  for (let i = 0; i < 3; i++)
    lines.push(
      [
        [i, 0],
        [i, 1],
        [i, 2],
      ],
      [
        [0, i],
        [1, i],
        [2, i],
      ]
    );
  lines.push(
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ]
  );
  return lines;
}

function checkWinner(symbol) {
  return getLines().some(
    // some + every를 사용하여 줄 중 하나라도 모두 같으면 승리 표현
    (line) => line.every(([i, j]) => gameState.board[i][j] === symbol)
  );
}

function isDraw() {
  return gameState.board.flat().every((cell) => cell !== ""); // flat으로 배열을 펼쳐 모든 값이 채워져있는지 체크
}

function setTurn(turn) {
  gameState.turn = turn;
  $result.textContent = turn === "O" ? "Player turn" : "Computer turn";
}

// 이벤트 핸들러
function onUserClick(e) {
  if (gameState.finished || gameState.turn !== "O") return;

  const { i, j } = e.currentTarget.dataset;

  if (!place(+i, +j, "O")) return; // place() = 실제로 칸을 채우고 화면에 글자를 찍는 역할
  if (checkWinner("O")) return endGame("O"); // 승리 여부(3개 일렬, 대각 포함) 검사
  if (isDraw()) return endGame("draw"); // 모든 칸이 다 채워졌는지 검사

  setTurn("X"); // 컴퓨터의 차례로 넘김
  setTimeout(computerMove, 400);
}

function computerMove() {
  if (gameState.finished) return;
  const empty = getEmptyCells(); // 비어있는 칸을 구하는 함수

  if (empty.length === 0) return endGame("draw");

  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  place(i, j, "X"); // 랜덤으로 한 칸에 X 표시

  if (checkWinner("X")) return endGame("X");
  if (isDraw()) return endGame("draw"); // 승리/무승부 판정 후 플레이어 차례로 넘김

  setTurn("O");
}

function getEmptyCells() {
  const cells = [];
  gameState.board.forEach(
    // forEach 중첩으로 2차열 배열 순회
    (row, i) => row.forEach((cell, j) => cell === "" && cells.push([i, j])) // && 단축 평가
  );
  return cells;
}

// 게임 종료 및 리셋
function endGame(who) {
  // 게임의 결과를 보여주고 클릭이 불가능하게 함
  gameState.finished = true;
  $result.textContent =
    who === "draw" ? "Draw!" : who === "O" ? "Player Win!" : "Computer Win!"; // 삼항 이중 구조
}

function reset() {
  // 게임 상태 완전 초기화
  gameState.finished = false;
  setTurn("O");
  gameState.board.forEach((row, i) => {
    row.fill("");
    row.forEach((v, j) => (rows[i][j].textContent = ""));
  });
  $result.textContent = "";
}

$reset.addEventListener("click", reset);
