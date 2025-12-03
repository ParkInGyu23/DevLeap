const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');
let startTime;
let endTime;
const records = []; // 반응속도 평균--기존 반응속도 모두 기록
let timeoutId; // 성급한 클릭막기
$screen.addEventListener('click', function(){
  if($screen.classList.contains('waiting')) { // 대기화면
    $screen.classList.replace('waiting', 'ready');
    $screen.textContent = '초록색이 되면 클릭하세요.';
    timeoutId = setTimeout(function (){
    // setTimeout(function() {
      startTime = new Date();
      $screen.classList.replace('ready', 'now');
      $screen.textContent = '클릭하세요!';
    }, Math.floor(Math.random() * 1000) + 2000); // 2000-3000 사이
  } else if ($screen.classList.contains('ready')) { // 준비화면
    clearTimeout(timeoutId);
    $screen.classList.replace('ready', 'waiting');
    $screen.textContent = '너무 성급하군요!';
  } else if ($screen.classList.contains('now')){ // 측정화면
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;
    startTime = null;
    endTime = null;
    // $result.textContent = `${endTime - startTime}ms`;
    $screen.classList.replace('now', 'waiting');
    $screen.textContent = '클릭해서 테스트를 시작하세요';
  }
});


// 결과 평균값에서 310.5555555554ms 로 나오는 경우가 있는데 소수점아래로는 안보이게한다던지 그런 기능 부여하면 좋지않을까...?
