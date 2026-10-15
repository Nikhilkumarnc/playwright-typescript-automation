import dotenv from "dotenv";
import path from "node:path";

const environment = process.env.TEST_ENV ?? "qa";

const envFile = path.resolve(process.cwd(), "config", `.env.${environment}`);

dotenv.config({ path: envFile });

export const envConfig = {
  environment,
  baseURL: process.env.BASE_URL!,
  apiBaseURL: process.env.API_BASE_URL!,
};
