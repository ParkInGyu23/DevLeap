document.addEventListener('DOMContentLoaded', function() {
  const $screen = document.querySelector('.response_check');
  const $text = document.querySelector('.text');
  const $result = document.querySelector('.result');
  const $rank = document.querySelector('.rank');
  let checkTimes = [];
  
  // 임의의 시간(2~3초 사이) 에 화면 변경
  let ActiveSetTimeOut;
  let startTime;
  let clickTime;
  function changeScreen() {
    const randomNum = Math.random() * 1000 + 2000;
    
    ActiveSetTimeOut  = setTimeout(() => {
      $screen.classList.remove('start');
      $screen.classList.add('change');
      $text.textContent = '클릭!';
      startTime = new Date();
    }, randomNum);
  }
  
  // 반응시간 평균 구하기
  function checkResponse() {
    let mediumValue = 0;
    
    checkTimes.map((value) => {
      mediumValue += value;
    });
    mediumValue = Math.floor(mediumValue / checkTimes.length);
    $result.textContent = '현재 : '+ checkTimes[checkTimes.length -1] + 'ms, 평균: ' + mediumValue + 'ms';
    
    // 가장 빠른 5개 보여주기
    let sortCheckTimes = [...checkTimes].sort((a, b) => a - b).slice(0, 5);
    $rank.textContent = '';
    sortCheckTimes.map((value, index) => {
      const newElement = document.createElement('div');
      newElement.textContent = (index + 1) + '. ' + value + 'ms';
      $rank.append(newElement);
    });
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
      $screen.classList.remove('change');
      $screen.classList.add('start');
      $text.textContent = '초록색이 되면 클릭해주세요.';
      changeScreen(); 
    }
    
  });
});