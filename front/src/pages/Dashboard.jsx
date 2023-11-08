// import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import { Title } from "./components/Title";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  function onClick() {
    console.log("profile button clicked");
    navigate(`/profile`);
  }

  function onClickLogout() {
    console.log(localStorage.getItem("currUser"));

    localStorage.clear();
    console.log(localStorage.getItem("currUser"));
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
