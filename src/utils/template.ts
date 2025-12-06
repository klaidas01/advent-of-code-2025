import { readFile } from "../utils";

const solve1 = async () => {
  const lines = await readFile("./src/dayX/input.txt");

  for await (const line of lines) {
  }
};

const solve2 = async () => {
  const lines = await readFile("./src/dayX/input.txt");

  for await (const line of lines) {
  }
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
