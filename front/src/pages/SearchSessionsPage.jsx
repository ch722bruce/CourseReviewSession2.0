import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionCard from "./components/SessionCard";
import { NavBar } from "./components/NavBar";
import "../styles/searchSessions.css";


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
      console.log(results);
    } catch (error) {
      console.error("Error searching sessions:", error);
    }
  };

  return (
    <div className="search-page-bg">
  <NavBar page="search-sessions"/>

  <section style={{ marginBottom: '10px', width: '50%', margin: '0 auto' }}>
    <input
      type="text"
      placeholder="Enter course number"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      style={{  width: '65%' }}
    />
    <button className="search-btn" onClick={handleSearch}>Search</button>
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
      />
    ))}
  </section>
</div>
  );
}
