import { draw, applyMatrixArt, displayMatrix } from './app';
import { validateForm } from './form';

const $form = document.querySelector('form');

/**
 * Initial matrix.
 */
drawMatrix(20, 20, 4);

/**
 * Attach submit event to the form.
 * Generates matrix if form is valid.
 */
$form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { isValid, width, height, padding } = validateForm(formData);
  if (isValid) {
    drawMatrix(width, height, padding);
  }
});

/**
 * Generates matrix.
 * @param {number} width
 * @param {number} height
 * @param {number} padding
 */
function drawMatrix(width, height, padding) {
  const matrix = draw(width, height, padding);
  displayMatrix('#canvas', applyMatrixArt(matrix));
}
