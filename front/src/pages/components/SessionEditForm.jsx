import "../../styles/sessionManage.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";

export function SessionEditForm() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const page_name = "edit-session/" + sessionId;

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
    <div className="manage-container">
      <NavBar page="MySessions" />
      <form onSubmit={handleSubmit} className="session-form">
        <section className="manage-section">
          <label htmlFor="courseNumber">Course Number</label>
          <input
            type="text"
            id="courseNumber"
            name="courseNumber"
            value={formData.courseNumber}
            onChange={handleChange}
            className="manage-input"
          />
        </section>

        <section className="manage-section">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="manage-input"
          />
        </section>

        <section className="manage-section">
          <label htmlFor="endTime">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="manage-input"
          />
        </section>

        <section className="manage-section">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="manage-text"
          />
        </section>

        <section className="manage-btn-section">
          <button className="manage-btn" type="submit">
            Update Session
          </button>
        </section>
      </form>
    </div>
  );
}
