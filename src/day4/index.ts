import { readFile } from "../utils";
import max from "lodash/max";

const solve1 = async () => {
  const lines = await readFile("./src/day4/input.txt");
  const grid: string[][] = [];

  for await (const line of lines) {
    grid.push([...line]);
  }

  let result = 0;

  grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col === "@" && getAdjecantRollCount(grid, x, y) < 4) {
        result += 1;
      }
    });
  });

  return result;
};

const solve2 = async () => {
  const lines = await readFile("./src/day4/input.txt");

  const grid: string[][] = [];

  for await (const line of lines) {
    grid.push([...line]);
  }

  let result = 0;
  while (true) {
    let removedCount = 0;
    grid.forEach((line, y) => {
      line.forEach((col, x) => {
        if (col === "@" && getAdjecantRollCount(grid, x, y) < 4) {
          removedCount += 1;
          grid[y][x] = ".";
        }
      });
    });

    if (removedCount === 0) {
      break;
    }
    result += removedCount;
  }

  return result;
};

const getAdjecantRollCount = (grid: string[][], x: number, y: number) => {
  const positions = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y - 1],
    [x, y + 1],
  ];

  return positions.reduce((acc, [posX, posY]) => {
    if (grid?.[posY]?.[posX] === "@") {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
