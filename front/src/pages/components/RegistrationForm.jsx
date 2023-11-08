import { useState } from "react";
import { useNavigate } from "react-router-dom";

function isValidUsername(str) {
  const pattern = /^[a-zA-Z0-9_-]{3,10}$/;
  return pattern.test(str);
}

function isValidPassword(str) {
  const pattern = /^[a-zA-Z0-9@!.?]{8,16}$/;
  return pattern.test(str);
}

export function RegistrationForm() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [retype, setRetype] = useState("");
  const navigate = useNavigate();

  async function onSubmit(evt) {
    evt.preventDefault();

    if (username.length == 0 || password.length == 0 || retype.length == 0) {
      window.alert("Inputs can not be empty!");
    } else if (!isValidUsername(username)) {
      window.alert(
        "Invalid username!\nShould be at least 3 and at most 10 characters long.\nShould only include letters, numbers, and -_"
      );
    } else if (!isValidPassword(password)) {
      window.alert(
        "Invalid password!\nShould be at least 8 and at most 16 characters long.\nShould only include uppercase and lowercase letters, numbers, and @.!?"
      );
    } else if (password != retype) {
      window.alert("Passwords do not match!");
    } else {
      const user = {
        username: username,
        password: password,
      };
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

  return (
    <form id="registration-form" onSubmit={onSubmit}>
      <div className="username">
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            onInput={(evt) => setUsername(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="password">
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onInput={(evt) => setPassword(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="retype">
        <label>
          Re-type password:{" "}
          <input
            type="password"
            name="retype"
            onInput={(evt) => setRetype(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="register">
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
