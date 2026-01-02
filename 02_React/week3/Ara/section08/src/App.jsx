import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import "./App.css";
import { useRef, useState } from "react";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "파트2 프로젝트 완료하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "스프린트 미션7 제출하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "스터디 이번주 분량 공부하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCraete = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      )
    );
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <>
      <Header />
      <Editor onCraete={onCraete} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </>
  );
}

export default App;
