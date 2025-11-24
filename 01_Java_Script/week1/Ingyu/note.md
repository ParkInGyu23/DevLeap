# Week 1 개인 정리

## ✏️ 배운 내용 요약

# 2장

## 조건문

---

- if문

```js
if (조건식) {
    실행문
}

예시)
if (i < 5) {
    console.log('i는 5보다 작다');
}
```

조건식에 값이 true 라면 실행문을 실행

- else

```js
if (조건식) {
    실행문
} else {
    실행문
}

예시)
if (i < 5) {
    console.log('i는 5보다 작다');
} else {
    console.log('i는 5보다 크다');
}
```

조건식에 값이 true라면 실행문을, false라면 else의 실행문을 실행

- else if를 사용하면 여러 방향으로 분기 가능

```js
if (조건식) {
    실행문
} else if (조건식) {
    실행문
}
.
.
.

else {
    실행문
}

예시)
if (내용 추가 해야됨)
```

---

- switch

```js
switch (조건식) {
    case 비교 조건식:
    실행문
    break;
    .
    .
    .

    default:
        실행문 // 어느 경우의 수에도 일치하지 않는 case의 경우 default를 사용
}

예시)
switch (let data = 10){
    case 1:
        console.log('정답이 아닙니다.');
        break;
    case 5:
        console.log('정답이 아닙니다.');
        break;
    case 10:
        console.log('정답입니다.');
        break;
}
```

조건식과 비교 조건식 값이 일치(===) 한다면 해당하는 실행문을 실행

---

- 조건부 연산자 사용하기

```js
조건식 ? true 일때 실행 되는 식 : false일 때 실행되는 식

예시) 5 > 0 ? '정답입니다' : '오답입니다';
=> '정답입니다'
```

조건부 연산자는 조건에 따라 달라지는 값을 변수에 대입 할때 사용

```js
let value = 5 < 0 ? '정답입니다' : '오답입니다';
value;
=> '오답입니다'
```

조건부 연산자는 중첩해서 사용 가능

```js
let con1 = true;
let con2 = false;
let value = con1 ? con2 ? '둘 다 true' : 'con1 true' : 'con1 false';
value;
=> 'con1 true'

가독성을 위해 소괄호 연산자로 구분
let con1 = true;
let con2 = false;
let value = con1 ? (con2 ? '둘 다 true' : 'con1 true') : 'con1 false';
value;
=> 'con1 true'

가독성을 위해 들여쓰기로 구분
let con1 = true;
let con2 = false;
let value = con1
    ? con2
        ? '둘 다 true'
        : 'con1 true'
    : 'con1 false';
value;
=> 'con1 true'
```

## 반복문

---

- while

```js
while (조건식) {
    실행문
}

예시)
let i = 1;
while (i <= 100) {
    console.log('Hello, while');
    i++
}
=> (100) Hello, while
```

_1씩 증가, 감소는 i++, i+= / i-- i-=로 표현 가능_

---

- for

```js
for (시작(식, 또는 변수 선언); 조건식; 종료)
    실행문

예시)
for (let i = 0; i < 100; i++) {
    console.log('Hello, for');
}
=> (100) Hello, for

// 시작, 조건식, 종료식을 생략할 수 있음
for (let i = 0; ; i++)
for (; i <= 5; i++)
```

---

- continue

```js
반복문 내 특정 조건에서만 실행
let i = 0;
while (i < 0) {
    i++
    if (i % 2 === 0) {
        continue;
    }
    console.log(i);
}
=> 1 3 5 7 9
```

## 객체

객체란? **객체**(object)는 다양한 값을 모아 둔 또다른 값
객체의 종류는 **배열**(array), **함수**(function), **배열이나 함수가 아닌 객체**가 있다

**배열**

```js
[값1, 값2, 값3]

예시)
const fruits = ['사과', '오렌지', '배', '딸기'];
```

- 배열 index

```js
배열명[i]

예시)
const fruits = ['사과', '오렌지', '배', '딸기'];

fruits[0]; // 첫번째 값
=> '사과'
fruits[1]; // 두번째 값
=> '오렌지'
```

