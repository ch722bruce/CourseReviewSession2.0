import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";


export function SessionEditForm() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    courseNumber: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    async function fetchSessionData() {
      try {
        const response = await fetch(`/api/sessions/${sessionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sessionData = await response.json();
        setSession(sessionData);
        // Initialize the form data with the session data
        setFormData(sessionData);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    }

    fetchSessionData();
  }, [sessionId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function updateSession(updatedSession) {
    const sessionWithAuthor = {
      ...updatedSession,
    };
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionWithAuthor),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Session updated:", result);
      navigate(`/session/${sessionId}`);
    } catch (error) {
      console.error("Failed to update session:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.startTime >= formData.endTime) {
      alert("Start time must be before end time!");
      return;
    }
    updateSession(formData);
    navigate("/dashboard");
  }

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#CEE8F2', color: '#061673',  height: '100vh', width: '100%' }}>
       <NavBar page="edit-session" />
    <form onSubmit={handleSubmit} className="session-form" style={{ color: '#061673' }}>
  <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto' }}>
    <label htmlFor="courseNumber" style={{ fontFamily: 'Roboto, sans-serif' }}>Course Number</label>
    <input
      type="text"
      id="courseNumber"
      name="courseNumber"
      value={formData.courseNumber}
      onChange={handleChange}
      style={{ display: 'block', width: '100%' }}
    />
  </div>

  {/* Repeat for each input */}
  <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto' }}>
    <label htmlFor="startTime" style={{ fontFamily: 'Roboto, sans-serif' }}>Start Time</label>
    <input
      type="datetime-local"
      id="startTime"
      name="startTime"
      value={formData.startTime}
      onChange={handleChange}
      style={{ display: 'block', width: '100%' }}
    />
  </div>

  <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto' }}>
    <label htmlFor="endTime"  style={{ fontFamily: 'Roboto, sans-serif' }}>End Time</label>
    <input
      type="datetime-local"
      id="endTime"
      name="endTime"
      value={formData.endTime}
      onChange={handleChange}
      style={{ display: 'block', width: '100%' }}
    />
  </div>

  <div style={{ marginBottom: '10px', width: '50%', margin: '0 auto' }}>
    <label htmlFor="description" style={{ fontFamily: 'Roboto, sans-serif' }}>Description</label>
    <textarea
      id="description"
      name="description"
      value={formData.description}
      onChange={handleChange}
      style={{ display: 'block', width: '100%', height: '100px' }} // Adjust height as needed
    />
  </div>

  <button type="submit" style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#F2A516', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Update Session</button>
</form>
</div>
  );
}
