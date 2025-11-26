/* 정답과 비교
  1. 정답과 다르게 랜덤한 시간을 만들어낼때 처음부터 2000-3000 사이를 맞췄어야 했는데 
  불필요하게 2-3 사이의 숫자에 곱하기 1000을 해서 코드를 두줄로 만들어버렸습니다.
  selfcheck에서는 수정하였습니다.
  2. 정답에서는 클릭시 이벤트리스너에서 모든 코드를 다 작성했으나,
  가독성을 위해 랜덤한 시간을 정해 화면을 바꿔주는 함수와 
  평균 반응시간을 구하는 함수를 분리해줬습니다.
  3. 저는 3번의 기회가 끝나면 반응 테스트가 종료되는 화면도 추가하여 
  코드가 길어보일 수 있습니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const $screen = document.querySelector('.response_check');
  const $text = document.querySelector('.text');
  const $result = document.querySelector('.result');
  let count = 3;
  let checkTimes = [];
  
  // 랜덤한 시간(2~3초 사이) 에 화면 변경
  let ActiveSetTimeOut;
  let startTime;
  let clickTime;
  function changeScreen() {
    const randomNum = Math.random() * (3 - 2) + 2;
    const numToTime = randomNum * 1000;
    
    ActiveSetTimeOut  = setTimeout(() => {
      $screen.classList.remove('start');
      $screen.classList.add('change');
      $text.textContent = '클릭!';
      startTime = new Date();
    }, numToTime);
  }
  
  // 반응시간 평균 구하기
  function checkResponse() {
    let mediumValue = 0;
    
    checkTimes.map((value) => {
      mediumValue += value;
    });
    mediumValue = Math.floor(mediumValue / checkTimes.length);
    $result.textContent = '현재 : '+ checkTimes[checkTimes.length -1] + 'ms, 평균: ' + mediumValue + 'ms';
  }
  
  // 시작할때 대기화면
  $screen.classList.add('waiting');
  
  // 화면을 클릭하면 
  $screen.addEventListener('click', () => {
    if($screen.classList.contains('waiting')) {
      // 대기 화면에서 클릭했을 때
      $screen.classList.remove('waiting');
      $screen.classList.add('start');
      $text.textContent = '초록색이 되면 클릭해주세요.';
      changeScreen();
    } else if ($screen.classList.contains('start')) {
      // 반응 화면으로 바뀌지도 않았는데 클릭했을 때
      clearInterval(ActiveSetTimeOut);
      alert('너무 성급합니다!');
      changeScreen();
    } else if ($screen.classList.contains('change')) {
      // 반응 화면에서 클릭했을 때
      clickTime = new Date();
      checkTimes.push(clickTime.getTime() - startTime.getTime());
      checkResponse();
      count --
      if (count !== 0) {
        $screen.classList.remove('change');
        $screen.classList.add('start');
        $text.textContent = '초록색이 되면 클릭해주세요.';
        changeScreen(); 
      }
      else {
        $screen.classList.remove('change');
        $screen.classList.add('end');
        $text.textContent = '검사가 끝났습니다.';
      }
    }
    
  });
});