import express from "express";
import { myDB } from "../db/database.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = req.body;
  const response = await myDB.findUser(user);

  if (response != null) {
    res.send({ user: response });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const username = {
    username: user.username,
  };
  const resFind = await myDB.findUser(username);

  if (resFind != null) {
    res.status(404).send({ message: "Username already exists" });
  } else {
    const response = await myDB.addUser(user);
    res.send({ user: response });
  }
});

router.post("/edit", async (req, res) => {
  const response = await myDB.editUser(req.body);
  res.send({ user: response });
});

// router.get("/dashboard", (req, res) => {
//   // console
//   // Handle the /dashboard route on the server
//   res.send("Server-side route: Dashboard");
// });

export default router;
