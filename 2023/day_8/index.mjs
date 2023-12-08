import { dir } from "node:console";
import { readFileSync } from "node:fs";

function create_map(node_lines = []) {
  return node_lines
    .reduce((acc, cur) => {
      const [
        node,
        raw_children,
      ] = cur.split(" = ")

      const [
        L,
        R,
      ]= raw_children
        .replace(/[\(\)]/g, "")
        .split(", ")
      
      acc[node] = {
        L,
        R,
      };
      return acc;
    }, {})
}

function traverse_map(directions = [], map) {

  let steps = 0;
  const len = directions.length;
  let current_node = "AAA";

  for (let i = 0; current_node !== "ZZZ"; i = (i + 1) % len) {
    const direction = directions[i];
    current_node = map[current_node][direction];
    steps++;
  }

  return steps;
}

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return a * (b / gcd(a, b));
}
function ghost_traversal(directions = [], map) {
  const len = directions.length;
  
  return Object
    .keys(map)
    .filter(i => i.endsWith("A"))
    .map(start_node => {
      let current_node = start_node;
      let result = 0;

      for (let i = 0; !current_node.endsWith("Z"); i = (i + 1) % len) {
        const direction = directions[i];
        current_node = map[current_node][direction];
        result++;
      }
      return result;
    })
    .reduce((acc, cur) => lcm(cur, acc), 1)

}

const data = readFileSync("./input", "utf-8");
const [
  raw_directions,
  raw_nodes,
] = data.split("\n\n");

const directions = raw_directions.split("")
const map = create_map(raw_nodes.split("\n"))

const results = {
  part_1: traverse_map(directions, map),
  part_2: ghost_traversal(directions, map),
};

console.log(results);