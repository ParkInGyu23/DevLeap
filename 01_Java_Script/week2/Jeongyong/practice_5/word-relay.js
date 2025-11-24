// 세 글자로 단어 고정
// 참가자를 정확하게 입력하지 않을 경우 게임 종료
// 이미 사용했던 단어는 재사용 불가
// 제시어에 맞지 않는 단어 입력 시 입력 힌트 출력

// ===============================
//  요소 선택 (DOM 요소 가져오기)
// ===============================
const $btn = document.querySelector('button');
const $order = document.querySelector('#order');
const $word = document.querySelector('#word');
const $input = document.querySelector('input');

// ===============================
//  참가자 수 입력 및 검증
// ===============================

const members = prompt('참가자는 몇 명 인가요?')

// 숫자가 아닌 값, 빈 문자열, 취소(null) 입력 시 게임 종료
if (members === null || members.trim() === '' || isNaN(Number(members))) {
  alert('참가자를 정확하게 입력하지 않아 게임이 종료됩니다.');
  throw new Error('Game Over!');
}

// 참가자 수를 숫자로 변환
const participant = Number(members);

// ===============================
//  게임에 필요한 변수 초기화
// ===============================
let order = 1; // 현재 순서 (1번 참가자부터 시작)
let word; // 제시어
let newWord; // 새로 입력한 단어
const usedWords = []; // 사용된 단어 저장

// ===============================
//  버튼 클릭 시 실행될 메인 로직
// ===============================

$btn.addEventListener('click', () => {
  // 입력된 단어를 가져오고 앞뒤 공백 제거
  newWord = $input.value.trim();

  // 세 글자 단어가 아닐 경우
  if(newWord.length !== 3) {
    alert('세 글자 단어를 입력해주세요.');
    // 이미 사용된 단어일 경우
  } else if (usedWords.includes(newWord)) {
    alert('이미 사용한 단어입니다.')
    // 첫 제시어이거나 (word 없음) 끝말잇기 규칙에 맞는 단어일 경우
  } else if (!word || word.at(-1) === newWord[0]) {
    word = newWord; // 제시어 업데이트
    usedWords.push(word); // 사용된 단어 배열에 추가
    $word.textContent = word; // 화면에 제시어 표시

    // 다음 참가자 순서로 이동 (마지막 참가자 이후엔 다시 1번으로 복귀)
    order = order + 1 > participant ? 1 : order + 1;
    $order.textContent = order;
    // 규칙에 맞지 않는 단어를 입력했을 때
  } else {
    alert(`${word.at(-1)}(으)로 시작하는 단어를 입력해 주세요.`)
  }
  // 입력창 초기화 및 포커스 유지
  $input.value = '';
  $input.focus();
});

// ===============================
// 엔터 키로도 단어 제출 가능하게 설정
// ===============================
$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    $btn.click();
  }
});

