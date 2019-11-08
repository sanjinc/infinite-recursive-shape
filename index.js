(function() {
  const canvas = document.querySelector('#canvas');
  const pixelEnum = [' ', '-', '|'];
  const pixelArray = draw(120, 40, 4);

  canvas.innerHTML = display(pixelArray);
  console.log(JSON.stringify(pixelArray));

  /**
   * Returns shapes as a matrix.
   * @param number width Shape width
   * @param number height Shape height
   * @param number padding Spacing between shapes
   * @returns array
   */
  function draw(width, height, padding) {
    let pixelArray = [];
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const halfPadding = padding / 2;
    let countRowPadding = 0;
    let countColPadding = 0;
    let countHorizontal = 1;
    let countVertical = 1;
    for (let verIdx = 0; verIdx < halfHeight; verIdx++) {
      let halfRow = [];
      for (let horIdx = 0; horIdx < halfWidth; horIdx++) {
        let spriteIdx;
        switch (true) {
          case verIdx === 0:
            spriteIdx = 1;
            break;
          case horIdx === 0:
            spriteIdx = 2;
            break;
          case verIdx > 0 && countRowPadding === 0:
            const verticalIdx = (countVertical - 1) * (halfPadding + 1);
            if (horIdx >= verticalIdx) {
              spriteIdx = 1;
            } else if (countColPadding === 0) {
              spriteIdx = 2;
            } else {
              spriteIdx = 0;
            }
            break;
          case horIdx > 0 && countColPadding === 0:
            const horizontalIdx = countVertical * (halfPadding + 1);
            if (horIdx >= horizontalIdx) {
              spriteIdx = 0;
            } else {
              spriteIdx = 2;
            }
            break;
          default:
            spriteIdx = 0;
        }
        halfRow.push(spriteIdx);
        if (countColPadding === halfPadding) {
          countColPadding = 0;
        } else {
          if (horIdx === halfWidth - 1) {
            countColPadding = 0;
          } else {
            countColPadding++;
          }
        }
        if (horIdx === 0 && verIdx > 0 && countRowPadding === 0) {
          countVertical++;
        }
      }
      if (verIdx > 0 && countColPadding === 0) {
        countHorizontal++;
      }
      if (countRowPadding === halfPadding) {
        countRowPadding = 0;
      } else {
        countRowPadding++;
      }
      const fullRow = [...halfRow, ...halfRow.slice().reverse()];
      pixelArray.push(fullRow);
    }
    return [...pixelArray, ...pixelArray.slice().reverse()];
  }

  /**
   * Returns shapes as a string.
   * @param array shape Shape matrix
   * @returns string
   */
  function display(shape) {
    let drawing = '';
    shape.forEach(row => {
      row.forEach(col => {
        drawing += pixelEnum[col];
      });
      drawing += `\n`;
    });
    return drawing;
  }
})();
