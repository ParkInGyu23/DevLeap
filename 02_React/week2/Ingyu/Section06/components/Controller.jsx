export const Controller = ({ onClickbutton }) => {
  const buttons = [-100, -10, -1, 1, 10, 100];

  return (
        <>
          {buttons.map((value) => (
            <button key={value} onClick={() => onClickbutton(value)}>
              {value > 0 ? `+${value}` : value}
            </button>
          ))}
        </>
  )
}