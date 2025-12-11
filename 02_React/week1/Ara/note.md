# Week 1 개인 정리

## ✏️ 배운 내용 요약
  ### 3.2 컴포넌트의 종류
    - 클래스 컴포넌트
    
    ```js
      import { Component } from 'react';
      
      class [컴포넌트_이름] extends Component {
        // JSX를 반환하는 render() 메서드
        render() {
          return {...}
        }
      }
      export default [컴포넌트_이름];
    ```
    
    - 함수형 컴포넌트
    
    ```js
      export default function [컴포넌트_이름]() {
        return (...);
      }
      export default [컴포넌트_이름];
    ```
    : 리액트 16.8 이전에는 상태 관리나 생명주기 기능을 구현하려면 클래스 컴포넌트를 반드시 사용해야 했습니다.
    과거에는 클래스 컴포넌트가 표준 방식이였지만 **지금은 함수형 컴포넌트가 표준**처럼 자리 잡았습니다. 
    
  ### 3.3 컴포넌트 기초
  확장자별 JSX 지원 여부
  | 확장자  | CRA | VITE |
  |--------|-----|------|
  | .js    | .JSX 지원 | .JSX 지원 |
  | .jsx    | .JSX 지원 | .JSX 지원 |
  | .ts    | .JSX 지원 안 함 | .JSX 지원 안 함 |
  | .tsx    | .JSX 지원 | .JSX 지원 |
  
  ### 3.4 컴포넌트와 props 객체
  
  ```js
    interface UserProps { // 인터페이스로 props 타입 분리
      userObj : { name : string; age: number; };
      clickHandler : () => void;
    }
    
    export default function User(props: UserProps) {
      const {
        userObj: {name, age},
        clickHandler,
      } = props;
      return (
        <>
          <p>name: {name}</p>
          <p>age: {age}</p>
          <button onClilck={clickHandler}>클릭</button>
        </>
      )
    }
  ```
  : 함수 내부에서 해주면 코드가 너무 복잡하기 때문에 분리가 가능합니다.
  UserProps 부분은 .d.ts 파일로 분리할 수 있습니다.
  일반적으로 src/types 폴더에 모아서 관리합니다.
  이 파일은 따로 import 하지 않아도 사용할 수 있습니다.
  실무에서 자주 활용하므로 타입 정의 방식이 있다는 것을 알아두어야 합니다.
  
  ### 3.5 컴포넌트와 이벤트
  리액트 주요 이벤트 속성
  | 구분 | 이벤트 | 설명 |
  |------|---------|-------|
  | **마우스 이벤트** | onClick ★ | 클릭했을 때 호출 |
  |  | onDoubleClick | 더블 클릭했을 때 호출 |
  |  | onMouseEnter | 마우스가 요소 위로 올라왔을 때 호출 |
  |  | onMouseLeave | 마우스가 요소에서 벗어났을 때 호출 |
  |  | onMouseMove | 마우스가 요소 위에서 움직일 때 호출 |
  |  | onContextMenu | 마우스 오른쪽 버튼 클릭 시 호출 |
  |  | onDrag | 드래그 중일 때 호출 |
  |  | onDrop | 드래그한 요소를 놓았을 때 호출 |
  |  | onMouseDown | 마우스 버튼을 눌렀을 때 호출 |
  |  | onMouseUp | 마우스 버튼을 눌렀다 뗐을 때 호출 |
  | **키보드 이벤트** | onKeyDown ★ | 키를 눌렀을 때 호출 |
  |  | onKeyUp ★ | 키를 눌렀다 뗐을 때 호출 |
  |  | onKeyPress | 키를 누르고 있을 때 호출(Deprecated 경고: 최신 리액트에선 사용 비권장) |
  | **폼 이벤트** | onChange ★ | 입력값이 변경될 때 호출 |
  |  | onInput | 입력이 발생했을 때 호출 |
  |  | onFocus | 포커스가 들어왔을 때 호출 |
  |  | onBlur | 포커스가 빠져나갈 때 호출 |
  |  | onSubmit ★ | 폼이 제출될 때 호출 |
  | **터치 이벤트** | onTouchStart | 터치가 시작될 때 호출 |
  |  | onTouchMove | 터치 중 움직일 때 호출 |
  |  | onTouchEnd | 터치가 끝날 때 호출 |
  | **기타 이벤트** | onLoad | 이미지, iframe 등이 로드될 때 호출 |
  |  | onError | 로드 중 오류가 발생했을 때 호출 |
  |  | onScroll | 요소가 스크롤될 때 호출 |
  
  ### 3.5.4 이벤트 전파
  - 캡쳐링 : 이벤트가 부모 요소에서 시작해 자식 요소로 내려가는 방식입니다.
  이벤트 속성에 Capture를 붙인 ex) onClick -> onClickCapture 으로 사용합니다.
  - 버블링 : 이벤트가 자식 요소에서 시작해 부모 요소로 전파되는 방식입니다.
  별도의 이벤트 속성이 필요하지 않아서 속성 이름을 그대로 사용하면 됩니다.
  단, 리액트에서는 버블링이 기본 동작이므로 버블링을 차단하려면 stopPropagation() 메서드를 사용해야합니다.  

  

## 💡 느낀 점


## 💡 어려운 점
