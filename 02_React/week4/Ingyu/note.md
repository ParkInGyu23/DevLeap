# Week 8 개인 정리

## ✏️ 배운 내용 요약

## 12장 전역 상태 관리

1. 상태 관리
 1) 로컬 상태 관리
   - useState, useReducer 훅을 사용 해 컴포넌트 내부에서 상태를 관리
   - 다른 컴포넌트와 공유 시 props로 전달
 2) 전역 상태 관리
   - 상태를 하나의 전역 저장소에서 관리
   - props 전달 없이 상태 공유 가능

2. Context API
   - createContext로 객체 생성
   ```js
   const SomeContext = createContext<DataType>(defaultValue);
   ```

   - Provider 컴포넌트로 범위 지정
   ```js
   <Context 객체 value = {공유할 데이터}>
    공유할 컴포넌트
   </Context 객체>
  ```

  - useContext 훅으로 공유된 값 사용
  ```js
  const value = useContext(SomeContext);
  ```

  - 렌더링 최적화
   상태와 함수를 하나의 객체로 묶어서 전달할 경우 특정 상태값만 변경되어도 컨텍스트를 공유하는 모든 컴포넌트가 리렌더링이 되는데 useMemo를 사용하여
   Provider에 전달할 값을 메모이제이션으로 리렌더링을 방지하거나 컨텍스트 객체 분리 해야 한다.

3. Redux
 자바스크립트에서 전역 상태 관리를 위한 라이브러리
 action -> dispatch -> reducer -> store 변경 -> 상태 업데이트

4. Zustand
  리액트 전역 상태 관리를 위한 라이브러리
  ```js
  create<StoreType>()((set, get) => ({
    state: 초기값
    action: () => set(...)
  }))
  ```
  커스텀 훅을 통해 상태에 직접 접근
  - 미들웨어
  1) persist: 상태를 로컬 스토리지에 저장 해 새로 고침 후 상태 유지
  2) subscribeWithSelector: 특정 상태 변화를 감지해 특정 ㅗ직을 수행
  3) immer: 불변성을 자동으로 유지하면서 직관적인 코드 작성 가능

 
 ## 💡 느낀 점
 상태 관리는 useState가 가장 편하다고 생각했는데 다른 상태 관리 방법을 배우면서 다양하게 상태 관리를 할 수 있다는걸 배웠고
 다른 방법도 활용해서 실습을 해봐야 제대로 된 습득을 할 것 같습니다

 ## 💡 어려운 점
 새로운 방식을 접하다 보니 이해하는 부분에서 어려움이 있었고 제대로 된 활용을 위해선 연습이 필요하다고 느꼈습니다