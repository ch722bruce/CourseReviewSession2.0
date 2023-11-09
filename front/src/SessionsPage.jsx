import React, { useEffect, useState } from "react";

const SessionsPage = () => {
  const [sessions, setSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        console.log("============");
        const response = await fetch("/api/sessions");
        if (!response.ok) {
          throw new Error("Response not OK");
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Session Browse Page</h1>
      <ul>
        {sessions.map(session => (
          <li key={session._id}>
            Session ID: {session._id} - Members: {session.members.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionsPage;
