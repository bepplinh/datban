import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./config/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

// ─── Global Middleware ───────────────────────────
app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(express.json());
app.use(cookieParser());

// ─── API Routes ──────────────────────────────────
app.use("/api", routes);

// ─── Global Error Handler ────────────────────────
app.use(errorHandler);

export default app;
