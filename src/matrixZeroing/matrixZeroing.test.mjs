import assert from "node:assert/strict";
import { describe, it } from "node:test";
import matrixZeroing from "./matrixZeroing.ts";

const cases = [
  [
    "zeros in the first row and the interior",
    [
      [1, 2, 0],
      [4, 0, 6],
      [7, 8, 9],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [7, 0, 0],
    ],
  ],
  [
    "no zeros",
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  ],
  [
    "an interior zero in a rectangular matrix",
    [
      [1, 2],
      [3, 4],
      [5, 0],
      [7, 8],
    ],
    [
      [1, 0],
      [3, 0],
      [0, 0],
      [7, 0],
    ],
  ],
  [
    "a zero in the first column below the first row",
    [
      [1, 2],
      [0, 4],
    ],
    [
      [0, 2],
      [0, 0],
    ],
  ],
  [
    "a zero in the top-left corner",
    [
      [0, 2],
      [3, 4],
    ],
    [
      [0, 0],
      [0, 4],
    ],
  ],
  ["one row", [[-1000, 0, 1000]], [[0, 0, 0]]],
  ["one column", [[-1000], [0], [1000]], [[0], [0], [0]]],
];
describe("matrixZeroing", () => {
  for (const [scenario, matrix, expected] of cases) {
    it(`zeroes the matrix in place for ${scenario}`, () => {
      const originalRows = [...matrix];
      matrixZeroing(matrix);
      assert.deepEqual(matrix, expected);
      for (const [rowIndex, row] of originalRows.entries()) {
        assert.equal(matrix[rowIndex], row);
      }
    });
  }
  it("only uses original zeros when matrix rows share references", () => {
    const firstRow = [1, 2];
    const rowWithZero = [3, 0];
    const matrix = [firstRow, rowWithZero, rowWithZero, firstRow];
    matrixZeroing(matrix);
    assert.deepEqual(firstRow, [1, 0]);
    assert.deepEqual(rowWithZero, [0, 0]);
  });
  it("zeroes the last row and column in a 100 by 100 matrix", () => {
    const matrix = Array.from({ length: 100 }, () => Array(100).fill(-1000));
    const lastRow = Array(100).fill(1000);
    lastRow[99] = 0;
    matrix[99] = lastRow;
    matrixZeroing(matrix);
    const expectedRow = [...Array(99).fill(-1000), 0];
    for (const row of matrix.slice(0, 99)) {
      assert.deepEqual(row, expectedRow);
    }
    assert.deepEqual(lastRow, Array(100).fill(0));
  });
});
