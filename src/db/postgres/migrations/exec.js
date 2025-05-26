import "dotenv/config.js";

import { pool } from "../helper.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

console.log({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execMigrations = async () => {
  const client = await pool.connect();
  try {
    const files = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith(".sql"));
    for (const file of files) {
      const filepath = path.join(__dirname, file);
      const script = fs.readFileSync(filepath, "utf-8");
      await client.query(script);
      console.log(`Migrations for file ${file} executed successfully`);
    }
    console.log("All Migrations executed successfully");
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

execMigrations();
