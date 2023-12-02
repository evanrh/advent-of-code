import { readFileSync } from "node:fs";

function get_game_config(game = "") {
  const [
    id_line,
    sets
  ] = game.split(": ");

  return {
    id: Number(id_line.replace(/\D/g, "")),
    sets,
  }
}
function is_move_possible(num, color) {
  switch (color) {
    case "red":
      return num < 13;
    case "blue":
      return num < 15;
    case "green":
      return num < 14;
  }
}

function parse_game(game = "") {
  const {
    id,
    sets,
  } = get_game_config(game);

  return {
    id,
    possible: sets 
      .split("; ")
      .every(i => {

        const cubes = i.split(", ").map(j => j.split(" "))
        return cubes.every(([num, color]) => is_move_possible(Number(num), color))
      })
  }
}

function least_possible_cubes(game = "") {
  const {
    id,
    sets,
  } = get_game_config(game);

  const result = sets
    .split("; ")
    .reduce((acc, cur) => {

      cur
        .split(", ")
        .map(i => i.split(" "))
        .forEach(([num, color]) => {
          const num_cubes = Number(num);

          if (num_cubes > acc[color])
            acc[color] = num_cubes
        })
      return acc;
    }, { red: 0, blue: 0, green: 0 })
  ;

  return Object
    .values(result)
    .reduce((acc, cur) => acc * cur, 1)
}

const data = readFileSync("./input", "utf-8");
const games = data.split("\n");

const results = {
  part_1: games
    .map(i => parse_game(i))
    .reduce((acc, { id, possible }) => {
      if (!possible)
        return acc;
      else
        return acc + id;
    }, 0),
  part_2: games
    .map(i => least_possible_cubes(i))
    .reduce((acc, cur) => acc + cur, 0),
};

console.log(results);