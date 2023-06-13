import "./stream.css";
import {useState, useEffect} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import ArrowController from "./ArrowController/ArrowController";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import Api from "../Api";

function Stream() {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();

    let normal = {}
    let [ws, setWs] = useState(normal);
    let [session, setSession] = useState(null);
    let [lastMessage, setLastMessage] = useState("")
    let [obj, setObj] = useState({})
    let [image, setImage] = useState("");

    let [userId, setUserId] = useState("")

    let [websocketSteerId, setWebsocketSteerId] = useState("")

    let [verticalSpeed, setVerticalSpeed] = useState(0)
    let [horizontalSpeed, setHorizontalSpeed] = useState(0)

    const [AUTH_TOKEN, setAUTH_TOKEN] = useState("")

    const queryParams = new URLSearchParams(location.search);
    const [videoQuality, setVideoQuality] = useState(queryParams.get("videoQuality"));
    const [prevVideoQuality, setPrevVideoQuality] = useState("");


    useEffect(() => {
        let url = 'ws://localhost/api/cars/' + id
        console.log("Execute?")
        let headers = JSON.stringify({
            token: 'My-little-token'
        })
        let websocket = new WebSocket(url)
        websocket.onopen = (wsm, req) => {
            console.log("Connected")
        };


        websocket.onmessage = (e) => {
            setLastMessage("Recived : " + e.data)
            let obj = JSON.parse(e.data)
            if (obj.type === "DISPLAY_MESSAGE") {
                setUserId(obj && obj.data && obj.data.userRentId)
                setWebsocketSteerId(obj && obj.data && obj.data.sessionSteeringId)
                if (obj.data) {
                    if (obj.data.frame) {
                        setImage(obj.data.frame)
                    }
                    if (obj.data) {
                        setObj({
                            lefTime: obj.data.timeToEnd,
                            sessionSteeringId: obj.data.sessionSteeringId,
                            userRentId: obj.data.userRentId
                        })
                    }
                }
            } else if (obj.type === "INFO_MESSAGE") {
                console.log(obj)

                if (obj.data.msg === "CONNECTED_SUCCESSFULLY") {
                    setSession(obj.data.websocketId)
                    console.log("SETTED")
                }
            } else {
                console.log(obj)

            }

        };
        websocket.onclose = (e) => {
            console.log("Disconnected")
        }
        setWs(websocket);
        return () => {
            websocket.close();
        }

    }, [])

    useEffect(() => {
        if (prevVideoQuality !== videoQuality) {
            console.log("Wartość videoQuality została zmieniona:", videoQuality);

            if (videoQuality === "720p" || videoQuality === null) {

                console.log(ws)
                if (ws) {
                    //ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P720"}}))
                }

            } else if (videoQuality === "480p") {

                console.log(ws)
                if (ws) {
                    //ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P480"}}))

                }
                ;
            } else if (videoQuality === "360p") {

                console.log(ws)
                if (ws) {
                    //ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P360"}}))
                }

            } else if (videoQuality === "240p") {

                console.log(ws)
                if (ws) {
                    //ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P240"}}))
                }

            } else if (videoQuality === "144p") {

                console.log(ws)
                if (ws) {
                    //ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P144"}}))
                }

            }

            setPrevVideoQuality(videoQuality);
        }

    }, [videoQuality, prevVideoQuality]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (ws) {
                let a = JSON.stringify({
                    type: "CONTROL_MESSAGE",
                    data: {verticalSpeed: verticalSpeed, horizontalSpeed: horizontalSpeed}
                })
                console.log(a)
                try {
                    ws.send(a)
                } catch (e) {

                }
            }
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [ws, verticalSpeed, horizontalSpeed])


    const handleGearClick = () => {
        navigate("/settings", {replace: true});
    };

    const handleDisconnectClick = () => {
        navigate("/choose_car", {replace: true});
        console.log("Disconnected");
    };

    const rentCar = (id) => {
        console.log("ws?    ", ws.id)
        Api.RentCar(id).then(response => {
            if (response) {
                takeCarSteering(id, session)
            }
        })
    }
    const takeCarSteering = (id) => {
        console.log("ws?    ", ws.id)
        Api.TakeSteeringCar(id, session).then(response => {

        })
    }

    const handleTakeSteeringClick = () => {
        if (ws) {
            console.log(session)
            fetch("http://localhost/api/car/take_control/1", {
                "method": "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + AUTH_TOKEN
                },
                body: JSON.stringify({
                    "websocketId": session
                })
            }).then(response => {

                console.log(response.status)

            }).catch(e => {
                console.log(e)
            })
        }
        console.log("Take Steering");
    };

    return (
        <div className="Stream">
            <div className="bar">
                <div className="text_bar">Car stream</div>
                <div className="text_bar" style={{marginLeft: "20px", fontSize: "1.9em"}}>
                    {obj && <div>Left time: {obj.lefTime / 1000}</div>}
                    {obj && <div>Rent by you:
                        {obj.userRentId === userId && obj.lefTime > 0 ? "true" : "false"}</div>}
                    {obj && <div>Steering by you:
                        {obj.sessionSteeringId === session && obj.lefTime > 0 ? "true" : "false"}</div>}
                </div>
                <div className="button-container">
                    {obj.lefTime === 0 && <button
                        class="button"
                        style={{marginRight: "15px", opacity: "0.75"}}
                        onClick={() => rentCar(id)}
                    >
                        Take control
                    </button>}
                    {obj.lefTime !== 0 && obj.userRentId === userId && obj.sessionSteeringId !== session && <button
                        class="button"
                        style={{marginRight: "15px", opacity: "0.75"}}
                        onClick={() => takeCarSteering(id)}
                    >
                        Take steering
                    </button>}
                    <button
                        class="button"
                        style={{opacity: "0.75"}}
                        onClick={handleDisconnectClick}
                    >
                        Disconnect
                    </button>
                </div>
                <FontAwesomeIcon
                    icon={faCog}
                    className="gear-icon"
                    onClick={handleGearClick}
                />
            </div>
            <div>
                <img className="background-image" src={`data:image/jpeg;base64,${image}`} alt=""/>
                <ArrowController
                    onUpClick={() => setHorizontalSpeed(1)}
                    onDownClick={() => setHorizontalSpeed(-1)}
                    onLeftClick={() => setVerticalSpeed(-1)}
                    onRightClick={() => setVerticalSpeed(1)}
                    onUpDownRelease={() => setHorizontalSpeed(0)}
                    onLeftRightRelease={() => setVerticalSpeed(0)}
                />
            </div>
        </div>
    );
}

export default Stream;
