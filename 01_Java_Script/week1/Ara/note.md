# Week 1 개인 정리

## ✏️ 배운 내용 요약
  ### 2.4 조건문
  - 조건문의 종류
    - if else 문
      ```js
      if (조건식) {
        실행문
      } else if (조건식) {
        실행문
      } else {
        실행문
      }
      ```
    - switch 문
      ```js
        switch (조건 대상) {
          case 비교 조건 값;
            실행문
            break; // 빠져나가기
          case 비교 조건 값;
            실행문
            break;
          default;
            실행문 // 어느 것도 일치하지 않을 때 실행
        }
      ```
      break 를 써주지 않으면 case가 일치할 때 그 아래가 모두 실행되기 때문에 원하는 값만 얻기 위해서는 break가 필요
    - 조건부 연산자
      ```js
      조건식 ? 참일때 실행 : 거짓일때 실행
      ```
    
  ### 2.5 반복문
  - 반복문의 종류
    - while 문
      ```js
        while (조건식) {
          if (조건식) {
            실행문
            break; // 빠져나가기
          } 
        }
        
        while (조건식) {
          if (조건식) {
            continue; // 건너뛰기
          } 
        }
      ```
      조건이 일치하면 반복되는 while문을 멈추기 위해 break가 필요
      특정 조건일때 건너 뛰고 싶다면 continue 이용
    - for 문 
      ```js
      for (시작; 조건식; 종료식) {
        실행문
      }
      ```
      
  ### 2.6 객체
  - 배열에 요소 추가하기
    - index에 값 대입
      ```js
        const target = ['a', 'b', 'c', 'd', 'e'];
        target[5] = 'f';
        target; // (6) ['a', 'b', 'c', 'd', 'e', 'f']
      ```
    - unshift() : 첫번째 요소 추가
      ```js
        const target = ['나', '다', '라', '마', '바'];
        target.unshift('가');
        target; // (6) ['가', '나', '다', '라', '마', '바']
      ```
    - push()
      ```js
        const target = ['가', '나', '다', '라', '마'];
        target.unshift('바');
        target; // (6) ['가', '나', '다', '라', '마', '바']
      ```
  - 배열에 요소 수정하기
    - index에 값 수정
       ```js
        const target = ['a', 'b', 'c', 'd', 'e'];
        target[3] = ' z';
        target; // (5) ['a', 'b', 'c', 'z', 'e']
      ```
  - 배열에 요소 삭제하기
    - pop()
      ```js
        const target = ['가', '나', '다', '라', '마'];
        target.pop('마');
        target; // (4) ['가', '나', '다', '라']
      ```
    - shift() : 첫번째 요소 삭제
      ```js
        const target = ['가', '나', '다', '라', '마'];
        target.shift();
        target; // (4) ['나', '다', '라', '마']
      ```
    - splice() : 위치 또는 개수를 지정해서 삭제하고 싶을 경우
      ```js
        const target = ['가', '나', '다', '라', '마'];
        target.splice(1, 1); // 1번째 인덱스부터 1개 삭제
        target; // (4) ['가', '다', '라', '마']
        
        const target = ['가', '나', '다', '라', '마'];
        target.splice(1); // 1번째 인덱스부터 모두 삭제
        target; // (1) ['가']
        
        const target = ['가', '나', '다', '라', '마'];
        target.splice(1, 3, '타', '파'); // 1번째 인덱스부터 3개 삭제하고 그 자리에 추가
        target; // (4) ['가', '타', '파', '마']
      ```
  - 배열에서 요소 찾기
    - include()
      ```js
        const target = ['가', '나', '다', '라', '마'];
        const result = target.includes('다'); // 배열안에 값이 있다면 true 없다면 false
        result; // true
        const result2 = target.includes('타');
        result2 // false
      ```
    - indexOf() 와 lastIndexOf() 
      ```js
        const target = ['가', '나', '다', '라', '마'];
        const result = target.indexOf('다') // 몇번째 index  
        result; // 2
        const result2 = target.lastIndexOf('라') // 요소의 마지막 index
        result2; // 3
      ```
  - 배열 자르고 합치기
    - slice() : 기존 배열을 잘라 새로운 배열 생성
      ```js
        ['2', '3', '4', '5'].slice(1); // 1번째 인덱스부터 뒤까지 잘라 새로운 배열 생성 ['3', '4', '5']
        ['2', '3', '4', '5'].slice(1, 3); // 1번째 인덱스부터 3번째 인덱스 전까지 잘라 새로운 배열 생성 ['3', '4']
        ['2', '3', '4', '5'].slice(2, 3); // 2번째 인덱스만 잘라 새로운 배열을 생성 ['4']
        ['2', '3', '4', '5'].slice(1, -1); // 음수는 뒤에서부터 -1을 시작으로 -1을 더해가는 자리수 ['3', '4']
        ['2', '3', '4', '5'].slice() // 자르지 않고 그대로 ['2', '3', '4', '5']
      ```
    - concat() : 여러 값을 넣어도 하나의 배열로 생성
      ```js
        [1, 2].concat([3, 4]); // (4)  [1, 2, 3, 4]
        [1, 2].concat(3, 4); // (4) [1, 2, 3, 4]
        [1, 2].concat([3, 4], [5, 6]); // (6) [1, 2, 3, 4, 5, 6]
        [1, 2].concat([3, 4], 5, 6); // (6) [1, 2, 3, 4, 5, 6]
        [1, 2].concat(); // (2) [1, 2]
      ```
    
    ** splice 와 slice 배열은 비슷해보이지만 slice는 새로운 배열을 만듭니다 **
    
  - 배열과 비슷한 문자열의 특징 
    - 배열을 문자열로 만드는 join()
      ```js
        ['1', '2', '3'].join(); // '1, 2, 3'
        ['1', '2', '3'].join('x'); // '1x2x3' 
        ['1', '2', '3'].join(''); // '123' -> '1' + '2' + '3' 과 동일
      ```
    - 문자열을 배열로 만드는 split()
      ```js
        '2345'.split(); // ['2345']
        '2345'.split('x'); // ['2345']
        '2345'.split(''); // (4) ['2', '3', '4', '5']
        '2,3,4,5'.split(''); // (6) ['2', ',', '3', ',' '4', ',' '5']
        '2,3,4,5'.split(','); // (4) ['2', '3', '4', '5']
      ```
    - 문자열에 concat(), slice() 도 사용 가능 
      ```js
        '2345'.slice(1, 3); // '34'
        '2345'.slice(1, -1); // '34'
        '2345'.slice(1); //'345'
        '23'.concat('45'); // '2345'
        '23'.concat('4', '5'); //'2345'
        '23'.concat(['4', '5']); // '234,5'
      ```
  - flat()과 fill()
    - flat() : 배js열의 차원을 한단계 낮추는 기능
      ```
        const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        arrary.flat(); // [1, 2, 3, 4, 5, 6, 6, 7, 8]
        const array2 = [1, 2, 3, [[4, 5, 6], [7, 8, 9]]];
        array2.flat(); // [1, 2, 3, [4, 5, 6], [7, 8, 9]]
      ```
    - fill() : 빈 배열의 값을 채움
      ```js
        const empty = Array(5); 
        empty.fill(); // [undefined, undefined, undefined, undefined, undefined]
        empty.fill(1); // [1, 1, 1, 1, 1]
        empty.fill((v, i) => i + 1); // [1, 2, 3, 4, 5]
      ```
  - 중복 요소 삭제
    - set()
      ```js
        const a = new Set([1, 2, 3, 4, 3]) // (4) [1, 2, 3, 4]
        a.size; // 4 a의 요소 개수를 구할 때
        Array.from(new Set([1, 2, 3, 4, 3])) // (4) [1, 2, 3, 4] 다시 배열로 바꿔서 사용할 때
      ```
      
  - 함수를 인수로 받는 배열 메서드 
    - forEach() 과 map() : 부트캠프 과정 동안에는 for 대신 forEach 를 사용해보자!
      ```js
        const arr = [1, 5, 4, 2];
        arr.forEach((number, index) => {
          console.log(number, index);
        }); // 1 0, 5 2, 4 3, 2 4
        
        const number = [];
        for(let n = 1; n =< 5; n += 1) {
          numbers.push(n);
        } // [1, 2, 3, 4, 5]
        
        const numbers = Array(5).fill(1).map((v, i) => i + 1); // [1, 2, 3, 4, 5]
      ```
  - 배열에서 요소를 찾을 경우
    - find() : 찾는 즉시 종료. 처음 찾은 요소를 반환
      ```js
        const array = [1, 3, 5, 7];
        array.find((v, i) => {
          return v > 1;
        }); // 3
      ```
    - findIndex() : 찾는 즉시 종료. 처음 찾은 요소의 인덱스를 반환
      ```js
        const array = [1, 3, 5, 7];
        array.findIndex((v, i) => {
          return v > 1;
        }); // 1
        
        const array = [1, 3, 5, 7];
        array.findIndex((v, i) => {
          return v < 1;
        }); // -1
      ```
    - filter() : 찾는 모든 요소를 찾아서 반환
      ```js
        const array = [1, 3, 5, 7];
        array.filter((v, i) => {
          return v > 1;
        }); // 3, 5, 7
      ```
  - 그 외의 함수들
    - sort() : 배열을 정렬 할 때
      ```js
        const arr = [1, 5, 4, 2, 3];
        arr.sort((a, b) => a - b); // 오름차순
        arr;  // [1, 2, 3, 4, 5]
        arr.sort((a, b) => b - a) // 내림차순
        arr; // [5, 4, 3, 2, 1]
      ```
    - reduce() : 배열의 값들을 하나로 합침
      ```js
        [1, 2, 3, 4, 5].reduce((a, c) => {
          return a + c;
        }, 0); // 0을 초기값으로 설정 
        // 15
      ```
    - every() : 모든 요소가 조건에 해당하는지 확인
      ```js
        const array = [1, 3, 5, 7];
        array.every((value) => value !=- null); // true
      ```
    - some() : 하나의 요소라도 조건에 해당하는지 확인
      ```js
        const array = [1, 3, 5, 7];
        array.some((value) => value === null); // false
      ```
    
  ### 3.1 비동기와 타이머
  동기란 앞선 작업이 완전히 끝난 후에 작업이 실행되는 것을 의미합니다. 
  비동기란 앞선 작업이 끝나지 않았는데도 다른 작업이 실행되는 것을 의미합니다.
  자바스크립트에서 작성한 코드 순서와 다르게 실행되는 코드를 비동기라고 생각하면 됩니다.
  
    - setTimeout() : 지정한 시간 뒤에 코드가 실행
      ```js
        setTimeout(() => {
          console.log('2초 뒤에 실행됩니다.');
        }, 2000);
        // 2초 후에 실행됩니다.
        
        const callback = () => {
          console.log('2초 뒤에 실행됩니다.');
        }
        setTimeout(callback, 2000);
        // 2초 후에 실행됩니다.
      ```
    - setInterval() : 자체적으로 반복적인 기능을 수행
      ```js
        setInterval(() => {
          console.log('2초마다 실행됩니다.')
        }, 2000);
      ```
    - clearTimeout() 과 clearInterval() : setTimeout() 과 setInterval() 은 웹페이지를 닫을 때까지 계속 실행되므로 중간에 끄는 방법
      함수가 시간이나 조건이 만족되기 전 종료시키고 싶을때 사용
      ```js
        const 아이디 = setTimeout(함수, 밀리초);
        clearTimeout(아이디);
        const 아이디 = setInterval(함수, 밀리초);
        clearTimeout(아이디);
      ```
      
  ### 3.4 프로미스와 async/await 
  - 프로미스 (Promise) ? 비동기 작업이 성공하거나 실패할 때 그 결과를 전달하기 위해 사용하는 객체
    ```js
      const <프로미스 객체>  = new Promise((reslove, reject) => {
        resolve(); // 성공
        // 또는
        reject(); // 실패
      }); 
    ```
  - then, catch, finally 사용
    ```js
      myPromise
        .then((result) => {
          console.log("성공:", result); // 성공 시 실행될 부분
          return "첫 번째 then"; // 다음 then으로 전달될 값
        })
        .then((secondResult) => {
          console.log(secondResult);
          // 두 번째 then에서 추가적인 작업을 수행할 수 있습니다.
        })
        .catch((error) => {
          console.log("실패:", error); // 실패 시 실행될 부분
        })
        .finally(() => {
          console.log('무조건 실행'); // 성공이든 실패든 무조건 실행
        });
    ```
  - async / await 
    - await : promise 가 실행될 때까지 기다리라는 함수
      ```js
        const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
          setTimeout(resolve, ms);
        });
        await setTimeout(1000); 
        console.log('1초 뒤에 실행됩니다.');
        console.log('내가 나중에');
        // awaite 으로 인해 1초 뒤에 아래 콘솔창들이 찍힘
        // 1초 뒤에 실행됩니다. 
        // 내가 나중에
        
        await setTimeout(() => {
          console.log('1초 뒤에 실행됩니다.');
        })
        console.log('내가 먼저');
        // await 함수는 promise와 짝을 이루지 않으면 작동X
        // 내가 먼저 
        // 1초뒤에 실행됩니다.
      ```
    - async : await 을 함수 안에서도 사용할 경우, async을 함수 앞에 붙여 예약어로 만들어줘야 함
      ```js
        const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
          setTimeout(resolve, ms);
        });
        async function main() {
          await setTimeout(1000);
          console.log('1초 뒤에 실행됩니다.');
          console.log('내가 나중에');
        }
        main();
        // 1초 뒤에 실행됩니다. 
        // 내가 나중에 
        
        const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
          setTimeout(resolve, ms);
        });
        const main = async() => { // 화살표 함수는 위치가 달라지므로 주의
          await setTimeout(1000);
          console.log('1초 뒤에 실행됩니다.');
          console.log('내가 나중에');
        }
        main();
        // 1초 뒤에 실행됩니다. 
        // 내가 나중에 
      ```
    - try-catch 문으로 오류 처리
      ```js
        const p1 = new Promise((resolve, reject) => {
          reject('에러!');
        });
        try {
          await p1;
        } catch (error) {
          console.log(error);
        } finally {
          console.log('성공이든 에러든 마지막에 실행합니다.')
        }
        // 에러!
        // 성공이든 에러든 마지막에 실행합니다.
      ```
    
## 💡 느낀 점
  강의를 들을 때는 별도의 정리 없이 듣다가 한번 더 복습하면서 책을 읽고 정리를 하니,
  나도 몰랐던 헷갈렸던 점을 알 수 명확하게 짚고 넘어갈 수 있었습니다.
  또한 강의에서는 간략하게 설명하느라 몰랐던 작동의 원리에 대해서 이해하니 
  다른 부분들에 대한 이해가 더 잘 되는 것 같습니다.

## 💡 어려운 점
  promise 부분은 비교적 최근에 배운 내용이라 사실 개념을 읽을때는 이해가 가지만 
  어떤 상황에 어떻게 써야하는지 아직 명확한 기준이 서지 않습니다.