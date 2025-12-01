import { readFile } from "../utils";

const solve1 = async () => {
  const lines = await readFile("./src/day1/input.txt");

  let pos = 50;
  let result = 0;

  for await (const line of lines) {
    const direction = line.slice(0, 1);
    const count = Number(line.slice(1)) % 100;

    if (direction === "L") {
      const next = pos - count;

      pos = next < 0 ? 100 + next : next;
    }

    if (direction === "R") {
      const next = pos + count;

      pos = next > 99 ? next - 100 : next;
    }

    if (pos === 0) {
      result += 1;
    }
  }

  return result;
};

const solve2 = async () => {
  const lines = await readFile("./src/day1/input.txt");

  let pos = 50;
  let result = 0;

  for await (const line of lines) {
    const direction = line.slice(0, 1);
    const countFull = Number(line.slice(1));
    const count = countFull % 100;
    const fullRotations = Math.floor(countFull / 100);
    result += fullRotations;

    if (direction === "L") {
      const next = pos - count;

      if (pos !== 0 && next <= 0) {
        result += 1;
      }

      pos = next < 0 ? next + 100 : next;
    }

    if (direction === "R") {
      const next = pos + count;

      if (next > 99) {
        result += 1;
      }

      pos = next > 99 ? next - 100 : next;
    }
  }

  return result;
};

const main = async () => {
  const res1 = await solve1();
  const res2 = await solve2();

  console.log(`Part 1: ${res1}`);
  console.log(`Part 2: ${res2}`);
};

main();
