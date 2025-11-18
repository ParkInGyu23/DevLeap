<style>
body {
  background: #000;
  color: #fff;
}
</style>

# Week 1 개인 정리

## ✏️ 배운 내용 요약

## 조건문: 주어진 조건에 따라 코드를 실행하거나 실행하지 않는 문

## if 조건문

```js
if (조건식) {
  실행문;
}
```

조건식이 참인 값이면 내부의 동작문이 실행되고, 거짓인 값이면 동작문이 실행되지 않는다.

- ## else (조건식)<br>
  if 조건식이 false이고, else if 조건식이 true이면 else if 실행문 실행
- ## else<br>
  if 조건식이 false이고, else if 조건식이 false이면 else 실행문 실행

## switch 조건문

```js
  switch (조건식) {
  case 비교 조건식:
  실행문;
  break;
  }
```

## 조건부 연산자<br>

```js
  조건식 ? 참일 때 실행되는 식 : 거짓일 때 실행되는 식
```

## 반복문 : 반복 작업을 처리하는 문

- ## while 반복문<br>

```js
while (조건식) {
  실행문;
}
```

- ## for 반복문

```js
for (시작(식 또는 변수선언); 조건식; 종료식) {
  실행문
}
```

- **break**<br>
  반복문 도중 특정 값이 되었을 때 반복을 멈추게 함
- **continue**<br>
  반복문 도중 특정 값은 건너뛰고 반복을 진행함

## 객체: 다양한 값을 모아 둔 또 다른 값

## 배열<br>

```js
[값1, 값2, ...]
```

인덱스로 각 값 호출 가능 [0], [1], ...<br>
배열 안에 다른 배열이나 변수를 넣을수도 있음

```js
const arrayOfArray = [
  [1, 2, 3],
  [4, 5],
]; // 이차원 배열
arrayOfArray[0]; /// (3) [1, 2, 3]
const a = 10;
const b = 20;
const variableArray = [a, b, 30];
variableArray[1]; // 20
```

배열의 값은 중복되어도 되고, 아무런 값이 없어도 만들 수 있음<br>
배열의 값은 **요소**라고 함

```js
const everything = ['사과', 1, undefined, true, '배열', null];
const duplicated = ['가', '가', '가', '가', '가'];
const empty = [];
```

배열의 요소 개수를 구하려면 .length를 통해 구할 수 있음(빈 값도 포함됨)

```js
const emptyValue = [null, undefined, false, '', NaN];
emptyValue.length; // 5
```

at()을 사용해서 더 간단하게 인덱스에 접근할 수 있음

```js
const findLastElement = ['a', 'b', 'c', 'd', 'e'];
findLastElement.at(4); // 'e'
finrLastElement.at(-1); // 'e'
```

## 배열의 메소드

- **배열.unshift()**<br>
  배열의 맨 앞에 새로운 요소 추가
- **배열.push()**<br>
  배열의 맨 뒤에 새로운 요소 추가
- **배열.pop()**<br>
  배열의 마지막 요소 삭제
- **배열.shift()**<br>
  배열의 첫번째 요소 삭제
- **배열.splice(parameter1, parameter2, parameter3)**<br>
  배열의 중간 요소 삭제(parameter1 = 인덱스(위치), parameter2 = 삭제할 갯수 parameter3 = 추가할 요소)<br>
  parameter2, 3은 생략 가능, parameter1 위치부터 배열 끝까지 모두 삭제
- **배열.includes()** 자료형 일치해야함<br>
  배열에서 특정 값을 찾아서 불린 값으로 출력
- **배열.indexOf()** 자료형 일치해야함, 없는 값은 -1로 출력<br>
  배열에서 특정 값의 위치를 앞에서부터 찾아서 인덱스 번호로 출력
- **배열.lastIndexOf()** 자료형 일치해야함, 없는 값은 -1로 출력<br>
  배열에서 특정 값의 위치를 뒤에서부터 찾아서 인덱스 번호로 출력
- **배열.slice(parameter1, parameter2)**<br>
  배열에서 parameter1 인덱스부터 parameter2 인덱스 전까지 잘라 새로운 배열로 만듬
- **배열.concat(parameter1, parameter2, ...)**<br>
  배열 or 특정 값들을 합쳐 새로운 배열로 만듬
