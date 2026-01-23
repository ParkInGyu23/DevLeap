# Week 9 개인 정리

## ✏️ 배운 내용 요약

## 섹션 2 타입스크립트 기본

### 원시타입과 리터럴 타입

- 원시타입: number, string, boolean, null, undefined

  만약, 처음 변수에 초기값 null을 넣어두고 싶다면?
  원래는 오류가 나지만 tsconfig.josn 파일에서 "compilerOptions" 속성 안에 "strictNullChecks" : false 옵션 추가

- 리터럴타입: 값 자체가 타입이 되는 타입

  ```ts
  let numA: 10 = 10;
  let strA: "hello" = "hello";
  let boolA: true = true;
  ```

  ### 배열과 튜플
  - 배열의 타입 정의 방법
    기본

    ```ts
    let numArr: number[] = [1, 2, 3];
    let stringArr: sring[] = ["hello", "im", "Ara"];
    let boolArr: Array<boolean> = [true, false, true];
    ```

    타입이 다양한 배열

    ```ts
    let mutiArr: (number | string)[] = [1, "hello"];
    ```

    다차원 타입의 배열

    ```ts
    let doubleArr: number[][] = [
      [1, 2, 3],
      [4, 5],
    ];
    ```

    튜플 타입: 길이와 타입이 고정된 배열

    ```ts
    let tup1: [number, number] = [1, 2];
    let tup2: [number, string, boolean] = [1, "2", true];
    let tup3: [string, number][] = [
      ["이정환", 1],
      ["조아라", 2],
      ["김아무개", 3],
    ];
    ```

  ### 객체

  객체 타입

  ```ts
  let user: {
    id: number;
    name: string;
  } = {
    id: 1,
    name: "이정환",
  };
  ```

  선택적 프로퍼티

  ```ts
  let user: {
    id?: number;
    name: string;
  } = {
    name: "조아라",
  };
  ```

  절대 값이 수정되어서는 안되는 프로퍼티

  ```ts
  let config: {
    readonly apiKey: string;
  } = {
    apiKey: "MY API KEY",
  };

  config.apiKey = "hacked"; // 오류!!!
  ```

### 타입 별칭과 인덱스 시그니처

타입별칭

```ts
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
}

let user: User = {
  id: 1,
  name: "이정환",
  nickname: "winterload",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시"
}

let user2: User = {
  id: 2,
  name: "조아라",
  ...
}
```

인덱스 시그니처

```ts
  type CountryCodes = {
    [key: string] : string;
  };

  let countryCodes: CountryCodes = {
    Korea: "ko",
    UnitedState: "us",
    ...
  };
```

- 주의사항: 선언한 타입이 틀리지만 않으면 오류가 안남 = 객체가 비어있어도 오류가 안남

```ts
type CountryCodes = {
  [key: string]: string;
  Korea: string; // 꼭 들어가는 객체
};
```

### Enum 타입

여러가지 값들에 각각 이름을 열거해두고 사용하는 타입

```ts
enum Role {
  ADMIN = 0,
  USER = 1,
  GEST = 2,
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN,
};
const user2 = {
  name: "조아라",
  role: Role.USER,
};
const user3 = {
  name: "김아무개",
  role: Role.GEST,
};
```

- enum의 특징
  숫자형 enum의 경우, 0부터 시작하고 숫자를 지정해주지 않으면 다음 숫자는 1씩 증가한다

```ts
enum Role {
  ADMIN = 10,
  USER, // 11
  GEST, // 12
}

enum Role {
  ADMIN, // 0
  USER = 10,
  GEST, // 11
}
```

### Any 타입과 Unknown 타입

- Any 타입: 특정 변수의 타입을 모를때 사용
  let 변수에 다양한 타입을 넣어줬던 것처럼 사용 가능
  모든 타입을 허용하기 때문에 가급적 사용하지 않는 것을 권장
- Unknown 타입: any랑 동일하게 모든 타입을 허용하지만, 반대로 타입이 지정된 변수에 넣어주는 것이 불가능
  any보다는 unknown 타입을 사용할 것

