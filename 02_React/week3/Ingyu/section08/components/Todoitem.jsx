import './Todoitem.css'

export const Todoitem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  }

  const onDeleteButton = () => {
    onDelete(id);
  }

  return (
      <div className="Todoitem">
        <input onChange={onChangeCheckbox} checked={isDone} readOnly type="checkbox" />
        <div className='content'>{content}</div>
        <div className='date'>{new Date(date).toLocaleDateString()}</div>
        <button onClick={onDeleteButton}>삭제</button>
      </div>
  )
}