import "../../styles/navBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function NavBar({ page }) {
  const navigate = useNavigate();
  const dashboardClass = page == "Dashboard" ? "Dashboard" : "";
  const profileClass = page == "Profile" ? "Profile" : "";
  const mySessionsClass = page == "MySessions" ? "MySessions" : "";

  function onClickLogout() {
    localStorage.clear();
    navigate(`/`);
  }

  return (
    <nav className="navbar">
      <img src="assets/logo.png" alt="Logo" className="nav-logo" />
      <span className="nav-name">
        <strong>Course Review</strong>
      </span>
      <Link to="/dashboard" className={`nav-link ${dashboardClass}`}>
        Dashboard
      </Link>
      <Link to="/profile" className={`nav-link ${profileClass}`}>
        Profile
      </Link>
      <Link to="/my-sessions" className={`nav-link ${mySessionsClass}`}>
        MySessions
      </Link>
      <button type="button" className="nav-logout" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  );
}

NavBar.propTypes = {
  page: PropTypes.string.isRequired,
};
