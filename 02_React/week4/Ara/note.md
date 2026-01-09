# Week 8 개인 정리

## ✏️ 배운 내용 요약

## 12장 전역 상태 관리

### 12.1 상태 관리 이해하기

- 로컬 상태 관리 : useState나 useReducer와 같은 훅을 사용해 각 컴포넌트 내부에서 상태를 관리하는 방식
- 전역 상태 관리 : 애플리케이션 전체에서 공유 가능한 형태로 관리하는 방식
  - 전역 상태 관리의 3가지 방법 : Context API (리액트 기본 제공), Redux Toolkit, Zustand

### 12.2 Context API로 전역 상태 관리

- 사용 방법

  1. 컨텍스트 객체 생성 및 제공

  ```js
  // 생성
  const SomeContext = createContext(defaultValue);

  // 범위 설정
  export default function App() {
    const [exam, setExam] = useState(""); // 전역에서 사용할 대상
    return (
      <>
        <SomeContext.Provider value={exam}>
          <Exam />
          ... // 이 안에서는 모두 사용 가능
        </SomeContext.Provider>
      </>
    );
  }
  ```

  2. 컨텍스트 값 소비

  ```js
  export default function Exam() {
    const exam = useCountContext(); // 불러와서
    return <>{exam} // 사용 가능</>;
  }
  ```

  3. 직접 Provider 파일과 use 커스텀 훅을 생성해 사용
     : 강의에서 배웠던 내용과 다르게 파일로 만들어서 생성하는 방식
     코드가 길어서 첨부X 알고 있으면 좋을 듯

- 렌더링 최적화 하기
  : Context API를 사용할 때 상태(State)와 함수를 하나의 객체로 묶어서 전달할 경우, 특정 상태값만 변경되어도 해당 Context를 구독(useContext)하는 모든 컴포넌트가 리렌더링됩니다. 이때 useMemo를 사용하여 Provider에 전달할 값을 메모이제이션함으로써, 불필요한 리렌더링을 방지해야 합니다.

  1. 분리해서 사용

  ```js
  // 선언
  export const Exam1 = createContext(defaultValue);
  export const Exam2 = createContext(defaultValue);

  const memoizedExam3 = useMoeo(() => ({ exam1, exam2, exam3 }), []);

  // 범위를 중첩해서 또는 분리해서 사용 가능
  return (
    <>
      <Exam1.Provider value={exam4}>
        <Exam2.Provider value={memoizedExam3}>...</Exam2.Provider>
      </Exam1.Provider>
    </>
  );

  // 다른 파일에서 동일하게 사용
  export function useExam() {
    const context = useContext(Exam2);
    return <>{context}</>;
  }
  ```

- 새로운 use 훅으로 context api 사용하기
  : 리액트 19에서 useContext를 대체할 수 있는 새로운 use 훅이 도입되었습니다.
  최상휘에 호출해야만 하는 useContext와는 다르게 if문 같은 조건문 안에서도 사용할 수 있습니다.

```js
  export function useExam() {
    if(true) {
      const context = use(Exam2);
      ...
    }
  }
```

### 12.3 Redux로 전역 상태 관리하기

- Redux는 React 상태관리를 도와주는 라이브러리 중하나
  기존에는 설정이 복잡하고 문법이 어려우며 작성해야할 코드량이 많다는 단점이 있었으나,
  Redux Tookit 이라는 보조 라이브러리를 통해 좀 더 간편하게 사용이 가능합니다.

### 12. 4 Zustand로 전역 상태 관리하기

Zustand는 React 상태관리를 도와주는 라이브러리 중 하나
가볍고 직관적인 라이브러리입니다.

## 💡 느낀 점

- 라이브러리들의 내용을 요약하기에는 너무 내용이 길어서 요약하지 않았습니다.
  책으로 보는것과 직접 사용해보는 것은 다르기 때문데 100% 이해를 했다고 하기는 어렵지만,
  Redux는 Tookit을 쓰더라도 아직은 사용 방법이 조금 복잡해보이는데
  Zustand는 비교적 사용이 간편하다고 느꼈습니다.
  추후에 기회가 된다면 Zustand를 사용해 상태관리를 사용해봐야겠습니다.

## 💡 어려운 점

- 강의에서 보던 내용과 다르게 Provider 파일을 생성하고 useContext 함수를 사용하는 커스텀 훅 파일을 생성하여
  설명해주어서 새로웠지만 이해하는데 조금 시간이 필요했습니다.
  하지만 파일로 생성해두면 사용하기에 더 편리할 것 같으니 이것도 알고있다가 나중에 사용해봐도 좋을 것 같습니다.
