import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

console.log(
  "✅ Environment variables loaded from:",
  process.env.NODE_ENV === "production" ? ".env.production" : ".env",
);
