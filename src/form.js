/**
 * Checks if form has valid data.
 * @param {object} formData
 * @returns {object}
 */
exports.validateForm = function(formData) {
  let isValid = true;
  const minWidth = 20;
  const minHeight = 20;
  const minPadding = 4;
  const width = Number(formData.get('width').trim());
  const height = Number(formData.get('height').trim());
  const padding = Number(formData.get('padding').trim());
  switch (false) {
    case validateNumber('Width', width, minWidth):
    case validateNumber('Height', height, minHeight):
    case validateNumber('Padding', padding, minPadding):
      isValid = false;
      break;
  }
  return {
    isValid,
    width,
    height,
    padding
  };
};

/**
 * Returns if provided field is valid.
 * @param {string} typeNum
 * @param {number} setNum
 * @param {number} minNum
 * @returns {boolean}
 */
function validateNumber(typeNum, setNum, minNum) {
  if (Number.isInteger(setNum)) {
    if (setNum < minNum) {
      alert(`${typeNum} must be at least ${minNum}`);
      return false;
    } else if (setNum % 2 > 0) {
      alert(`${typeNum} must be even`);
      return false;
    }
  } else {
    alert(`Width must be even number`);
    return false;
  }
  return true;
}
