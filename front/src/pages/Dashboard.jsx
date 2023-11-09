import React, { useState, useEffect } from "react";
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
        const response = await fetch("/api/sessions/all", {
          method: "PATCH", // Change the HTTP method to PATCH
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON if needed
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }

        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error updating sessions:", error);
      }
    };
    updateSessions();
  }, []);

  function onClickLogout() {
    localStorage.clear();
    navigate(`/`);
  }

  function onCreateSessionClick() {
    navigate("/create-session");
  }

  const updateSessions = async () => {
    try {
      const response = await fetch("/api/sessions/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      setSessions(data); // Update the sessions state with fetched data
    } catch (error) {
      console.error("Error updating sessions:", error);
    }
  };

  function renderSessionCards() {
    const renderedSessions = [];
    const userStr = localStorage.getItem("currUser");
    const currUser = JSON.parse(userStr);
    const joined = currUser.joined;

    for (const session of sessions) {
      let text = joined.includes(session.SessionID) ? "Quit" : "Join";

      renderedSessions.push(
        <SessionCard
          session={session}
          onJoin={() => handleJoin(session.SessionID)}
          onQuit={() => handleQuit(session.SessionID)}
          isAuthor={
            session.creator ===
            JSON.parse(localStorage.getItem("currUser")).username
          }
          hasJoined={session.members.includes(
            JSON.parse(localStorage.getItem("currUser")).username,
          )}
          updateSessions={updateSessions}
          originalText={text}
        />,
      );
    }

    return renderedSessions;
  }

  return (
    <div className="dashboard">
      <Title title="Dashboard" />
      <button type="button" onClick={() => navigate("/profile")}>
        Profile
      </button>
      <button type="button" onClick={() => navigate("/my-sessions")}>
        My Sessions
      </button>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
      <button type="button" onClick={onCreateSessionClick}>
        Create Session
      </button>
      <div className="sessions-list">{renderSessionCards()}</div>
    </div>
  );
}
