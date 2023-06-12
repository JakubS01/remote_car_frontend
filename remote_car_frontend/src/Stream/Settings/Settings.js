import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./settings.css";


function Settings() {
  const navigate = useNavigate();
  const [videoQuality, setVideoQuality] = useState("720p");
  


  useEffect(() => {
    const storedVideoQuality = localStorage.getItem("videoQuality");
    if (storedVideoQuality) {
      setVideoQuality(storedVideoQuality);
    }
  }, []);

 
  useEffect(() => {
    if (videoQuality) {
      localStorage.setItem("videoQuality", videoQuality);
    }
  }, [videoQuality]);

  const handleGearClick = () => {
    navigate("/stream", { replace: true });
  };

  const handleVideoQualityChange = (option) => {
    setVideoQuality(option);
  };

  const handleConfirmClick = () => {
    /*
    if (videoQuality === "720p") {
      
      console.log(ws)
      if (ws) {
          ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P720"}}))
      }

    } else if (videoQuality === "480p") {

      console.log(ws)
      if (ws) {
          ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P480"}}))

      };
    } else if (videoQuality === "360p") {
      
      console.log(ws)
      if (ws) {
          ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P360"}}))
      }      console.log("Selected Video Quality: 360p");

    } else if (videoQuality === "240p") {

      console.log(ws)
      if (ws) {
          ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P240"}}))
      }
      
    } else if (videoQuality === "144p") {

      console.log(ws)
      if (ws) {
          ws.send(JSON.stringify({type: "CONFIG_MESSAGE", data: {size: "P144"}}))
      }

    }
*/
    navigate(`/stream?videoQuality=${videoQuality}`, { replace: true });
    console.log("Confirm settings");
  };

  const handleCancelClick = () => {
    navigate("/stream", { replace: true });
    console.log("Cancel settings");
  };

  return (
    <div className="Settings">
      <div className="bar">
        <div className="text_bar">Car stream</div>
        <FontAwesomeIcon
          icon={faCog}
          className="gear-icon"
          onClick={handleGearClick}
        />
      </div>
      <div className="settings-content">
        <div className="settings-heading">Settings</div>
        <div className="settings-options">
          <div className="video-quality-label">Video Quality:</div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="720p"
              checked={videoQuality === "720p"}
              onChange={() => handleVideoQualityChange("720p")}
            />
            <label htmlFor="720p">720p</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="480p"
              checked={videoQuality === "480p"}
              onChange={() => handleVideoQualityChange("480p")}
            />
            <label htmlFor="480p">480p</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="360p"
              checked={videoQuality === "360p"}
              onChange={() => handleVideoQualityChange("360p")}
            />
            <label htmlFor="360p">360p</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="240p"
              checked={videoQuality === "240p"}
              onChange={() => handleVideoQualityChange("240p")}
            />
            <label htmlFor="240p">240p</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="144p"
              checked={videoQuality === "144p"}
              onChange={() => handleVideoQualityChange("144p")}
            />
            <label htmlFor="144p">144p</label>
          </div>
        </div>
        <div className="settings-buttons">
          <button
            style={{ backgroundColor: "#BFACE2" }}
            onClick={handleConfirmClick}
          >
            Apply
          </button>
          <button style={{ opacity: "0.75" }} onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
