import { readFileSync } from "node:fs";
import { reduction_product } from "../shared_functions.mjs";

const data = readFileSync("./input", "utf-8");
const seeds = data
  .split("\n")
  .at(0)
  .split(" ")
  .slice(1)
  .map(i => Number(i))
;

const sections = data
  .split(/\n\n.*-to.* map:\n/g)
  .slice(1)
  .map(i => i

    .split("\n")
    .map(j => j
      .split(" ")
      .map(k => Number(k))
    )

  )

console.log(sections)
const results = {
  part_1: null
};

console.log(results);