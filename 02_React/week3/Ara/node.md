# Week 7 개인 정리

## ✏️ 배운 내용 요약

## 10장 고유 아이디와 사이드 이펙트

### 10.1 userId 훅

- userId 훅: 컴포넌트 내부에서 자동으로 고유한 ID를 생성

```js
  const id = userId();
  ...
  <label htmlFor={id}>{children}</label>
  <input type="text" id={id} {...props} />
```

### 10.2 userEffect 훅

- **컴포넌트의 생명주기 : 마운트(생성) -> 업데이트(수정) -> 언마운트(소멸)**

```js
export default function LifeCycle() {
  const [count, setCount] = useState();
  useEffect(() => {
    console.log("Mounted");
    console.log(`Updated : ${count}`);
    return () => {
      console.log("Unmounted");
    };
  }, [count]);

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => SetCount((count) => count + 1)}>증가</button>
    </>
  );
}
```

StrictMode가 활성화 되어 있으면,

1. 첫번째 마운트: Mounted, Updated: 0 출력
2. 언마운트: Unmounted 출력
3. 두번째 마운트: Mounted, Updated: 0 출력

활성화 되어 있지 않으면,

1. 첫번째 마운트: Mounted, Updated: 0 출력
2. count 값이 변경될 때, Updated: [변경된 값] 출력
3. 컴포넌트가 언마운트 될때: Unmounted 출력

- 두 번째 인자가 없을 때 : 상태 변경, props 변경, 부모 리렌더 등 리렌더만 발생하면 매번 실행

```js
useEffect(() => {
  console.log("effect 실행");
});
```

- userEffect 훅 사례들 : userEffect를 사용해 이벤트를 등록할 때는 메모리 누수를 생각해 언마운트 될때 이벤트 제거가 필요합니다.

  - API 호출하기
  - 타이머 설정하기
  - 실시간 이벤트 처리하기
  - 자동 저장 기능 구현하기
  - 실시간 통신 기능 구현하기 : 웹소켓(WebSocket) 사용

  ### 10.3 할 일 관리 애플리케이션 개선하기

  - Storage API : 웹 브라우저 안에 데이터를 저장하고 꺼내 쓸 수 있도록 도와주는 기능
    - sessionStorage : 웹 브라우저의 탭을 닫을때까지 데이터 유지
    - localStorage : 웹 브라우저를 닫았다가 열어도 데이터 유지

## 💡 느낀 점

- 한입 강의를 병행해서 들으면서, 이미 알고 있다고 생각했던 내용들도 디테일하게 다시 정리할 수 있었습니다.
  특히 useEffect의 두 번째 인자가 없을 경우 계속 실행된다는 점을 명확히 이해하게 되었고,
  Storage API는 이번에 처음 접한 개념이라 이 내용을 먼저 학습한 뒤 강의를 들었다면
  다른 방식으로도 구현해볼 수 있었겠다는 생각이 들었습니다.

## 💡 어려운 점

- 설명과 예제를 볼 때는 이해가 되지만,
  실제 구현 단계에서는 렌더링 속도나 실행 순서 차이로 인해
  어떻게 적용해야 할지 고민되는 부분이 있었습니다.
  예를 들어 로딩 중 화면이나 검색 결과가 없는 상태를 처리할 때,
  useEffect와 return 구조로 인해 검색 결과가 잠깐 노출됐다가 사라지는 현상이 발생해
  이 부분은 추가적인 학습과 연습이 필요하다고 느꼈습니다.
