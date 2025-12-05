import { maxBy, minBy, orderBy } from "lodash-es";
import { readFile } from "../utils";

type Range = { from: number; to: number };

const solve1 = async () => {
  const lines = await readFile("./src/day5/input.txt");

  let ranges: Range[] = [];
  const input: number[] = [];

  let rangesDone = false;
  for await (const line of lines) {
    if (line === "") {
      rangesDone = true;
    } else if (rangesDone) {
      input.push(Number(line));
    } else {
      const [from, to] = line.split("-");
      ranges = addRange(ranges, { from: Number(from), to: Number(to) });
    }
  }

  const orderedRanges = orderBy(ranges, (x) => x.from);
  const upperBound = orderedRanges[orderedRanges.length - 1].to;

  return input.reduce((acc, id) => {
    for (const range of orderedRanges) {
      if (id < range.from || id > upperBound) {
        return acc;
      }
      if (id >= range.from && id <= range.to) {
        return acc + 1;
      }
    }
    return acc;
  }, 0);
};

const solve2 = async () => {
  const lines = await readFile("./src/day5/input.txt");

  let ranges: Range[] = [];

  for await (const line of lines) {
    if (line === "") {
      break;
    } else {
      const [from, to] = line.split("-");
      ranges = addRange(ranges, { from: Number(from), to: Number(to) });
    }
  }

  return ranges.reduce((acc, range) => {
    return acc + (range.to - range.from + 1);
  }, 0);
};

const addRange = (ranges: Range[], range: Range): Range[] => {
  const [overlapping, separate] = ranges.reduce<Range[][]>(
    (acc, x) => {
      const isOverlapping =
        (range.from >= x.from && range.from <= x.to) ||
        (range.to >= x.from && range.to <= x.to) ||
        (range.from <= x.from && range.to >= x.to);

      acc[isOverlapping ? 0 : 1].push(x);
      return acc;
    },
    [[range], []]
  );

  const from = minBy(overlapping, (x) => x.from)!.from;
  const to = maxBy(overlapping, (x) => x.to)!.to;

  return [...separate, { from, to }];
};

const main = async () => {
  // const res1 = await solve1();
  // console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
