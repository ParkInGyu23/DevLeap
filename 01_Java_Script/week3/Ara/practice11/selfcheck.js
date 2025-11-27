/* 정답과 비교
  1. 정답에서는 컴퓨너의 차례일때,
  flat, filter 함수를 사용해 간단하게 빈 자리를 찾아냈으나 
  저는 이중 for문으로 해결하였습니다.
  
  정답에서 쓰는 flat().filter() 방식은 2차원 → 1차원 변환 후 처리하는 함수형 사고를 보여주는 예시
  제 코드에서 flat().filter()를 그대로 쓰려면 처음부터 arr을 2차원 배열로 안 만들고 1차원으로 만들거나,
  아니면 flat()으로 1차원화 → 인덱스 계산해서 다시 (row, col) 변환해줘야 함
  
  => 코드 읽기 쉬운 게 중요, 팀원이 JS 초중급	: 제 코드(2중 for문)
  코드 간결성/함수형 스타일 중시, 팀원이 JS 숙련자: 정답 코드(flat + filter)
  배열 크기가 커질 가능 있음 :	flat + filter (1차원 배열 처리 효율적)
  배열 크기가 작고 직관이 중요 :	2중 for문
*/

document.addEventListener('DOMContentLoaded', function() {
  const $container = document.querySelector('.tictactoe');
  let arr = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  let myCount = 0;
  let computerCount = 0;
  
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
    if(value === 'O') myCount ++;
    else computerCount ++;
    arr[row][column] = value;
    
    if(computerCount >= 3 || myCount >= 3) {
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
      } else if (computerCount + myCount === 9) {
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
    myCount = 0;
    computerCount = 0;
    
    const allTd = $tbody.querySelectorAll('td');
    allTd.forEach(td => {
      td.textContent = '';
    });
  }
  
  // 컴퓨터 차례 빈공간 무작위 체크 
  function turnComputer() {
   // 배열에서 null 값 먼저 체크
   let emptyCoordinate = [];
   for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(arr[i][j] === null) emptyCoordinate.push([i, j]);
      }
    }
    
    // 랜덤 뽑기 후 컴퓨터 클릭 체크
    let computerCoordinate = emptyCoordinate[Math.floor(Math.random() * emptyCoordinate.length)];
    const targetTr = $tbody.querySelectorAll('tr')[computerCoordinate[0]];
    const targetTd = targetTr. querySelectorAll('td')[computerCoordinate[1]];
    targetTd.append('X');
    checkArr('X', Number(computerCoordinate[0]), Number(computerCoordinate[1]));
  }
  

  // 내가 클릭시 체크
  let turnTieout;
  $container.addEventListener('click', function(e){
    const target = e.target;
    if(target.textContent === '') {
      target.append('O');
      checkArr('O', Number(target.getAttribute('data-row')), Number(target.getAttribute('data-column')));
      setTimeout(() => {
          turnComputer();
      }, 1000); 
    } else {
      alert('이미 선택된 곳입니다 🥹');
    }
  });
});