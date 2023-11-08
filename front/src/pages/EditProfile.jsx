import "../styles/profile.css";
import { Title } from "./components/Title";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

      let user = {};
      if (major.length == 0) {
        user = {
          username: JSON.parse(localStorage.getItem("currUser")).username,
          password: JSON.parse(localStorage.getItem("currUser")).password,
          tag: tag,
        };
      } else {
        user = {
          username: JSON.parse(localStorage.getItem("currUser")).username,
          password: JSON.parse(localStorage.getItem("currUser")).password,
          major: major,
          tag: tag,
        };
      }

      try {
        const response = await fetch("/user/edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        localStorage.setItem("currUser", JSON.stringify(user));
        navigate(`/profile`);
      } catch (e) {
        console.log("Fetch error: " + e);
      }
    }
  }

  function onSelectStudent() {
    console.log("Student selected");
    if (student) {
      setStudent(false);
    } else {
      setStudent(true);
      setProf(false);
      setTA(false);
    }
  }

  function onSelectProf() {
    console.log("Professor selected");
    if (prof) {
      setProf(false);
    } else {
      setProf(true);
      setStudent(false);
      setTA(false);
    }
  }

  function onSelectTA() {
    console.log("TA selected");
    if (ta) {
      setTA(false);
    } else {
      setTA(true);
      setStudent(false);
      setProf(false);
    }
  }

  return (
    <div className="profile">
      <Title title="Edit Profile" />

      <form id="registration-form" onSubmit={onSubmit}>
        <div className="username">
          Username: {JSON.parse(localStorage.getItem("currUser")).username}
        </div>

        <div className="major">
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

        <div className="tag">
          <div className="student">
            <label>
              Student:{" "}
              <input
                type="checkbox"
                checked={student}
                onClick={onSelectStudent}
              />
            </label>
          </div>
          <div className="professor">
            <label>
              Professor:{" "}
              <input type="checkbox" checked={prof} onClick={onSelectProf} />
            </label>
          </div>
          <div className="ta">
            <label>
              TA: <input type="checkbox" checked={ta} onClick={onSelectTA} />
            </label>
          </div>
        </div>

        <div className="save">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