- **배열.join()**<br>
  배열을 문자열로 만듬 parameter 값이 비어 있으면 쉼표로 구분 넣으면 배열의 값 중간중간에 parameter 값 추가
- **문자열.split()**<br>
  문자열을 배열로 만듬 parameter 값에 소괄호를 넣으면 개별 문자로 쪼개져 배열이 됨
- **Array(parameter1)**<br>
  parameter1 만큼의 요소를 갖는 빈 배열 생성
- **배열.fill(parameter1)**<br>
  빈 배열을 parameter1 요소로 채움, parameter 미입력시 undefined로 채움, map과 조합해서 사용하면 순서가 있는 배열을 쉽게 만들 수 있음
- **new Set(배열 or 문자열)**<br>
  중복을 제거해서 객체로 반환
- **Array.from(new Set)**<br>
  new Set을 통해 객체로 반환된 것을 다시 배열로 반환

## 이차원 배열

- **배열[index][index]**
- **배열.flat()**<br>
  n차원 배열을 n-1차원 배열로 낮춤

## 함수: 특정한 작업을 수행하는 코드<br>

- **함수선언문**

```js
fuction 함수이름() {실행문}
```

- **함수 표현식**

```js
(상수 또는 변수) 함수이름 = function() {실행문}
```

- **화살표 함수**

```js
() => {
  실행문;
};
//또는
() => 반환식;
```

## 객체 리터럴: 여러 변수를 하나의 변수로 묶을 때 사용<br>

- **delete 변수.속성;**<br>
  객체의 숙성을 삭제, 삭제한 속성에 접근하면 undefined 출력

## 구조분해 할당: 객체의 속성 이름과 대입하는 변수명이 같을 때 사용<br>

## 유사 배열 객체: 배열과 헷갈리게 생긴 객체, index로 접근 가능, length 사용 가능하나 배열 메서드 사용 불가

- **Array.from()**<br>
  Array.from() 매서드 사용해서 배열로 바꾸면 배열 메서드 사용 가능

## 함수를 인수로 받는 배열 메서드<br>

- **forEach()**<br>
  for 문을 사용하지 않고 배열에서 반복문 역할 수행

```js
배열.forEach(함수);
```

콜백 함수의 매개변수인 parameter1과 parameter2는 각각 배열의 요소, 요소의 인덱스

- **map()**<br>
  배열 요소들을 일대일로 짝지어서 다른 값으로 변환해 새로운 배열을 반환

```js
배열.map(<콜백 함수>);
```

- **find(), findIndex(), filter()**<br>
  indexOf(), includes() 보다 값을 더 자세히 찾을 수 있는 배열 메서드

```js
배열.find(<콜백 함수>);
배열.findIndex(<콜백 함수>);
배열.filter(<콜백 함수>);
```

find()는 콜백 함수의 반환값이 true인 요소를 찾는 메서드, true가 여러개일 경우 처음 찾은 요소를 반환<br>
findIndex()는 찾은 요소의 인덱스를 반환하고, 찾지 못했다면 -1를 반환<br>
filter()는 find()처럼 콜백 함수의 반환값이 true가 되는 요소를 찾지만, 모든 요소를 찾아 결과를 배열로 반환

- **sort()**<br>
  배열 요소들을 규칙대로 정렬

```js
배열.sort(<비교 함수>);
```

배열.sort((a, b) => a - b) // 내림차순 정렬
배열.sort((a, b) => b - a) // 오름차순 정렬

- **reduce()**<br>
  배열의 요소들을 하나의 값으로 합침, 초기 값이 없으면 배열의 첫 번째 요소가 초기값이 됨

```js
배열.reduce((<누적 값>, <현재 값>) => {
  return <새로운 누적 값>;
}, <초기 값>)
```

- **every(), some()**<br>
  배열에서 모든 요소가 조건에 해당하는지 판단하려면 every(), 하나라도 조건에 해당하는지 판단하려면 some()

```js
배열.every(<조건 함수>);
배열.some(<조건 함수>);
```

## 클래스 : 객체를 생성하기 위한 템플릿(ES2015 추가)<br>

new, prototype, this

```js
class <클래스 이름> {
  constructor(매개변수1, 매개변수2, ...) {
    //생성자 함수 내용
  }
}
```

