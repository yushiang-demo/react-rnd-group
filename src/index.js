import React from "react";
import { render } from "react-dom";
import NodeTree from "./NodeTree";
import nodes from "./data";

function App() {
  // why here need position abosolute wrapper:
  // https://github.com/bokuweb/react-rnd/issues/738
  return (
    <div style={{ position: "absolute" }}>
      <NodeTree nodes={nodes} />
    </div>
  );
}

render(<App />, document.getElementById("root"));
