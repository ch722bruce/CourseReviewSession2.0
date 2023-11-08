import React, { useState, useEffect } from 'react';
import "../styles/dashboard.css";
import { Title } from "./components/Title";
import { useNavigate } from "react-router-dom";
import SessionCard from "./components/SessionCard";

export function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const updateSessions = async () => {
      try {
        const response = await fetch('/api/sessions/all', {
          method: 'PATCH', // Change the HTTP method to PATCH
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON if needed
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
  
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error updating sessions:', error);
      }
    };
  
    updateSessions();
  }, []);

  function onClickLogout() {
    localStorage.clear();
    navigate(`/`);
  }

  function onCreateSessionClick() {
    navigate('/create-session');
  }

  //TODO: Handle join session
  function handleJoin(sessionId) {
    console.log(`Joining session: ${sessionId}`);
  }

  //TODO: Handle quit session
  function handleQuit(sessionId) {
    // Replace with actual quit logic
    console.log(`Quitting session: ${sessionId}`);
    // Update the session's members list and refresh the sessions
  }

  return (
    <div className="dashboard">
      <Title title="Dashboard" />
      <button type="button" onClick={() => navigate('/profile')}>
        Profile
      </button>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
      <button type="button" onClick={onCreateSessionClick}>
        Create Session
      </button>
      <div className="sessions-list">
        {sessions.map(session => (
          <SessionCard
            key={session._id}
            session={session}
            onJoin={() => handleJoin(session._id)}
            onQuit={() => handleQuit(session._id)}
            // Assuming the session object has a members array
            hasJoined={session.members.includes(localStorage.getItem("currUser"))}
          />
        ))}
      </div>
    </div>    
  );
}
