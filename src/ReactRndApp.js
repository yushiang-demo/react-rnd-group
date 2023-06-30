import React from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const childStyle = {
  width: "100%",
  height: "100%",
  cursor: "move",
};

const ReactRndApp = () => {
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
        rotateAngle: 0,
      }}
      dragHandleClassName="drag-handle"
      cancel=".child-draggable"
    >
      <div className="drag-handle" style={childStyle}>
        react-rnd parent
      </div>
      <Rnd
        style={style}
        default={{
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          scaleX: 1,
          scaleY: 1,
          rotateAngle: 0,
        }}
        dragHandleClassName="drag-handle"
        className="child-draggable"
      >
        <div className="drag-handle" style={childStyle}>
          react-rnd child
        </div>
      </Rnd>
    </Rnd>
  );
};

export default ReactRndApp;