### Void와 Never 타입

- Void 타입: 아무것도 없음을 의미하는 타입
  undefined, null과는 다름

```ts
function func1(): string {
  return "hello";
}

function func2(): void {
  console.log("hello");
}

let a: void;
```

- Never 타입: 존재하지 않는 불가능한 타입

```ts
// 조건문을 걸어 빠져나오지 않을 때
function func3(): never {
  while (true) {}
}

// 무조건 에러가 터질때만 never로 선언
function func4(): never {
  throw new Error();
}
```

## 섹션 3 타입스크립트를 이해하기

- 타입 계층도를 보면 보통의 모든 타입들은 업캐스팅은 되지만, 다운캐스팅은 불가능.

하지만 예외가 있다면 any 타입과 never 타입이 있음!!

- any 타입은 다운캐스팅과 업캐스팅 모두가 가능
- never타입은 다운캐스팅과 업캐스팅 모두가 가능
  : any 타입과 never 타입은 서로 업캐스팅과 다운캐스팅이 불가능

### 대수 타입

- Union 타입: 합집합

```ts
let a: string | number;
a = 1;
a = "hello";

let arr: (number | string | boolean)[] = [1, "hello", true];

type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

let union1: Union1 = {
  name: "",
  color: "",
};

let union2: Union2 = {
  name: "",
  language: "",
};

let union3: Union2 = {
  name: "",
  color: "",
  language: "",
};
```

- Intersection 타입: 교집합

```ts
let variable: number & string;

// 위에 선언했던 type Dog, type Person 참고
type Intersection = Dog & Person;

// 하나라도 빠지면 안됨
let intersetion1: Intersection = {
  name: "",
  color: "",
  language: "",
};
```

### 타입 추론

- 변수를 선언할 때, 초기값을 넣어주면 알아서 타입을 추론
  초기값이 없으면 any 타입에서 이후 다른 값들을 넣어줌에 따라 타입이 진화

- 하지만, const는 변경이 재할당이 불가능한 변수이기 때문에 초기값 자체가 타입으로 추론

### 타입 단언

강제로 타입을 선언
위험한 문법이므로 확실할때만 사용할 것을 권장

```ts
type Person = {
  name: string;
  age: number;
};

// let person: Person = {}; 으로 선언하면 오류
let person = {} as Person;
person.name = "이정환";
person.age = 27;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
} as Dog;
```

- 타입 단언의 규칙
  값 as 단언
  값이 단언의 슈퍼타입이거나 서브타입이어야 함

- const 단언
  더이상 수정이 불가능한 const가 되어버림

```ts
let num4 = 10 as const;

let cat = {
  name: "야옹이",
  color: "yellow",
} as const;
```

- Non Null 단언

```ts
type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글1",
  author: "이정환",
};

// post.author 가 없으면 undefined을 반환해서 타입 오류
const len: number = post.author?.length;
// 해서 !으로 무조건 있을거야 라고 선언
const len: number = post.author!.length;
```

### 타입 좁히기

조건문 등을 이용해 넓은 타입에서 좁은 타입으로 타입을 상황에 따라 좁히는 방법

```ts
type Person = {
  name: string;
  age: number;
}

function func(value: number | string | Date | null | Person) {
  if (typeof value === "number") {
    value.toFixed();
  } else if (typeof value === "string") {
    value.toUpperCase();
  } else if (value instanceof Date) {
    value.getTime();
  } else if (value && 'age' in value) {
    ...
  }
}
```

### 서로소 유니온 타입

교집합이 없는 타입들로만 만든 유니온 타입

```ts
  type Admin = {
    tag: "ADMIN";
    name: string;
    kickCount: number;
  };

  type Member = {
    tag: "MEMBER";
    name: string;
    point: number;
  };

  type Guest = {
    tag: "GUEST";
    name: string;
    visitCount: number;
  };

  type User = Admin | Member | Guest;

  function login(user: User) {
    switch (user.tag) {
      case "ADMIN": {
        ...
        break;
      }
      case "ADMIN": {
        ...
        break;
      }
      case "ADMIN": {
        ...
        break;
      }
    }
  }
```

