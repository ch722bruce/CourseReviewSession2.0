import React, { useEffect, useState } from "react";
import SessionCard from "./SessionCard";

const MemberSessions = () => {
  let username = JSON.parse(localStorage.getItem("currUser")).username;
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchMemberSessions = async () => {
      try {
        const response = await fetch(`/api/sessions/member/${username}`, {
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
        console.error("Error fetching member sessions:", error);
      }
    };

    fetchMemberSessions();
  }, [username]);

  const handleJoin = sessionId => {
    // Implement the join logic here
  };

  const handleQuit = sessionId => {
    // Implement the quit logic here
  };

  return (
    <div>
      <h2 style={{fontFamily: 'Roboto, sans-serif', color : '#061673'}}>Sessions where {username} is a Member</h2>
      {sessions.map(session => (
        <SessionCard
          key={session.id} // Assuming each session has a unique id
          session={session}
          onJoin={() => handleJoin(session.id)}
          onQuit={() => handleQuit(session.id)}
          isAuthor={false}
          hasJoined={true}
          originalText={"Quit"}
        />
      ))}
    </div>
  );
};

export default MemberSessions;
