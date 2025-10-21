import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.resolve(__dirname, "../assets/icons/unfilled"); //or filled
const dirNew = path.resolve(__dirname, "../assets/icons");
const files = fs.readdirSync(dir);

const imports = files
  .filter((f) => f.endsWith(".svg"))
  .map((f) => {
    const name = path.basename(f, ".svg");
    return `import ${name} from '../assets/icons/unfilled/${f}';`; //or filled
  })
  .join("\n");

const exports = `export const icons = {
${files
  .filter((f) => f.endsWith(".svg"))
  .map((f) => `  "${path.basename(f, ".svg")}": ${path.basename(f, ".svg")},`)
  .join("\n")}
};`;

fs.writeFileSync(path.resolve(dirNew, "index.js"), imports + "\n\n" + exports);
console.log("✅ Icons index.js generated!");
