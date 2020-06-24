import React from "react";
import { render } from "react-dom";
import RoutePlanner from "./RoutePlanner";
import "./style.css";

function App() {
  return (
    <div>
      <RoutePlanner />
    </div>
  );
}

render(<App />, document.getElementById("root"));
