# Week 8 개인 정리

## ✏️ 배운 내용 요약

## 12장 전역 상태 관리

## 상태 관리 이해하기

### 로컬 상태 관리

- useState나 useReducer와 같은 훅을 사용해 각 컴포넌트 내부에서 상태를 관리하는 방식
- 이 경우 상태는 해당 컴포넌트에만 국한되며, 다른 컴포넌트와 공유하려면 props를 통해 전달해야함

### 전역 상태 관리

- 상태를 애플리케이션 전체에서 공유 가능한 형태로 관리하는 방식
- 리액트에서 제공하는 전역 상태 관리 방법

1. Context API(리액트 기본 제공)
2. Redux Toolkit
3. Zustand

- 각 방식은 구현 방법에서 차이가 있지만, 공통적으로 상태를 전역에서 관리하고 공유할 수 있다는 특징이 있음

## Context API로 전역 상태 관리하기

### context

- 프로그래밍에서 컴포넌트들이 공통으로 사용하는 데이터의 흐름이나 의미를 담는 공간

### API

- 다양한 소프트웨어 컴포넌트가 상호작용할 수 있게 하는 인터페이스

### Context API로 전역 상태 관리를 하기 위한 두 가지 작업

1. 컨텍스트 객체 생성 및 제공: 컨텍스트 객체를 만들고 Provider 컴포넌트를 통해 하위 컴포넌트에 공유할 상태를 전달
2. 컨텍스트 값 소비: 컨텍스트 범위 내에 있는 하위 컴포넌트에서는 useContext() 훅을 사용해 전역 상태에 직접 접근

### 컨텍스트 객체 생성하기

- 컨텍스트 객체는 데이터를 전역으로 공유하기 위한 매개체 역할
- Provider는 컨텍스트의 데이터를 하위 컴포넌트에 공급하는 컴포넌트

```js
const SomeContext = createContext < DataType > defaulValue;
```

```js
//CountContext.ts
import { createContext } from "react";

interface CountContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}
export const CountContext = (createContext < CountContextType) | (null > null);
```

### Provider로 컨텍스트 범위 지정하기

```js
<컨텍스트_객체 value={공유할 데이터}>
공유할_컴포넌트
</컨텍스트_객체>
```

```js
//CountProvider.tsx
import { useState } from "react";
import { CountContext } from "../contexts/CountContext";

export default function CountProvier({
  children,
}: {
  children: React.ReactNode,
}) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const reset = () => setCount(0);
  return (
    <>
      <CountContext value={{ count, increment, decrement, reset }}>
        {children}
      </CountContext>
    </>
  );
}
```

### useContext 커스텀 훅 만들기

```js
//useCountContext.ts
import { useContext } from "react";
import { CountContext } from "../contexts/CountContext";

export function useCountContext() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error(
      "useCountContext는 CountContext로 감싼 컴포넌트 안에서만 호출할 수 있습니다."
    );
  }
  return context;
}
```

```js
//컴포넌트에서 사용
const value = useContext(SomeContext);
```

- 이렇게 컨텍스트 전용 커스텀 훅을 만들어 두면, 컴포넌트 안에서 useContext 훅을 직접 사용하지 않고도, 해당 컨텍스트의 데이터를 편리하게 가져와 쓸 수 있음

### 컨텍스트로 공유되는 전역 상태 사용하기

```js
//App.tsx
import Count from "./components/Count";
import CountOutsideDisplay from "./components/CountOutsideDisplay";
import CountProvider from "./providers/CountProvider";

export default function App() {
  return (
    <>
      <CountProvider>
        <Count />
        <CountOutsideDisplay />
      </CountProvider>
    </>
  );
}
```

### use 훅으로 Context API 사용하기

- 리액트 19에서 useContext 훅은 대체할 수 있는 새로운 use 훅이 도입됨
- 항상 컴포넌트의 최상위에서만 호출해야 하는 useContext 훅과 달리, use 훅은 if 문같은 조건문 안에서도 사용할 수 있음

```js
const value = use(SomeContext);
```

## Redux로 전역 상태 관리하기

- Redux는 자바스크립트 애플리케이션에서 상태 관리를 도와주는 라이브러리
- Redux를 사용하면 애플리케이션의 상태를 일관되게 관리할 수 있고, 상태 흐름이 예측 가능해져 대규모 프로젝트에서도 매우 유용함
- 하지만 Redux는 설정이 복잡하고 문법이 어려우며 작성해야 할 코드량이 많다는 단점이 있음, 그래서 등장한 것이 Redux Toolkit
- Redux Toolkit은 Redux를 더 쉽게 사용할 수 있도록 만든 보조 라이브러리, 설정이 간단하고 문법이 직관적이며 다양한 유틸리티 함수와 기능이 기본으로 내장되어 있음

- Redux Toolkit 주요 함수

1. createSlice(): 리듀서와 액션을 한 번에 생성
2. configureStore(): Redux 스토어를 간편하게 설정
3. createAsyncThunk(): 비동기 작업을 처리하는 액션 생성기
4. createEntityAdapter(): 리스트 데이터 관리를 위한 유틸리티

- 설치

```
npm install @reduxjs/toolkit react-redux
```

### Redux 스토어 생성하기

