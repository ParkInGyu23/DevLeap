# Week 10 개인 정리

## ✏️ 배운 내용 요약

## 섹션 6 클래스

### 타입스크립트의 클래스

```ts
class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}

const employeeB = new Employee("이정환", 27, "개발자");
// 타입으로도 사용 가능
const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};

// 상속
class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number,
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
}
```

### 접근 제어자

- 기본은 public이 생략되어 있어 아무 제어가 없는 상태
- 파생 클래스, 외부 전부 사용을 막고 싶다면 private
- 외부에서는 사용을 막지만 파생 클래스에서는 사용하고 싶다면 protected

- 생성자에 접근 제어를 추가해주고 싶다면 필드와 필드의 값 초기화도 자동으로 함

```ts
class Employee {
  // 필드
  private name: string;
  private age: number;
  private position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}

const employeeB = new Employee("이정환", 27, "개발자");

// private 의 경우, 외부에서 사용하는경우(아래코드의 경우) 오류남
employee.name = "홍길동";
employee.age = 30;
employee.position = "디자이너";

// 상속
class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number,
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  //메서드
  func() {
    this.name; // private의 경우 파생 클래스에서도 오류남
  }

  class Employee2 {

  // 생성자
  constructor(
    private name: string,
    private age: number,
    private position: string) { }

  // 메서드
  work() {
    console.log("일함");
  }
}
}
```

### 인터페이스와 클래스

```ts
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Charactor implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
  ) {}

  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동`);
  }
}
```

## 섹션 7 제네릭

### 제네릭 소개

범용적으로 쓸 수 있는 함수

```ts
// 제네릭 함수
function func<T>(value: T): T {
  return value;
}

let num = func(10);
let bool = func(true);
let arr = func<[number, number, number]>([1, 2, 3]);
```

### 타입 변수 응용하기

- 타입이 각각 다를 경우

```ts
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);
```

- 타입을 추론할 수 있도록 다른 타입과 섞어서 사용

```ts
// function returnFirstValue<T>(data: T[])
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
let str = returnFirstValue(["hello", "mynameis"]);
```

- 타입 변수에 조건을 달아서 제한

```ts
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

let var1 = getLength([1, 2, 3]);
let var2 = getLength("12345");
let var3 = getLength({ length: 10 });
```

### map, forEach 메서드 타입 정의하기

- map

```ts
function map<T, U>(arr: T[], callback: (item: T) => U) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }

  return result;
}

map(Arr, (it) => it * 2);
map(["hi", "hello"], (it) => parseInt(it));
```

-forEach

```ts
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for(let i = 0; i < arr.length; i ++>) {
    callback(arr[i]);
  }
}

forEach(arr2, (it) => {
  console.log(it.toFixed());
});
```

### 제네릭 인터페이스와 제네릭 타입 별칭

- 제네릭 인터페이스
  타입으로 사용할때는 반드시 타입을 정의한 <> 와 함께 사용

```ts
interface KeyPair<K, V> {
  key: K;
  value: V;
}

let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};
```

- 인덱스 시그니처

```ts
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: true,
};
```

- 제네릭 타입 별칭

```ts
type Map<V> = {
  [key: string]: V;
};

let stringMap: Map<string> = {
  key: "value",
};
```

### 제네릭 클래스

```ts
class List<T> {
  constructor(private list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }
}

const numberList = new List([1, 2, 3]);
const stringList = new List(["1", "2"]);
```

### 프로미스와 제네릭

```ts
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // resolve(20);
    reject("~~ 때문에 실패");
  }, 3000);
});

promise.then((response) => {
  console.log(response * 10);
});

promise.catch((err) => {
  if (typeof err === "string") {
    console.log(err);
  }
});
```

## 섹션 8 타입 조작하기

### 인덱스드 엑세스 타입

- 인덱스드 엑세스 타입: 이미 선언된 객체 타입에서 특정 키(Key)를 사용해, 그 키에 해당하는 값의 타입만 추출하여 사용하는 방식

```ts
  interface Post {
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
      age: number;
    }
  }

  // author 객체 전부를 타입으로
  function porintAuthorInfo(author: Post["author"]) {
    ...
  }

   // author 객체에서 id만 타입으로
  function porintAuthorInfoId(author: Post["author"]["id"]) {
    ...
  }
