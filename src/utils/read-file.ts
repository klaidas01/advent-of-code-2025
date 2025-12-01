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
