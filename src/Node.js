import { vec2, mat3 } from "gl-matrix";
import { v4 as uuid } from "uuid";

export default function Node(coord) {
  const leftTopCoord = vec2.fromValues(0, 0);
  const rightBottomCoord = vec2.fromValues(1, 1);

  const localMatrix = mat3.create();
  mat3.set(localMatrix, coord[2], 0, 0, 0, coord[3], 0, coord[0], coord[1], 1);

  const setSize = (width, height) => {
    const baseMatrix = getParentSizeMatrix();
    const size = vec2.fromValues(width, height);

    const inverseMatrix = mat3.create();
    mat3.invert(inverseMatrix, baseMatrix);
    vec2.transformMat3(size, size, inverseMatrix);

    mat3.set(
      localMatrix,
      size[0],
      0,
      0,
      0,
      size[1],
      0,
      localMatrix[6],
      localMatrix[7],
      1
    );
  };

  const setPosition = (x, y) => {
    const baseMatrix = getParentTranslateMatrix();
    const position = vec2.fromValues(x, y);

    const inverseMatrix = mat3.create();
    mat3.invert(inverseMatrix, baseMatrix);
    vec2.transformMat3(position, position, inverseMatrix);

    mat3.set(
      localMatrix,
      localMatrix[0],
      0,
      0,
      0,
      localMatrix[4],
      0,
      position[0],
      position[1],
      1
    );
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
    mat3.copy(translate, localMatrix);

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
    mat3.fromScaling(scale, [localMatrix[0], localMatrix[4]]);

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
  const setParent = (newParent) => {
    const currentTranslateMat = getTranslateMatrix();
    const inverseParentTranslateMatrix = mat3.create();
    mat3.identity(inverseParentTranslateMatrix);
    if (newParent) {
      mat3.invert(inverseParentTranslateMatrix, newParent.getTranslateMatrix());
    }
    mat3.multiply(
      localMatrix,
      inverseParentTranslateMatrix,
      currentTranslateMat
    );

    parent = newParent;
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
