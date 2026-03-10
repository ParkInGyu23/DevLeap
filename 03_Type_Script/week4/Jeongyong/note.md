# Typescript Week 04 개인 정리

## ✏️ 배운 내용 요약

# Chapter 10 (inflearn)

## 유틸리티 타입

- 제네릭, 맵드 타입, 조건부 타입 등의 타입 조작 기능을 이용해 실무에서 자주 사용되는 타입을 미리 만들어 놓은 것

## 맵드 타입 기반의 유틸리티 타입들

### Partial<T> -> 부분적인, 일부분의

- 특정 객체 타입의 모든 프로퍼티를 optional로 변경

```ts
type Partial<T> = {
  [key in keyof T]?: T[key];
};
```

### Required<T> -> 필수의, 필수적인

- 특정 객체 타입의 모든 프로퍼티를 required로 변경

```ts
type Required<T> = {
  [key in keyof T]-?: T[key];
};
```

### Readonly<T> -> 읽기 전용, 수정 불가

- 특정 객체 타입에서 모든 프로퍼티를 readonly로 변경

```ts
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};
```

## 맵드 타입 기반의 유틸리티 타입들 2

### Pick<T, K> -> 뽑다, 고르다

- 객체 타입으로부터 특정 프로퍼티만 골라내는 타입

```ts
type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};
```

### Omit<T, K> -> 생략하다, 빼다

- 객체 타입으로부터 특정 프로퍼티를 제거하는 타입

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### Record<K, V>

```ts
type Record<K extends keyof any, V> = {
  [key in K]: V;
};
```

## 조건부 타입 기반의 유틸리티 타입들

### Exclude<T, U> -> 제외하다, 추방하다

- T에서 U를 제거하는 타입

```ts
type Exclude<T, U> = T extends U ? never : T;
```

### Extract<T, U>

- T에서 U를 추출하는 타입

```ts
type Extract<T, U> = T extends U ? T : never;
```

### ReturnType<T>

- 함수의 반환값 타입을 추출하는 타입

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
```

# Chapter 11 (inflearn)

## 타입 조작하기

# 가장 인상 깊었거나 이해가 안 갔던 내용

## 인상 깊었던 내용

- **Item 46**
- 많은 개발자들이 귀찮다는 이유로, 혹은 당장 에러를 끄기 위해 any를 남발하지만 unknown은 겸손한 any임
- any는 타입 시스템을 파괴하지만, unknown은 타입 시스템을 유지함
- unknown은 "데이터가 들어올 수 있지만, 확실히 검사하기 전까지는 사용할 수 없어"와 같음
- API 응답값 처리나 외부 라이브러리 연동 시 unknown을 기본으로 사용하는 습관을 들이면, 런타임 에러의 90% 이상을 컴파일 타임에 잡아낼 수 있음

## 더 공부해야할 내용

- 타입스크립트 유틸리티 타입

1. 객체의 가시성 및 변형

- Partial<T> = 모든 속성을 optional로 변경
- Required<T> = 모든 optional을 필수로 변경
- Readonly<T> = 모든 속성을 읽기 전용으로 변경

2. 특정 속성만 골라내기

- Pick<T, K> = T에서 K속성만 골라냄
- Omit<T, K> = T에서 K속성만 제외함

3. 집합과 매핑

- Record<K, T> = 키가 K이고 값이 T인 객체를 만듬
- Exclude<T, U> = T 유니온 타입에서 U와 겹치는 타입을 제외함
- Extract<T, U> = T 유니온 타입에서 U와 겹치는 타입만 추출함

4. 함수 관련

- ReturnType<T> = 함수의 반환 타입을 가져옴
- Parameters<T> = 함수의 매개변수 타입들을 튜플로 가져옴
