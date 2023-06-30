// run this to find difference between offical nested elements and mine implmenetation.

import React, { useState } from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const App = () => {
  return (
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        scaleX: 1,
        scaleY: 1,
        rotateAngle: 0
      }}
      dragHandleClassName="drag-handle"
      cancel=".child-draggable"
    >
      <div className="drag-handle">Parent Element</div>
      <Rnd
        style={style}
        default={{
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          scaleX: 1,
          scaleY: 1,
          rotateAngle: 0
        }}
        dragHandleClassName="drag-handle"
        className="child-draggable"
      >
        <div className="drag-handle">Child Element</div>
      </Rnd>
    </Rnd>
  );
};

render(<App />, document.getElementById("root"));