```

- 배열과 함께 사용

```ts
  interface PostList {
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
      age: number;
    }
  }[];

  function porintAuthorInfo(author: Post[numnrt]["author"]) {
    ...
  }

  const post: PostList[0] = {
    title: "제목",
    content: "내용",
    author: {
      id: 1,
      name: "이정한",
      age: 27,
    }
  }
```

- 튜플타입과 함께 사용

```ts
type Tup = [number, string, boolean];

type Tup0 = Tup[0];
type TupNum = Tup[number];
```

### keyof 연산자

- 타입에만 사용할 수 있는 연산자
- 객체 타입으로부터 타입을 뽑아와서 유니온 타입으로 만들어주는 연산자

```ts
interface Person {
  name: string;
  age: number;
}

function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

type Person = typeof person;

const person = {
  name: "이정환",
  age: 27,
};
```

### 맵드 타입

- 기존 타입을 기반으로 새로운 타입으로 변환하거나 새로운 프로퍼티를 생성하는 강력한 기능
- interface 로는 불가능
- **활용도가 높고, 실무에서도 자주 쓰임**

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = {
  [key in "id" | "name" | "age"]?: User[key];
};

// 인덱스트 타입 활용
type BooleanUser = {
  [key in keyof User]: boolean;
};

// readonly
type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};
```

### 템플릿 리터럴 타입

- 문자열로 여러가지 상황에 대해 여러가지를 표현할 때 사용

```ts
type Color = "red" | "black" | "green";
type Animal = "dog" | "cat" | "chicken";
type ColoredAnimal = `${Color} - ${Animal}`;
```

### 맵드 타입

"반복적인 타입 선언을 줄여주는 효율적인 타입 설계 기법"

- 타입의 자동화: 기존 객체 타입의 키들을 하나씩 순회하며 새로운 형태의 타입을 일괄 생성하는 '타입 전용 반복문'입니다.
- 유지보수의 정석: 원본 타입이 수정되면 맵드 타입으로 파생된 모든 타입이 자동으로 동기화되어, 타입 정의가 누락되거나 어긋나는 실수를 원천 차단합니다.
- 선택과 제약의 자유: keyof와 인덱스드 엑세스 타입을 결합해, 모든 속성을 선택적(?)으로 만들거나 읽기 전용(readonly)으로 한 번에 변환할 수 있는 강력한 유연성을 제공합니다.

## 섹션 9 조건부 타입

```ts
type StringNumberSwich<T> = T extends number ? string : number;

let a: StringNumberSwitch<number>;
let b: StringNumberSwitch<string>;
```

### 분산적인 조건부 타입

- 분산적인 조건부 타입이 되게 하고 싶지 않다면? 각각에 대괄호를 씌우면 됩니다.

```ts
let d: StringNumberSwitch<boolen | number | string>;

// 1단계
// StringNumberSwitch<boolean> |
// StringNumberSwitch<number> |
// StringNumberSwitch<string>

// 2단계
// number |
// string |
// number

// 결과
// number | string

type Excolud<T, U> = T extends U ? never : T;
type A = Exclude<number | stinrg | boolean, string>;

// never는 최종에 사라지므로
// 최종은 number | boolean
```

### infer

조건부 타입에서 특정한 타입만 추론하는 방법

```ts
type FuncA = () => stirng;
type FuncB = () => number;

type ReturnType<T> = T extends () => infer R ? R : never;

type A = ReturnType<FuncA>;
type B = ReturnType<FuncB>;
```

## 💡핵심 개념 요약

- 제네릭 타입 : 타입을 마치 함수의 인수처럼 전달하여, 하나의 코드가 다양한 타입에 유연하면서도 안전하게 대응할 수 있도록 만드는 '타입 변수' 시스템

```ts
// 제네릭을 사용한 함수 정의 (T는 타입 변수)
function identity<T>(arg: T): T {
  return arg;
}

// 호출하는 시점에 타입을 결정!
const s = identity<string>("Gemini"); // T가 string이 됨
const n = identity<number>(2026); // T가 number가 됨
```

## 💡 느낀 점 (교재 인사이트)

## 💡 어려운 점 (인상 깊은 아이템 / 이해가 안 가는 내용)
