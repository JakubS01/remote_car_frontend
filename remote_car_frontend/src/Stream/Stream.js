import "./stream.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowController from "./ArrowController/ArrowController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

function Stream() {
  const navigate = useNavigate();
  const location = useLocation();

  let normal = {}
  let [ws, setWs] = useState(normal);
  let [session, setSession] = useState(null);
  let [lastMessage, setLastMessage] = useState("")
  let [obj, setObj] = useState({})
  let [image, setImage] = useState("");

  let [userId, setUserId] = useState("")

  const [AUTH_TOKEN, setAUTH_TOKEN] = useState("")

  const queryParams = new URLSearchParams(location.search);
  const [videoQuality, setVideoQuality] = useState(queryParams.get("videoQuality"));
  const [prevVideoQuality, setPrevVideoQuality] = useState("");


  useEffect(() => {
    //let url = 'ws://localhost/api/cars/1'
    let url = 'ws://localhost:8000'
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
          setImage(obj.data.image)
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
  
      };
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


  const handleUpClick = () => {  
      if (ws) {
          let a = JSON.stringify({type: "CONTROL_MESSAGE", data: {verticalSpeed: 1.0, horizontalSpeed: 0.0}})
          console.log(a)
          ws.send(a)
      }
  
    console.log("Up arrow clicked");
  };

  const handleDownClick = () => {
    if (ws) {
      let a = JSON.stringify({type: "CONTROL_MESSAGE", data: {verticalSpeed: -1.0, horizontalSpeed: 0.0}})
      console.log(a)
      ws.send(a)
  }
    console.log("Down arrow clicked");
  };

  const handleLeftClick = () => {
    if (ws) {
      let a = JSON.stringify({type: "CONTROL_MESSAGE", data: {verticalSpeed: 0, horizontalSpeed: -1.0}})
      console.log(a)
      ws.send(a)
  }
    console.log("Left arrow clicked");
  };

  const handleRightClick = () => {
    if (ws) {
      let a = JSON.stringify({type: "CONTROL_MESSAGE", data: {verticalSpeed: 0.0, horizontalSpeed: 1.0}})
      console.log(a)
      ws.send(a)
  }
    console.log("Right arrow clicked");
  };

  const handleGearClick = () => {
    navigate("/settings", { replace: true });
  };

  const handleDisconnectClick = () => {
    navigate("/choose_car", { replace: true });
    console.log("Disconnected");
  };

  const handleTakeSteeringClick = () => {
    console.log(ws)
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
        <div className="text_bar" style={{marginLeft:"20px", fontSize:"1.9em"}}>
            {obj && <div>Left : {obj.lefTime}</div>}
            {obj && <div>Rent by:
                : {obj.userRentId === userId ? "true" : "false"}</div>}
          </div>
        <div className="button-container">
        <button
            class="button"
            style={{marginRight:"15px", opacity: "0.75"}}
            onClick={handleTakeSteeringClick}
          >
            Take steering
          </button>
        <button
            class="button"
            style={{ opacity: "0.75"}}
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
        <img className="background-image" src={`data:image/jpeg;base64,${image}`} alt="" />
        <ArrowController
          onUpClick={handleUpClick}
          onDownClick={handleDownClick}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      </div>
    </div>
  );
}

export default Stream;
