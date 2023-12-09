import { readFileSync } from "node:fs";
import { reduction_sum } from "../shared_functions.mjs";

function next_in_sequence(seq = []) {

  // Base case, sequence of all zeroes
  if (seq.every(i => i === 0))
    return {
      next: 0,
      prev: 0,
    };

  const differences = seq
    .slice(1)
    .map((elem, i) => elem - seq[i])

  const {
    next,
    prev
  } = next_in_sequence(differences);

  return {
    next: seq.at(-1) + next,
    prev: seq.at(0) - prev,
  };
}

const data = readFileSync("./input", "utf-8");
const lines = data
  .split("\n")
  .map(i => i
    .split(" ")
    .map(j => Number(j))
  )
;

const new_sequences = lines.map(i => next_in_sequence(i))
const results = {
  part_1: new_sequences
    .reduce((acc, { next }) => acc + next, 0),
  
  part_2: new_sequences
    .reduce((acc, { prev }) => acc + prev, 0),
};

console.log(results);