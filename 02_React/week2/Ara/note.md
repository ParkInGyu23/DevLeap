# Week 2 개인 정리

## ✏️ 배운 내용 요약

### 5장 컴포넌트 스타일링

#### 5.3 Tailwind CSS로 스타일링하기

- 설치

```bash
  npm install tailwindcss @tailwindcss/vite
```

- 사용
  : vite.config.ts 파일

```js
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

: main.tsx 파일에서 import 사용

```js
export default function App() {
  return (
    <>
      <button className="bg-transparent rounded-[3px] border-2 border-[#bf4f74] text-[#bf4f74] m-[0.1em] py-[0.25em] px-[1em]">
        Click Me
      </button>
    </>
  );
}
```

| Tailwind CSS 클래스 | CSS 속성                       |
| ------------------- | ------------------------------ |
| bg-transparent      | background-color: transparent; |
| rounded-[3px]       | border-radius: 3px;            |
| border - 2          | border-width: 2px;             |

.
.
.
처음 사용시에는 어려워보이지만 공식 문서를 보고 작업하다보면 손에 익을 듯합니다.

#### 5.3.2 tailwind-merge 라이브러리

조건부 스타일이나 동적 클래스를 조합하는 최신 라이브러리

- twMerge() : 여러 Tailwind CSS 클래스를 결합할 때 중복되거나 충돌되는 클래스가 있으면 마지막 클래스를 우서시해 중복을 제거합니다.
- twJoin() : 여러 클래스를 단순히 문자열로 연결하며 중복되거나 충돌되는 클래스를 그대로 유지합니다.

- 설치

```bash
  npm i tailwind-merge
```

- 사용

```js
import { twMerge } from "tailwind-merge";

// bg-transparent rounded-[3px]
twMerge("bg-transparent", "rounded-[3px]");
twMerge("bg-transparent rounded-[3px]");

// 만약 중복되면 마지막
twMerge("bg-red-500 bg-blue-500"); // bg-blue-500

// 연산자 사용
twMerge("bg-gray-500", isActive && "bg-blue-500");

<button className={twMerge("bg-gray-500", isActive && "bg-blue-500")}></button>;
```

#### 5.4 이미지 렌더링하기

- public/assets/images/이미지 : 정적 리소스로 취급
  빌드 도구의 처리 과정을 거치지 않고 파일 그대로 애플리케이션에 포함
  따로 import 하지 않고 절대 경로 방식으로 직접 사용
- src/assets/images/이미지 : 번들링, 트랜스파일의 과정을 거쳐 프로젝트에 통합되어 관리 일반적으로 프로젝트의 이미지는 대부분 해당 경로에 저장해서 사용
  jsx 코드에서 import해서 사용
- 언제 public 폴더를 사용해야 할까?
  - 사이트 파비콘 등 index.html에 직접 넣어야 하는 경우.
  - 이미지 파일 경로를 런타임에 동적으로 결정해야 하는 경우.
  - 이미지 파일이 매우 크거나(수백 KB 이상), 코드와 별개로 관리하고 싶을 때.

#### 5.5 폰트 적용하기

- 폰트를 적용하는 다양한 방식
  - link 태그를 찾아 head 에 추가해서 사용
  - @import로 css 파일에 추가해서 사용
  - @font-face로 서버에 있는 폰트 파일을 직접 로드해서 사용
  - @font-face 코드를 css 파일에 추가해서 사용

💡 느낀 점

이미 알고 있던 스타일 관련 내용이었지만, 한 번 더 정리하고 넘어갈 수 있어서 좋았습니다.
아직 배우지 않은 Tailwind를 미리 접해볼 수 있었던 점도 인상 깊었고,
기존 코드보다 더 간략하게 작성할 수 있을 것 같다는 점에서 활용성이 높다고 느꼈습니다.

사용법도 크게 어렵게 느껴지지 않아, 이후 과정에서 배우게 되면
직접 적용해보고 싶다는 기대감이 생겼습니다.
