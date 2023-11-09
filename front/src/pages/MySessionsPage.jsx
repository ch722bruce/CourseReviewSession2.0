import React from "react";
import AuthorSessions from "./components/AuthorSessions";
import MemberSessions from "./components/MemberSessions";

const MySessionsPage = () => {
  return (
    <div>
      <AuthorSessions />
      <MemberSessions />
    </div>
  );
};

export default MySessionsPage;
