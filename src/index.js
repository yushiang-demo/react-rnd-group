import React from "react";
import { createRoot } from "react-dom/client";
import Nodes from "./Nodes";
import nodes from "./data";

function App() {
  // why here need position abosolute wrapper:
  // https://github.com/bokuweb/react-rnd/issues/738
  return (
    <div style={{ position: "absolute" }}>
      <Nodes nodes={nodes} />
    </div>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