- Redux에서는 애플리케이션의 전체 상태를 스토어에서 중앙집중식으로 관리
- 스토어는 애플리케이션에서 사용하는 모든 상태를 한곳에 모아 저장하고 관리하는 역할을 하는 객체, 하나의 애플리케이션에 한 개만 존재할 수 있음
- 스토어는 Redux Toolkit에서 제공하는 configureStore() 함수로 생성
- 이 함수는 기존 Redux의 createStore()보다 더 간단한 문법으로 미들웨어 설정, 개발자 도구 연결 등 다양한 기능을 자동으로 처리해 줌

```js
const store = configureStore({
  reducer: rootReducer,
});
```

```js
//store.ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Redux 스토어 리액트에 제공하기

- 앞에서 만든 Redux 스토어를 리액트 애플리케이션에서 사용하려면 Provider 컴포넌트로 제공해야 함

```js
//main.tsx
import {StriceMode} from 'react';
import {createRoot} from 'react-dom/client';
import {store} from './store/store.ts';
import {Provier} from 'react-redux';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### Redux 상태 슬라이스 만들기

- Redux에서는 상태를 슬라이스 단위로 나눠 관리
- 슬라이스는 하나의 상태와 해당 상태를 변경하는 액션(리듀서)을 묶은 단위로, Redux Toolkit의 createSlice() 함수를 사용해 쉽게 만들 수 있음
- createSlice() 함수를 사용하면 다음 세 가지를 한 번에 생성할 수 있음

1. 액션 타입(action type): 슬라이스 이름과 리듀서 이름을 결합한 고유 문자열
2. 액션 생성 함수(action creator): 액션 객체를 자동으로 생성하는 함수
3. 리듀서 함수(reducer): 상태를 실제로 변경하는 함수

```js
const exampleSlice = createSlice({
  name: "슬라이스_이름",
  initialState: 초깃값,
  reducers: {
    리듀서_이름(state, action) {
      // 상태를 어떻게 바꿀지 정의
    },
  },
});
```

### 슬라이스를 스토어에 추가하기

- Redux는 모든 상태를 스토어에서 관리하므로 앞에서 만든 슬라이스도 스토어에 등록해야 실제로 상태를 조회하거나 변경할 수 있음
- 슬라이스를 스토어에 추가하려면 store.ts 파일의 reducer 설정에 해당 슬라이스 리듀서를 포함해야 함

```js
//store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Zustand로 전역 상태 관리하기

- Zustand(독일어로 '상태')는 리액트 애플리케이션에서 사용할 수 있는 가볍고 직관적인 상태 관리 라이브러리

### Zustand 설치하기

```
npm install zustand
```

### Zustand 스토어 생성하기

```js
create<StoreType>()((set, get) => ({ //get 생략 가능
  state: 초깃값,
  action: () => set(...) //또는 get(...) 사용 가능
}))
```

```js
//counterStore.ts
import { store } from "zustand";

interface CounterStoreState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  resetIfEven: () => void;
}
export const useCounterStore =
  create <
  CounterStoreState >
  ((set, get) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    resetIfEven: () => {
      const { count } = get();
      if (count % 2 === 0) {
        set({ count: 0 });
      }
    },
  }));
```

- Zustand에서 만든 스토어는 커스텀 훅 형태로 반환되기 때문에 변수 이름이 useCounterStore처럼 use로 시작하는 것을 권장

### Zustand의 고급 기능

- Zustand는 다양한 미들웨어를 제공해 상태 관리 기능을 확장할 수 있도록 지원
- 미들웨어(middleware)란 상태를 읽거나 쓸 때 또는 변경하는 과정에 추가 동작을 삽입할 수 있게 해주는 기능
- 자주 사용하는 미들웨어로는 persist, subscribeWithSelector, immer, devtools가 있음

### persist 미들웨어

- persist 미들웨어를 사용하면 상태를 로컬 스토리지에 저장할 수 있어 페이지를 새로 고쳐도 변경한 상태가 초기화되지 않고 유지됨

### subscribeWithSelector 미들웨어

- Zustand는 상태가 변경될 때 특정 동작을 실행할 수 있도록 구독 기능(subscribe())을 제공
- 이 기능을 사용하면 특정 상태를 계속 감시하다가 값이 변경되는 순간 자동으로 지정한 함수가 실행되도록 설정할 수 있음
- subscribe()는 상태 변화를 정밀하게 감지하고 변화된 상태를 저장하기 위해 subscribeWithSelector, persist 미들웨어와 조합해 함께 사용됨

### immer 미들웨어

- Zustand에서 상태를 변경할 때는 반드시 불변성을 지켜야 함
- 즉, 기존 상태를 직접 수정하지 않고 새로운 객체로 상태를 업데이트 해야 함
- immer를 사용하면 상태를 직접 수정하듯 간단하게 작성해도 내부적으로는 자동으로 불변성을 유지해 안전하게 처리함

```
npm install immer
```

### devtools 미들웨어

- Zustand는 devtools 미들웨어를 통해 Redux 개발자 도구와 연동할 수 있음
- 이를 사용하면 상태 변경 기록을 추적하거나 이전 상태로 되돌리는 등 디버깅에 유용한 기능을 사용할 수 있음

## 💡 느낀 점

- 상태 관리 라이브러리들을 잘 사용하면 더 좋은 코드를 만들 수 있을 것 같다.

## 💡 어려운 점

- 상태 관리 라이브러리들을 처음 들어봐서 적응하는 데 시간이 좀 걸릴 것 같고, 어려운 단어들이 많아서 어려웠던 것 같다.
