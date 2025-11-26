# Week 2 개인 정리

## ✏️ 배운 내용 요약
### 4.2 DOM 사용하기
* 선택자 사용하기
- 보통 자바스크립트에서 HTML 태그를 가져오는 것을 선택한다고 표현한다.<br>
  선택할 때는 document.querySelector()라는 특별한 메서드를 사용함
  ```js
  document.querySelector('선택자)
  ```
  - 선택자(selector)는 HTML 태그를 가져오게 도와주는 문자열이다.
+ input 태그 변수저장
  ```js
  const $input = document.querySelector('input');
  console.log($input);
  ```
+ DOM에 접근하여 button 태그를 선택
  ```js
  const $button = document.querySelector('button');
  console.log($button);
  ```
  - DOM은 document 객체를 통해 접근 및 조작할 수 있다.


## 💡 느낀 점


## 💡 어려운 점
