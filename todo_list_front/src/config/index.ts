import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100",
  },
};
