# Week 2 개인 정리
## ✏️ 배운 내용 요약

## fetch
 - fetch() 기본 문법
 ```js
 const res = await fetch('url');

 // 리스폰스 상태 코드
 res.status;

 // 리스폰스 헤더
 res.headers;

 // 리스폰스 바디
 await res.json(); // JSON 문자열일 파싱해서 자바스크립트 객체로 변환
 await res.text(); // 문자열 그대로 가져옴
 ```
 res.json() 메소드는 바디의 JSON 문자열을 파싱해서 자바스크립트 객체로 변환해 주고 res.text() 메소드는 바디의 내용을 문자열로 가져온다. 바디의 내용이 JSON 형식이 아닌데 res.json() 메소드를 사용하면 파싱 오류 발생

- fetch() 사용 예시
```js
const res = await fetch('https://learn.codeit.kr/api/color-serveys');
const data = await res.json();
console.log(data);

=>
{ count: 51,
  next: 'https://learn.codeit.kr/api/color-surveys/?offset=10&limit=10',
  previous: null,
  results: [
    {
      createdAt: 1688448542000,
      updatedAt: 1688448542000,
      colorCode: '#FFFFFF',
      id: 51,
      mbti: 'ENTJ'
    },
  ]
}
.
.
.
```

- URL 객체

 쿼리 파라미터를 보낼 때 URL 객체 사용 가능
```js
const params = { offset: 10, limit: 10 };
const url = new URL('https://learn.codeit.kr/api/color-surveys');
Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
const res = await fetch(url);
const data = await res.json();
console.log(data);
```

- fetch() 옵션
  - 리퀘스트 설정 가능
  - method (메소드): 'GET', 'POST', 'PATCH', 'DELETE'
  => method를 설정하지 않으면 기본값은 'GET'
  - headers (헤더): 자주 설정하는 헤더로 'Content-Type'
  - body (바디): 자바스크립트 객체는 그대로 전달할 수 없기 때문에 JSON 문자열로 변환 해야 함

- POST 리퀘스트 예시
```js
const surveyData = {
    mbti: 'ENFP',
    colorCode: '#ABCDEF',
        password: '0000',
};

const res = fetch('https://learn.codeit.kr/api/color-surveys', {
    method: 'POST',
    body: JSON.stringify(surveyData),
    headers: {
        'Content-type': 'application/json',
    },
});
const data = await res.json();
console.log(data)

=>
{
  createdAt: 1688477153992,
  updatedAt: 1688477153992,
  colorCode: '#ABCDEF',
  id: 52,
  mbti: 'ENFP',
  password: '0000'
}
```

- API 함수 만들기

웹 개발 시 API를 호출 하는 함수를 따로 모아두고 필요할때 import로 사용

```js
예시)
export async function getColorSurveys(params = {}) {
  const url = new URL('https://learn.codeit.kr/api/color-surveys');
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getColorSurvey(id) {
  const res = await fetch(`https://learn.codeit.kr/api/color-surveys/${id}`);
  const data = await res.json();
  return data;
}

