import React from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

export default function DraggableNode({
  setSize,
  setPosition,
  getPosition,
  getSize,
  update,
  children,
  scale,
}) {
  const changePosition = (e, d) => {
    setPosition(d.x / scale, d.y / scale);
    update();
  };

  const onResize = (e, direction, ref, delta, position) => {
    const width = parseInt(ref.style.width, 10) / scale;
    const height = parseInt(ref.style.height, 10) / scale;
    setSize(width, height);
    update();
    changePosition(null, position);
  };

  const position = getPosition();
  const size = getSize();

  return (
    <Rnd
      style={style}
      size={{ width: size[0] * scale, height: size[1] * scale }}
      position={{ x: position[0] * scale, y: position[1] * scale }}
      onDrag={changePosition}
      onDragStop={changePosition}
      onResize={onResize}
      onResizeStop={onResize}
    >
      {children}
    </Rnd>
  );
}
