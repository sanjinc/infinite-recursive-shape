const { draw } = require('./app');
const mockData = require('./app.mock');

describe('Shape', () => {
  mockData.forEach(mock => {
    const mockArgs = mock.input.split(',').map(Number);
    test(`renders (${mockArgs})`, () => {
      const actual = JSON.stringify(draw(...mockArgs));
      const expected = mock.pixelArrayJson;
      expect(actual).toBe(expected);
    });
  });
});
