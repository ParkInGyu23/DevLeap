import { useState } from "react";
import "./App.css";
import Controller from "./components/Controller";
import Viewer from "./components/Viewer";

function App() {
  const [count, setCount] = useState(0);
  const handleClickButton = (value) => {
    setCount(count + value);
  };
  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Simple Counter</h1>
      <div
        style={{
          width: "500px",
          height: "200px",
          backgroundColor: "gainsboro",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      >
        <Viewer count={count} />
      </div>
      <div
        style={{
          width: "500px",
          height: "50px",
          backgroundColor: "gainsboro",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Controller handleClickButton={handleClickButton} />
      </div>
    </div>
  );
}

export default App;
