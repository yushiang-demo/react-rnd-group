import React from "react";
import useForceUpdate from "./useForceUpdate";
import DraggableNode from "./DraggableNode";

export default function NodeTree({ nodes }) {
  const update = useForceUpdate();

  return nodes.map((node) => (
    <DraggableNode {...node} update={update}>
      <node.body />
    </DraggableNode>
  ));
}
