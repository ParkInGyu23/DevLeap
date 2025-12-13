# Week 1 개인 정리

## ✏️ 배운 내용 요약

  ### 3장 컴포넌트
  
  #### 3.2 컴포넌트의 종류
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
    
  #### 3.3 컴포넌트 기초
  확장자별 JSX 지원 여부
  | 확장자  | CRA | VITE |
  |--------|-----|------|
  | .js    | .JSX 지원 | .JSX 지원 |
  | .jsx    | .JSX 지원 | .JSX 지원 |
  | .ts    | .JSX 지원 안 함 | .JSX 지원 안 함 |
  | .tsx    | .JSX 지원 | .JSX 지원 |
  
  #### 3.4 컴포넌트와 props 객체
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
  
  #### 3.5 컴포넌트와 이벤트
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
  
  #### 3.5.4 이벤트 전파
  - 캡쳐링 : 이벤트가 부모 요소에서 시작해 자식 요소로 내려가는 방식입니다.
  이벤트 속성에 Capture를 붙인 ex) onClick -> onClickCapture 으로 사용합니다.
  - 버블링 : 이벤트가 자식 요소에서 시작해 부모 요소로 전파되는 방식입니다.
  별도의 이벤트 속성이 필요하지 않아서 속성 이름을 그대로 사용하면 됩니다.
  단, 리액트에서는 버블링이 기본 동작이므로 버블링을 차단하려면 stopPropagation() 메서드를 사용해야합니다.
  
  ### 4장 컴포넌트 상태
  
  #### 4.1 컴포넌트의 상태란
  기존에 데이터를 정의하는 방법은 let, const 를 사용해 변수를 선언하는 것이였는데 
  react에서는 만약 이 방식으로 변수를 선언하고 값이 변경된다면 
  화면에는 변화가 나타나지 않습니다.
  그래서 react에서는 상태로 관리를 해야합니다.
  
  #### 4.2 useState 훅: 기본 상태 관리
  - useState 훅의 기본 문법
  ```js
    const [state, setState] = useState<Type>(initalState);
    /* useState<number>() → 이 state는 숫자만 받는 상태가 됨
    useState<string>() → 문자열만 받는 상태가 됨 */
  ```
  <Type>:  useState 훅으로 정의할 상태 값의 타입을 제네릭으로 지정합니다.
  타입스크립트에서는 기본으로 타입 추론이 가능하므로 생략하는 경우도 많습니다.
  기존에는 초깃값을 기준으로 상태 값의 타입을 자동으로 추론합니다.
  그러나 제네릭을 사용하면 타입을 직접 지정할 수 있어 오류를 줄일 수 있습니다.
  
  - 상태 변경 함수
  1. 상태 값을 직접 전달하는 방식: 상태_변경_함수(값) 
  ```js
    const [count, setCount] = useState<number>(0); 
    setCount(1); // count 값을 1로 변경
  ```
  2. 이전 상태 값을 참조하는 방식: 상태_변경_함수((이전_상태_값) => 변경할_상태_값)
  ```js
    const [count, setCount] = useState<number>(0); 
    const increment = () => {
      setCount((count) => count + 1); // 이전 값에서 1 증가
    }
  ```
  => 알아서 잘~~ 구분해서 사용해야합니다!!!
  
  - useState 훅 여러 번 사용하기
  useState 훅은 한 번에 하나의 상태 값만 관리할 수 있습니다. 따라서 컴포넌트 내부에서 여러개의 상태 값이 필요하면 useState를 여러 번 호출해 각 상태를 따로 정리해야합니다.
  하지만 상태 개수가 많아지면 코드가 복잡해진다는 단점이 있습니다.
  이런 경우 여러 상태 값을 하나의 객체로 묶어 관리하는 방법도 있습니다.
  ```js
    export default function App () {
      const [formState, useFormState] = useState({
        name: '',
        age: 0,
        gender: '',
      });
    }
  ```
  => 이것도 알아서 잘~~ 구분해서 사용해야합니다!!!
  
  - useState 훅 사용시 주의사항 
  1. 초깃값 타입 지정: 초기에 상태가 null 이더라도 나중에 저장할 타입까지 고려해 제네릭을 명시해야 합니다.
  ```js
    const [name, setName] = useState<string || null>(null);
    const [age, setAge] = useState<number || null>(null);
  ```
  2. 리액트 훅의 호출 위치: 반드시 함수형 컴포넌트 내부의 최상위에서 호출해야 합니다.
  3. 상태 변경 함수에서 값을 직접 전달할 때: 리액트는 상태 변경을 즉시 처리하지 않고 비동기적으로 처리해 렌더링이 끝난 뒤 한 번에 모아서 일괄 업데이트합니다.
  ```js
    setCount(count+1);
    setCount(count+1);
    setCount(count+1);
    // 이렇게 하면 setCount(count+1) 한번만 적용됩니다.
    // 대신에 
    setCount(count+3);
    // 혹은
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    // 이렇게 적용하도록 합니다.
  ```
  #### 4.3 useReducer 훅 : 복잡한 상태 관리
  react에서 상태 관리를 하는 또 다른 방식입니다.
  상태 변경 로직이 복잡하거나 업데이트해야하는 경우가 많으면 이 방법을 사용합니다.
  ```js
    const [state, dispatch] = useReducer<Type>(reducer, initalState);
  ```
  
  - 사용예시
  ```js
    const initialState = { count: 0 };
  
    function reducer(state, action) {
      switch (action.type) {
        case "INCREMENT":
          return { count: state.count + 1 };
        case "DECREMENT":
          return { count: state.count - 1 };
        default:
          return state;
      }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    dispatch({ type: "INCREMENT" });
  ```
  : [state, dispatch] 부분은 useState 처럼 용도에 따라 이름을 변경하면 됩니다. 
  ```js
    const [countState, countDispatch] = useReducer(reducer, initialState);
    const [form, formDispatch] = useReducer(formReducer, initialForm);
    const [todoList, todoActions] = useReducer(todoReducer, []);
  ```
  
  - 리듀서 함수 분리하기 
  리듀서 함수를 분리하면 재사용성과 가독성이 높아지고 체계적으로 관리할 수 있습니다.
  src/reducer 폴더를 만든 뒤 그 안에 [리듀서이름]Reducer.ts 파일을 생성해서 사용합니다.
  ```js
    // exampleReducer.ts
    export const initialState = { count: 0 };
    
    export function exampleReducer(state, action) {
      switch (action.type) {
        case "INCREMENT":
          return { count: state.count + 1 };
        case "DECREMENT":
          return { count: state.count - 1 };
        default:
          return state;
      }
    }

    //app.tsx
    import { useReducer } from 'react';
    import { exampleReducer, initialState } from './reducer/exampleReducer';
    
    export default function App() {
      const [state, dispatch] = useReducer(exampleReducer, initialState);
    
      return (
        <>
          <h1>{state.count}</h1>
    
          <button onClick={() => dispatch({ type: "DECREMENT" })}>
            감소
          </button>
    
          <button onClick={() => dispatch({ type: "INCREMENT" })}>
            증가
          </button>
        </>
      );
    }
  ```
  
  #### 4.4 상태 관리 패턴
  리액트 훅으로 정의한 상태, 상태 변경 함수, 액션 발생 함수는 하나의 데이터처럼 취급합니다.
  그래서 이를 다른 컴포넌트에 props 처럼 전달해 재사용할 수 있습니다.
  
  - typescript 의 경우: 방법 2가지
  
  1. 하위 컴포넌트에서 상태 값을 표시 
  javascript 에서처럼 사용하면 vscode 에서 오류 메세지가 뜨는데 활용해서 작성하면 쉽습니다. 
  ```js
    // App.tsx
    import {useState} from 'react';
    import Count from './components/Count';
    
    export default function App() {
      cont [count, setCount] = useState(0);
      return(
        <>
          <Count count={count} increment={setCount}>
        </>
      )
    }
  
    // Count.tsx
    import { Dispatch, SetStateAction } from 'react';
    
    export default function Count({
      count, setCount
    }: { count: number; setCount: Dispatch<SetStateAction<number>> }) {
      return (
        <>
          <h1></h1>
          <button onClick={()=>setCount((count) => count + 1)}>증가 </button>
        </>
      )
    }
  ```
  
  2. 부모 컴포넌트에서 정의한 후에 전달
  **캡슐화, 함수의 올바른 사용, 유지보수성, 의도 전달 등의 이유로 이 방법이 더 좋습니다.**
  ```js
    // App.tsx
    import {useState} from 'react';
    import Count from './components/Count';
    
    export default function App() {
      cont [count, setCount] = useState(0);
      counst increment = () => setCount((count) => count + 1);
      return(
        <>
          <Count count={count} increment={increment}>
        </>
      )
    }
    
    // Count.tsx
    export default function Count ({
      count, increment,
    }: { count: number; increment: () => void; })
    
    return (
      <>
        <h1>Count: {count}</h1>
        <button onClick={increment}>증가</button>
      </>
    )
  ```
  
  #### 4.5 개발자 도구로 상태 값 확인하기
  리액트 개발자도구 설치 -> 크롬 개발자 도구에 Components 및 Profiler 탭 추가 확인 -> Components 탭에서 현재 실행된 리액트 애플리케이션의 컴포넌트 구조 확인 -> 각 컴포넌트를 클릭해 해당 컴포넌트의 Props의 state 확인
  
  ### 7장 조건부 렌더링과 반복 렌더링
  #### 7.1 조건부 렌더링
  
  : 조건부 렌더링이란 특정 조건에 따라 컴포넌트 화면에 표시하거나 숨기는 방식입니다.
  사용자의 상황과 요구에 맞춰 필요한 정보만 효과적으로 전달할 수 있어 사용자 경험을 크게 향상시킬 수 있습니다.
  
  #### 7.2 반복 렌더링
  반복 렌더링이란 배열이나 리스트 형태의 데이터를 기반으로 여러 컴포넌트를 생성해 일관된 방식으로 화면에 출력하는 기법입니다.
  자바스크립트는 반복 처리를 위한 다양한 구문을 제공하지만,
  **리액트에서는 반복 렌더링 시 주로 표준 내장 객체인 Array의 map() 메서드를 사용합니다.**
  
  예시 
  ```js
    export default function App() {
      const items = ['사과', '바나나', '딸기'];
      return (
        <ul>
          {items.map((item, index) => {
            <li key={index}>{item}</li>
          })};
        </ul>
      )
    }
  ```
  **배열에 요소가 추가되거나 제거될 때 리액트는 어떤 요소가 변경되었는지 추적**해야 합니다.
  **이때 key 속성을 활용**합니다. 만약 key가 없거나 중복 값을 사용하면 렌더링 성능이 저하되거나 예상치 못한 UI 오류가 발생할 수 있습니다.
  
  ### 8장 폼 다루기
  #### 8.1 폼 정의하기 
  
  - html에서는 <label> 요소와 입력 요소를 연결할 때 for 속성을 사용하지만, JSX에서는   htmlFor 속성을 사용해야합니다. 이는 자바스크립트의 예약어와 충돌을 피하기 위해 바꿔서 사용하는 것 입니다.
  - 리액트에서 폼을 다룰 때는 단순히 입력 요소를 나열하는 것만으로는 충분하지 않고
  상태 관리, UI 업데이트, 유효성 검사, 제출 처리 기능을 함께 구현해야 합니다.
 
  #### 8.2 폼 제어하기
  - 제어 컴포넌트
  사용자가 입력한 값을 DOM에 저장하지 않고 상태에 저장한 뒤 그 값을 화면에 표시하는 구조입니다.
  onChange 를 사용해 입력 값이 변경될 때마다 state에 저장하고 그 값을 value로 보여줍니다.
  => 하나씩 제어할때와 여러개를 한번에 제어할때 예시 코드 : /example/controlled 
 
  - 비제어 컴포넌트
  폼 요소의 입력 값을 리액트 상태가 아닌 DOM 자체에서 직접 관리하는 방식입니다.
  **useState 대신 useRef** 훅을 사용해 DOM에 직접 접근해 값을 읽거나 조작합니다.
  비제어는 실시간으로 입력값을 가져올 수 없음을 기억하도록 합니다.
  => 하나씩 제어할때와 여러개를 한번에 제어할때 예시 코드 : /example/uncontrolled 
 
  #### 8.3 폼 제어 한 단계 더 나아가기
  - 커스텀 훅 
  커스텀 훅이란 리액트 훅을 사용자가 직접 정의한 함수입니다.
  기존의 리액트 훅을 다른 함수로 감싸 특정 기능을 수행하도록 새롭게 정의한 함수로, 반복 로직을 하나의 함수로 묶어 재사용성을 높이는데 목적이 있습니다.
  => 커스텀 훅을 활용해 폼 제어하기 예시 코드 : /example/customhook
 
  #### 8.4 폼 벨리데이션
  사용자가 입력한 값이 유효한지 확인하고, 올바르지 않은 경우 경고를 표시하거나 폼 제출을 막는 작업을 말합니다.
  - 기본 벨리데이션 사용하기 
  html5 폼 검증 기능을 활용해 직접 속성값을 추가해 검증하는 것입니다.
  => 예시 코드 : /example/validation/ValidationForm.tsx
  - 커스텀 벨리데이션 로직 추가하기
  직접 유효성 검사 로직을 작성해 검증하는 것입니다.
  => 예시 코드 : /example/validation/ValidationFormCustom.tsx
  - 라이브러리 사용하기
  폼 검사하는 라이브러리에는 Formik(포믹)과 React Hook Form(리액트 훅 폼)이 있습니다. 포믹이 최근 많이 사용된다고 하였으나 리액트 훅 폼도 많이 사용되므로 
  검색해서 사용할 줄 알면 좋습니다.
 
  #### 8.5 리액트 19에서 ref 변경 사항
  1. ref 객체 컴포넌트 전달 방식 간소화
    : 이전에는 자식 컴포넌트에 ref를 전달하려면 forwardRef()를 사용했으나,
   지금은 직접 전달이 가능합니다.
  2. ref 속성에서 클린업 함수 지원
    : 이벤트 등록과 해제를 useEffect 에서 했으나,
    이제는 ref 속성에 콜백을 통해서 사용이 가능합니다.
    
  ### 13장 리액트 라우터로 라우팅 기능 사용하기
  
  #### 13.1 라우팅 방식 이해하기 
  - **싱글 페이지 애플리케이션(SPA)은 하나의 HTML, 페이지로 구성된 웹 애플리케이션**입니다. 
    사용자가 처음 웹사이트에 접속할 때 전체 애플리케이션을 한 번에 불러오며, 이후에는 URL이 변경되ㄷ라도 다시 로드하지 않고 필요한 부분만 화면에 다시 그려줍니다.
    
    리액트와 같은 SPA 프레임워크에서는 클라이언트 사이드 렌더링 방식을 주로 사용합니다.
    화면을 서버가 아닌 웹브라우저에서 자바스크립트를 이용해 직접 렌더링 하는 방식입니다.
    서버는 초기 HTML만 전달하고 이후에 필요한 데이터는 API를 통해 서버에서 받아옵니다. 
    URL이 바뀌더라도 필요한 컴포넌트만 업데이트 합니다.
    
    그렇기 때문에, **한 번 로드되면 이후 화면 전환이 빠르고 사용자 경험이 우수합니다. 
    하지만 초기 로딩 시 자바스크립트 번들까지 함께 받아야 하므로 첫 화면이 늦게 뜰 수 있습니다.** 
    
  - **멀티 페이지 애플리케이션(MPA)은 여러 HTML 페이지로 구성된 애플리케이션**입니다. 
    MPA 구조에서는 사용자가 다른 페이지로 이동하면 웹 브라우저는 해당 경로에 맞는 새로운 HTML 파일을 서버에 요청하고 전체 페이지를 다시 불러옵니다.
    
    이러한 구조에서는 보통 서버 사이드 렌더링 방식을 사용합니다. 
    서버에서 HTML을 미리 렌더링해 클라이언트에 완성된 페이지를 전달하는 방식입니다. 
    
    **초기 로딩 속도가 빠르고 콘텐츠가 HTML에 포함되어 있어서 SEO에 유리합니다.
    하지만 페이지를 이동할 때마다 서버에서 새로운 HTML을 받아와야해서 반응 속도가 느리고, 매번 전체 페이지를 새로 로딩하기 때문에 SPA보다 사용자 경험이 떨어집니다.**
  
  => 리액트는 전통적인 SPA 구조의 웹 애플리케이션을 만드는 프론트엔드 라이브러리입니다.
   **웹 브라우저의 히스토리 API를 내부적으로 활용해 URL이 변경되면 해당 경로에 맞는 컴포넌트를 렌더링 해주는 라이브러리가 리액트 라우텅**입니다.
   이 과정에서 부르더운 화면 전환가 더 나은 사용자 경험을 제공합니다.
   
  #### 13.2 리액트 라우터 다루기
  - 리액트 라우터 설치하기 
  ```js
    npm install react-router
  ```
  
  - 리액트 라우터 범위 지정하기
    - BrowerRouter : 최신 웹 브라우저에서 제공하는 히스토리 API를 사용해 URL을 관리합니다. 가장 일반적이며 CSR 환경에서 주로 사용합니다.
    - HashRouter : URL에 해시(#) 기호를 포함해 경로를 구분합니다. 서버 설정이 필요 없기 때문에 정적 파일 기반 환경에서 유용합니다.
    - MemoryRouter : 주소창을 변경하지 않고, 내부 메모리에서 라우팅 상태를 관리합니다. 
    주로 테스트 환경이나 MPA 구조에서 사용합니다. 
    - StaticRouter : SSR 환경에서 사용하는 라우터입니다. 
    클라이언트의 주소창은 변경하지 않고, 서버에서 HTML을 렌더링 할 때 사용합니다. 
  
  이 중에서 가장 기본적으로 널리 사용되는 것은 BrowerRouter 입니다.
  사용 예시)
  ```js
    ...
    import { BrowerRouter } from 'react-router';
    ...
    
    createRoot(document.getElementById('root')!).render(
      <StricMode>
        <BrowserRoute>
          <App />
        </BrowserRoute>
      </StricMode>
    );
  ```
  
  - 라우트 설정하기 
  사용 예시)
  ```js
    import { Routes, Route } from 'react-route';
    import Home from './pages/Home';
    import About from './pages/About';
    
    export default function App() {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      )
    }
  ```
  #### 13.3 리액트 라우터 기능 사용하기
  - 중첩 라우터  :
  ```js
    ...
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} > // /dashboard 경로에 접근하면 Dashboard 컴포넌트는 무조건 렌더링됩니다.
          <Route index element={<Summary />} /> // index는 기본 속성입니다. /dashboard 에 접근하면 Dashboard 컴포넌트와 함께 렌더링 됩니다.
          <Route path="settings" element={<Settings />} /> // /dashboard/settings 에 접근하면 Dashboard 컴포넌트와 함께 렌더링 됩니다.
        </Route>
      </Routes>
    ...
  ```
  
  - 레이아웃 라우트 :
  여러 페이지에서 공통으로 사용하는 UI 요소를 효율적으로 관리하는 기능 
  ```js
    import { Outlet } from 'react-router';
    
    export default function RootLayout() {
      return (
        <>  
          <header></header>
          <Outlet /> // 자식 컴포넌트는 이 위치에 렌더링 됩니다.
          <footer></footer>
        </>
      )
    }
  ```
  
  ```js
    ...
      <Routes>
        <Route element={RootLayout}>
          <Route path='/' element={Home} /> // home 컴포넌트가 Outlet 자리에 들어갑니다.
        </Route>
      </Routes>
    ...
  ```
  
  - 프리픽스 :
  특정 그룹의 여러 라우트 경로에 공토된 접두사를 붙일 수 있습니다.
  ```js
    <Routes>
      <Route element={RootLayout}>
        <Route path='my'>
          <Route path="dashboard" element={<Dashboard />} > 
            <Route index element={<Summary />} />  // /my/dashboard
            <Route path="settings" element={<Settings />} /> // /my/dashboard/settings
          </Route>
        </Route>
        </Route>
      </Route>
    </Routes>
  ```
  
  - 동적 세그먼트 :
  path 속성에 콜론(:)을 붙이면 해당 부분이 동적 세그먼트로 처리됩니다.
  ```js
    <Routes>
      <Route element={RootLayout}>
         <Route path=`team/:teamId` element={<Team />} /> 
      </Route>
    </Routes>
  ```
  세그먼트 값을 사용하기
  ```js
    import {useParams} from 'react-router';
    
    export default function Team() {
      const params = useParams();
      return (
        <h1>Team Overview - Team Id: {params.teamId}</h1>
      )
    }
  ```
  
  - 옵셔널 세그먼트 :
  URL의 경로의 일부를 선택해 입력 할 수 있도록 처리할 수 있습니다.
  ```js
    <Route path=`team/:teamId/group/:groupId` element={<Team />} />
    
    <Route path=`team?/:teamId?/group/:groupId` element={<Team />} />
    // 위와 같이 작성하면 /team/1/group/1 와 /group/1 경로 모두 같은 라우트에 매칭됩니다.
  ```
  
  - 스플랫 :
  정의되지 않는 경로를 포괄적으로 처리할 수 있도록 하는 기능 (보통 404페이지)
  ```js
    <Route path='*' element={<NotFound />} />
  ```
  #### 13.4 내비게이션 기능 사용하기
  리액틍에서는 경로 이동시에 <a> 태그 대신에 <Link>와 <NavLink>를 사용합니다.
  - Link : 단순한 경로 이동
  - NavLink : 현재 경로와 일치하는지도 감지할 수 있습니다. (보통 header에 사용)
  
  - useNavigate 훅 : 
  리액트 라우터에서는 useNavigate 훅을 사용해 코드 안에서 직접 페이지 이동을 시킬 수 있습니다. 
  ```js
    import {useNavigate} from 'react-route';
    const navigate = useNavigate();
    
    ...
      const clickToLink = () => {
        navigate('/about');
      };
    ... 
    
    // 또는
    
    <Routes>
      <Route path='/not-found' element={<NotFound />}>
      <Route path='*' element={<Navigate to='/not-found'/>} />
    </Routes>
  ```
  