- 이차원 배열

```js
배열명 = [[배열],[배열]];

예시)
const arrayOfArray = [[1, 2, 3], [4, 5]];
```

- 배열 요소

```js
배열명 = [배열1,배열2,배열3]
각 배열의 값을 '요소(element)'라고 한다.

예시)
const everything = ['사과', 1, undefined, true, '배열', null];
const duplicated = ['가', '가', '가', '가', '가'];
const empty = [];
```

- 배열의 요소 개수, 값 찾기

```js
배열명.length

예시)
const everything = ['사과', 1, undefined, true, '배열', null];
everything.length;
=> 6

const findLastElement = ['a', 'b', 'c', 'd', 'e'];
findLastElement[findLastElement.length - 1];
=> 'e'

const findLastElement = ['a', 'b', 'c', 'd', 'e'];
findLastElement.at(4);
=> 'e'

findLastElement.at(-1);
=> 'e'
```

- 배열의 요소 수정 및 추가

```js
배열명[인덱스] = 값;

예시)
const target = ['a', 'b', 'c', 'd', 'e'];
target[5] = 'f'; // 마지막 열 추가
target;
=> ['a', 'b', 'c', 'd', 'e', 'f']

const target = ['a', 'b', 'c', 'd', 'e'];
target[target.length] = 'f'; // 마지막 열 추가
target;
=> ['a', 'b', 'c', 'd', 'e', 'f']

const target = ['나', '다', '라', '마', '바'];
target(2) = '가'; // 세번째 열 수정
target;
=> ['나', '다', '가', '마', '바']

const target = ['가', '나', '다', '라', '마'];
target.[target.length-1] = ('바'); // 마지막 열 수정
target;
=> ['가', '나', '다', '라', '바']
// target.at(index) at()은 위치가 아닌 값을 나타내기때문에 사용 불가능

const target = ['나', '다', '라', '마', '바'];
target.unshift('가'); // 첫번째 열 추가
target;
=> ['가', '나', '다', '라', '마', '바']

const target = ['가', '나', '다', '라', '마'];
target.push('바'); // 마지막 열 추가
target;
=> ['가', '나', '다', '라', '마', '바']
```

- 배열의 요소 삭제

```js
배열명.함수

예시)
const target = ['가', '나', '다', '라', '마'];
target.pop(); // 마지막 요소 삭제
target;
=> ['가', '나', '다', '라'];

const target = ['가', '나', '다', '라', '마'];
target.shift(); // 첫번째 요소 삭제
target;
=> ['나', '다', '라', '마'];

const target = ['가', '나', '다', '라', '마'];
target.splice(2, 2); // index 2에서부터 요소 2개를 삭제
target;
=> ['가', '나', '마'];

const target = ['가', '나', '다', '라', '마'];
target.splice(1); // index 1에서부터 모든 요소를 삭제
target;
=> ['가'];

const target = ['가', '나', '다', '라', '마'];
target.splice(1, 3, '타', '파'); // index 1에서부터 요소 3개를 삭제하고 '타','파'를 추가
target;
=> ['가', '타', '파', '마'];

const target = ['가', '나', '다'];
target.splice(1, 0, '하'); // index 1에서부터 요소 0개를 삭제하고 '하'를 추가
target;
=> ['가', '하', '나', '마'];
```

- 배열에서 요소 찾기

```js
includes() // 요소 존재 여부 찾기
indexOf() // 앞에서부터 인덱스 위치 찾기
lastIndexOf() // 뒤에서부터 인덱스 위치 찾기

예시)
const target = ['가', '나', '다', '라', '마'];
const result = target.includes('다');
result;
=> true

const target = ['가', '나', '다', '라', '마'];
const result2 = target.includes('카');
result2;
=> false

const target = ['라', '나', '다', '라', '마'];
const result = target.indexOf('다'); // 앞에서부터 '다' 찾기
result;
=> 2
const result2 = target.lastIndexOf('라'); // 뒤에서부터 '라' 찾기
result2;
=> 3
const result3 = target.indexOf('가');
result3;
=> -1

주어진 값이 배열에 존재하면 true, 존재하지 않으면 false
배열 안에 존재하지 않는 값은 -1을 반환
indexOf, lastIndexOf로 요소를 찾을땐 자료형도 일치 해야한다.
```

