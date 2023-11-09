import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionCard from "./components/SessionCard";

export default function SearchSessionsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
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
    <div>
      <input
        type="text"
        placeholder="Enter course number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
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
      </div>
    </div>
  );
}
