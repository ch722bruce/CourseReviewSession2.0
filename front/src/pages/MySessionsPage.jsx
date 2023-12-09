import React from "react";
import AuthorSessions from "./components/AuthorSessions";
import MemberSessions from "./components/MemberSessions";
import "../styles/MySessionsPage.css";

const MySessionsPage = () => {
  return (
    <div className="my-sessions-page-bg">
      <div className="my-sessions-page">
        <div>
          <AuthorSessions />
          <MemberSessions />
        </div>
      </div>
    </div>
  );
};

export default MySessionsPage;
