import React, { useEffect, useState } from "react";
import SessionCard from "./SessionCard";

const AuthorSessions = () => {
  let username = JSON.parse(localStorage.getItem("currUser")).username;
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchAuthorSessions = async () => {
      try {
        const response = await fetch(`/api/sessions/author/${username}`, {
          method: "PATCH",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setSessions(data);
        } else {
          throw new TypeError("Oops, we haven't got JSON!");
        }
      } catch (error) {
        console.error("Error fetching author sessions:", error);
      }
    };

    fetchAuthorSessions();
  }, [username]);

  const handleEdit = sessionId => {
    // Implement the edit logic here
  };

  const handleDelete = sessionId => {
    // Implement the delete logic here
  };

  return (
    <div>
      <h2 style={{ fontFamily: "Roboto, sans-serif", color: "#061673" }}>
        Sessions Authored by {username}
      </h2>
      {sessions.map(session => (
        <SessionCard
          key={session.id} // Assuming each session has a unique id
          session={session}
          onDelete={() => handleDelete(session.id)}
          onEdit={() => handleEdit(session.id)}
          isAuthor={true}
          hasJoined={true}
        />
      ))}
    </div>
  );
};

export default AuthorSessions;
