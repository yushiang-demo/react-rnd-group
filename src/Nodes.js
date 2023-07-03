import React from "react";
import useForceUpdate from "./useForceUpdate";
import DraggableNode from "./DraggableNode";

export default function Nodes({ nodes }) {
  const update = useForceUpdate();

  return nodes.map((node, index) => (
    <DraggableNode key={index} {...node} update={update}>
      <node.body />
    </DraggableNode>
  ));
}
