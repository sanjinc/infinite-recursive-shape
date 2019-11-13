/**
 * Returns matrix.
 * Creates empty matrix, populates first quadrant and applies pattern to other quadrants.
 * @param {number} width Matrix width
 * @param {number} height Matrix height
 * @param {number} padd Padding between shapes
 * @returns {array}
 */
exports.draw = function(width, height, padd) {
  const emptyMatrix = createEmptyMatrix(width, height);
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
function createEmptyMatrix(width, height) {
  const emptyMark = 0;
  const matrix = [];
  for (let i = 0; i < height; i++) {
    matrix.push(new Array(width).fill(emptyMark));
  }
  return matrix;
}

/**
 * Returns all corners in first matrix quadrant.
 * @param {number} maxLength Max length to generate corners
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
 * @param {number} pos Current corner position
 * @param {array} padd Padding between next corner
 * @returns {number}
 */
function calcNextCorner(pos, padd) {
  return pos + padd + 1;
}

/**
 * Returns matrix with first quadrant filled with identifiers.
 * @param {array} matrixRef Matrix
 * @param {array} cornersRef Corners
 * @param {number} width Width of first quadrant (half width of matrix)
 * @param {number} height Height of first quadrant (half height of matrix)
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
 * @param {array} matrixRef Matrix
 * @param {number} posStart Starting positon
 * @param {number} posEnd End position
 * @param {number} mark Symbol used to draw line
 * @returns {array}
 */
function addVerticalLine(matrixRef, posStart, posEnd, mark) {
  let matrix = deepCopyMatrix(matrixRef);
  for (let i = posStart; i < posEnd; i++) {
    matrix[i][posStart] = mark;
  }
  return matrix;
}

/**
 * Returns matrix with new horizontal line added.
 * @param {array} matrixRef Matrix
 * @param {number} posStart Starting positon
 * @param {number} posEnd End position
 * @param {number} mark Symbol used to draw line
 * @returns {array}
 */
function addHorizontalLine(matrixRef, posStart, posEnd, mark) {
  let matrix = deepCopyMatrix(matrixRef);
  for (let i = posStart; i < posEnd; i++) {
    matrix[posStart][i] = mark;
  }
  return matrix;
}

/**
 * Returns matrix filled with shape identifiers.
 * Mirrors pattern from top left quadrant to other three.
 * @param {array} matrixRef Matrix
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
 * @param {array} matrixRef Matrix
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
 * @param {string} domSelector DOM element
 * @param {array} matrixArt Matrix
 */
exports.displayMatrix = function(domSelector, matrixArt) {
  const canvas = document.querySelector(domSelector);
  canvas.innerHTML = matrixArt;
};

/**
 * Returns copy of two dimensional array
 * @param {array} matrixRef Matrix
 * @returns {array}
 */
function deepCopyMatrix(matrixRef) {
  return matrixRef.map(arr => arr.slice());
}
