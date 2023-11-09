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

  // function handleJoin(sessionId) {
  //   console.log(`Joining session: ${sessionId}`);
  //   fetch(`/api/sessions/${sessionId}/join`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username: JSON.parse(localStorage.getItem("currUser")).username }),
  //   })
  //     .then(() => {
  //       // Call the function to update sessions state after a successful join
  //       // updateSessionsState();
  //       alert("Joined session: " + sessionId);
  //     })
  //     .catch((error) => {
  //       console.error('Error joining session:', error);
  //     });
  // }

  // function handleQuit(sessionId) {
  //   console.log(`Quitting session: ${sessionId}`);

  //   fetch(`/api/sessions/${sessionId}/quit`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username: JSON.parse(localStorage.getItem("currUser")).username }),
  //   })
  //     .then(() => {
  //       // Call the function to update sessions state after a successful quit
  //       updateSessionsState();
  //       alert("Quitted session: " + sessionId);
  //     })
  //     .catch((error) => {
  //       console.error('Error quitting session:', error);
  //     });
  // }
  // console.log("SESSIONS TEST:");
  // for (let sess in sessions) {
  //   console.log("session: " + sess);
  //   console.log(sess.sessionID);
  // }

  function renderSessionCards() {
    const renderedSessions = [];
    const userStr = localStorage.getItem("currUser")
    const currUser = JSON.parse(userStr)
    const joined = currUser.joined
    console.log("USER STR: " + userStr)

    for (const session of sessions) {
      console.log("session id: " + session.SessionID)

      let text = "Join";

      console.log("RETURNED JOINED: " + joined)

      if (joined.includes(session.SessionID)) {
        console.log("INCLUDES")
        text = "Quit";
      } else {
        console.log("NOT INCLUDE")
      }
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

    // {sessions.map(session => (
    //   <SessionCard
    //     key={session.SessionID}
    //     session={session}
    //     onJoin={() => handleJoin(session.SessionID)}
    //     onQuit={() => handleQuit(session.SessionID)}
    //     isAuthor={
    //       session.creator ===
    //       JSON.parse(localStorage.getItem("currUser")).username
    //     }
    //     hasJoined={session.members.includes(
    //       JSON.parse(localStorage.getItem("currUser")).username,
    //     )}
    //     updateSessions={updateSessions}
    //     originalText={"Join"}
    //   />
    // ))}

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
      <div className="sessions-list">
        {renderSessionCards()}
        {/* {sessions.map(session => (
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
            updateSessions={updateSessions}
            originalText={"Join"}
          />
        ))} */}
      </div>
    </div>
  );
}
