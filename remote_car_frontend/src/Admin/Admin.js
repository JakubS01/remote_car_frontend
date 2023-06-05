import "../CSS.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export const CAR_STATUS = {
  AVAILABLE: 0,
  UNAVAILABLE: 1
};

export class Car {
  constructor(id, name, url, fps, status, picture) {
    this.Id = id;
    this.Name = name;
    this.Url = url;
    this.Fps = fps;
    this.Status = status;
  }
}

const Admin = () => {
  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState("");
  const [carId, setCarId] = useState("");
  const [carUrl, setCarUrl] = useState("");
  const [carFps, setCarFps] = useState("");
  const [carStatus, setCarStatus] = useState(CAR_STATUS.AVAILABLE);
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

  const getCars = () => {
    let tmp = API.GetCarsAdmin();
    if (tmp === null) {
      alert("Error");
    } else {
      setCars(tmp);
    }
  };

  useEffect(getCars, []);

  const handleAddCar = () => {
    var modal = document.getElementById("AddModal");
    modal.style.display = "block";
  };

  const closeAddModal = () => {
    var modal = document.getElementById("AddModal");
    modal.style.display = "none";
  };

  const handleChangeCar = (car) => {
    var modal = document.getElementById("ChangeModal");
    setSelectedCar(car);
    setCarId(car.Ip);
    setCarName(car.Name);
    setCarUrl(car.Url);
    setCarFps(car.Fps);
    setCarStatus(car.Status);
    modal.style.display = "block";
  };

  const closeChangeModal = () => {
    var modal = document.getElementById("ChangeModal");
    modal.style.display = "none";
  };

  const handleCarUrlChange = (event) => {
    setCarUrl(event.target.value);
  };

  const handleCarNameChange = (event) => {
    setCarName(event.target.value);
  };

  const handleCarFpsChange = (event) => {
    setCarFps(event.target.value);
  };

  const handleCarStatusChange = (event) => {
    setCarStatus(Number(event.target.value));
  };

  const handleDeleteCar = (car) => {
    if (!API.DeleteCarAdmin(car.id)) {
      alert("Error");
    } else {
      getCars();
    }
  };

  const changeCar = () => {
    if (carUrl === "") {
      alert("URL is required");
      return;
    }

    if (carName === "") {
      alert("Name is required");
      return;
    }

    if (carFps === "") {
      alert("Fps is required");
      return;
    } else if (isNaN(Number(carFps))) {
      alert("Fps must be an integer");
      return;
    }

    if (!API.ChangeCarAdmin(carId, carName, carUrl)) {
      alert("Error");
    }

    getCars();

    setCarId("");
    setCarName("");
    setCarFps("");
    setCarStatus("");

    closeChangeModal();
  };

  const addCar = () => {
    if (carUrl === "") {
      alert("URL is required");
      return;
    }

    if (carName === "") {
      alert("Name is required");
      return;
    }

    if (carFps === "") {
      alert("Fps is required");
      return;
    } else if (isNaN(Number(carFps))) {
      alert("Fps must be an integer");
      return;
    }

    if (!API.AddCarAdmin(carName, carUrl)) {
      alert("Error");
    }

    getCars();
    setCarUrl("");
    setCarName("");
    setCarFps("");
    setCarStatus("");

    closeAddModal();
  };

  return (
    <div>
      <div class="header">
        <h2>CAR STREAM</h2>
        <h1>Hi Admin</h1>
      </div>

      <div className="bar">
        <div className="text_bar">Car stream</div>
        <button
          class="button"
          style={{ marginLeft: "auto", marginRight: "20px" }}
          onClick={() => navigate("/", { replace: true })}
        >
          Main menu
        </button>
      </div>
      <h1>Hi Admin</h1>

      <div id="ChangeModal" class="modal">
        <div class="modal-content">
          <div class="temp">
            <h2 class="modal-header">Change car</h2>
            <span class="close" onClick={closeChangeModal}>
              &times;
            </span>
          </div>
          <div>
            <table>
              <tr>
                <td>
                  <label htmlFor="changeCarUrl">URL:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="changeCarUrl"
                    value={carUrl}
                    onChange={handleCarUrlChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="changeCarName">Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="changeCarName"
                    value={carName}
                    onChange={handleCarNameChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="changeFps">fps:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="changeFps"
                    value={carFps}
                    onChange={handleCarFpsChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="changeCarStatus">Status:</label>
                </td>
                <td>
                  <select id="changeCarStatus" onChange={handleCarStatusChange}>
                    <option value={CAR_STATUS.AVAILABLE}>available</option>
                    <option value={CAR_STATUS.UNAVAILABLE}>unavailable</option>
                  </select>
                </td>
              </tr>
            </table>
            <button class="no-button" onClick={changeCar}>
              Save
            </button>
          </div>
        </div>
      </div>

      <div id="AddModal" class="modal">
        <div class="modal-content">
          <div class="temp">
            <h2 class="modal-header">Add new car</h2>
            <span class="close" onClick={closeAddModal}>
              &times;
            </span>
          </div>
          <div>
            <table>
              <tr>
                <td>
                  <label htmlFor="carUrl">URL:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="carUrl"
                    value={carUrl}
                    onChange={handleCarUrlChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="carName">Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="carName"
                    value={carName}
                    onChange={handleCarNameChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="carFps">Fps:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="carFps"
                    value={carFps}
                    onChange={handleCarFpsChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="carStatus">Status:</label>
                </td>
                <td>
                  <select id="carStatus" onChange={handleCarStatusChange}>
                    <option value={CAR_STATUS.AVAILABLE}>available</option>
                    <option value={CAR_STATUS.UNAVAILABLE}>unavailable</option>
                  </select>
                </td>
              </tr>
            </table>
            <button class="no-button" onClick={addCar}>
              Save
            </button>
          </div>
        </div>
      </div>

      {cars.length === 0 ? (
        "There are no cars"
      ) : (
        <table>
          <tr>
            <th>URL</th>
            <th text-align="center">Name</th>
            <th>Fps</th>
            <th>Status</th>
            <th>Connection</th>
          </tr>
          {cars.map((car) => (
            <tr>
              <td>{car.Url}</td>
              <td>
                <button class="no-button" onClick={() => handleChangeCar(car)}>
                  {car.Name}
                </button>
              </td>
              <td>{car.Fps}</td>
              <td>
                {car.Status === CAR_STATUS.UNAVAILABLE
                  ? "Unavailable"
                  : "Available"}
              </td>
              <td>
                <button
                  class="no-button"
                  //onClick={() => }
                >
                  Connect
                </button>
                <button class="no-button" onClick={handleDeleteCar}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}

      <br />
      <div justify-content="center" align-items="center">
        <button class="button" onClick={handleAddCar}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Admin;
