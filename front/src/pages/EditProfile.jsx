import "../styles/profile.css";
import { Title } from "./components/Title";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/edit.css";

export function EditProfile() {
  const navigate = useNavigate();

  let [major, setMajor] = useState(
    JSON.parse(localStorage.getItem("currUser")).major,
  );
  let [student, setStudent] = useState(false);
  let [prof, setProf] = useState(false);
  let [ta, setTA] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    if (user.tag === "Student") {
      setStudent(true);
    } else if (user.tag === "Professor") {
      setProf(true);
    } else {
      setTA(true);
    }
  }, []);

  async function onSubmit(evt) {
    evt.preventDefault();
    if (!student && !prof && !ta) {
      window.alert("Inputs can not be empty!");
    } else {
      let tag = "";
      if (student) {
        tag = "Student";
      } else if (prof) {
        tag = "Professor";
      } else {
        tag = "TA";
      }

      let user = {
        username: JSON.parse(localStorage.getItem("currUser")).username,
        password: JSON.parse(localStorage.getItem("currUser")).password,
        major: major,
        tag: tag,
      };

      try {
        fetch("/user/edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }).then(response => {
          response.json().then(data => {
            localStorage.setItem("currUser", JSON.stringify(data.user));
          });
        });
        localStorage.setItem("currUser", JSON.stringify(user));
        navigate(`/profile`);
      } catch (e) {
        console.log("Fetch error: " + e);
      }
    }
  }

  function onSelectStudent() {
    if (student) {
      setStudent(false);
    } else {
      setStudent(true);
      setProf(false);
      setTA(false);
    }
  }

  function onSelectProf() {
    if (prof) {
      setProf(false);
    } else {
      setProf(true);
      setStudent(false);
      setTA(false);
    }
  }

  function onSelectTA() {
    if (ta) {
      setTA(false);
    } else {
      setTA(true);
      setStudent(false);
      setProf(false);
    }
  }

  async function onClick() {
    const result = window.confirm("Are you sure to delete the account?");
    if (result) {
      try {
        await fetch("/user/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: localStorage.getItem("currUser"),
        });

        localStorage.clear();
        navigate(`/`);
      } catch (e) {
        console.log("Fetch error: " + e);
      }
    }
  }

  return (
    <div className="edit-bg">
      <div className="edit">
        <Title title="Edit Profile" />

        <form id="registration-form" onSubmit={onSubmit}>
          <div className="edit-username">
            Username: {JSON.parse(localStorage.getItem("currUser")).username}
          </div>

          <div className="edit-major">
            <label>
              Major:{" "}
              <input
                type="text"
                name="major"
                value={major}
                onInput={evt => setMajor(evt.target.value)}
              ></input>
            </label>
          </div>

          <div className="edit-tag">
            <label>
              Student
              <input
                type="checkbox"
                checked={student}
                onClick={onSelectStudent}
              />
            </label>

            <label>
              Professor
              <input type="checkbox" checked={prof} onClick={onSelectProf} />
            </label>

            <label>
              TA
              <input type="checkbox" checked={ta} onClick={onSelectTA} />
            </label>
          </div>

          <div className="save">
            <button id="save-btn" type="submit">
              Save
            </button>
          </div>

          <div className="delete">
            <button id="delete-btn" type="button" onClick={onClick}>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