- **자식 클래스**<br>

```js
class <자식 클래스> extends <부모 클래스> {
  constructor(매개변수1, 매개변수2, ...) {
    super(인수1, 인수2, ...); // 부모 클래스의 생성자 호출
    this.매개변수 = 값; // 자식 클래스만의 속성
  }
  메서드() { // 부모 클래스의 메서드만 호출하면 생략 가능
    super.메서드() // 부모 클래스의 메서드 호출
    // 부모 클래스 메서드 호출 이후의 동작
  }
  메서드(매개변수1, 매개변수2, ...) {
    // 자식 클래스만의 동작
  }
}
```

## 비동기와 타이머

-**setTimeout()**<br>
첫 번째 인수는 특정 작업 이후에 추가로 실행되므로 콜백 함수로 볼 수있음, 두 번째 인수는 밀리초 단위, 첫 번째 인수로 넣은 함수가 지정한 밀리초 후에 실행됨

```js
setTimeout(함수, 밀리초);
```

-**setInterval()**<br>
지정한 시간마다 주기적으로 지정한 함수를 실행

```js
setInterval(함수, 밀리초);
```

- **clearTimeout(), clearInterval()**<br>
  각각 setTimeout() 함수와 setInterval() 함수의 실행을 취소함

```js
const 아이디 = setTimeout(함수, 밀리초);
clearTimeout(아이디);
const 아이디 = setInterval(함수, 밀리초);
clearInterval(아이디);
```

단, clearTimeout() 함수는 setTimeout() 함수의 콜백 함수가 아직 실행되지 않았을 때만 취소 가능

## 스코프와 클로저

- **블록 스코프와 함수 스코프**<br>
  var는 함수 스코프, let, const는 블록 스코프를 가짐

## 호출 스택과 이벤트 루프

- **호출 스택**<br>
  동기 코드를 담당
- **이벤트 루프**<br>
  비동기 코드를 담당
- **비동기 코드의 절차**<br>
  **백그라운드(background)**는 타이머를 처리하고 이벤트 리스너를 저장하는 공간, 타이머, 이벤트를 저장했다가 이벤트가 발생하면(지정 시간이 되면) 콜백 함수를 태스크 큐로 보냄<br>
  **태스크 큐(task queue)**는 실행될 콜백 함수들이 대기하고 있는 공간, 태스크 큐에 먼저 들어온 함수부터 실행되지만 태스크 큐에서 실행되는 것은 아님<br>
  태스크 큐에서 호출 스택으로 함수를 이동시키는 존재가 **이벤트 루프**, 호출 스택이 비어있으면 태스크 큐에서 함수를 들어온 순서대로 하나씩 꺼내 호출 스택으로 옮김<br>
  **호출 스택**으로 이동한 함수는 그제야 실행됨, 실행이 완료된 함수는 호출 스택에서 빠져나가게 되고, 호출 스택이 비면 이벤트 루프는 태스크 큐에 있는 다음 함수를 호출 스택으로 옮김

## 재귀함수(recursive function): 어떤 함수가 내부에서 자기 자신을 다시 호출하는 함수

## 프로미스와 async/await

- **프로미스**<br>
  Promise라는 클래스를 사용하는 문법, new를 붙여 Promise 클래스를 호출하면 프로미스 객체를 생성, 인수로 콜백 함수를 넣음, 콜백 함수의 매개변수로는 resolve(), reject(), 각각 성공과 실패, 둘다 호출하면 먼저 호출한 함수만 유효함

```js
const <프로미스 객체> = new Promise((resolve, reject) => {
  resolve() // 프로미스 성공
  // 또는
  reject() // 프로미스 실패
})
```

프로미스 객체에는 then() 메서드나 catch() 메서드를 붙일 수 있음

```js
<프로미스 객체>.then(<콜백 함수>);
<프로미스 객체>.catch(<콜백 함수>);
```

then의 콜백 함수는 resolve() 함수를 호출할 때 실행되고, catch()의 콜백 함수는 reject() 함수를 호출할 때 실행됨, resolve()의 인수로 전달한 값은 then() 콜백 함수의 매개변수로 전달되고, rejcet()의 인수로 전달한 값은 catch() 콜백 함수의 매개변수로 전달됨

## 💡 느낀 점

## 💡 어려운 점
