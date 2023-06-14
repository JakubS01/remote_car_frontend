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
    var modal = document.getElementById("RegisterModal");
    modal.style.display = "block";
  };

  const closeRegisterModal = () => {
    var modal = document.getElementById("RegisterModal");
    modal.style.display = "none";
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
    <div id="Login">
      <div id="RegisterModal" class="modal">
        <div class="modal-content">
          <div class="temp">
            <h2 class="modal-header">Registration</h2>
            <span class="close" onClick={closeRegisterModal}>
              &times;
            </span>
          </div>
          <div>
            <table>
              <tr>
                <td>
                  <label htmlFor="Name">Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Email:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Password:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </td>
              </tr>
            </table>
            <button onClick={addUser}>Save</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div class="bar">
          <div class="text_bar">
            Car stream
          </div>
        </div>
        <div class="content">
          <div class="header">
            <h2>Login or register</h2>
          </div>
        </div>
      </div>
      <div id="div">


        <td>
          <label htmlFor="email">Email:</label>
        </td>
        <div >
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <td>
          <label htmlFor="password">Password:</label>
        </td>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button
            class="button"
            onClick={login}>
            Sign In
          </button>
        </div>
        <div>
          <button class="button" onClick={handleRegisterModal}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
