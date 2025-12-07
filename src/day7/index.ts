import { sum } from "lodash-es";
import { readFile } from "../utils";

const solve1 = async () => {
  const lines = await readFile("./src/day7/input.txt");

  let result = 0;
  let previousRow = new Map<number, boolean>();

  for await (const line of lines) {
    const currentRow = new Map<number, boolean>();

    for (let i = 0; i < line.length; i++) {
      if (line[i] === "S") {
        currentRow.set(i, true);
      }

      if (previousRow.get(i)) {
        if (line[i] === ".") {
          currentRow.set(i, true);
        } else if (line[i] === "^") {
          currentRow.set(i + 1, true);
          currentRow.set(i - 1, true);
          result += 1;
        }
      }
    }

    previousRow = currentRow;
  }

  return result;
};

const solve2 = async () => {
  const lines = await readFile("./src/day7/input.txt");

  let previousRow = new Map<number, number>();

  for await (const line of lines) {
    const currentRow = new Map<number, number>();

    for (let i = 0; i < line.length; i++) {
      if (line[i] === "S") {
        currentRow.set(i, 1);
      }

      const previousValue = previousRow.get(i);
      if (previousValue) {
        if (line[i] === ".") {
          currentRow.set(i, (currentRow.get(i) ?? 0) + previousValue);
        } else if (line[i] === "^") {
          currentRow.set(i - 1, (currentRow.get(i - 1) ?? 0) + previousValue);
          currentRow.set(i + 1, (currentRow.get(i + 1) ?? 0) + previousValue);
        }
      }
    }

    previousRow = currentRow;
  }

  return sum([...previousRow.values()]);
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
