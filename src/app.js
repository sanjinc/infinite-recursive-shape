/**
 * Returns matrix.
 * Creates empty matrix, populates first quadrant and applies pattern to other quadrants.
 * @param {number} width
 * @param {number} height
 * @param {number} padd
 */
exports.draw = function(width, height, padd) {
  const emptyMark = 0;
  const emptyMatrix = createEmptyMatrix(width, height, emptyMark);
  const maxLength = width < height ? width : height;
  const corners = getCorners(maxLength, padd / 2);
  const matrixPattern = fillPatternInFirstQuadrant(
    emptyMatrix,
    corners,
    width,
    height
  );
  const matrix = applyPatternToOtherQuadrants(matrixPattern);
  return matrix;
};

/**
 * Returns two dimensional array filled with placeholders.
 * @param {number} width Matrix width
 * @param {number} height Matrix height
 * @param {number} mark Integer representing pixel shape
 * @returns {array}
 */
function createEmptyMatrix(width, height, mark) {
  const matrix = [];
  for (i = 0; i < height; i++) {
    matrix.push(new Array(width).fill(mark));
  }
  return matrix;
}

/**
 * Returns all corners in first matrix quadrant.
 * @param {number} maxLength
 * @param {number} padd Spacing between shapes
 * @returns {array}
 */
function getCorners(maxLength, padd) {
  const corners = [0]; // includes initial corner
  let isEnd = false;
  while (!isEnd) {
    const nextCorner = calcNextCorner(corners[corners.length - 1], padd);
    if (nextCorner < maxLength / 2) {
      corners.push(nextCorner);
    } else {
      isEnd = true;
    }
  }
  return corners;
}

/**
 * Returns index of next shape corner.
 * @param {number} pos
 * @param {array} padd
 * @returns {number}
 */
function calcNextCorner(pos, padd) {
  return pos + padd + 1;
}

/**
 * Returns matrix with first quadrant filled with identifiers.
 * @param {array} matrixRef
 * @param {array} cornersRef
 * @param {number} width
 * @param {number} height
 * @returns {array}
 */
function fillPatternInFirstQuadrant(matrixRef, cornersRef, width, height) {
  let matrix = deepCopyMatrix(matrixRef);
  const verticalMark = 2;
  const horizontalMark = 1;
  cornersRef.forEach(corner => {
    matrix = addVerticalLine(matrix, corner, height / 2, verticalMark);
    matrix = addHorizontalLine(matrix, corner, width / 2, horizontalMark);
  });
  return matrix;
}

/**
 * Returns matrix with new vertical line added.
 * @param {array} matrixRef
 * @param {number} posStart
 * @param {number} posEnd
 * @param {number} mark
 * @returns {array}
 */
function addVerticalLine(matrixRef, posStart, posEnd, mark) {
  let matrix = deepCopyMatrix(matrixRef);
  for (i = posStart; i < posEnd; i++) {
    matrix[i][posStart] = mark;
  }
  return matrix;
}

/**
 * Returns matrix with new horizontal line added.
 * @param {array} matrixRef
 * @param {number} posStart
 * @param {number} posEnd
 * @param {number} mark
 * @returns {array}
 */
function addHorizontalLine(matrixRef, posStart, posEnd, mark) {
  let matrix = deepCopyMatrix(matrixRef);
  for (i = posStart; i < posEnd; i++) {
    matrix[posStart][i] = mark;
  }
  return matrix;
}

/**
 * Returns matrix filled with shape identifiers.
 * Mirrors pattern from top left quadrant to other three.
 * @param {array} matrixRef
 * @returns {array}
 */
function applyPatternToOtherQuadrants(matrixRef) {
  let matrix = deepCopyMatrix(matrixRef);
  matrix.forEach((row, rowIdx) => {
    const horizontalPattern = row.splice(0, row.length / 2);
    const newRow = [
      ...horizontalPattern,
      ...horizontalPattern.slice().reverse()
    ];
    matrix[rowIdx] = newRow;
  });
  const verticalPattern = matrix.splice(0, matrix.length / 2);
  matrix = [...verticalPattern, ...verticalPattern.slice().reverse()];
  return matrix;
}

/**
 * Returns matrix art as multiline string.
 * @param {array} matrixRef
 * @param {array} artRef
 * @returns {string}
 */
exports.applyMatrixArt = function(matrixRef) {
  const pixels = [' ', '-', '|'];
  let drawing = '';
  matrixRef.forEach(row => {
    row.forEach(col => {
      drawing += pixels[col];
    });
    drawing += `\n`;
  });
  return drawing;
};

/**
 * Displays matrix art on DOM element.
 * @param {string} domSelector
 * @param {array} matrixArt
 */
exports.displayMatrix = function(domSelector, matrixArt) {
  const canvas = document.querySelector(domSelector);
  canvas.innerHTML = matrixArt;
};

/**
 * Returns copy of two dimensional array
 * @param {array} matrixRef
 * @returns {array}
 */
function deepCopyMatrix(matrixRef) {
  return matrixRef.map(arr => arr.slice());
}
