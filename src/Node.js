import { vec2, mat3 } from "gl-matrix";
import { v4 as uuid } from "uuid";

export default function Node(coord) {
  const leftTopCoord = vec2.fromValues(0, 0);
  const rightBottomCoord = vec2.fromValues(coord[2], coord[3]);

  const scaleMat = mat3.create();
  mat3.fromScaling(scaleMat, [1, 1]);
  const translateMat = mat3.create();
  mat3.fromTranslation(translateMat, [coord[0], coord[1]]);

  const setSize = (width, height) => {
    const baseMatrix = getParentSizeMatrix();
    const displaySize = vec2.create();
    vec2.transformMat3(displaySize, rightBottomCoord, baseMatrix);

    mat3.fromScaling(scaleMat, [
      width / displaySize[0],
      height / displaySize[1],
    ]);
  };

  const setPosition = (x, y) => {
    const baseMatrix = getParentTranslateMatrix();
    const position = vec2.fromValues(x, y);

    const inverseMatrix = mat3.create();
    mat3.invert(inverseMatrix, baseMatrix);
    vec2.transformMat3(position, position, inverseMatrix);

    mat3.fromTranslation(translateMat, position);
  };

  const getParentTranslateMatrix = () => {
    const matrix = mat3.create();
    mat3.identity(matrix);
    if (parent) {
      mat3.multiply(matrix, parent.getTranslateMatrix(), matrix);
    }

    return matrix;
  };

  const getTranslateMatrix = () => {
    const translate = mat3.create();
    mat3.multiply(translate, translateMat, scaleMat);

    if (parent) {
      mat3.multiply(translate, getParentTranslateMatrix(), translate);
    }

    return translate;
  };

  const getPosition = () => {
    const position = vec2.create();
    vec2.transformMat3(position, leftTopCoord, getTranslateMatrix());

    return position;
  };

  const getParentSizeMatrix = () => {
    const matrix = mat3.create();
    mat3.identity(matrix);
    if (parent) {
      mat3.multiply(matrix, parent.getSizeMatrix(), matrix);
    }

    return matrix;
  };

  const getSizeMatrix = () => {
    const scale = mat3.create();
    mat3.copy(scale, scaleMat);

    if (parent) {
      mat3.multiply(scale, getParentSizeMatrix(), scale);
    }

    return scale;
  };

  const getSize = () => {
    const size = vec2.create();
    vec2.transformMat3(size, rightBottomCoord, getSizeMatrix());
    return size;
  };

  let parent = null;
  const setParent = (node) => {
    if (parent) {
      mat3.multiply(translateMat, getParentTranslateMatrix(), translateMat);
      mat3.multiply(scaleMat, getParentSizeMatrix(), scaleMat);
    }

    if (node) {
      const inverseParentTranslateMatrix = mat3.create();
      mat3.invert(inverseParentTranslateMatrix, node.getTranslateMatrix());
      mat3.multiply(translateMat, inverseParentTranslateMatrix, translateMat);

      const inverseParentSizeMatrix = mat3.create();
      mat3.invert(inverseParentSizeMatrix, node.getSizeMatrix());
      mat3.multiply(scaleMat, inverseParentSizeMatrix, scaleMat);
    }

    parent = node;
  };

  const getParent = () => {
    return parent;
  };

  return {
    id: uuid(),
    setParent,
    getParent,
    setSize,
    setPosition,
    getPosition,
    getSize,
    getTranslateMatrix,
    getSizeMatrix,
  };
}
