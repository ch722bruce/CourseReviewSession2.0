import "../styles/dashboard.css";
import "../styles/sessionCard.css";
import React, { useState, useEffect } from "react";
import { Title } from "./components/Title";
import { NavBar } from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import SessionCard from "./components/SessionCard";

export function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const updateSessions = async () => {
      try {
        const response = await fetch("/api/sessions/all", {
          method: "PATCH",
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

  function onSearchSessionClick() {
    navigate("/search-sessions");
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
      setSessions(data);
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
    <div className="dashboard-bg">
      <NavBar page="Dashboard" />
      <div className="dashboard">
        <section className="dashboard-title"></section>

        <section className="session-btn-section">
          <span className="nav-btn-container">
            <button
              type="button"
              className="nav-btn"
              onClick={onCreateSessionClick}
            >
              Create Session
            </button>
          </span>

          <span className="nav-btn-container">
            <button
              type="button"
              className="nav-btn"
              onClick={onSearchSessionClick}
            >
              Search Sessions
            </button>
          </span>
        </section>
        <section>
          <div className="sessions-list">{renderSessionCards()}</div>
        </section>
      </div>
    </div>
  );
}
