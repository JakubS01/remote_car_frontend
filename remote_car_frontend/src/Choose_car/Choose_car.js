import "../CSS.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api.js";

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

    const navigate = useNavigate();

    const handlePlay = (id) => {
        navigate("/Stream/" + id, { replace: true })
    };

    useEffect(() => {
        // setCars([
        //     {
        //         id: 1,
        //         isCarRunning: true,
        //         carName: "Best car",
        //         isCarFree: true
        //     },
        //     {
        //         id: 2,
        //         isCarRunning: true,
        //         carName: "Best car 2",
        //         isCarFree: false
        //     },
        //     {
        //         id: 3,
        //         isCarRunning: false,
        //         carName: "Best car 3",
        //         isCarFree: false
        //     }
        // ])
        API.GetCars().then((result) => {
            if (result === null) {
                alert("Error while loading car list");
            } else {
                setCars(result);
            }
        })
    }, []);

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
            <div class="content">
                <div class="header">
                    Choose car
                </div>
                <div class="body">
                    {cars.length === 0 || cars.every((car) => !car.isCarRunning) ? (
                        "There are no cars"
                    ) : (
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                            {cars.map((car) => (
                                <>
                                    {car.isCarRunning &&
                                        <tr>
                                            <td>
                                                <button class="no-button" onClick={() => handlePlay(car.id)}>
                                                    {car.carName}
                                                </button>
                                            </td>
                                            <td>
                                                {car.isCarFree
                                                    ? "Unavailable"
                                                    : "Available"}
                                            </td>
                                        </tr>}
                                </>
                            ))}
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChooseCar;
