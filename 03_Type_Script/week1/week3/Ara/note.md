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
