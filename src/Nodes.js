import React, { useState } from "react";
import Node from "./Node";
import useForceUpdate from "./useForceUpdate";
import DraggableNode from "./DraggableNode";
import useWindowScale from "./useWindowScale";

const commonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  background: "#ddd",
  opacity: "0.5",
};

const draggableStyle = {
  border: "dashed 3px #d00",
};

const fixStyle = (position, size) => ({
  position: "absolute",
  border: "solid 1px #000",
  width: `${size[0]}px`,
  height: `${size[1]}px`,
  transform: `translate(${position[0]}px,${position[1]}px)`,
  cursor: "pointer",
});

const FocusNode = () => <div style={{ ...draggableStyle, ...commonStyle }} />;
const FixNode = ({ node, onClick }) => (
  <div
    onClick={() => onClick(node.id)}
    style={{
      ...commonStyle,
      ...fixStyle(node.getPosition(), node.getSize()),
    }}
  />
);

export default function Nodes({ nodes }) {
  const scale = useWindowScale();
  const [controls, setControls] = useState(null);
  const [focusIds, setFocusIds] = useState([]);
  const update = useForceUpdate();

  const setControlsByIds = (newFocusIds) => {
    const focusNodes = nodes.filter((node) => newFocusIds.includes(node.id));
    const { minX, minY, maxX, maxY } = focusNodes.reduce(
      (prev, node) => {
        const position = node.getPosition();
        const size = node.getSize();

        const minX = Math.min(prev.minX, position[0]);
        const minY = Math.min(prev.minY, position[1]);
        const maxX = Math.max(prev.maxX, position[0] + size[0]);
        const maxY = Math.max(prev.maxY, position[1] + size[1]);

        return {
          minX,
          minY,
          maxX,
          maxY,
        };
      },
      {
        minX: Number.MAX_SAFE_INTEGER,
        minY: Number.MAX_SAFE_INTEGER,
        maxX: 0,
        maxY: 0,
      }
    );

    const padding = 20;
    const controls = Node([
      ...[minX - padding, minY - padding],
      ...[maxX - minX + padding * 2, maxY - minY + padding * 2],
    ]);

    focusNodes.forEach((node) => node.setParent(controls));

    setControls(controls);
  };

  const onClick = (id) => {
    const newFocusIds = (() => {
      if (focusIds.includes(id)) {
        return focusIds.filter((focusId) => focusId !== id);
      }
      return [...focusIds, id];
    })();
    setFocusIds(newFocusIds);
    setControlsByIds(newFocusIds);
  };

  return (
    <div style={{ position: "absolute", transform: `scale(${scale})` }}>
      {nodes
        .filter((node) => !focusIds.includes(node.id))
        .map((node, index) => (
          <FixNode key={index} node={node} onClick={onClick} />
        ))}
      {controls && (
        <DraggableNode {...controls} update={update} scale={scale}>
          <FocusNode />
        </DraggableNode>
      )}
      {nodes
        .filter((node) => focusIds.includes(node.id))
        .map((node, index) => (
          <FixNode key={index} node={node} onClick={onClick} />
        ))}
    </div>
  );
}
