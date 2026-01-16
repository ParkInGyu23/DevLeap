import "./Button.css";

export default function Button({
  type,
  variant = "default",
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      className={`button button_${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