- 배열 자르고 합치기

```js
배열.slice(시작 인덱스, 종료 인덱스); // 배열 요소 자르기
배열.concat(값1, 값2, ...); // 배열 요소 합치기

예시)
['2', '3', '4', '5'].slice(1);
=> ['3', '4', '5']
['2', '3', '4', '5'].slice(1, 3);
=> ['3', '4']
['2', '3', '4', '5'].slice(2, 3);
=> ['4']
['2', '3', '4', '5'].slice(1, -1);
=> ['3', '4']
['2', '3', '4', '5'].slice();
=> ['2', '3', '4', '5']

[1, 2].concat([3, 4]);
=> [1, 2, 3, 4]
[1, 2].concat(3, 4);
=> [1, 2, 3, 4]
[1, 2].concat([3, 4], 5, 6);
=>[1, 2, 3, 4, 5, 6]
```

- etc

```js
문자열[인덱스]; // 문자열의 인덱스 값 반환
문자열.length; // 문자열의 길이 반환

예시)
'hello'[0];
=> 'h'
'hello'[1];
=> 'e'

'hello'.length;
=> 5

'hello'[4];
=> 'o'
'hello'['hello'.length - 1];
=> 'o'
'hello'.at(-1);
=> 'o'
```

- flat과 fill

```js
flat(); // 배열의 찬원을 한 단계 낮추는 기능
fill(); // 배열의 요소 채우기

예시)
const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
array.flat();
=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
const array2 = [1, 2, 3, [[4, 5, 6], [7, 8, 9]]];
array2.flat();
=> [1, 2, 3, [4, 5, 6], [7, 8, 9]];

const empty = Array(5);
empty;
=> [,,,,]
empty.fill();
=> [undefined, undefined, undefined, undefined, undefined]
empty.fill(1);
=> [1, 1, 1, 1, 1]
empty.fill().map((v, i) => i + 1);
=> [1, 2, 3, 4, 5]
```

- 중복 요소 제거

```js
new Set([배열]);

예시)
[1, 2, 1, 3, 3, 5]
new Set([1, 2, 1, 3, 3, 5]);
=> [1, 2, 3, 5]
new Set('가가나나다다');
=> ['가', '나', '다']
new Set('121533');
=> ['1', '2', '5', '3']

const a = new Set([1, 2, 1, 3, 3, 5]);
a.size; // 요소의 개수 구하기
=> 4

Array.from(new Set([1, 2, 1, 3, 3, 5])); // 배열로 바꾸기
=> [1, 2, 3, 5]

Set은 배열처럼 보이지만 배열이 아니다.
```

---

**함수**

- 함수 선언

```js
1. 익명 함수
function() {}
2. 함수 표현식
function 이름() { 실행문 }
3. 화살표 함수
() => { 실행문 }
() => 반환식

예시)
function a() {}
const b = function() {}
const c = () => {}
```

- 함수 호출

```js
function a() {};
a(); // a 함수 호출

예시)
function test() {
    console.log('Hello');
}
test();
=>Hello
```

- 반환값

```js
function a() {
    return 반환값;
}

예시)
function a() {
    return 10;
}
a();
=> 10

function a(){
    return 10;
}
const b = a();
b;
=> 10

return 반환값을 사용하지 않았다면 undefined
** return 함수의 실행을 멈추는 역할도 한다.
```

- 매개변수와 인수

```js
function a(parameter){
    console.log(parameter);
}
a('argument');
=> argument
매개변수(parameter), 인수(argument)

예시)
function a(x, y){
    console.log(x, y);
}
a('Hello', 'JS');
=> Hello JS

function add(x, y){
    return x + y;
}
add(3, 5);
=> 8
add(8, 7);
=> 15
```

---

**객체**

- 객체 리터럴

```js
const 객체 = {
    속성 이름1(key): 속성 값1(value),
    속성 이름2(key): 속성 값2(value),
    ...
}

예시)
const myself = {
    name: '박인규',
    year: 1994,
    month: 07,
    date: 23,
    gender: 'M',
}
```

