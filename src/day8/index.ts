import { orderBy, sum } from "lodash-es";
import { readFile } from "../utils";

type Node = { x: number; y: number; z: number };
type Link = { from: number; to: number; distance: number };

const solve1 = async () => {
  const lines = await readFile("./src/day8/input.txt");

  const nodes: Node[] = [];
  for await (const line of lines) {
    const [x, y, z] = line.split(",");

    nodes.push({ x: Number(x), y: Number(y), z: Number(z) });
  }

  const links: Link[] = [];

  nodes.forEach((node, index) => {
    for (let i = index + 1; i < nodes.length; i++) {
      links.push({
        from: index,
        to: i,
        distance: getDistance(node, nodes[i]),
      });
    }
  });

  const sortedLinks = orderBy(links, (link) => link.distance, "desc");
  const circuits = new Map<number, Node[]>();

  for (let i = 0; i < 1000; i++) {
    const link = sortedLinks.pop();

    if (link) {
      const from = nodes[link.from];
      const to = nodes[link.to];

      const circuitKeys = [...circuits.keys()].filter((key) => {
        const circuit = circuits.get(key);

        return (
          circuit &&
          (circuit.some((x) => x === from) || circuit.some((x) => x === to))
        );
      });

      if (circuitKeys.length === 0) {
        circuits.set(i, [from, to]);
      } else {
        const newCircuit = circuitKeys.reduce<Node[]>((acc, key) => {
          const result = [...acc, ...(circuits.get(key) ?? [])];
          circuits.delete(key);
          return result;
        }, []);

        if (!newCircuit.includes(from)) {
          newCircuit.push(from);
        }
        if (!newCircuit.includes(to)) {
          newCircuit.push(to);
        }

        circuits.set(i, newCircuit);
      }
    }
  }

  return orderBy([...circuits.values()], (x) => x.length, "desc")
    .slice(0, 3)
    .map((x) => x.length)
    .reduce((acc, x) => acc * x, 1);
};

const solve2 = async () => {
  const lines = await readFile("./src/day8/input.txt");

  const nodes: Node[] = [];
  for await (const line of lines) {
    const [x, y, z] = line.split(",");

    nodes.push({ x: Number(x), y: Number(y), z: Number(z) });
  }

  const links: Link[] = [];

  nodes.forEach((node, index) => {
    for (let i = index + 1; i < nodes.length; i++) {
      links.push({
        from: index,
        to: i,
        distance: getDistance(node, nodes[i]),
      });
    }
  });

  const sortedLinks = orderBy(links, (link) => link.distance, "desc");
  const circuits = new Map<number, Node[]>();

  let iteration = 0;
  while (true) {
    const link = sortedLinks.pop();

    if (link) {
      const from = nodes[link.from];
      const to = nodes[link.to];

      const circuitKeys = [...circuits.keys()].filter((key) => {
        const circuit = circuits.get(key);

        return (
          circuit &&
          (circuit.some((x) => x === from) || circuit.some((x) => x === to))
        );
      });

      if (circuitKeys.length === 0) {
        circuits.set(iteration, [from, to]);
      } else {
        const newCircuit = circuitKeys.reduce<Node[]>((acc, key) => {
          const result = [...acc, ...(circuits.get(key) ?? [])];
          circuits.delete(key);
          return result;
        }, []);

        if (!newCircuit.includes(from)) {
          newCircuit.push(from);
        }
        if (!newCircuit.includes(to)) {
          newCircuit.push(to);
        }

        circuits.set(iteration, newCircuit);
      }

      if (circuits.get(iteration)?.length === nodes.length) {
        return from.x * to.x;
      }
      iteration += 1;
    }
  }
};

const getDistance = (node1: Node, node2: Node) => {
  const x = node1.x - node2.x;
  const y = node1.y - node2.y;
  const z = node1.z - node2.z;

  return Math.sqrt(x * x + y * y + z * z);
};

const main = async () => {
  const res1 = await solve1();
  console.log(`Part 1: ${res1}`);

  const res2 = await solve2();
  console.log(`Part 2: ${res2}`);
};

main();
