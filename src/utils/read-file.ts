import fs from "fs";
import readline from "readline";

export const readFile = (path: string) => {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return rl;
};

export const readFileToMemory = async (path: string): Promise<string[]> => {
  const lines = await readFile(path);

  const result = [];

  for await (const line of lines) {
    result.push(line);
  }

  return result;
};
