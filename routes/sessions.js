// routes/sessions.js

import express from "express";
import { ObjectId } from "mongodb";
import { myDB } from "../db/database.js";

const router = express.Router();

// Create a new session
router.post("/sessions", async (req, res) => {
  console.log("POST /sessions route hit");
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
router.patch("/sessions/all", async (req, res) => {
  console.log("GET /sessions route hit");
  try {
    const sessions = await myDB.getSessions();
    res.json(sessions);
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get all sessions created by a user
router.patch("/sessions/author/:username", async (req, res) => {
  try {
    const sessions = await myDB.getSessionByUsername(req.params.username);
    res.json(sessions);
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get all sessions a user is a member of
router.patch("/sessions/member/:username", async (req, res) => {
  try {
    const sessions = await myDB.getSessionsByMemberUsername(
      req.params.username,
    );
    res.json(sessions);
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get all sessions of a certain course number
router.patch("/sessions/course/:courseNumber", async (req, res) => {
  try {
    const sessions = await myDB.getSessionsByCourseNumber(req.params.courseNumber);
    res.json(sessions);
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ error: "Internal server error"});
  }
});

// Update a session by ID
router.put("/sessions/:id", async (req, res) => {
  try {
    console.log("PUT session id: ", req.params.id);
    const updatedSession = await myDB.updateSession(req.params.id, req.body);
    res.json(updatedSession.value);
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a session by ID
router.delete("/sessions/:id", async (req, res) => {
  console.log("DELETE session id: ", req.params.id);
  try {
    const deletedSession = await myDB.deleteSession(
      parseInt(req.params.id, 10),
    );
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
    const username = req.body.username; // Assuming userId is sent in request body
    const updatedSession = await myDB.userJoinSession(req.params.id, username);
    res.json({ message: "Joined the session successfully" });
  } catch (error) {
    console.log("Error joining session:", error);
    res.status(500).json({ error: error.message });
  }
});

// User quits a session
router.post("/sessions/:id/quit", async (req, res) => {
  try {
    const username = req.body.username; // Assuming userId is sent in request body
    const updatedSession = await myDB.userLeaveSession(req.params.id, username);
    res.json({ message: "User has left the session successfully" });
  } catch (error) {
    console.error("Error quitting session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
