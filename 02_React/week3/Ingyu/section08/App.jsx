import { useEffect, useRef, useState } from 'react';
import './App.css'
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { List } from './components/List';

function App() {
  const getInitialTodos = () => {
    const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    }

  const [todos, setTodos] = useState(getInitialTodos);

  const idRef = useRef(
    todos.length > 0
    ? Math.max(...todos.map((todo) => todo.id)) + 1
    : 0
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime()
    }
    setTodos([newTodo, ...todos])
  }

  const onUpdate = (targetId) => {
    setTodos(todos.map((todo) => todo.id === targetId
    ? { ...todo, isDone: !todo.isDone } : todo
  ))};

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className='App'>
      <Header />
      <Editor onCreate={onCreate}/>
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  )
}

export default App
