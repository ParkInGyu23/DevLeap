import { useState } from 'react';
import './List.css'
import { Todoitem } from './Todoitem';

export const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const getFilteredDate = () => {
    if(search === "") {
      return todos;
    }
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
  }
  const filteredTodos = getFilteredDate();

    return (
        <div className="List">
          <h4>Todo List🌱</h4>
          <input value={search} onChange={onChangeSearch} placeholder='검색어를 입력하세요'/>
          <div className='todos_wrapper'>
            {filteredTodos.map((todo) => {
              return <Todoitem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>
            })}
          </div>
        </div>
    )
}