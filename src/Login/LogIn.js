import "../CSS.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [rememberMe, setRememberMe] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Обработка отправки формы
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    fetch("/upload", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setName("");
    setEmail("");
    setPassword("");

    closeRegisterModal();
  };

  return (
    <div>
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

      <div>
        <div class="header">
          <h2>CAR STREAM</h2>
        </div>
        <h1>Login or register</h1>
        <td>
          <label htmlFor="email">Email:</label>
        </td>
        <div>
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
            type="text"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember me
          </label>
        </div>
        <div>
          <button
            class="button"
            c
          >
            Sign In
          </button>
        </div>
        <div>
          <button
            class="button"
            onClick={() => navigate("/admin", { replace: true })}
          >
            Forgot your password?
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
