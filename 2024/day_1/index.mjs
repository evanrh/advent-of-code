import { readFile } from "node:fs/promises";
import { numSort, inputPath } from "../utils.mjs";

const input = inputPath(import.meta.url);
const lines = (await readFile(input, { encoding: "utf-8" }))
  .split("\n")
  .slice(0, -1);

const lists = lines.reduce(
  (acc, line) => {
    const [leftNum, rightNum] = line.split(/\s+/).map((i) => Number(i));
    acc.left.push(leftNum);
    acc.right.push(rightNum);
    return acc;
  },
  { left: [], right: [] },
);

const left = lists.left.sort(numSort);
const right = lists.right.sort(numSort);

const part1 = () => {
  let result = 0;

  for (let i = 0; i < left.length; i++) {
    const leftNum = left[i];
    const rightNum = right[i];
    result += Math.abs(rightNum - leftNum);
  }
  return result;
};

const part2 = () => {
  const numMap = new Map();

  for (const num of right) {
    const offset = numMap.get(num) ?? 0;
    numMap.set(num, offset + 1);
  }

  let result = 0;
  for (const num of left) {
    const amount = numMap.get(num) ?? 0;
    result += num * amount;
  }
  return result;
};

console.log(part1());
console.log(part2());
