import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "/front/dist/index.html")));
app.use(express.static(path.join(__dirname, "front", "dist")));

// app.use(express.static(__dirname + "/front"));

// app.use("/", indexRouter);
app.use("/user", usersRouter);

export default app;
