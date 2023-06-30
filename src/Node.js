import { vec2, mat3 } from "gl-matrix";

export default function Node(coord) {
  const leftTopCoord = vec2.fromValues(0, 0);
  const rightBottomCoord = vec2.fromValues(coord[2], coord[3]);

  const scaleMat = mat3.create();
  mat3.fromScaling(scaleMat, [1, 1]);
  const translateMat = mat3.create();
  mat3.fromTranslation(translateMat, [coord[0], coord[1]]);

  const setSize = (width, height, baseMatrix) => {
    const displaySize = vec2.create();
    vec2.transformMat3(displaySize, rightBottomCoord, baseMatrix);

    mat3.fromScaling(scaleMat, [
      width / displaySize[0],
      height / displaySize[1]
    ]);
  };

  const setPosition = (x, y, baseMatrix) => {
    const position = vec2.fromValues(x, y);

    const inverseMatrix = mat3.create();
    mat3.invert(inverseMatrix, baseMatrix);
    vec2.transformMat3(position, position, inverseMatrix);

    mat3.fromTranslation(translateMat, position);
  };

  const getPositionMatrix = () => {
    const result = mat3.create();
    mat3.multiply(result, translateMat, scaleMat);
    return result;
  };

  const getPosition = (base) => {
    const result = mat3.create();
    mat3.multiply(result, base, getPositionMatrix());

    const position = vec2.create();
    vec2.transformMat3(position, leftTopCoord, result);

    return position;
  };

  const getScaleMatrix = () => {
    return scaleMat;
  };

  const getSize = (base) => {
    const result = mat3.create();
    mat3.multiply(result, base, getScaleMatrix());

    const size = vec2.create();
    vec2.transformMat3(size, rightBottomCoord, result);
    return size;
  };

  return {
    setSize,
    setPosition,
    getPosition,
    getSize,
    getPositionMatrix,
    getScaleMatrix
  };
}
