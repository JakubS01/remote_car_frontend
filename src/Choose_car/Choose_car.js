import "../CSS.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./Api.js";

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

const ChooseCar = () => {
  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState("");
  const [carIp, setCarIp] = useState("");
  const [carMaxCell, setCarMaxCell] = useState("");
  const [carStatus, setCarStatus] = useState(CAR_STATUS.AVAILABLE);
  const [carPicture, setCarPicture] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let tmp = API.GetCars();
    if (tmp === null) {
      alert("Error");
    } else {
      setCars(tmp);
    }
  }, []);

  return (
    <div>
      <div class="header">
        <h2>CAR STREAM</h2>
      </div>

      <div className="bar">
        <div className="text_bar">Car stream</div>
        <button
          class="button"
          style={{ marginLeft: "auto", marginRight: "20px" }}
          onClick={() => navigate("/login", { replace: true })}
        >
          Log out
        </button>
      </div>

      {cars.length === 0 ? (
        "There are no cars"
      ) : (
        <table>
          <tr>
            <th>Name</th>
            <th>MaxCell</th>
            <th>Status</th>
          </tr>
          {cars.map((car) => (
            <tr>
              <td>
                <button class="button" onClick={handlePlay}>
                  {car.Name}
                </button>
              </td>
              <td>{car.MaxCell}</td>
              <td>
                {car.Status === CAR_STATUS.UNAVAILABLE
                  ? "Unavailable"
                  : "Available"}
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default ChooseCar;
