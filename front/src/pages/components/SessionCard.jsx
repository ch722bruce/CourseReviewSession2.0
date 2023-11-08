import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function SessionCard({
  session,
  onJoin,
  onQuit,
  isAuthor,
  hasJoined,
  updateSessions,
  originalText,
}) {
  const navigate = useNavigate();
  const [btnText, setButton] = useState(originalText);

  const handleDelete = async () => {
    // Delete the session
    console.log(`Deleting session: ${session.SessionID}`);
    try {
      const response = await fetch(`/api/sessions/${session.SessionID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // After deleting, call the callback to update sessions in the parent component
      updateSessions();

      alert("Deleted session: " + session.SessionID);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleEdit = () => {
    // Use the navigate function to go to the edit page with the session ID as a route parameter
    console.log(`Editing session: ${session.SessionID}`);
    navigate(`/edit-session/${session.SessionID}`);
  };

  function handleJoin() {
    console.log(`Joining session: ${session.SessionID}`);
    fetch(`/api/sessions/${session.SessionID}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: JSON.parse(localStorage.getItem("currUser")).username,
      }),
    })
      .then(() => {
        // Call the function to update sessions state after a successful join
        // updateSessionsState();
        alert("Joined session: " + session.SessionID);
        setButton("Quit")
      })
      .catch(error => {
        console.error("Error joining session:", error);
      });
  }

  const handleQuit = async () => {
    console.log(`Quitting session: ${session.SessionID}`);

    try {
      const response = await fetch(`/api/sessions/${session.SessionID}/quit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem("currUser")).username,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // After quitting, call the callback to update sessions in the parent component
      updateSessions();

      alert("Quitted session: " + session.SessionID);
      setButton("Join")
    } catch (error) {
      console.error("Error quitting session:", error);
    }
  };

  return (
    <div className="session-card">
      <h3>{session.courseNumber}</h3>
      <p>{session.description}</p>
      <p>{`Start Time: ${session.startTime}`}</p>
      <p>{`End Time: ${session.endTime}`}</p>
      {isAuthor ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          {/* <button onClick={handleQuit}>{btnText}</button> */}

          {btnText=="Quit" ? (
            <button onClick={handleQuit}>{btnText}</button>
          ) : (
            <button onClick={handleJoin}>{btnText}</button>
          )}
        </div>
      )}
    </div>
  );
}

SessionCard.propTypes = {
  session: PropTypes.object.isRequired,
  onJoin: PropTypes.func.isRequired,
  onQuit: PropTypes.func.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  hasJoined: PropTypes.bool.isRequired,
  updateSessions: PropTypes.func.isRequired, // Callback function to update sessions in the parent component
  originalText: PropTypes.string,
};

export default SessionCard;
