import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import "./App.css";
import { createContext, useMemo, useReducer, useRef } from "react";

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

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.targetId
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.targetId);
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </>
  );
}

export default App;
