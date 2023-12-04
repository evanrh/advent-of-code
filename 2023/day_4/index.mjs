import { readFileSync } from "node:fs";

function setup_numbers(card = "") {
  const [
    winning_numbers,
    played_numbers,
  ] = card
    .split(": ")
    .at(1)
    .split(" | ")
    .map(i => i
      .split(" ")
      .filter(j => j !== "")
    )
  return {
    winning_numbers,
    played_numbers,
  }
}

function num_wins(card = "") {
  const {
    winning_numbers,
    played_numbers,
  } = setup_numbers(card);

  return played_numbers
    .filter(i => winning_numbers.includes(i))
    .length
}

function parse_card(card = "") {
  const winners = num_wins(card)
  
  return winners === 0 ? 0 : 2 ** (winners - 1)
}

function reduce_wins(acc, card = "", index = 0) {
  
  const winners = num_wins(card);

  acc[index] = (acc[index] ?? 0) + 1
  console.log(winners)
  // Return early if there are no winners
  if (winners === 0)
    return acc;

  const cards_won = (acc[index] ?? 1)
  for (let i = 1; i <= winners; i++) {
    if (!acc[index + i]) acc[index + i] = 0
    acc[index + i] += cards_won
  }

  return acc;
}

function reduction_sum(acc, cur) {
  return acc + cur;
}

const data = readFileSync("./input", "utf-8");
const cards = data.split("\n");

const results = {
  part_1: cards 
    .map(i => parse_card(i))
    .reduce(reduction_sum, 0),
  
  part_2: Object.values(cards
    .reduce(reduce_wins, {0: 0})
  )
    .reduce(reduction_sum, 0)
};

console.log(results);