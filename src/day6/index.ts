import { readFile, readFileToMemory } from "../utils";

enum Operator {
  MULT = "*",
  ADD = "+",
}

const solve1 = async () => {
  const lines = await readFile("./src/day6/input.txt");

  const input: number[][] = [];
  const operators: Operator[] = [];

  for await (const line of lines) {
    const parts = line.split(" ").filter((x) => x.length);

    if (Object.values<string>(Operator).includes(parts[0])) {
      operators.push(...(parts as Operator[]));
    } else {
      input.push(parts.map(Number));
    }
  }

  return operators.reduce((result, operator, index) => {
    return (
      result +
      input.reduce(
        (acc, number) => {
          return solve({ number1: acc, number2: number[index], operator });
        },
        operator === Operator.MULT ? 1 : 0
      )
    );
  }, 0);
};

const solve2 = async () => {
  const lines = await readFileToMemory("./src/day6/input.txt");

  const operatorsString = lines.splice(-1)[0];
  const problems: string[][] = [];
  const operators: Operator[] = [];

  for (let start = 0, end = 1; end <= operatorsString.length; end++) {
    if (operatorsString[end] === " " && end !== operatorsString.length) {
      continue;
    } else {
      problems.push(
        lines.map((line) =>
          line.slice(start, end === operatorsString.length ? end : end - 1)
        )
      );
      operators.push(operatorsString[start] as Operator);
      start = end;
    }
  }

  const transformed = problems.map((problem) => {
    const result: number[] = [];

    for (let i = problem[0].length - 1; i >= 0; i--) {
      let number = "";
      problem.forEach((element) => {
        if (element[i] !== " ") {
          number += element[i];
        }
      });

      result.push(Number(number));
    }
    return result;
  });

  return operators.reduce((result, operator, index) => {
    return (
      result +
      transformed[index].reduce(
        (acc, number) => {
          return solve({ number1: acc, number2: number, operator });
        },
        operator === Operator.MULT ? 1 : 0
      )
    );
  }, 0);
};

const solve = ({
  number1,
  number2,
  operator,
}: {
  number1: number;
  number2: number;
  operator: Operator;
}) => {
  switch (operator) {
    case Operator.ADD:
      return number1 + number2;
    case Operator.MULT:
      return number1 * number2;
  }
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
