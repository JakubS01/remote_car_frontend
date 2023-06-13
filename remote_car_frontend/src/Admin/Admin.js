import "../CSS.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
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
        console.log("???")
        API.GetCarsAdmin().then((result) => {
            if (result === null) {
                alert("Error while downloading cars");
            } else {
                console.log(result);
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
        var modal = document.getElementById("AddModal");
        modal.style.display = "block";
    };

    const closeAddModal = () => {
        var modal = document.getElementById("AddModal");
        modal.style.display = "none";
    };

    const handleChangeCar = (car) => {
        var modal = document.getElementById("ChangeModal");
        setCarId(car.id);
        setCarName(car.name);
        setCarUrl(car.url);
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
        <div>
            <div className="bar">
                <div className="text_bar">Car stream</div>
                <button
                    class="button"
                    style={{marginLeft: "auto", marginRight: "20px"}}
                    onClick={() => API.Logout(navigate)}
                >
                    Logout
                </button>
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
                            <td>{car.url}</td>
                            <td>
                                <button class="no-button" onClick={() => handleChangeCar(car)}>
                                    {car.name}
                                </button>
                            </td>
                            <td>{car.fps === null ? "Not running" : car.fps}</td>
                            <td>
                                {car.status}
                            </td>
                            <td>
                                <button
                                    class="no-button"
                                    onClick={() => {
                                        car.status !== "CONNECTED" ?
                                            startCar(car.id) :
                                            stopCar(car.id)
                                    }}
                                >
                                    {car.status !== "CONNECTED" ? "Connect" : "Disconnect"}
                                </button>
                                <button class="no-button" onClick={() => handleDeleteCar(car)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            )}

            <br/>
            <div justify-content="center" align-items="center">
                <button class="button" onClick={handleAddCar}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default Admin;
