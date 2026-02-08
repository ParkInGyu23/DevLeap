# Typescript Week 02 개인 정리

## ✏️ 배운 내용 요약

# Chapter 01

## Item 1 타입스크립트와 자바스크립트의 관계 이해하기

## Item 2 타입스크립트 설정 이해하기

### noImplicitAny

- 암시적 any의 사용 불가
- JS -> TS의 마이그레이션 단계에서만 false로 사용하고, 이외의 경우에는 true로 사용

### strictNullChecks

- null과 undefined가 모든 타입에서 허용되는지를 확인하는 설정
- strictNullChecks를 설정하려면 noImplicitAny를 먼저 설정해야 함

## Item 3 코드 생성과 타입이 관계없음을 이해하기

## Item 4 구조적 타이핑에 익숙해지기

## Item 5 any 타입 지양하기

- any 타입에는 타입 안전성이 없음
- any 타입은 함수 시그니처를 무시해 버림
- any 타입에는 언어 서비스가 적용되지 않음
- any 타입은 코드 리팩터링할 때 버그를 감춤
- any 타입은 타입 설계를 감춰버림
- any 타입은 타입 시스템의 신뢰도를 떨어뜨림

# Chapter 02

## Item 6 편집기를 사용해 타입 시스템 탐색하기

## Item 7 타입을 값의 집합이라고 생각하기

## Item 8 타입 공간과 값 공간의 심벌 구분하기

- 타입 선언(:) 또는 단언문(as) 다음에 나오는 심벌은 타입인 반면, = 다음에 나오는 모든 것은 값
- class와 enum은 상황에 따라 타입과 값 두 가지 모두 가능한 예약어
- 연산자 중에서도 타입에서 쓰일 때와 값에서 쓰일 때 다른 기능을 하는 것들이 있음(예: typeof)

## Item 9 타입 단언 대신 타입 선언 사용하기

- 타입 단언은 강제로 타입을 지정했으니 타입 체커에게 오류를 무시하라고 하는 것

## Item 10 객체 래퍼 타입 입히기

## Item 11 타입 체크와 잉여 속성 체크 구분해서 사용하기

## Item 12 함수 표현식에 타입 적용하기

## Item 13 타입과 인터페이스의 차이점 이해하기

- 새 코드를 작성할 때, 특정 목적(예: 유니온 타입)이나 의도가 분명해지는 경우(예: 함수 타입)에는 type을 사용
- 일반적으로는 interface를 사용
- type과 interface는 서로 다른 특징을 가지고 있어서 상황에 맞춰 쓰는 것이 중요함
- 복잡한 타입의 경우에는 타입 별칭(예: 함수, 튜플, 배열)

## Item 14 변경 관련 오류 방지를 위해 readonly 사용하기

- 어떠한 함수의 매개변수를 readonly로 만들면(readonly 배열 또는 Readonly 객체 타입), 다음 같이 몇개가 달라짐

1. 함수 내에서 해당 매개변수에 변경이 발생하는지 체크됨
2. 함수의 호출부에 매개변수가 변경되지 않는다는 사실을 명시하게 됨
3. 호출부에서는 readonly 배열이나 Readonly 객체만 전달하게 됨

## Item 15 타입 연산과 제네릭 사용으로 반복 줄이기

- keyof는 타입을 받아서 속성 타입의 유니온을 반환

```ts
interface Options {
  width: nubmer;
  height: number;
  color: string;
  label: string;
}

interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}

type OptionsUpdate = { [k in keyof Options]?: Options[k] }; // 매핑된 타입과 keyof 표현식을 사용해서 Options로 OptionsUpdate를 만듬

type OptionKeys = keyof Options; // = ("width" | "height" | "color" | "label")과 동일
```

## Item 16 인덱스 시그니처보다 정확한 타입 사용하기

- Map(자료구조 타입)
- Map<K, V>는 키-값 컬렉션 자료구조
- 객체와 달리 키 타입을 명확히 제한 가능하고, 순서 보장 + 메서드(set, get, has, delete) 제공이 특징
- key가 string만이 아닐 때, 빈번한 추가/삭제가 있을 때, 순서 보장이 필요할 때 사용

- Partial<T>(유틸리티 타입)
- 모든 프로퍼티를 optional(?)로 바꿔줌

- Pick<T, K>(유틸리티 타입)
- 특정 키만 골라서 새 타입 생성

```ts
type User = {
  id: number;
  name: string;
  age: number;
};

type UserPreview = Pick<User, "id" | "name">; // {id: number; name:string;}
```

- 서버에서 일부 필드만 받을 때 매우 자주 사용

- ReturnType<T>(유틸리티 타입)
- 함수의 반환 타입을 추출

```ts
function getUser() {
  return { name: "lee", age: 20 };
}

type User = ReturnType<typeof getUser>; // {name: string; age: number;}
```

- 함수 반환 타입 변경 시 자동 반영