export async function createColorSurvey(surveyData) {
  const res = await fetch('https://learn.codeit.kr/api/color-surveys', {
    method: 'POST',
    body: JSON.stringify(surveyData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}
```
리퀘스트마다 바뀔 수 있는 부분을 함수 파라미터 받아서 활용

- fetch() 오류 처리
  - URL이 이상하거나 헤더 정보가 이상해서 리퀘스트 자체가 실패하는 경우
  - 리퀘스트는 성공적이지만 상태 코드가 실패를 나타내는 경우 (4XX, 5XX)

fetch() 함수는 **첫번째 경우**에만 리턴하는 Promise를 reject한다. 따라서 오류에 대한 처리를 할때는 언제 reject 되는지, 어떤 내용이 리스폰스 바디로 돌아오는지 알아야 한다.

오류를 throw하고 리스폰스 상태 코드의 성공 여부는 .ok 프로퍼티로 확인 가능하다.
```js
export async function getColorSurvey(id) {
  const res = await fetch(`https://learn.codeit.kr/api/color-surveys/${id}`);

  if (!res.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }

  const data = await res.json();
  return data;
}
```
하나라도 오류를 발생한다면 throw한다.
```js
import { getColorSurvey } from './api.js';

try {
  const data = await getColorSurvey(1234); // 존재하지 않는 id
  console.log(data);
} catch (e) {
  console.log('오류가 발생했습니다:')
  console.log(e.message);
}

=>
오류가 발생했습니다:
데이터를 불러오는 데 실패했습니다.
```
---

axios 내용 추가 할것

---
# 스터디 정리
## 4장

- DOM 사용하기
  - DOM이란?<br>
  **DOM(Document Object Model)** 으로 웹 브라우저가 HTML 문서를 자바스크립트와 같은 프로그래밍 언어로 다룰 수 있게 객체 형태로 변환한 모델이다.

  - 선택자 사용하기<br>
  **html 태그를 가져오는것**을 선택한다고 표현한다
  ```js
  형식: document.querySelector('선택자')
  
  예제)
  const $input = document.querySector('input');
  consoloe.log($input);
  ```
  - 여러 선택자 사용하기
  ```js
  형식: document.querySelectorAll('선택자')

  예제)
  <button>입력</button>
  <button>버튼2/button>
  <button>버튼3</button>
  
  const buttons = document.querySelectorAll('button');
  console.log(buttons);
  ```
  - id 속성으로 특정 태그 선택하기
  ```js
  형식: document.querySelector('#id 속성 값')

  예제)
  <div><span id="order">1</span>번째 참가자</div>
  <div>제시어: <span id="word"></span></div>
  <input type="text">
  <button>입력</button>
  <button>버튼2/button>
  <button>버튼3</button>
  
  const order = document.querySelector('#order');
  console.log(order);
  ``` 
  - class 속성으로 여러 태그 선택하기
  ```js
  형식: document.querySelectorAll('.class 속성 값')
  
  (예제)
  <div><span id="order">1</span>번째 참가자</div>
  <div>제시어: <span id="word"></span></div>
  <input type="text">
  <button>입력</button>
  <button class="hello">버튼2/button>
  <button class="hello">버튼3</button>
  
  const buttons = document.querySelectorAll('.hello');
  console.log(buttons);
  ```

  - 태그 안의 태그 선택하기
  ```js
  형식: document.querySelector('선택자 내부선택자 내부선택자 ...')

  예제)
  <div><span id="order">1</span>번째 참가자</div>
  <div>제시어: <span id="word"></span></div>
  <input type="text">
  <button>입력</button>

  const span = document.querySelector('div span');
  console.log(span);
  ```

- 태그 값 접근하기
  - 텍스트와 태그 가져오기
  ```js
  형식: 태그.textContent // 태그 내부의 문자열을 가져옴

  예제)
  <div><span id="order">1</span>번째 참가자</div>
  <div>제시어: <span id="word"></span></div>
  <input type="text">
  <button>입력</button>

  const order = document.querySelector('#order');
  console.log(order.textContent); // 1
  const div = document.querySelector('div');
  console.log(div.textContent); // 1번째 참가자
  ```
  - 내부의 HTML 태그 가져오기
  ```js
  형식: 태그.innerHTML // 태그 내부의 HTML 태그를 포함한 문자열을 가져옴
  
  const div = document.querySelector('div');
  console.log(div.innerHTML);
  => <span id="order">1</span>번째 참가자
  ```

  - 텍스트와 태그 변경하기
  ```js
  형식: 태그.textContent = 값; // 태그 내부의 문자열을 해당 값으로 설정

  예제)
  const order = documnet.querySelctor('#order');
  order.textContent = 2; // 2로 설정
  console.log(order); 
  => 2

  형식: 태그.innerHTML = 값; // 태그 내부의 태그를 해당 값으로 설정
  const div = document.querySelector('div');
  div.innerHTML = '';
  const button = document.querySelector('button');
  button.innerHTML = '<b>굵게</b>';
  ```
  - 입력 태그의 값을 가져와 변경
  ```js
  형식:
  입력태그.value // 입력창의 값을 가져옴
  입력태그.value = 값 // 입력창에 값을 넣음

  예제)
  const input = document.querySelector('input');
  input.value = 123;

  * <input>, <textarea> 등 폼 요소의 현재 입력값을 가져올때 사용 
  ```

- 이벤트와 이벤트 리스너
  - 이벤트 리스너 추가하기
  ```js
  형식: 태그.addEventListener('이벤트 이름', 이벤트 리스트)

  예제)
  const onClickButton = () => {
    console.log('버튼 클릭');
  };
  const button = document.querySelector('button');
  button.addEventListener('click', onClickButton);


  document.querySelector('button').addEventListener('click', () => {
    console.log('버튼 클릭');
  });
  ```
  - 이벤트 리스너 제거하기
  ```js
  형식:
  function 함수() {}
  태그.addEventListener('이벤트', 함수)
  태그.removeEventListener('이벤트',함수)

  예제)
  const onClickButton = () => {
    console.log('버튼 클릭');
  };
  const button = document.querySelector('button');
  button.addEventListener('click', onClickButton);
  button.removeEventListener('click', onClickButton);
  ```
  - 키보드 이벤트<br>
  키보드를 누르거나 뗐을 때 발생하는 이벤트를 추가 할 수 있다.
  ```js
  window.addEventListener('keyup', (event) => {
    console.log('keyup', event);
  });
  window.addEventListener('keydown', (event) => {
    console.log('keydown', event);
  });

  어떤 키를 눌렀는지 event.key 속성에 나온다. 
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  event.ctrlKey, event.altKet, event.shiftKey, event.metaKey 등이 있다.
  ```
  - 마우스 이벤트<br>
  마우스 클릭이나 이동했을 때 발생하는 이벤트를 추가 할 수 있다. 마우스 이벤트의 속성에서는 마우스 위치에
  따라 x,y 좌표를 얻을 수 있다.
  ```js
  window.addEventListener('mousedown', (event) => {
    console.log('mousedown', event); // 마우스 클릭할 때
  });
  window.addEventListener('mousemove', (event) => {
    console.log('mousemove', event); // 마우스 이동할 때
  });
  window.addEventListener('mouseup', (event) => {
    console.log('mouseup', event); // 마우스 클릭했다가 뗄 때
  });

  const button = document.querySelector('button');
  function onRightClick(event) {
    event.preventDefault();
    consloe.log('우클릭');
  }
  button.addEventListener('contextmenu', onRightClick);
  기본적으로 마우스 클릭 이벤트는 좌클릭이지만 우클릭 이벤트는 contextmenu로 다룬다.
  ```

  - 이벤트 버블링<br>
  이벤트가 발생할 때 부모 태그에도 동일한 이벤트가 발생하는 현상을 이벤트 버블링 이라고 한다.
  ```js
  <table border="1">
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
  </table>
  document.querySelector('td').addEventListener('click', () => {
    console.log('td를 클릭했습니다.');
  });
  document.querySelector('tr').addEventListener('click', () => {
    console.log('tr을 클릭했습니다.');
  });
  document.querySelector('table').addEventListener('click', () => {
    console.log('table을 클릭했습니다.');
  });
  td 1을 선택하면 td 태그에서 발생한 click 이벤트가 table 태그까지 전달된다.
  ```
  이와 같이 이벤트 버블링 현상이 일어나면 이벤트 리스너 콜백 함수의 evnet.target은
  이벤트가 처음 발생한 태그로 바뀐다. 그렇기 때문에 이벤트가 발생한 태그가 아닌 이벤트를
  연결한 태그에 접근하고 싶다면 event.currentTarget을 사용해야 한다.

  - 이벤트 캡쳐링<br>
  이벤트가 자식 태그로 전파되어 내려가는 현상을 이벤트 캡쳐링 이라고 한다.
  ```js
  document.querySelector('td').addEventListener('click', (event) => {
    console.log('td');
    console.log(event.target);
    console.log(event.currentTarget);
  }, true);
  document.querySelector('tr').addEventListener('click', (event) => {
    console.log('tr');
    console.log(event.target);
    console.log(event.currentTarget);
  }, true);
  document.querySelector('table').addEventListener('click', (event) => {
    console.log('table');
    console.log(event.target);
    console.log(event.currentTarget);
  }, true);
  ```
  실행한 후 콘솔을 보면 table-tr-td 순으로 이벤트가 발생한다.

- DOM 속성
  - 태그 속성 다루기
  ```js
  형식:
  태그.속성 // 조회 시 사용
  태그.속성 = 값 // 수정 시 사용

  예시)
  <input type="hidden" name="at" value="null">

  document.querySelector('input').type;
  document.querySelector('input').name;
  document.querySelector('input').value;
  ```
  - class 속성 다루기
  ```js
  형식: 태그.className = '클래스1 클래스2 ...';

  해당 태그의 기존 클래스는 전부 사라진다.
  ```
  - class 속성 확인, 추가, 수정, 제거하기
  ```js
  형식:
  태그.classList.contains('클래스') // 클래스 존재 확인
  태그.classList.add('클래스', '클래스2', ...) // 클래스 추가
  태그.classList.replace('기존 클래스', '수정 클래스') // 클래스 수정
  태그.classList.remove('클래스', '클래스2', ...) // 클래스 제거
  ```
  - 태그의 CSS 변경하기
  ```js
  형식: 태그.style.'CSS 속성' = '값';
  ```
  - 부모와 자식 태그 찾기
  ```js
  document.querySelector('td').parentNode; // 부모 태그 찾기
  document.querySelector('tr').children; // 자식 태그 찾기
  document.querySelector('table').children.children; // 자식 태그 안 자식 태그 찾기
  자식 태그는 여러 개 일수 있으므로 자식 속성의 값은 유사 배열 객체가 된다.
  ```

  - 새로운 태그 만들기
  ```js
  document.createElement() // 태그 만드는 메소드
  document.createTextNode() // 텍스트 만드는 메소드
  부모 태그.appendChild(자식 태그)
  부모 태그.append(자식 태그, 자식 태그2)

  예시)
  const button = document.createElement('button');
  button.classList.add('login');
  button.style.fontSize = '15px';
  button.textContent = '버튼';
  document.body.append(button);
  ```

- window 객체<br>
window는 웹 브라우저를 가리키는 객체로 웹 브라우저가 제공하는 기본 객체들은 대부분 window 객체 안에 들어 있다.
window 객체는 생략 할 수 있기 때문에 document, console 객체도 실제로는 window.document, window.console이다.
  - 대화상자
  ```js
  alert('내용') // 알림 혹은 경고창
  prompt('사용자에게 표시할 메세지') // 입력창
  confirm('사용자에게 표시할 메세지') // 확인창으로 true나 false 값을 반환할때 사용
  ```
  - Math 객체
  ```js
  수학에 사용 하는 다양한 메서드가 있다.
  Math.ceil() // 올림
  Math.round() // 반올림
  Math.floor() // 내림
  Math.max() // 최대 값
  Math.min() // 최소 값
  Math.sqrt() // 제곱근
  Math.random() // 무작위 숫자 생성
  ```
  - Date 생성자 함수
  ```js
  const 날짜 객체 = new Date(연, 월, 일, 시, 분, 초, 밀리초);
  const 날짜 객체 = new Date(타임스태프); // 1970년 1월 1일 자정으로부터 지나온 밀리초
  ```
  
  ## 💡 느낀 점
    복습을 하면서 모호한 부분들이 명확하게 이해하게 됐고 이벤트 리스너 부분은 좀 더 자세하게 알수있었어서 좋았습니다

  ## 💡 어려운 점
    해당 파트에서 어려웠다고 느낀점은 없었습니다