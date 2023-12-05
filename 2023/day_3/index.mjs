import { readFileSync } from "node:fs";

function fetch_parts(engine = []) {
  const num_pattern = /\d+/g;
  const symbol_pattern = /[^\d\.]/g;
  const number_map = {};

  let current_num;
  let current_symbol;

  engine.forEach((line, y) => {
    while ((current_num = num_pattern.exec(line)) !== null) {
      const {
        0: num,
        index
      } = current_num;
      const { lastIndex } = pattern;

      number_map[num] = {
        x: {
          min: index,
          max: lastIndex - 1,
        },
        y,
        needed: false,
      }
    }
  });

  engine.forEach((line, y) => {
    while ((current_symbol = symbol_pattern.exec(line)) !== null) {
      const { index } = current_symbol;

    }
  });

  console.log(number_map);

}

const data = readFileSync("./test_input", "utf-8");
const engine = data.split("\n");

const results = {
  part_1: fetch_parts(engine)
};

//console.log(results);