- Record<K, T>(유틸리티 타입)

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type UserMap = Record<string, number>; // {[key: string]: number;}
```

## Item 17 숫자 인덱스 시그니처 지양하기

# Chapter 03

## Item 18 추론 가능한 타입을 사용해 장황한 코드 방지하기

- 구조 분해 할당을 활용하면 변수명을 그대로 사용하면서 타입 추론까지 자연스럽게 이루어짐
- 타입스크립트가 타입을 추론할 수 있다면 타입 구문을 작성하지 않는 것이 좋음
- 추론될 수 있는 경우라도 객체 리터럴과 함수 반환에는 타입 명시를 고려해야 함 -> 이는 잉여 속성 체크를 가능하게 하고 내부 구현에 오류가 사용자 코드 위치에 나타나는 것을 방지해 줌

## Item 19 다른 타입에는 다른 변수 사용하기

- 별도의 변수를 사용하는 것이 바람직한 이유

1. 서로 관련이 없는 두 개의 값을 분리
2. 변수명을 더 구체적으로 지을 수 있음
3. 타입 추론을 향상시키며, 타입 구문이 불필요해짐
4. 타입이 좀 더 간결해짐
5. let 대신 const로 변수를 선언함

## Item 20 변수의 타입이 결정되는 원리 이해하기

- 타입 넓히기로 인해 오류가 발생한다고 생각되면

1. let 대신 const로 바꾸기
2. 타입을 명시하기
3. tuple이나 Object.freeze 같은 헬퍼 함수를 사용하기
4. const 단언문을 사용하기
5. satisfies 연산자를 사용하기

## Item 21 한꺼번에 객체 생성하기

- 속성을 제각각 추가하지 말고 한꺼번에 객체로 만들기
- 안전한 타입으로 속성을 추가하려면 객체 전개({...a, ...b}) 사용
- 객체에 조건부로 속성을 추가하는 방법 익히기

## Item 22 타입 좁히기

- 타입을 좁히는 여러가지 방법

1. null 체크
2. 분기문에서 예외를 던지거나 함수를 반환해 블록의 나머지 부분에서 변수의 타입 좁히기
3. instanceof를 사용해서 타입 좁히기
4. 속성 체크로 타입 좁히기
5. Array.isArray 같은 일부 내장 함수로 타입 좁히기
6. 명시적 태그 붙여서 타입 좁히기(tagged union, discriminated union)
7. 사용자 정의 타입 가드

## Item 23 일관성 있는 별칭 사용하기

- 별칭은 타입스크립트가 타입을 좁히는 것을 방해함, 따라서 변수에 별칭을 사용할 때는 일관되게 사용해야함
- 함수 호출이 객체 속성의 타입 정제를 무효화할 수 있다는 점을 주의해야 함, 속성보다 지역 변수를 사용하면 타입 정제를 믿을 수 있음

## Item 24 타입 추론에 문맥이 어떻게 사용되는지 이해하기

## Item 25 타입의 진화 이해하기

- 일반적인 타입들은 정제되기만 하는 반면, 암시적 any와 any[] 타입은 진화할 수 있음
- any를 진화시키는 방식보다 명시적 타입 구문을 사용하는 것이 안전한 타입을 유지하는 방법임

## Item 26 함수형 기법과 라이브러리로 타입 흐름 유지하기

## Item 27 비동기 코드에는 콜백 대신 async 함수 사용하기

## Item 28 클래스와 커링 기법으로 새로운 추론 영역 만들기

# 교재 인사이트

- 이걸 지금 읽어도 되나? 라는 생각이 들 정도로 이해가 안되는 부분이 많았습니다.
  한입 강의를 듣긴 했지만 한입 강의와는 결이 다른.. 내용인 것 같았습니다.
  사실 지금 읽는다고 해도 큰 도움이 되지 않을 정도의 레벨인 것 같다는 생각을 했습니다.
  나중에 타입스크립트에 대해 더 잘 알게 된 이후에 다시 읽어보고 싶다는 생각입니다.

# 가장 인상 깊었거나 이해가 안 갔던 내용

## 인상 깊었던 내용

- 자주 사용하게 될 것 같은 내용이 나와 공유하고 싶어 작성합니다.

- 타입 좁히기

1. null 체크

```ts
function printLength(value: string | null) {
  if (value !== null) {
    // 해당 구문에서 null을 제거 했기 때문에 value는 string이 됨
    console.log(value.length); // string
  }
}
```

2. 예외/return으로 이후 타입 좁히기

```ts
function print(value: string | undefined) {
  if (!value) return; // 해당 구문에서 early return으로 undefined 제거
  value.length; // string
}
```

3. instanceof

```ts
function printDate(value: Date | string) {
  if (value instanceof Date) {
    // instanceof로 타입 좁히기
    value.getTime(); // Date
  } else {
    value.toUpperCase(); //string
  }
}
```

4. 속성 체크

```ts
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    // in을 이용한 속성 체크
    animal.bark(); // Dog
  } else {
    animal.meow(); // Cat
  }
}
```

5. 내장 함수로 타입 좁히기

```ts
function handle(value: string | string[]) {
  if (Array.isArray(value)) {
    // 내장 함수를 이용한 타입 좁히기
    value.push("a"); // string[]
  } else {
    value.toUpperCase(); // string
  }
}
```

6. Tagged Union (Discriminated Union)

```ts
type Success = { type: "success"; data: string };
type Error = { type: "error"; message: string };

type Result = Success | Error;

function handle(result: Result) {
  if (result.type === "success") {
    // tagged union[type]으로 타입 좁히기
    result.data; // Success
  } else {
    result.message; // Error
  }
}
```

7. 사용자 정의 타입 가드

```ts
type Dog = { bark: () => void };

function isDog(animal: any): animal is Dog {
  // 해당 함수가 true를 반환하면 animal = Dog
  return "bark" in animal;
}

function speak(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark(); // Dog
  }
}
```

## 더 공부해야할 내용

- 타입스크립트의 기초 구성요소부터 차근차근 공부하는게 필요 할 것 같음

1. 문법

- type, interface, extends, infer, keyof, typeof, as 등

2. 타입 시스템 기능

- union, intersection, generics, mapped type, conditional type등

3. 표준 유틸리티 타입

- Partial, Pick, Omit, Record, ReturnType, Parameters, Required, Readonly

- 이런것들을 모르니까 책 내용이 이해가 잘 안되는 것 같음..
