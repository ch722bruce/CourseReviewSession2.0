import "../styles/dashboard.css";
import { Title } from "./components/Title";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/profile`);
  }

  function onClickLogout() {
    localStorage.clear();
    navigate(`/`);
  }

  function onCreateSessionClick() {
    navigate('/create-session');
  }

  return (
    <div className="dashboard">
      <Title title="Dashboard" />
      <button type="button" onClick={() => navigate('/profile')}>
        Profile
      </button>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
      <button type="button" onClick={onCreateSessionClick}>
        Create Session
      </button>
    </div>    
  );
}
