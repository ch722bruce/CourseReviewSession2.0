// routes/sessions.js

import express from "express";
import { ObjectId } from "mongodb";
import { myDB } from "../db/database.js";

const router = express.Router();

// Create a new session
router.post("/sessions", async (req, res) => {
  try {
    const newSession = {
      ...req.body,
    };
    const result = await myDB.insertSessionEntry(newSession);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await myDB.getSession();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single session by ID
router.get("/sessions/:id", async (req, res) => {
  try {
    const session = await myDB.getSession(new ObjectId(req.params.id));
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a session by ID
router.put("/sessions/:id", async (req, res) => {
  try {
    const updatedSession = await myDB.updateSession(
      new ObjectId(req.params.id),
      req.body
    );
    if (!updatedSession.value) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(updatedSession.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a session by ID
router.delete("/sessions/:id", async (req, res) => {
  try {
    const deletedSession = await myDB.deleteSession(new ObjectId(req.params.id));
    if (deletedSession.deletedCount === 0) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User joins a session
router.post("/sessions/:id/join", async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in request body
    const updatedSession = await myDB.userJoinSession(
      new ObjectId(req.params.id),
      userId
    );
    if (!updatedSession.lastErrorObject.updatedExisting) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json({ message: "Joined the session successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User quits a session
router.post("/sessions/:id/quit", async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in request body
    const updatedSession = await myDB.userLeaveSession(
      new ObjectId(req.params.id),
      userId
    );
    if (!updatedSession.lastErrorObject.updatedExisting) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json({ message: "User has left the session successfully" });
  } catch (error) {
    console.error("Error quitting session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
