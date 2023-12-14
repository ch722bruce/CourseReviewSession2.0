import "../styles/searchSessions.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionCard from "./components/SessionCard";
import { NavBar } from "./components/NavBar";

export default function SearchSessionsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`/api/sessions/course/${searchTerm}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching sessions:", error);
    }
  };

  return (
    <div className="search-page-bg">
      <NavBar page="search-sessions" />
      <section className="search-section">
        <input
          type="text"
          placeholder="Enter course number"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <span className="search-btn-container">
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </span>
      </section>

      <section className="search-results">
        {searchResults.map(session => (
          <SessionCard
            key={session.SessionID}
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
            //there is bug that the "join" button is not showing up when you get the result by searching the class id.
          />
        ))}
      </section>
    </div>
  );
}
