import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SessionCreateForm() {
  const navigate = useNavigate();
  const [session, setSession] = useState({
    courseNumber: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSession(prevSession => ({
      ...prevSession,
      [name]: value
    }));
  }

  async function createSession(newSession) {
    try {
      const response = await fetch('/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Session created:', result);
      navigate('/dashboard'); // Navigate back to the dashboard after creating the session
    } catch (error) {
      console.error('Failed to create session:', error);
      // Here you might want to handle the error, display an alert or a notification to the user
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    createSession(session);
  }

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <label htmlFor="courseNumber">Course Number</label>
      <input
        type="text"
        id="courseNumber"
        name="courseNumber"
        value={session.courseNumber}
        onChange={handleChange}
      />

      <label htmlFor="startTime">Start Time</label>
      <input
        type="datetime-local"
        id="startTime"
        name="startTime"
        value={session.startTime}
        onChange={handleChange}
      />

      <label htmlFor="endTime">End Time</label>
      <input
        type="datetime-local"
        id="endTime"
        name="endTime"
        value={session.endTime}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={session.description}
        onChange={handleChange}
      />

      <button type="submit">Create Session</button>
    </form>
  );
}
