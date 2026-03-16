import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import tableSessionRouter from "./routes/tableSession.route.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Mount both with and without /api prefix for convenience
app.use("/api", tableSessionRouter);
app.use("/", tableSessionRouter);

app.listen(port, () => {
  console.log(`running ${port}`);
});
