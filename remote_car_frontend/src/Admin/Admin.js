import "../CSS.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export const CAR_STATUS = {
    AVAILABLE: 0,
    UNAVAILABLE: 1
};

const Admin = () => {
    const [cars, setCars] = useState([]);
    const [carName, setCarName] = useState("");
    const [carId, setCarId] = useState("");
    const [carUrl, setCarUrl] = useState("");
    const navigate = useNavigate();

    const getCars = () => {
        API.GetCarsAdmin().then((result) => {
            if (result === null) {
                alert("Error while downloading cars");
            } else {
                setCars(result);
            }
        })
    }

    const startCar = (id) => {
        API.StartCarAdmin(id).then((result) => {
            if (!result) {
                alert("Error while starting car");
            } else {
                alert("Car started");
            }
            getCars()
        })
    }
    const stopCar = (id) => {
        API.ForceStopCarAdmin(id).then((result) => {
            if (!result) {
                alert("Error while stopping car");
            } else {
                alert("Car stopped");
            }
            getCars()
        })
    }

    useEffect(getCars, []);

    const handleAddCar = () => {
        var modal = document.getElementById("addModal");
        modal.style.display = "block";
        var content = document.getElementById("content");
        content.style.display = "none";
    };

    const closeAddModal = () => {
        var modal = document.getElementById("addModal");
        modal.style.display = "none";
        var content = document.getElementById("content");
        content.style.display = "flex";
    };

    const handleChangeCar = (car) => {
        var modal = document.getElementById("changeModal");
        modal.style.display = "block";
        var content = document.getElementById("content");
        content.style.display = "none";
        setCarId(car.id);
        setCarName(car.name);
        setCarUrl(car.url);
    };

    const closeChangeModal = () => {
        var modal = document.getElementById("changeModal");
        modal.style.display = "none";
        var content = document.getElementById("content");
        content.style.display = "flex";
    };

    const handleCarUrlChange = (event) => {
        setCarUrl(event.target.value);
    };

    const handleCarNameChange = (event) => {
        setCarName(event.target.value);
    };

    const handleDeleteCar = (car) => {
        API.DeleteCarAdmin(car.id).then((success) => {
            if (success) {
                getCars();
            } else {
                alert("Error while deleting car");
            }
        })
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

        API.ChangeCarAdmin(carId, carName, carUrl).then((success) => {
            if (success) {
                getCars();
                setCarId("");
                setCarName("");
                setCarUrl("");
                closeChangeModal();
            } else {
                alert("Error while changing car");
            }
        })
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

        API.AddCarAdmin(carName, carUrl).then((success) => {
            if (success) {
                getCars();
                setCarUrl("");
                setCarName("");
                closeAddModal();
            } else {
                alert("Error");
            }
        })
    };

    return (
        <div class="main">
            <div class="bar">
                <div class="text_bar">
                    Car stream
                </div>
                <button
                    class="button"
                    onClick={() => API.Logout(navigate)}
                >
                    Log out
                </button>
            </div>
            <div id="content" class="content">
                <div class="header">
                    Admin
                </div>
                <div class="body">
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
                                    <td>{car.url}</td>
                                    <td>
                                        <button class="button" onClick={() => handleChangeCar(car)}>
                                            {car.name}
                                        </button>
                                    </td>
                                    <td>{car.fps === null ? "Not running" : car.fps}</td>
                                    <td>
                                        {car.status}
                                    </td>
                                    <td>
                                        <button
                                            class="button"
                                            onClick={() => {
                                                car.status !== "CONNECTED" ?
                                                    startCar(car.id) :
                                                    stopCar(car.id)
                                            }}
                                        >
                                            {car.status !== "CONNECTED" ? "Connect" : "Disconnect"}
                                        </button>
                                        <button class="button" onClick={() => handleDeleteCar(car)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    )}
                    <br />
                    <button class="button" onClick={handleAddCar}>
                        Add new car
                    </button>
                </div>
            </div>
            <div id="changeModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>Change car</div>
                        <span class="modal-close" onClick={closeChangeModal}>
                            &times;
                        </span>
                    </div>
                    <div class="body">
                        <label htmlFor="url">URL:</label>
                        <input
                            type="text"
                            id="url"
                            value={carUrl}
                            onChange={handleCarUrlChange}
                            required
                        />
                        <label htmlFor="changeCarName">Name:</label>
                        <input
                            type="text"
                            id="changeCarName"
                            value={carName}
                            onChange={handleCarNameChange}
                        />
                        <button class="modal-button" onClick={changeCar}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div id="addModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>Add new car</div>
                        <span class="modal-close" onClick={closeAddModal}>&times;</span>
                    </div>
                    <div class="body">
                        <label htmlFor="carUrl">URL:</label>
                        <input
                            type="text"
                            id="carUrl"
                            value={carUrl}
                            onChange={handleCarUrlChange}
                            required
                        />
                        <label htmlFor="carName">Name:</label>
                        <input
                            type="text"
                            id="carName"
                            value={carName}
                            onChange={handleCarNameChange}
                            required
                        />
                        <button class="modal-button" onClick={addCar}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
