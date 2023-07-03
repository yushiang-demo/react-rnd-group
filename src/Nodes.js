import React from "react";
import useForceUpdate from "./useForceUpdate";
import DraggableNode from "./DraggableNode";
import useWindowScale from "./useWindowScale";

export default function Nodes({ nodes }) {
  const update = useForceUpdate();
  const scale = useWindowScale();

  return nodes.map((node, index) => (
    <DraggableNode key={index} {...node} update={update} scale={scale}>
      <node.body />
    </DraggableNode>
  ));
}
