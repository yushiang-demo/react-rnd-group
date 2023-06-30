import React from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

export default function DraggableNode({
  setSize,
  setPosition,
  getPosition,
  getSize,
  basePositionMatrix,
  baseScaleMatrix,
  update,
  children
}) {
  const changePosition = (e, d) => {
    setPosition(d.x, d.y, basePositionMatrix);
    update();
  };

  const onResize = (e, direction, ref) => {
    const width = parseInt(ref.style.width, 10);
    const height = parseInt(ref.style.height, 10);
    setSize(width, height, baseScaleMatrix);
    update();
  };

  const position = getPosition(basePositionMatrix);
  const size = getSize(baseScaleMatrix);

  return (
    <Rnd
      style={style}
      size={{ width: size[0], height: size[1] }}
      position={{ x: position[0], y: position[1] }}
      onDrag={changePosition}
      onDragStop={changePosition}
      onResize={onResize}
      onResizeStop={onResize}
    >
      {children}
    </Rnd>
  );
}