- 객체 속성 접근

```js
변수.속성 접근
변수['속성'] 접근

예시)
const myself = {
    name: '박인규',
    year: 1994,
    month: 07,
    date: 23,
    gender: 'M',
}
myself.name;
=> '박인규'
myself['name'];
=> '박인규'
myself.month;
=> 07
myself['month'];
=> 07
```

- 객체 속성 추가/수정/삭제

```js
변수.속성 = 값; // 추가 or 수정
delete 변수.속성; // 삭제

예시)
myself.address = '경기도' // 내용이 없다면 추가
myself.address;
=> '경기도'

myself.address = '시흥' // 내용이 있었다면 수정
myself.address;
=> '시흥'

delete myself.year;
myself.year;
=> undefined
```

- 객체 메소드 이해하기

```js
객체의 속성 값이 함수라면 메소드 라고 한다.

예시)
const debug = {
    log: function(value) {
        console.log(value);
    },
};
debug.value('Hello, Method!');
=> Hello, Method!

// 위 객체를 축약
const debug = {
    log(value) {
        console.log(value);
    },
};
```

- 객체 참조와 복사

```js
예시)
const a = { name: 'ingyu' };
const b = a;
b.name;
=> 'ingyu'
a.name = 'hero';
b.name;
=> 'hero'
변수 a와 b가 같은 객체를 '참조'하고 있다고 표현 or
변수 a와 b 그리고 객체 간에 '참조' 관계가 있다고 표현

let a = 'ingyu';
let b = a;
a = 'hero';
b;
=> 'ingyu'
참조 관계가 생기지 않는 상황을 '복사' 라고 표현
└ 어떤 값을 다른 변수에 대입할 때 기존 값과 참조 관계가 끊기는것을 의미
객체가 아닌 값(문자열, 숫자, 불린 값, null, undefined)
```

- 얕은 복사, 깊은 복사

```js
얕은복사 - 외부 객체만 복사되고 내부 객체는 참조 관계를 유지하는 복사
깊은복사 - 내부 객체까지 참조 관계가 끊기면서 복사

얕은 복사를 할 때는 ... 연산자를 사용(스프레드 문법)
ex) 배열이라면 [...배열], 객체라면 {...객체}

const array = [{j: 'k'}, {l: 'm'}];
const shallow = [...array]; // 얕은 복사
console.log(array === shallow); // false
console.log(array[0] === shallow[0]); // true

깊은 복사는 JSON.parse(), JSON.stringify() 메소드 사용
ex) JSON.parse()는 문자열을 객체로 JSON.stringify()는 객체를 문자열로

const array = [{j: 'k'}, {l: 'm'}];
const deep = JSON.parse(JSON.stringify(array)); // 깊은 복사
console.log(array === shallow); // false
console.log(array[0] === shallow[0]); // false
```

- 구조분해 할당

```js
여러 속성을 한번에 변수에 대입할때 사용

예시)
const obj = { a: 1, b: 2 };
const a = obj.a;
const b = obj.b;
const { a, b } = obj; // 위 두줄과 같은 내용으로 한줄로 표현 가능
a;
=> 1

const array = [1, 2, 5];
const one = array[0];
const two = array[1];
const five = array[2];
const [one, two, five] = array; // 위 세줄과 같은 내용으로 한줄로 표현 가능
two;
=> 2

let a = 5; // a와 b를 [a, b] 배열로 만든 뒤 구조분해 할당으로
let b = 3; // 첫번째 요소는 a 두번째 요소는 b에 대입
[b, a] = [a, b];
=> [5, 3]
```

- 배열 메소드

