import "../CSS.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export class User {
  constructor(name, email, password) {
    this.Name = name;
    this.Email = email;
    this.Password = password;
  }
}

const LogIn = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     var button = document.getElementById("login");
  //     button.click();
  //   }
  // };
  // document.addEventListener('keypress', handleKeyPress);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterModal = () => {
    var modal = document.getElementById("registerModal");
    modal.style.display = "block";
    var content = document.getElementById("content");
    content.style.display = "none";
  };

  const closeRegisterModal = () => {
    var modal = document.getElementById("registerModal");
    modal.style.display = "none";
    var content = document.getElementById("content");
    content.style.display = "flex";
  };

  const addUser = () => {
    if (name === "") {
      alert("Name is required");
      return;
    }

    if (email === "") {
      alert("Email is required");
      return;
    }

    if (password === "") {
      alert("Password is required");
      return;
    }

    API.Register(name, email, password).then((success) => {
      if (success) {
        alert("Successfully registered");
      }
      else {
        alert("Error while registration");
      }
    })

    setName("");
    setEmail("");
    setPassword("");

    closeRegisterModal();
  };

  const login = () => {

    if (email === "") {
      alert("Email is required");
      return;
    }

    if (password === "") {
      alert("Password is required");
      return;
    }

    API.Login(email, password).then((success) => {
      if (success) {
        navigate("/choose_car", { replace: true });
      }
      else {
        alert("Error while loggin in");
      }
    })
  };

  return (
    <div class="main">
      <div class="bar">
        <div class="text_bar">
          Car stream
        </div>
      </div>
      <div id="content" class="content">
        <div class="header">
          Login or register
        </div>
        <div class="body">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            <button
              id="login"
              class="button"
              onClick={login}>
              Sign In
            </button>
            <button class="button" onClick={handleRegisterModal}>
              Create account
            </button>
          </div>
        </div>
      </div>
      <div id="registerModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <div>Registration</div>
            <span class="modal-close" onClick={closeRegisterModal}>
              &times;
            </span>
          </div>
          <div class="body">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button class="modal-button" onClick={addUser}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
