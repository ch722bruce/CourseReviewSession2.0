// import PropTypes from "prop-types";
import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

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
          // let path = "/dashboard";
          // history.push(path);
          const data = await response.json();
          // console.log("TYPE:")
          // console.log(typeof response.body)
          // console.log(typeof user)
          // console.log(data.user)
          // console.log("INFO")
          // console.log(data.user.username)
          // console.log(data.user.password)
          // console.log(data.user.major)
          // console.log(data.user.tag)


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
    console.log("Register button tapped.");
    navigate(`/registration`);
  }

  return (
    <form id='login-form' onSubmit={onSubmit}>
      <div className='username'>
        <label>
          Username:{" "}
          <input
            type='text'
            name='username'
            onInput={evt => setUsername(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className='password'>
        <label>
          Password:{" "}
          <input
            type='password'
            name='password'
            onInput={evt => setPassword(evt.target.value)}
          ></input>
        </label>
      </div>

      <div className='login'>
        <button type='submit'>Log in</button>
      </div>

      <div className='register'>
        <button type='button' onClick={onClick}>
          Register
        </button>
      </div>
    </form>
  );
}
