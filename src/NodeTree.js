import React from "react";
import useForceUpdate from "./useForceUpdate";
import { mat3 } from "gl-matrix";
import DraggableNode from "./DraggableNode";

export default function NodeTree({ nodes }) {
  const update = useForceUpdate();

  const multiplyMat3 = (mat1, mat2) => {
    const result = mat3.create();
    mat3.multiply(result, mat1, mat2);
    return result;
  };

  const getNodes = ({
    node,
    children,
    basePositionMatrix,
    baseScaleMatrix,
  }) => {
    return (
      <React.Fragment>
        <DraggableNode
          {...node}
          update={update}
          basePositionMatrix={basePositionMatrix}
          baseScaleMatrix={baseScaleMatrix}
        >
          <node.body />
        </DraggableNode>
        {children &&
          children.map((child) =>
            getNodes({
              ...child,
              basePositionMatrix: multiplyMat3(
                basePositionMatrix,
                node.getPositionMatrix()
              ),
              baseScaleMatrix: multiplyMat3(
                baseScaleMatrix,
                node.getScaleMatrix()
              ),
            })
          )}
      </React.Fragment>
    );
  };

  const identity = mat3.create();
  mat3.identity(identity);

  return nodes.map((nodes) =>
    getNodes({
      ...nodes,
      basePositionMatrix: identity,
      baseScaleMatrix: identity,
    })
  );
}
