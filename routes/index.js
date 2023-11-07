import express from "express";
let router = express.Router();


import db from "../db/database.js";

import indexRouter from "./routes/index.js";


/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

export default router;
