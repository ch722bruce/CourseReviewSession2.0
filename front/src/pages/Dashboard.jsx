// import { Link } from "react-router-dom";
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

  return (
    <div className="dashboard">
      <Title title="Dashboard" />

      <button type="button" onClick={onClick}>
        Profile
      </button>

      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
}
