// 코드가 너무 짧아 새로 짜는 것보다는 리팩토링에 집중했습니다.
// 반응 속도 측정 평균값을 Math.round로 묶어 UX를 개선
// 반응 속도 측정 평균값이 빈 배열일 경우 에러 발생할 수 있어 초기값 지정
// Date보다 정확도가 높은 performance.now()를 알게 되어 사용해봄
// performance.now()를 사용하니 소수점이 너무 길게 출력되어 Math.round 사용
// 성급한 클릭 시 경고 문구 더 잘 보이게 수정
// 최고 기록 5개 출력(셀프체크, sort 사용)
// 최고 기록 출력 방식 변경(map, join)
// 최고 기록 출력 줄바꿈 css 설정(white-space: pre-line;)

const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
const $top5 = document.querySelector("#top5");

let startTime;
let endTime;
const records = [];
let timeoutId;

$screen.addEventListener("click", () => {
  if ($screen.classList.contains("waiting")) {
    //대기 화면
    $screen.classList.replace("waiting", "ready");
    $screen.classList.remove("wrong-click");
    $screen.textContent = "초록색이 되면 클릭하세요.";
    timeoutId = setTimeout(() => {
      startTime = performance.now();
      $screen.classList.replace("ready", "now");
      $screen.textContent = "클릭하세요!";
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if ($screen.classList.contains("ready")) {
    // 준비 화면
    clearTimeout(timeoutId);
    $screen.classList.replace("ready", "waiting");
    $screen.classList.add("wrong-click");
    $screen.textContent = "성급한 클릭이 감지되었습니다.";
  } else if ($screen.classList.contains("now")) {
    // 측정 화면
    endTime = performance.now();
    const current = Math.round(endTime - startTime);
    records.push(current);
    const average = Math.round(
      records.reduce((a, c) => a + c, 0) / records.length
    );
    const top5 = [...records].sort((a, b) => a - b).slice(0, 5);
    $result.textContent = `현재: ${current}ms, 평균: ${average}ms`;
    const top5Text = top5
      .map((time, index) => `${index + 1}. ${time}ms`)
      .join("\n");
    $top5.textContent = `최고 기록\n ${top5Text}`;
    startTime = null;
    endTime = null;
    $screen.classList.replace("now", "waiting");
    $screen.textContent = "클릭해서 테스트를 시작하세요";
  }
});
