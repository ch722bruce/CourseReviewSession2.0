// routes/sessions.js

import express from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '/db/database.js';


const router = express.Router();

// Create a new session
router.post('/sessions', async (req, res) => {
  try {
    const db = getDB();
    const session = await db.collection('sessions').insertOne(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions
router.get('/sessions', async (req, res) => {
  try {
    const db = getDB();
    const sessions = await db.collection('sessions').find({}).toArray();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single session by ID
router.get('/sessions/:id', async (req, res) => {
  try {
    const db = getDB();
    const session = await db.collection('sessions').findOne({ _id: new ObjectId(req.params.id) });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a session by ID
router.put('/sessions/:id', async (req, res) => {
  try {
    const db = getDB();
    const updatedSession = await db.collection('sessions').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!updatedSession.value) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(updatedSession.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a session by ID
router.delete('/sessions/:id', async (req, res) => {
  try {
    const db = getDB();
    const deletedSession = await db.collection('sessions').deleteOne({ _id: new ObjectId(req.params.id) });
    if (deletedSession.deletedCount === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User joins a session
router.post('/sessions/:id/join', async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in request body
    const db = getDB();
    const updatedSession = await db.collection('sessions').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $addToSet: { members: userId } }
    );
    if (updatedSession.matchedCount === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ message: 'Joined the session successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User quits a session
router.post('/sessions/:id/quit', async (req, res) => {
    try {
      const sessionId = req.params.id;
      const userId = req.body.userId; // Assuming userId is sent in request body
  
      // Ensure that sessionId is a valid ObjectId
      if (!ObjectId.isValid(sessionId)) {
        return res.status(400).json({ error: "Invalid session ID format" });
      }
  
      // Convert string ID to MongoDB ObjectId
      const objectId = new ObjectId(sessionId);
  
      // Call the quitSession method from your database module
      const result = await myDB.quitSession(objectId, userId);
  
      if (result === 0) {
        // If no session was updated, send a 404 error
        res.status(404).json({ message: 'Session not found or User not in session' });
      } else {
        // If the operation was successful, send a success response
        res.json({ message: 'User successfully quit the session' });
      }
    } catch (error) {
      console.error('Error quitting session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  export default router;
