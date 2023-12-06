import { readFileSync } from "node:fs";
import { reduction_product } from "../shared_functions.mjs";

function seed_to_location(seed, mappings = [[]]) {
  return mappings.reduce((acc, cur) => {
    const line = cur.find(([_, src_start, range]) => acc >= src_start && acc <= (src_start + range - 1))

    if (!line)
      return acc;

    const [
      dest_start,
      src_start,
    ] = line;

    const offset = acc - src_start;

    return dest_start + offset;
  }, seed)
}

function seeds_to_range(seeds = []) {
  const groups = seeds.reduce((acc, cur, i) => {
    const bucket = Math.floor(i / 2);

    if (!acc[bucket])
      acc[bucket] = []

    acc[bucket].push(cur)
    return acc;
  }, [])

  return groups
    .map(([start, range]) => {
      let result = Infinity;

      const end = start + range;
      for (let i = start; i <= end; i++) {

        const location = seed_to_location(i);

        if (location < result)
          result = location;
      }
      return result;
    })
}

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

const results = {
  part_1: Math.min(...seeds
    .map(i => seed_to_location(i, sections))
  ),

  part_2: seeds_to_range(seeds)
    .map(i => seed_to_location(i))
};

console.log(results);