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

  async function createSession(newSession, username) {
    const sessionWithAuthor = {
      ...newSession,
      creator: username,
      members: [username]
    };
  
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionWithAuthor),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Session created:', result);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    const storedUser = localStorage.getItem("currUser");
    const username = storedUser ? JSON.parse(storedUser).username : null;
    if (username) {
      createSession(session, username);
    } else {
      console.error('Username not found in localStorage. Please log in again.');
      // Possibly redirect to the login page
      navigate('/login');
    }
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
