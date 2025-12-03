import sum from "lodash/sum";
import { readFile } from "../utils";
import max from "lodash/max";

const solve1 = async () => {
  const lines = await readFile("./src/day3/input.txt");
  let result = 0;

  for await (const line of lines) {
    const numbers = [...line];

    const biggest = getBiggest(numbers, 2);

    result += Number(biggest);
  }

  return result;
};

const solve2 = async () => {
  const lines = await readFile("./src/day3/input.txt");
  let result = 0;

  for await (const line of lines) {
    const numbers = [...line];

    const biggest = getBiggest(numbers, 12);

    result += Number(biggest);
  }

  return result;
};

const getBiggest = (numbers: string[], count: number, result = "") => {
  if (result.length === count) {
    return result;
  }
  const lastPos = numbers.length - (count - result.length);
  const biggest = max(numbers.slice(0, lastPos + 1));
  if (!biggest) {
    return result;
  }

  const index = numbers.indexOf(biggest);

  return getBiggest(
    numbers.slice(index + 1, numbers.length),
    count,
    result + biggest
  );
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
