import React from "react";
import { render } from "react-dom";
import NodeTree from "./NodeTree";
import nodes from "./data";
import ReactRndApp from "./ReactRndApp";

function App() {
  // why here need position abosolute wrapper:
  // https://github.com/bokuweb/react-rnd/issues/738
  return (
    <>
      <div style={{ position: "absolute" }}>
        <NodeTree nodes={nodes} />
      </div>
      <ReactRndApp />
    </>
  );
}

render(<App />, document.getElementById("root"));
