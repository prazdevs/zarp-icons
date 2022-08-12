import { readdirSync, writeFileSync } from "fs";
import { default as theme } from './theme.json'

const iconFiles = readdirSync("./icons");
const iconDefinitions = iconFiles.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.slice(0, -4)]: `./icons/${cur}`,
  }),
  {}
);

const r = {
  ...theme,
  iconDefinitions
}

writeFileSync('theme.json', JSON.stringify(r, null, 2))
