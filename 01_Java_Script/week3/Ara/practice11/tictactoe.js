/* 정답과 비교
  1. 정답에서는 td 태그에 각각의 번호를 새겨주어 구분했으나,
  저는 직접 data-row, data-colum 값으로 구분했습니다.
  2. 정답에서는 테이블을 생성하고 이벤트 리스너를 선언해주고 
  아래에 콜백 함수에 작성하였으나, 
  저는 콜백 생각을 하지 못해 이벤트 리스너에 한번에 걸어주었습니다.
  3. 정답에서는 모든 칸에 입력이 끝나면 승패를 확인했으나 
  저는 ox 각각 3번씩 입력했을때부터 바로 체크해 한줄이 완성되면 즉시 게임을 종료하고 
  다 채워졌는데도 승패가 안나면 무승부로 게임을 종료했습니다. 
  종료 후 재시작도 추가했습니다.
  해서 코드가 조금 지저분하고 복잡해보일 수 있습니다.
  4. 게임 종류 후 재시작할때 x부터 시작되는 문제로 setTimeout 추가 (해결하느라 시간 제일 오래걸림...)
*/

document.addEventListener('DOMContentLoaded', function() {
  const $container = document.querySelector('.tictactoe');
  let arr = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  let ox = 'O';
  let oCount = 0;
  let xCount = 0;
  
  // 3x3 그리기 & 게임 시작할때 전체 리셋
  const $table = document.createElement('table');
  const $tbody = document.createElement('tbody');
    
  $container.innerHTML = ''; 
  for(let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    for(let j = 0; j < 3; j++) {
      const $td = document.createElement('td');
      $td.setAttribute('data-row', i); 
      $td.setAttribute('data-column', j); 
      $tr.append($td);
    }
    $tbody.append($tr);
  }

  $table.append($tbody);
  $container.append($table);
  
  // 한줄이 되었는지 확인 
  function checkArr(value, row, column) {
    if(value === 'O') oCount ++;
    else xCount ++;
    arr[row][column] = value;
    
    if(oCount >= 3 || xCount >= 3) {
      if((arr[0][0] === arr[0][1] && arr[0][1] === arr[0][2]) || 
          (arr[0][0] === arr[1][0] && arr[1][0] === arr[2][0]) ||
          (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) || 
          (arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0])
      ) {
        alert(value + '가 이겼습니다 😍');
        const $table = document.querySelector('table');
        setTimeout(() => {
          gameReStart();
        }, 0); 
      } else if (oCount + xCount === 9) {
        alert('무승부입니다 😀');
        setTimeout(() => {
          gameReStart();
        }, 0); 
      }
    }
  }
  
  // 게임 재시작
  function gameReStart(){
    arr = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    ox = 'O';
    oCount = 0;
    xCount = 0;
    
    const allTd = $tbody.querySelectorAll('td');
    allTd.forEach(td => {
      td.textContent = '';
    });
  }
  

  // 빈칸에 번갈아 OX 채우기
  $container.addEventListener('click', function(e){
    const target = e.target;
    if(target.textContent === '') {
      target.append(ox);
      checkArr(ox, Number(target.getAttribute('data-row')), Number(target.getAttribute('data-column')));
      if(ox === 'O') ox = 'X';
      else ox = 'O'; 
    } else {
      alert('이미 선택된 곳입니다 🥹');
    }
  });
});