```js
- forEach()
 for 문을 사용하지 않고 배열에서 제공하는 메서드로 반복문 역할을 수행
 형식: 배열.forEach(함수);

예시)
const arr = [1, 5, 4, 2];
arr.forEach((number, index) => {
    console.log(number, index);
});
=>
1 0
5 1
4 2
2 3

** (nunber, index) => {} 처럼 다른 메소드에 인수로 넣었을 때 실행되는 함수를 '콜백 함수' 라고 한다.

const arr = [1, 5, 4, 2];
arr.forEach((v, i) => {
    console.log(v, i)
});
위의 내용에서 첫번째 매개변수 v는 배열의 요소, 두번째 매개변수 i는 요소의 인덱스이다.

- map()
 배열 요소들을 일대일로 짝지어 다른 값으로 변환해 새로운 배열을 반환하는 메서드
 형식: 배열.map(콜백 함수);

예시)
const numbers = Array(5).fill(1).map((v, i) => i + 1);
numbers;
=> [1, 2, 3, 4, 5]
// Array(5) 길이 5배열 생성, fill(1)로 요소를 모두 1로
// 콜백 함수의 반환값은 i + 1
// i는 콜백 함수의 두번째 매개변수인 요소의 인덱스
// 인덱스에 1을 더한 값으로 바꾸라는 뜻
const array = [1, 3, 5, 7];
const newArray = array.map((v, i) => {
    return v * 2;
});
console.log(array);
=> [1, 3, 5, 7]
console.log(newArray);
=> [2, 6, 10, 14]

- find(), findIndex(), filter()
 배열의 요소 자세하게 찾기
형식: 배열.find(콜백 함수);, 배열.findIndex(콜백 함수);, 배열.filter(콜백 함수);

* find() - 콜백 함수의 반환값이 true인 요소를 찾는 메서드
 const array = [1, 3, 5, 7];
 array.find((v, i) => {
    return v > 1;
 });
 => 3 // [1, 3, 5, 7] 배열 중 3에서 true를 반환 했기 때문에 더이상 동작 하지 않음

* findIndex() - 찾는 요소의 인덱스를 반환하고 찾지 못했다면 -1을 반환
 const array = [1, 3, 5, 7];
 array.findIndex((v, i) => {
    return v > 1;
 });
 => 1 // [1, 3, 5, 7] 배열 중 1번 인덱스

* filter() - 콜백 함수의 반환값이 true가 되는 요소를 찾지만 해당하는 모든 요소를 찾아 배열로 반환
 const array = [1, 3, 5, 7];
 array.filter((v, i) => {
    return v > i;
 });
 => [3, 5, 7] // [1, 3, 5, 7] 배열 중 false를 제외 한 모든 요소를 반환

- sort()
 배열 요소들을 규칙대로 정렬. 비교 함수의 반환값에 따라 배열을 정렬하는 메서드
 형식: 배열.sort(비교 함수);

 예시)
 const arr = [1, 5, 4, 2, 3];
 arr.sort((a, b) => a - b);
 arr;
 => [1, 2, 3, 4, 5];

 const arr = [1, 5, 4, 2, 3];
 arr.sort((a, b) => b - a);
 arr;
 => [5, 4, 3, 2, 1];

 const arr = [1, 5, 4, 2, 3];
 const shallow = [...arr];
 shallow.sort((a, b) => b - a);
 arr;
 => [1, 5, 4, 2, 3]
 shallow;
 => [5, 4, 3, 2, 1]
 // 원본 배열을 남겨 두고 정렬하고 싶다면 얕은 복사 후 sort()

- reduce()
 배열에 있는 반복 메서드의 일종으로, 배열의 요소들을 하나의 값으로 합치고 초기 값이 없으면
 배열의 첫번째 요소가 초기 값이 된다.
 형식:
 배열.reduce((누적값, 현재값) => {
    return 새로운 누적 값;
 }, 초기값);

 예시)
 [1, 2, 3, 4, 5].reduce((a, c) => {
    return a + c;
 }, 0);
 => 15 // 초기 값 0이 첫번째 누적값(a)가 되고, 배열의 첫번째 요소가 현재값(c)이 된다.

- every(), some()
 배열에서 모든 요소가 조건에 해당하는지 판단하려면 every(), 하나라도 조건에 해당하는지 판단하려면 some()
 형식:
 배열.every(조건 함수);
 배열.some(조건 함수);

 예시)
 const array = [1, 3, 5, 7];
 array.every((value) => value !== null);
 => true // 요소를 끝까지 찾아도 null이 없기 때문에 true 반환

 const array = [1, 3, 5, 7];
 array.every((value) => value === null);
 => false // 요소 1에서부터 1 === null이 false 이므로 반복을 중단

 const array = [1, 3, null, 7];
 array.some((value) => value === null);
 => true // 인덱스 2에 null이 있기 때문에 true 반환 후 반복 중단
```

