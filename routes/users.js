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

router.post("/delete", async (req, res) => {
  const response = await myDB.deleteUser(req.body);
  res.send({ user: response });
});

router.post("/get", async (req, res) => {
  const response = await myDB.getUser(req.body);
  res.send({ user: response });
});

router.post("/addJoined", async (req, res) => {
  const response = await myDB.addJoined(req.body);
  res.send({ user: response });
});

router.post("/deleteJoined", async (req, res) => {
  const response = await myDB.deleteJoined(req.body);
  res.send({ user: response });
});

router.post("/getJoined", async (req, res) => {
  const response = await myDB.getJoined(req.body);
  res.send({ joined: response });
});

export default router;