## 💡 느낀 점 
  현재 코드잇 강의는 TypeScript를 아직 수강하지 않은 상태라 다소 어렵게 느껴졌습니다.
  다만 JavaScript 환경에서의 사용법은 어느 정도 배운 상태여서, 두 환경을 비교하며 예습한다는 마음으로 공부했습니다.
  
  강의에서는 필요한 부분만 바로 설명해 주다 보니 개념의 원리가 충분히 이해되지 않는 부분이 있었는데,
  책을 함께 읽으며 학습하니 React의 기본적인 동작 원리를 이해할 수 있었고,
  각 속성과 개념에 대해서도 더 깊이 이해할 수 있어 좋았습니다.
  
  또한 form 부분은 이미 스프린트 미션을 통해 어느 정도 이해하고 있다고 생각했지만,
  폼을 제어하는 다양한 방식과 여러 입력값을 한 번에 관리할 수 있는
  보다 깔끔한 코드 패턴들을 배울 수 있어 도움이 되었습니다.
  
## 💡 어려운 점
  TypeScript는 속성 정의부터 처음 접하는 구조와 용어가 많아
  이해하고 활용하는 데 어려움이 있었습니다.
  
  책을 읽으면서 TypeScript에서만 사용되는 문법과 구조가 무엇인지
  검색하며 확인해 보았지만, 실습 문제를 직접 풀어보고
  코드잇 강의를 병행해서 들어야 더 명확하게 이해할 수 있을 것 같습니다.
