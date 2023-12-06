import { readFileSync } from "node:fs";
import { reduction_product } from "../shared_functions.mjs";

function possible_solutions({time = 0, distance = 0}) {

  let result = 0;
  for(let i = 0; i <= time; i++) {

    const speed = i;
    const time_remaining = time - i;

    const distance_traveled = speed * time_remaining;

    if (distance_traveled >= distance) result++;
  }
  return result;
}

const data = readFileSync("./input", "utf-8");
const lines = data.split("\n");

const [ times, distances ] = lines
  .map(i => i
    .split(/ +/g)
    .slice(1)
    .map(j => Number(j))
  )
;
const races = times.map((time, i) => ({
  time,
  distance: distances[i]
}));

const real_race = times.reduce((acc, time, i) => {
  acc.time += time;
  acc.distance += distances[i];
  return acc;
}, {time: "", distance: ""})

real_race.time = Number(real_race.time);
real_race.distance = Number(real_race.distance);

const results = {
  part_1: races
    .map(i => possible_solutions(i))
    .reduce(reduction_product, 1),
  
  part_2: possible_solutions(real_race),
};

console.log(results);