---

# 3장

## 비동기와 타이머

**동기**란 앞선 작업이 완전히 끝난 후에 다음 작업이 실행 되는 것을 의미하고, **비동기**란 앞선 작업이 끝나지 않았음에도 다음 작업이 실행 되는것을 의미 한다. 작성한 코드 순서와 다르게 실행되는 코드를 '비동기'라고 생각하면 된다.

- setTimeout

```js
- setTimeout()
지정한 시간 뒤에 코드가 실행 되게 하는 함수
형식: setTimeout(함수, 밀리초);

예시)
setTimeout(() => {
    console.log('2초 후에 실행됩니다.');
}, 2000);
=> 2초 후에 실행됩니다. // 2000밀리초 후에 실행

const callback = () => {
    console.log('2초 후에 실행됩니다.');
}
setTimeout(callback, 2000);
=> 2초 후에 실행됩니다. // 2000밀리초 후에 실행 되지만 외부에서 가져올수도 있다.

console.log(1);
setTimeout(() => {
    console.log(2);
}, 2000);
console.log(3);
=> 1, 3, 2 // 1, 3, (2초 기다리고)2 출력
```

- setInterval

```js
 - setInterval()
 지정한 시간마다 주기적으로 지정한 함수를 실행하는 함수
 형식: setInterval(함수, 밀리초);

 예시)
 setInterval(() => {
    console.log('2초마다 실행됩니다.');
 }, 2000);
 => 2초마다 실행됩니다. // 2초마다 한번씩 메세지가 출력
```

- clearTimeout, clearInterval

```js
setTimeout, setInterval 함수는 웹 페이지를 닫을 때까지 계속 실행 되므로 실행 취소를 시키는 함수이다.
형식:
const 아이디 = setTimeout(함수, 밀리초);
clearTimeout(아이디);

const 아이디 = setInterval(함수, 밀리초);
clearInterval(아이디);

예시)
const timerId = setTimeout(() => {
   console.log('0초 뒤에 실행됩니다.');
}, 0);
console.log('내가 먼저');
clearTimeout(timerId);
=> '내가 먼저' // 비동기 함수이기 떄문에 console.log와 clearTimeout 함수가
              // 먼저 실행 되어 콜백 함수는 실행 되기 전에 취소
```

---

## 스코프와 클로저

함수가 선언된 위치에 따라 접근할 수 있는 값이 달라지는 현상을 **정적 스코프**라고 하며, 선언된 위치가 아니라 호출된 위치에 따라 접근할 수 있는 값이 달라지는 현상을 **동적 스코프**라고 한다.
자바스크립트는 정적 스코프를 따른다.

- 함수 스코프

```
함수를 경계로 접근 가능 여부가 달라지며, 함수가 끝날 때 함수 내부의 변수도 같이 사라진다.
=> var
```

- 블록 스코프

```
함수에서 볼 수 있는 중괄호{}를 의미 하며, 블록이 끝날 때 내부의 변수도 같이 사라진다.
=> let, const
```

- 클로저

```js
외부 값에 접근하는 함수이며 외부 값에 접근할 수 있는지 판단하는 기준은 '스코프'이다.

예시)
const a = 1;
const func = () => {
    console.log(a);
};
// fun() 함수는 자신의 외부에 있는 변수 a를 사용하고 있어 클로저 라고 한다.
```

---

## 호출 스택과 이벤트 루프

**호출 스택**은 동기 코드를 담당하며 **이벤트 루프**는 비동기 코드를 담당한다.

- 백그라운드

