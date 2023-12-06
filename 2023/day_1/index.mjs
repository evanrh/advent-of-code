import { readFileSync } from "node:fs"
import { reduction_sum } from "../shared_functions.mjs";

const number_mappings = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function get_number(line = "") {
  const nums = [...line.matchAll(/\d/g)];

  const result = [nums.at(0), nums.at(-1)].join("")

  return Number(result);
}

function get_textual_number(line = "") {
  const pattern = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

  const nums = [...line.matchAll(pattern)]
    .map(([_, num]) => number_mappings[num] ?? num)

  const result = [nums.at(0), nums.at(-1)].join("")

  return Number(result);

}

const data = readFileSync("./input", "utf-8");
const lines = data.split("\n");

const results = {
  part_1: lines
    .map(i => get_number(i))
    .reduce(reduction_sum, 0),
  
  part_2: lines
    .map(i => get_textual_number(i))
    .reduce(reduction_sum, 0)
}

console.log(results)