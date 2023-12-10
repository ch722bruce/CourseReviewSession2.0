import React from "react";
import { NavBar } from "./components/NavBar";
import AuthorSessions from "./components/AuthorSessions";
import MemberSessions from "./components/MemberSessions";
import "../styles/MySessionsPage.css";

const MySessionsPage = () => {
  return (
    <div className="my-sessions-page-bg">
      <NavBar page="MySessions"/>
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
