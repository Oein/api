import logger from "./chalk.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await logger.init();

  const defines: { [key: string]: { [key: string]: string } } = {};

  const BASAE_DIR = path.join(__dirname, "route");
  const dfs = async (dir: string) => {
    const files = fs.readdirSync(path.join(BASAE_DIR, dir));
    for (const file of files) {
      const filePath = path.join(BASAE_DIR, dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        await dfs(dir == "" ? file : path.join(dir, file));
      } else {
        const PTH =
          "/" + path.join(dir, file.split(".").slice(0, -1).join("."));
        const module = await import(path.join(BASAE_DIR, dir, file));
        const keys = ["get", "post", "put", "delete"];
        for (const key of keys) {
          if ((module as any)[key]) {
            logger.log(`[${key.toLocaleUpperCase().padStart(6, " ")}] ${PTH}`);
            if (!defines[key]) {
              defines[key] = {};
            }
            defines[key][PTH] = (module as any)[key].toString();
          }
        }
      }
    }
  };
  await dfs("");

  return defines;
}

(async () => {
  fs.writeFileSync(
    path.join(__dirname, "..", "server.json"),
    JSON.stringify(await main())
  );
})();
