import "./stream.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowController from "./ArrowController/ArrowController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { globalSettings } from "./Settings/Settings";

function Stream() {
  const navigate = useNavigate();

  const handleUpClick = () => {
    console.log("Up arrow clicked");
  };

  const handleDownClick = () => {
    console.log("Down arrow clicked");
  };

  const handleLeftClick = () => {
    console.log("Left arrow clicked");
  };

  const handleRightClick = () => {
    console.log("Right arrow clicked");
  };

  const handleGearClick = () => {
    navigate("/settings", { replace: true });
  };

  const imageFolder = globalSettings.videoQuality === "high" ? "img_high" : "img_low";

  const images = [
    require(`./${imageFolder}/a1.png`),
    require(`./${imageFolder}/a2.png`),
    require(`./${imageFolder}/a3.png`),
    require(`./${imageFolder}/a4.png`),
    require(`./${imageFolder}/a5.png`),
    require(`./${imageFolder}/a6.png`),
    require(`./${imageFolder}/a7.png`),
    require(`./${imageFolder}/a8.png`),
    require(`./${imageFolder}/a9.png`),
    require(`./${imageFolder}/a10.png`),
    require(`./${imageFolder}/a11.png`),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className="Stream">
      <div className="bar">
        <div className="text_bar">Car stream</div>
        <button
            class="button"
            style={{marginLeft: "auto", marginRight: "20px", opacity: "0.75"}}
            onClick={() => navigate("/choose_car", { replace: true })}
          >
            Disconnect
          </button>
        <FontAwesomeIcon
          icon={faCog}
          className="gear-icon"
          onClick={handleGearClick}
        />
      </div>
      <div>
        <img className="background-image" src={images[currentIndex]} alt="" />
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