## 섹션 4 함수와 타입

### 함수 타입

- 함수 타입 정의:
  함수를 설명하는 가장 좋은 방법
  어떤 "타입의" 매개변수를 받고, 어떤 "타입의" 결과값을 반환하는지 정의

### 함수 타입 표현식과 호출 시그니쳐

- 함수 타입 표현식

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
const add: (a: number, b: number) => number = (a, b) => a + b;
```

- 호출 시그니처 (콜 시그니처)

```ts
type Operation2 = {
  (a: number, b: number): number;
};

const add2: Operation2 = (a, b) => a + b;
```

### 함수 타입의 호환성

- 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는

1. 반환값의 타입이 호환되는가
2. 매개변수의 타입이 호환되는가
   매개변수의 개수가 같을 때, 매개변수 타입을 호환할때는 업캐스팅 X 다운캐스팅 O
   매개 변수의 개수가 다를 때, 개수가 작은 것을 큰 것으로 취급하는 것 O, 큰 것을 작은 것으로 취급 X

### 함수 오버로딩

함수를 매개변수의 개수나 타입에 따라 여러가지 버전으로 정의하는 방법

```ts
  // 오버로드
  function func(a: number): void;
  function func(a: number, b: number, c: number): void;

  // 구현부
  function func(a: number, b?: number, c?: number) {
    if(typeof b === "number" && typeof c === "number") {
      ...
    } else {
      ...
    }
  }
```

### 사용자 정의 타입 가드

```ts
  type Dog = {
    name: string;
    isBark: boolean;
  }

  type Cat = {
    name: string;
    isScratch: boolean;
  }

  type Animal = Dog | Cat;

  function isDog(animal: Animal): animal is Dog {
    return (animal as Dog).isBark !== undefined;
  }

   function isCat(animal: Animal): animal is Cat {
    return (animal as Cat).isScratch !== undefined;
  }

  function warning(animal: Animal) {
    if(isDog(aniaml)) {
      ...
    } else if (isCat(aniaml)) {
      ...
    }
  }
```

## 섹션 5 인터페이스

### 인터페이스

타입에 이름을 지어주는 또 다른 문법

- 객체의 구조를 정희하는데 특화된 문법
  (쌍속, 합침 등의 특수한 기능을 제공)

```ts
interface Person {
  name: string;
  age?: number;
  sayHi2: () => vold;
  // 오버로드를 사용하려면 아래와 같이 함수 선언
  sayHi(): void;
  sayHi(a: number, b: number): void;
}

const person: Person = {
  name: "이정환",
  sayHi: function () {
    ...
  }
}
```

### 인터페이스 확장

인터페이스는 |(Union)과 &(Intersection) 의 직접적인 사용이 불가
대신 extends를 사용

```ts
interface Animal {
  name: string;
  color: string;
}

// type 의 경우도 아래처럼 확장 가능
// type Animal = {
//   name: string;
//   color: string;
// }

interface Dog extends Animal {
  name: "hello"; // 재정의도 가능
  isBark: boolean;
}
```

### 인터페이스 합치기

동일한 이름으로 선언된 것들은 합쳐짐
보통 모듈 보강의 경우에 많이 사용

```ts
interface Person {
  name: string;
}

interface Person {
  age: number;
}
```

## 💡 느낀 점

스프린트 강의는 핵심 위주라 기초가 조금 부족하게 느껴졌는데, 한입 강의를 들으니 완벽하게는 아니더라도 이해가 더 되었습니다.
알았던 내용에 대해서는 한번 더 정의를 하고 가는 것 같아서 좋았습니다.

## 💡 어려운 점

'사용자 정의 타입 가드'는 이번에 처음 배웠는데, 개념은 알겠지만 "이걸 실전에서 내가 언제, 어떻게 써먹어야 하지?"라는 고민이 듭니다.
눈으로만 보는 게 아니라 실제 코드를 여러 번 짜보면서 손에 익히는 시간이 더 필요할 것 같아요.
