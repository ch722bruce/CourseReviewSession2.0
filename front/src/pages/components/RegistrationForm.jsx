import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";

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

      let user = {};
      if (major.length == 0) {
        user = {
          username: username,
          password: password,
          tag: tag,
        }
      } else {
        user = {
          username: username,
          password: password,
          major: major,
          tag: tag,
        }
      }

      try {
        const response = await fetch("/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

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
      <div className="username">
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            onInput={evt => setUsername(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="password">
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onInput={evt => setPassword(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="retype">
        <label>
          Re-type password:{" "}
          <input
            type="password"
            name="retype"
            onInput={evt => setRetype(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="major">
        <label>
          Major:{" "}
          <input
            type="text"
            name="major"
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

      <div className="register">
        <button type="submit">Register</button>
      </div>

      <div className="back">
        <button type="button" onClick={onClickBack}>Back</button>
      </div>
    </form>
  );
}
