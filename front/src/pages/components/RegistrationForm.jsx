import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/registration.css";

function isValidUsername(str) {
  const pattern = /^[a-zA-Z0-9_-]{3,10}$/;
  return pattern.test(str);
}

function isValidPassword(str) {
  const pattern = /^[a-zA-Z0-9@!.?]{8,16}$/;
  return pattern.test(str);
}

export function RegistrationForm() {
  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [retype, setRetype] = useState("");
  let [major, setMajor] = useState("");
  let [student, setStudent] = useState(false);
  let [prof, setProf] = useState(false);
  let [ta, setTA] = useState(false);

  // const options = ["Student", "Professor", "TA"];
  // const default = options[0];

  async function onSubmit(evt) {
    evt.preventDefault();

    if (
      username.length == 0 ||
      password.length == 0 ||
      retype.length == 0 ||
      (!student && !prof && !ta)
    ) {
      window.alert("Inputs can not be empty!");
    } else if (!isValidUsername(username)) {
      window.alert(
        "Invalid username!\nShould be at least 3 and at most 10 characters long.\nShould only include letters, numbers, and -_",
      );
    } else if (!isValidPassword(password)) {
      window.alert(
        "Invalid password!\nShould be at least 8 and at most 16 characters long.\nShould only include uppercase and lowercase letters, numbers, and @.!?",
      );
    } else if (password != retype) {
      window.alert("Passwords do not match!");
    } else {
      let tag = "";
      if (student) {
        tag = "Student";
      } else if (prof) {
        tag = "Professor";
      } else {
        tag = ta;
      }

      let user = {
        username: username,
        password: password,
        major: major,
        tag: tag,
        created: [],
        joined: [],
      };

      try {
        const response = await fetch("/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        console.log(response);
        if (!response.ok) {
          window.alert("Username already exists!");
        } else {
          localStorage.setItem("currUser", JSON.stringify(user));
          navigate(`/dashboard`);
        }
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

  function onClickBack() {
    navigate(`/`);
  }

  return (
    <form id="registration-form" onSubmit={onSubmit}>
      <div className="regist-input">
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            onInput={evt => setUsername(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="regist-input">
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onInput={evt => setPassword(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="regist-input">
        <label>
          Re-type:{" "}
          <input
            type="password"
            name="retype"
            onInput={evt => setRetype(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="regist-input">
        <label>
          Major:{" "}
          <input
            type="text"
            name="major"
            onInput={evt => setMajor(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="regist-tag">
        <label>
          Student
          <input type="checkbox" checked={student} onClick={onSelectStudent} />
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

      <div className="regist-register">
        <button className="submit-btn" type="submit">
          Register
        </button>
      </div>

      <div className="regist-back">
        <button className="click-btn" type="button" onClick={onClickBack}>
          Go Back
        </button>
      </div>
    </form>
  );
}
