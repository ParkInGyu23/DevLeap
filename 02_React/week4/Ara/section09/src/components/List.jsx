import { useState } from "react";
import TodoItem from "./TodoItem";
import "./List.css";

function List({ todos, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") return todos;

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요."
      />
      <div className="todos_wrapper">
        {filteredData.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default List;
