import "../CSS.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
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
        navigate("/Stream/" + id, {replace: true})
    };

    useEffect(() => {
        API.GetCars().then((result) => {
            if (result === null) {
                alert("Error while loading car list");
            } else {
                setCars(result);
            }
        })
    }, []);

    return (
        <div>
            <div className="bar">
                <div className="text_bar">Car stream</div>
                <button
                    class="button"
                    style={{marginLeft: "auto", marginRight: "20px"}}
                    onClick={() => API.Logout(navigate)}
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
                        <th>Status</th>
                    </tr>
                    {cars.map((car) => (
                        <>
                            {car.isCarRunning &&
                                <tr>
                                    <td>
                                        <button class="button" onClick={() => handlePlay(car.id)}>
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
    );
};

export default ChooseCar;
