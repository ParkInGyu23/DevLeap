import { useRef, useState } from "react";
import "./Editor.css";

function Editor({ onCraete }) {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // keyCode === 13 안먹혀서 대신 사용. keyCode는 더이상 권장되지 않는 속성임.
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }

    onCraete(content);
    contentRef.current.value = "";
    setContent("");
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        type="text"
        placeholder="새로운 todo..."
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}

export default Editor;
