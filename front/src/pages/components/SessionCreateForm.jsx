import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";


export function SessionCreateForm() {
  const navigate = useNavigate();
  const [session, setSession] = useState({
    courseNumber: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSession(prevSession => ({
      ...prevSession,
      [name]: value,
    }));
  }

  async function createSession(newSession, username) {
    const sessionWithAuthor = {
      ...newSession,
      creator: username,
      members: [username],
    };

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionWithAuthor),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Session created:", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (session.startTime >= session.endTime) {
      alert("Start time must be before end time!");
      return;
    }
    const storedUser = localStorage.getItem("currUser");
    const username = storedUser ? JSON.parse(storedUser).username : null;
    if (username) {
      createSession(session, username);

      const courseNumber = {
        username: username,
        course: session.courseNumber,
      };
      const response = await fetch("/user/addCreation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseNumber),
      });
    } else {
      console.error("Username not found in localStorage. Please log in again.");
      navigate("/login");
    }
  }

  return (
  <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#CEE8F2', color: '#061673',  height: '100vh', width: '100%' }}>
       <NavBar page="create-session" />
  <form onSubmit={handleSubmit} className="session-form">
    <div style={{ marginBottom: '10px' , width: '50%', margin: '0 auto'}}>
      <label htmlFor="courseNumber" style={{ fontFamily: 'Roboto, sans-serif' }}>Course Number</label>
      <input
        type="text"
        id="courseNumber"
        name="courseNumber"
        value={session.courseNumber}
        onChange={handleChange}
        style={{ display: 'block', width: '100%' }}
      />
    </div>

    <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto'  }}>
      <label htmlFor="startTime" style={{ fontFamily: 'Roboto, sans-serif' }}>Start Time</label>
      <input
        type="datetime-local"
        id="startTime"
        name="startTime"
        value={session.startTime}
        onChange={handleChange}
        style={{ display: 'block', width: '100%' }}
      />
    </div>

    <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto'   }}>
      <label htmlFor="endTime" style={{ fontFamily: 'Roboto, sans-serif' }}>End Time</label>
      <input
        type="datetime-local"
        id="endTime"
        name="endTime"
        value={session.endTime}
        onChange={handleChange}
        style={{ display: 'block', width: '100%' }}
      />
    </div>

    <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto'   }}>
      <label htmlFor="description" style={{ fontFamily: 'Roboto, sans-serif' }}>Description</label>
      <textarea
        id="description"
        name="description"
        value={session.description}
        onChange={handleChange}
        style={{ display: 'block', width: '100%' }}
      />
    </div>

    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <button type="submit" style={{ backgroundColor: '#F2A516', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: 'Roboto, sans-serif' }}>Create Session</button>
    </div>  
    </form>
</div>

  );
}
