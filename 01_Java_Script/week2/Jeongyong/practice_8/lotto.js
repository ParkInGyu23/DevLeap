// ===============================
//  요소 선택 (DOM 연결)
// ===============================
const $input = document.querySelector('input');
const $form = document.querySelector('#form');
const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');
const $btn = document.querySelector('button');

// ===============================
//  메인 로직: 폼 제출 시 실행
// ===============================
$form.addEventListener('submit', (e) => {
  e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

  // 추첨 중에는 버튼 비활성화
  $btn.disabled = true;
  $btn.textContent = '추첨 중...';

  // ===============================
  //  입력값 처리
  // ===============================
  const userInput = $input.value.trim();
  const userNumbers = userInput.split(',').map(num => Number(num.trim()));
  // 쉼표 기준으로 나누고 숫자로 변환

  // ===============================
  //  유효성 검사 (잘못된 입력 방지)
  // ===============================
  if (userNumbers.length !== 6) {
    return alertEnd('숫자 6개를 입력해주세요.');
  }

  if (!userNumbers.every(num => !isNaN(num))) {
    return alertEnd('숫자만 입력해 주세요.');
  }

  if (!userNumbers.every(num => num >= 1 && num <= 45)) {
    return alertEnd('1부터 45 사이의 숫자만 입력해 주세요.');
  }

  if (new Set(userNumbers).size !== 6) {
    return alertEnd('중복되지 않은 숫자 6개를 입력해 주세요.');
  }

  // ===============================
  //  로또 번호 생성 (랜덤)
  // ===============================
  function fisherYatesShuffle(arr) {
    for (let i = arr.length; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const numbers = Array(45).fill().map((v, i) => i + 1);
  const shuffled = fisherYatesShuffle(numbers);
  const winningNumbers = shuffled.slice(0, 6).sort((a, b) => a - b);
  const bonus = shuffled[6];

  // ===============================
  //  ball 생성 함수
  // ===============================
  const createBall = (num) => {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.textContent = num;

    // 번호 구간 별 색상 지정
    if (num < 10) {
      ball.style.backgroundColor = 'red';
      ball.style.color = '#fff';
    } else if (num < 20) {
      ball.style.backgroundColor = 'orange';
    } else if (num < 30) {
      ball.style.backgroundColor = 'yellow';
    } else if (num < 40) {
      ball.style.backgroundColor = 'blue';
      ball.style.color = '#fff';
    } else if (num <= 45) {
      ball.style.backgroundColor = 'green';
      ball.style.color = '#fff';
    } return ball; // 스타일링 된 공 반환
  };

  // ===============================
  //  결과 영역 초기화
  // ===============================
  $result.innerHTML = '당첨 숫자: ';
  $bonus.innerHTML = '보너스 숫자: ';

  // ===============================
  //  공 출력 (비동기)
  // ===============================
  winningNumbers.forEach((num, i) => {
    setTimeout(() => {
      $result.appendChild(createBall(num));
    }, (i + 1) * 1000);
  });

  // 보너스 번호는 메인 번호가 다 출력된 뒤 출력
  setTimeout(() => {
    $bonus.appendChild(createBall(bonus));
  }, (winningNumbers.length + 1) * 1000);

  // ===============================
  //  결과 비교 및 등수 판정
  // ===============================
  setTimeout(() => {
    const matchCount = userNumbers.filter(num => winningNumbers.includes(num)).length;
    // 내가 고른 숫자 중 당첨 번호에 포함된 개수
    const hasBonus = userNumbers.includes(bonus); // 보너스 번호 포함 여부

    let rank;
    if (matchCount === 6) rank = `1등`;
    else if (matchCount === 5 && hasBonus) rank = '2등';
    else if (matchCount === 5) rank = '3등';
    else if (matchCount === 4) rank = '4등';
    else if (matchCount === 3) rank = '5등';
    else rank = '꽝!'

    // 결과 출력
    alert(`추첨 결과는 ${rank}!`);

    // 버튼 재활성화(다시 추첨 가능)
    $btn.disabled = false;
    $btn.textContent = '다시 추첨하기';
  }, (winningNumbers.length + 2) * 1000);

  // ===============================================
  //  유효성 검사 실패 시 버튼 비활성화를 막기 위한 함수
  // ===============================================
  function alertEnd(msg) {
    alert(msg);
    $btn.disabled = false;
    $btn.textContent = '추첨';
    return;
  }
});