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

export function LoginForm() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(evt) {
    evt.preventDefault();

    if (username.length == 0 || password.length == 0) {
      window.alert("Inputs can not be empty!");
    } else if (!isValidUsername(username)) {
      window.alert(
        "Invalid username!\nShould be at least 3 and at most 10 characters long.\nShould only include letters, numbers, and -_",
      );
    } else if (!isValidPassword(password)) {
      window.alert(
        "Invalid password!\nShould be at least 8 and at most 16 characters long.\nShould only include uppercase and lowercase letters, numbers, and @.!?",
      );
    } else {
      const user = {
        username: username,
        password: password,
      };
      try {
        const response = await fetch("/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("currUser", JSON.stringify(data.user));
          navigate(`/dashboard`);
        } else {
          window.alert("User not found or wrong credentials!");
        }
      } catch (e) {
        console.log("Fetch error: " + e);
      }
    }
  }

  function onClick() {
    navigate(`/registration`);
  }

  return (
    <form id="login-form" onSubmit={onSubmit}>
      <div className="login-input">
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            onInput={evt => setUsername(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="login-input">
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onInput={evt => setPassword(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className="login-login">
        <button className="submit-btn" type="submit">
          Log in
        </button>
      </div>

      <div className="login-register">
        <button className="click-btn" type="button" onClick={onClick}>
          Don&apos;t have an account?
        </button>
      </div>
    </form>
  );
}
