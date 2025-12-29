function Controller({ handleClickButton }) {
  return (
    <div>
      <button onClick={() => handleClickButton(-1)}>-1</button>
      <button onClick={() => handleClickButton(-10)}>-10</button>
      <button onClick={() => handleClickButton(-100)}>-100</button>
      <button onClick={() => handleClickButton(+100)}>+100</button>
      <button onClick={() => handleClickButton(+10)}>+10</button>
      <button onClick={() => handleClickButton(+1)}>+1</button>
    </div>
  );
}

export default Controller;
