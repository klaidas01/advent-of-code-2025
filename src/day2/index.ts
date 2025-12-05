import { sum } from "lodash-es";
import { readFile } from "../utils";

const solve1 = async () => {
  const lines = await readFile("./src/day2/input.txt");

  const numbers = [];
  for await (const line of lines) {
    const ranges = line.split(",");

    for (const range of ranges) {
      const [from, to] = range.split("-");

      for (let i = Number(from); i <= Number(to); i++) {
        const str = i.toString();
        const middle = Math.floor(str.length / 2);

        if (str.slice(0, middle) === str.slice(middle, str.length)) {
          numbers.push(i);
        }
      }
    }
  }

  return sum(numbers);
};

const solve2 = async () => {
  const lines = await readFile("./src/day2/input.txt");

  const numbers: number[] = [];
  for await (const line of lines) {
    const ranges = line.split(",");

    for (const range of ranges) {
      const [from, to] = range.split("-");

      for (let i = Number(from); i <= Number(to); i++) {
        const str = i.toString();
        const middle = Math.ceil(str.length / 2);
        for (let index = 1; index <= middle; index++) {
          if (str.length % index !== 0 || str.length === 1) {
            continue;
          }

          const chunks = chunkString(str, index);

          if (chunks.every((c) => c === chunks[0])) {
            numbers.push(i);
            break;
          }
        }
      }
    }
  }

  return sum(numbers);
};

const chunkString = (str: string, size: number) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks: string[] = [];

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks.push(str.substring(o, o + size));
  }

  return chunks;
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
