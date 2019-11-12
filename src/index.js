import { draw, applyMatrixArt, displayMatrix } from './app';

const matrix = draw(20, 20, 4);
displayMatrix('#canvas', applyMatrixArt(matrix));
