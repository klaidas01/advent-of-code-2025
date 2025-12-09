import { Heap } from "heap-js";
import { readFile } from "../utils";

type Point = { x: number; y: number };

const solve1 = async () => {
  const lines = await readFile("./src/day9/input.txt");

  const points: Point[] = [];
  for await (const line of lines) {
    const [x, y] = line.split(",");

    points.push({ x: Number(x), y: Number(y) });
  }

  const heap = new Heap(Heap.maxComparator);
  heap.init(
    points.reduce<number[]>((acc, point, i) => {
      const areas: number[] = [];

      for (let j = i + 1; j < points.length; j++) {
        areas.push(getArea(point, points[j]));
      }

      return [...acc, ...areas];
    }, [])
  );

  return heap.peek();
};

const solve2 = async () => {
  const lines = await readFile("./src/dayX/input.txt");

  for await (const line of lines) {
  }
};

const getArea = (point1: Point, point2: Point) => {
  return (
    (Math.abs(point1.x - point2.x) + 1) * (Math.abs(point1.y - point2.y) + 1)
  );
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  //   const res2 = await solve2();
  //   console.log(`Part 2: ${res2}`);
};

main();
