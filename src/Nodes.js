import React from "react";
import useForceUpdate from "./useForceUpdate";
import DraggableNode from "./DraggableNode";
import useWindowScale from "./useWindowScale";

const NodeContent = (node) => {
  const position = node.getPosition();
  const size = node.getSize();
  return (
    <>
      {`id: ${node.id}`}
      <br />
      {`position: (${position[0].toFixed()},${position[1].toFixed()})`}
      <br />
      {`size: (${size[0].toFixed()},${size[1].toFixed()})`}
      <br />
      {`parent ${node.getParent()?.id}`}
    </>
  );
};

export default function Nodes({ nodes }) {
  const update = useForceUpdate();
  const scale = useWindowScale();

  return nodes.map((node, index) => (
    <DraggableNode key={index} {...node} update={update} scale={scale}>
      <NodeContent {...node} />
    </DraggableNode>
  ));
}
