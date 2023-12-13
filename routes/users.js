import express from "express";
import passport from "passport";
import crypto from "crypto";
import { myDB } from "../db/database.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ user: user });
    });
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const username = {
    username: user.username,
  };
  const resFind = await myDB.findUser(username);

  if (resFind != null) {
    return res.status(404).send({ message: "Username already exists" });
  }
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    user.password,
    salt.toString("hex"),
    310000,
    32,
    "sha256",
    async (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error during password hashing" });
      }
      user.password = hashedPassword.toString("hex");
      user.salt = salt.toString("hex");
      const response = await myDB.addUser(user);
      return res.send({ user: response });
    },
  );
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
