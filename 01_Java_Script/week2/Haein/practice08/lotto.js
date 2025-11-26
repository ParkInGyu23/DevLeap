const $form = document.querySelector('#form');
const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');

function drawBall(number, $parent) {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    $parent.appendChild($ball);
    }

const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
});

$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // 검사하는 코드
    const string = event.target.input.value; 
    if (!string.trim()) { 
        return alert('숫자를 입력하세요.');
    }
    const myNumbers = string.split(',').map((v) => parseInt(v.trim()));
    if (myNumbers.length !==6) {  
    return alert('숫자를 6개 입력하세요.');
    }
    if (new Set(myNumbers).size !== 6) {
      return alert ('중복된 숫자를 입력했습니다.');
    }
    if (myNumbers.find((v) => v > 45 || v < 1)) {
      return alert('1부터 45까지만 입력할 수 있습니다.');
    }
    // 무작위로 공 뽑고 정렬하기
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length) {
      const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
      const spliceArray = candidate.splice(random, 1); // 뽑은 값 새로운 배열에 넣기
      const value = spliceArray[0]; // 새로운 배열에 들어 있는 값 꺼내기
      shuffle.push(value); // 꺼낸 값을 shuffle 배열에 넣기
    }
    console.log(shuffle);
    const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
    const bonus = shuffle[6];
    console.log(winBalls, bonus);


   for (let i = 0; i < winBalls.length; i++) {
    await setTimeoutPromise(1000);
    drawBall(winBalls[i], $result);
   }
   await setTimeoutPromise(1000);
      drawBall(bonus, $bonus);
      await setTimeoutPromise(0);

   let count = 0;
   myNumbers.forEach((my) => {
    if (winBalls.includes(my)) {
        count++;
    }
   });
   if (count === 6) {
    alert('1등! 현실 로또 당첨될 운을 여기에 쓰시다니...');
   } else if (count === 5) {
    if (myNumbers.includes(bonus)) {
        alert('2등! 보너스 공이지만 숫자 6개를 맞추셨네요.');
    } else {
        alert('3등! 아쉽습니다. 그래도 축하드려요.');
    }
    } else if (count === 4) {
        alert('4등! 5만 원 축하드려요.');
    } else if (count === 3) {
        alert('5등! 5천 원 축하드려요.');
    } else {
        alert('로또 참 어렵죠?');
    }
});
 
// 📌 나중에 코드 본인이 짤 수 있게되면
// 다음 로또번호를 새로고침안하고 누를시 이미 받은공은 초기화시켜보기..