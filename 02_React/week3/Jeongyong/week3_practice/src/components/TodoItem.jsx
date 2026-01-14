import { useContext, memo } from "react";
import "./TodoItem.css";
import { TodoDispatchContext } from "../App";

function TodoItem({ id, isDone, content, date }) {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className={`content ${isDone ? "done" : ""}`}>{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
}

export default memo(TodoItem);
