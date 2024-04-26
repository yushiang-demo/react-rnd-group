import React from "react";
import { createRoot } from "react-dom/client";
import Nodes from "./Nodes";
import nodes from "./data";

function App() {
  return <Nodes nodes={nodes} />;
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