```
타이머를 처리하고 이벤트 리스너를 저장하는 공간

> 타이머 함수가 실행되면 백그라운드에서 시간을 재다가 지정 시간이 되면 콜백 함수를 태스크 큐로 보낸다.
> 추가한 이벤트를 저장했다가 이벤트가 발생하면 콜백 함수를 태스크 큐로 보낸다.
```

- 태스크 큐

```
실행될 콜백 함수들이 대기하고 있는 공간

> 함수를 직접 실행하지 않고 들어온 순서대로 대기 하고 있다.
```

- 이벤트 루프

```
태스크 큐에서 호출 스택으로 함수를 이동시키는 존재
> 호출 스택이 비어 있으면 이벤트 루프는 태스크 큐에서 함수를 하나씩 꺼내 호출 스택으로 옮긴다.
```

호출 스택, 백그라운드, 태스크 큐, 이벤트 루프의 개념도 이해 필요

---

## 프로미스와 async/await

- 프로미스

```js
Promise라는 클래스를 사용하는 문법이며, 실행된 결과 값을 저장하고 있으며 언제든지 필요할 때 그 값을 꺼낼 수 있는 객체

> new를 붙여 Promise 클래스를 호출하면 프로미스 객체를 생성한다.
> 인수로 콜백 함수를 사용하는데 resolve()와 reject()가 있다.
형식:
const (프로미스 객체) = new Promise((resolve, reject) => {
    resolve(); // 프로미스 성공
    // 또는
    reject(); // 프로미스 실패
});

- 프로미스 객체 then(), catch()
형식:
프로미스 객체.then(콜백 함수);
프로미스 객체.catch(콜백 함수);

> then()의 콜백 함수는 resolve(), catch()의 콜백 함수는 reject()
예시)
const p1 = new Promise((resolve, reject) => {
    resolve('success');
});
p1.then((data) => console.log(data));
=> success

const p2 = new Promise((resolve, reject) => {
    reject('error');
});
p2.catch((error) => console.log(error));
=> error
// reject()를 호출 했는데 catch() 메서드를 붙이지 않으면 에러 메세지 발생
```

- async / await

  - await - 프로미스가 resolve() 될 때까지 기다리는 함수

  ```js
    const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
          setTimeout(resolve, ms);
        });
    await setTimeout(1000);
    console.log('1초 뒤에 실행됩니다.');
    console.log('내가 나중에');
    => 1초 뒤에 실행됩니다.
    => 내가 나중에
    // await으로 인해 순서대로 출력
  ```

  - async - await은 함수 내부에서 사용 할 수 없어 함수 앞에 예약어를 붙여 async함수로 전환 해야 한다.

  ```js
  const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
          setTimeout(resolve, ms);
        });
  async function main() {
    await setTimeoutPromise(1000);
    console.log('1초 뒤에 실행됩니다.');
    console.log('내가 나중에');
  }
  main();
  => 1초 뒤에 실행됩니다.
  => 내가 나중에
  ```

  - try-catch - 에러 처리 메서드

  ```js
  const p1 = new Promise((resolve, reject) => {
    reject('에러!');
  });
  try {
    await p1;
  } catch (error) {
    console.log(error);
  }
  => 에러!

  const p1 = new Promise((resolve, reject) => {
    reject('에러!');
  });
  try {
    await p1;
  } catch (error) {
    console.log('에러인 경우');
  } finally {
    console.log('성공이든 에러든 마지막에 실행됩니다');
  }
  => 에러인 경우
  => 성공이든 에러든 마지막에 실행됩니다.
  ```

  ## 💡 느낀 점

  강의를 들으면서 이해가 잘 안됐던 부분들을 책으로 읽어보고 다시 한번 정리를 해보니
  '아 이랬구나' 하면서 제대로 이해 할 수 있는 계기가 된 것 같습니다.
  단순하게 알고 넘어가는것 보다 이렇게 정리를 해보면서 복습도 되고 머리로는 알고 있지만
  설명하기 어려웠던? 부분들이 잘 정리가 되는것 같습니다.

  ## 💡 어려운 점

  아무래도 전체적으로 개념적인 부분들이다 보니 실무에선 어떠한 상황에서 사용해야 하는지
  기준? 같은게 있으면 좋을것 같습니다.
