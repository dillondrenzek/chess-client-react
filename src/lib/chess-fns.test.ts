import {
  getColorForPosition,
  getColumnForFile,
  getColumnForIndex,
  getRowForIndex,
  getRowForRank,
} from "./chess-fns";
import { SquareColor } from "./chess-types";

describe("Chess functions", () => {
  test.each<[number, number]>([
    [0, 0],
    [7, 7],
    [8, 0],
    [63, 7],
  ])("getColumnForIndex", (index, expected) => {
    expect(getColumnForIndex(index)).toBe(expected);
  });

  test.each<[number, number]>([
    [0, 0],
    [7, 0],
    [8, 1],
    [63, 7],
  ])("getRowForIndex", (index, expected) => {
    expect(getRowForIndex(index)).toBe(expected);
  });

  test.each<[string, number]>([
    ["A", 0],
    ["a", 0],
    ["c", 2],
    ["H", 7],
  ])("getColumnForFile", (index, expected) => {
    expect(getColumnForFile(index)).toBe(expected);
  });

  test.each<[string, number]>([
    ["1", 7],
    ["2", 6],
    ["4", 4],
    ["8", 0],
  ])("getRowForRank", (index, expected) => {
    expect(getRowForRank(index)).toBe(expected);
  });

  test.each<[number, number, SquareColor]>([
    [0, 0, "light"],
    [7, 0, "dark"],
    [1, 1, "light"],
    [7, 7, "light"],
  ])("getColorForPosition", (row, column, expected) => {
    expect(getColorForPosition(row, column)).toBe(expected);
  });
});
