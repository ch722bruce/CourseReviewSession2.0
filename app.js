import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users.js";
import sessionRouter from "./routes/sessions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "/front/dist/index.html")));
app.use(express.static(path.join(__dirname, "front", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "dist", "index.html"));
});

// app.use(express.static(__dirname + "/front"));

// app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/api", sessionRouter);

export default app;
