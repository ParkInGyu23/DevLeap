# Week 11 개인 정리

## ✏️ 배운 내용 요약

## 섹션 10 유틸리티 타입

### 맵드 타입 기반의 유틸리티 타입들

- Partial<T> : 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumnailURL?: string;
}

// 원리 설명용
// 실제로 사용할때는 아래처럼 바로 사용 가능
type Partial<T> = {
  [key in keyof T]? : T[key];
};

// 임시 저장 글이라 tags가 없음
// partial 을 씀으로서 모든 항목이 선택적 항목이 되어버림
const draft: Partial<Post> = {
  title: "제목 나중에 짓자"
  content: "초안 어쩌구 저쩌구..."
}
```

- Required<T> : 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입

```ts
type Required<T> = {
  [key in keyof T]-?: T[key];
};

const withThumbnailPost: Required<Post> = {
  title: "한입 티스 후기",
  tags: ["ts"],
  content: "",
  thumbnailURL: "http://...",
};
```

- Readonly: 읽기 전용 (이미 알고 있는 타입으로 설명X)

- Pick<T, K>: 객체 타입으로부터 특정 프로퍼티만 딱 골라내는 타입

```ts
// 타입이 업데이트 되기 전 옛날 글이라면
const legacyPost: Pick<Post, "title" | "content"> = {
  title: "옛날 글",
  content: "옛날 컨텐츠",
};
```

- Omit<T, K>: 객체 타입으로부터 특정 프로퍼티를 제거하는 타입

```ts
const noTitlePost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};
```

- Recoard<K, V> : 동일한 패턴을 갖는 객체 타입을 쉽게 정의해서 사용

```ts
type ThumbnailLegacy = Recoard<
  "large" | "medium" | "small",
  { url: string; size: number }
>;
```

### 조건부 타입 기반의 유틸리티 타입들

- Exclude<T, U>: T에서 U를 제거하는 타입
- Extract<T, U>: T에서 U를 추출하는 타입
- ReturnType<T>: 함수의 반환값 타입을 추출하는 타입

## 💡핵심 개념 요약

- 유틸리티 타입들:
  중급 프로젝트 당시 기준 타입을 선언하고 매번 extends로 새로운 타입을 파생시켰는데, 유틸리티 타입을 활용하면 기존 타입을 마치 함수로 가공하듯 필요한 부분만 쏙 뽑아내어 훨씬 깔끔한 코드를 만들 수 있다는 점이 인상 깊었습니다.
  - 이전 코드

  ```ts
  export interface CardDefaultType {
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl: string;
  }

  export interface CardDetailType extends CardDefaultType {
    id: number;
    assignee: AssigneeUser;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface CardCreateType extends CardDefaultType {
    assigneeUserId: number;
    dashboardId: number;
    columnId: number;
  }

  export interface CardUpdateType extends CardDefaultType {
    columnId: number;
    assigneeUserId: number;
  }
  ```

  - 변경 코드

  ```ts
  export type CardCreateType = Omit<
    CardDetailType,
    "id" | "createdAt" | "updatedAt" | "assignee"
  > & {
    assigneeUserId: number;
    dashboardId: number;
  };

  export type CardUpdateType = Pick<
    CardDetailType,
    "title" | "description" | "dueDate" | "tags" | "imageUrl" | "columnId"
  > & {
    assigneeUserId: number;
  };
  ```

## 💡 느낀 점 (교재 인사이트)

## 💡 어려운 점 (인상 깊은 아이템 / 이해가 안 가는 내용)
