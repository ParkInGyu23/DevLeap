const { body } = document;
const $table = document.createElement("table");
const $result = document.createElement("div"); // 결과창
const rows = [];
// 차례 바꾸면서 빈칸에 O & X 표시하기
let turn = "0";

// 승패 판단하기
const checkWinner = (target) => {
  const rowIndex = target.parentNode.rowIndex; // tr의 행 인덱스
  const cellIndex = target.cellIndex; // td의 열 인덱스
  let hasWinner = false; // 세 칸이 같은 모양으로 채워졌는가?
  if (
    // 가로줄 검사
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    // 세로줄 검사)
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent == turn &&
    rows[1][1].textContent == turn &&
    rows[2][2].textContent == turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent == turn &&
    rows[1][1].textContent == turn &&
    rows[2][0].textContent == turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};

// 클릭이벤트
const callback = (event) => {
  if (event.target.textContent !== "") {
    // 빈칸이 아닌가?
    console.log("빈칸이 아닙니다.");
    return;
  }
  // 빈칸이면
  console.log("빈칸입니다");
  event.target.textContent = turn;
  const hasWinner = checkWinner(event.target);
  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener("click", callback);
    return;
  }

  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = "무승부";
    return;
  }
  turn = turn === "X" ? "0" : "X";
};

for (let i = 1; i <= 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];

  for (let j = 1; j <= 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
}
$table.addEventListener("click", callback);
body.appendChild($table);
body.appendChild($result);

// 게임이 끝난 이후 결과나오고
// 클릭한번 더 한다거나 하면 재경기할수있게!?
