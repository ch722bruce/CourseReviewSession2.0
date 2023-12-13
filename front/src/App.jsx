import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { SessionCreateForm } from "./pages/components/SessionCreateForm";
import MySessionsPage from "./pages/MySessionsPage";
import { SessionEditForm } from "./pages/components/SessionEditForm";
import SearchSessionsPage from "./pages/SearchSessionsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/create-session" element={<SessionCreateForm />}></Route>
        <Route path="/my-sessions" element={<MySessionsPage />}></Route>
        <Route path="/search-sessions" element={<SearchSessionsPage />} />
        <Route
          path="/edit-session/:sessionId"
          element={<SessionEditForm />}
        ></Route>
        <Route path="/search-sessions" element={<SearchSessionsPage />} />
      </Routes>
    </Router>
  );
}
