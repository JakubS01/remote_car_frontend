import "../CSS.css";
import { useState } from "react";

export const CAR_STATUS = {
  AVAILABLE: 0,
  UNAVAILABLE: 1
};

export class Car {
  constructor(ip, name, maxCell, status, picture) {
    this.Ip = ip;
    this.Name = name;
    this.MaxCell = maxCell;
    this.Status = status;
    this.Picture = picture;
  }
}

const Admin = () => {
  const getCars = async () => {
    const carsList = null;
    fetch("/car_admin", { method: "GET" })
      .then((response) => response.json())
      .then((data) => (carsList = data));
    return carsList;
  };

  const carsList = getCars();

  console.log("There are cars");
  //const [cars, setCars] = useState(carsList);
  const [cars, setCars] = useState([
    { Ip: "1478", Name: "Maszyna", MaxCell: "12", Status: "1" }
  ]);
  const [carName, setCarName] = useState("");
  const [carIp, setCarIp] = useState("");
  const [carMaxCell, setCarMaxCell] = useState("");
  const [carStatus, setCarStatus] = useState(CAR_STATUS.AVAILABLE);
  const [carPicture, setCarPicture] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarPictureChange = (event) => {
    setCarPicture(event.target.files[0]);
  };

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
    setCarIp(car.Ip);
    setCarName(car.Name);
    setCarMaxCell(car.MaxCell);
    setCarStatus(car.Status);
    setCarPicture(car.Picture);
    modal.style.display = "block";
  };

  const closeChangeModal = () => {
    var modal = document.getElementById("ChangeModal");
    modal.style.display = "none";
  };

  const handleCarIpChange = (event) => {
    setCarIp(event.target.value);
  };

  const handleCarNameChange = (event) => {
    setCarName(event.target.value);
  };

  const handleCarMaxCellChange = (event) => {
    setCarMaxCell(event.target.value);
  };

  const handleCarStatusChange = (event) => {
    setCarStatus(Number(event.target.value));
  };

  const changeCar = () => {
    if (carIp === "") {
      alert("Ip is required");
      return;
    } else if (isNaN(Number(carIp))) {
      alert("Ip must be an integer");
      return;
    }

    if (carName === "") {
      alert("Name is required");
      return;
    }

    if (carMaxCell === "") {
      alert("MaxCell is required");
      return;
    } else if (isNaN(Number(carMaxCell))) {
      alert("MaxCell must be an integer");
      return;
    }

    setCars((cars) =>
      cars
        .filter((car) => car !== selectedCar)
        .concat(
          new Car(
            Number(carIp),
            carName,
            Number(carMaxCell),
            carStatus,
            carPicture
          )
        )
    );

    const formData = new FormData();
    formData.append("ip", carIp);
    formData.append("name", carName);
    formData.append("maxCell", Number(carMaxCell));
    formData.append("status", carStatus);
    formData.append("file", carPicture);

    fetch("/car_admin", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setCarIp("");
    setCarName("");
    setCarMaxCell("");
    setCarStatus("");
    setCarPicture("");

    closeChangeModal();
  };

  const addCar = () => {
    if (carIp === "") {
      alert("Ip is required");
      return;
    } else if (cars.map((car) => car.Ip).includes(carIp)) {
      alert("Ip must be unique");
      return;
    } else if (isNaN(Number(carIp))) {
      alert("Ip must be an integer");
      return;
    }

    if (carName === "") {
      alert("Name is required");
      return;
    }

    if (carMaxCell === "") {
      alert("MaxCell is required");
      return;
    } else if (isNaN(Number(carMaxCell))) {
      alert("MaxCell must be an integer");
      return;
    }

    setCars(
      cars.concat(
        new Car(carIp, carName, Number(carMaxCell), carStatus, carPicture)
      )
    );

    const formData = new FormData();
    formData.append("ip", carIp);
    formData.append("name", carName);
    formData.append("maxCell", Number(carMaxCell));
    formData.append("status", carStatus);
    formData.append("file", carPicture);

    fetch("/upload", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setCarIp("");
    setCarName("");
    setCarMaxCell("");
    setCarStatus("");
    setCarPicture("");

    closeAddModal();
  };

  return (
    <div>
      <div class="header">
        <h2>CAR STREAM</h2>
        <h1>Hi Admin</h1>
      </div>

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
                  <label htmlFor="changeCarIp">Ip:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="changeCarIp"
                    value={carIp}
                    onChange={handleCarIpChange}
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
                  <label htmlFor="changeCarMaxCell">MaxCell:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="changeCarMaxCell"
                    value={carMaxCell}
                    onChange={handleCarMaxCellChange}
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
              <tr>
                <td>
                  <input
                    id="changeFileInput"
                    type="file"
                    onChange={handleCarPictureChange}
                  />
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
                  <label htmlFor="carIp">ip:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="carIp"
                    value={carIp}
                    onChange={handleCarIpChange}
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
                  <label htmlFor="carMaxCell">MaxCell:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="carMaxCell"
                    value={carMaxCell}
                    onChange={handleCarMaxCellChange}
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
              <tr>
                <td>
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleCarPictureChange}
                  />
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
            <th>Ip</th>
            <th text-align="center">Name</th>
            <th>MaxCell</th>
            <th>Status</th>
            <th>Picture</th>
            <th>Connection</th>
          </tr>
          {cars.map((car) => (
            <tr>
              <td>{car.Ip}</td>
              <td>
                <button class="no-button" onClick={() => handleChangeCar(car)}>
                  {car.Name}
                </button>
              </td>
              <td>{car.MaxCell}</td>
              <td>
                {car.Status === CAR_STATUS.UNAVAILABLE
                  ? "Unavailable"
                  : "Available"}
              </td>
              <td>
                {
                  // <img src={car.Picture}  />
                }
              </td>
              <td>
                <button
                  class="no-button"
                  //onClick={() => }
                >
                  Connect
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

        <button class="button" onClick={handleAddCar}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Admin;
