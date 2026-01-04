# Week 7 개인 정리

## ✏️ 배운 내용 요약

## 10장 고유 아이디와 사이드 이펙트

### useId 훅

- 컴포넌트마다 고유한 ID 값을 생성하고 관리

### useEffect 훅

- side effect: JSX를 렌더링하는 본래 목적 외에 발생하는 부수적인 행동
- useEffect 훅은 사이드 이펙트를 처리하기 위해 사용

### 컴포넌트의 생명주기

- 마운트(생성) -> 업데이트(수정) -> 언마운트(소멸)의 과정

### useEfeect 훅 사례

### API 호출하기

```js
import { useEffect } from "react";

export default function FetchUser() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <div>FetchUser</div>;
}
```

### 타이머 설정하기

```js
import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <p>timer : {seconds} seconds</p>;
}
```

### 실시간 이벤트 처리하기

```js
import { useEffect } from "react";

export default function ScrollTracker() {
  useEffect(() => {
    const handleScroll = () => {
      console.log("현재 스크롤 위치:", window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return <div style={{ height: "200vh" }}>스크롤해 보세요.</div>;
}
```

### 자동 저장 기능 구현하기

```js
import { useEffect, useState } from "react";

export default function AutoSaveForm() {
  const [formData, setFormData] = useState("");
  useEffect(() => {
    const savedData = localStorage.getItem("savedFormData");
    if (savedData) {
      setFormData(savedData);
    }
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("savedFormData", formData);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData]);
  return (
    <textarea
      value={formData}
      onChange={(e) => setFormData(e.target.value)}
      placeholder="입력한 내용을 자동으로 저장합니다."
    />
  );
}
```

### 실시간 통신 기능 구현하기

```js
import { useEffect, useState } from "react";

export default function SocketTest() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = new WebSocket("wss://echo.websocket.org");
    setSocket(socket);
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, `서버: ${event.data}`]);
    };
    socket.onerror = (error) => {
      console.error("웹소켓 오류:", error);
    };
    socket.onclose = () => {
      console.log("웹소켓 연결 종료");
    };
    return () => {
      socket.close();
    };
  }, []);
  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && message) {
      socket.send(message);
      setMessages((prev) => [...prev, `나: ${message}`]);
      setMessage("");
    } else {
      alert("서버 연결이 끊겼습니다.");
    }
  };
  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요."
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
}
```

## 💡 느낀 점

- style 방식마다 핵심적으로 추구하는 방향이 다르기 때문에 자신이 개발하는 방식이나 개발해야하는 대상에 따라 알맞는 style 방식을 채택할 수 있도록 장점과 단점을 구분해서 많은 방식들에 대해 알아야겠다고 생각함

## 💡 어려운 점

- style 방식이 너무 많아서 어떤 방법을 골라야하는지에 대한 의문이 생김
