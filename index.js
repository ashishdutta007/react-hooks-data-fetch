import React, { useState } from "react";
import { render } from "react-dom";
import ArticlesList from "./ArticlesList";
import "./style.css";

function App() {
  const [name, setName] = useState("Welcome React hooks - Fetch data");

  return (
    <div>
      <ArticlesList />
    </div>
  );
}

render(<App />, document.getElementById("root"));
