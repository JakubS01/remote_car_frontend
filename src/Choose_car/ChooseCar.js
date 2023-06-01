import "../CSS.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const getCars = async () => {
    const carsList = null;
    fetch("/car_admin", { method: "GET" })
      .then((response) => response.json())
      .then((data) => (carsList = data));
    return carsList;
  };

  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/stream", { replace: true })
  };

  const carsList = getCars();

  //const [cars, setCars] = useState(carsList);
  const [cars, setCars] = useState([
    { Name: "Maszyna", MaxCell: "12", Status: "1" }
  ]);
  const [carName, setCarName] = useState("");
  const [carIp, setCarIp] = useState("");
  const [carMaxCell, setCarMaxCell] = useState("");
  const [carStatus, setCarStatus] = useState(CAR_STATUS.AVAILABLE);
  const [carPicture, setCarPicture] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div>
      <div class="header">
      <div className="bar">
        <div className="text_bar">Car stream</div>
        <button
            class="button"
            style={{marginLeft: "auto", marginRight: "20px"}}
            onClick={() => navigate("/login", { replace: true })}
          >
            Log out
          </button>
      </div>
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
                <button
                  class="no-button"
                  // onClick={() => }
                >
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
      <div>
        <button
          class="button"
          onClick={handlePlay}
        >
          Play
        </button>
        
      </div>
    </div>
  );
};

export default ChooseCar;
