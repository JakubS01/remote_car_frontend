import "../CSS.css";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCog } from "@fortawesome/free-solid-svg-icons";
import BackgroundImage from "./background.jpeg";

const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <div class="header">
        <div className="bar-main">
          <button
            class="button"
            style={{ marginLeft: "auto", marginRight: "20px" }}
            onClick={() => navigate("/login", { replace: true })}
          >
            log in
          </button>
          <FontAwesomeIcon
          icon={faCog}
          className="gear-icon-main"
          onClick={() => navigate("/admin", { replace: true })}
        />

        </div>
      </div> */}
      <div className="content">
        <div
          className="text-bar-main"
          style={{ textAlign: "center", margin: "50px", opacity: "1" }}
        >
          Virtual platform for renting cars
        </div>
        <div
          className="text-bar-main"
          style={{
            textAlign: "center",
            margin: "20px",
            fontSize: "60px",
          }}

        >
          Rent and drive
        </div>
        <button
          class="big-button"
          onClick={() => navigate("/login", { replace: true })}
        >
          Log in
        </button>
        <img className="background-image" src={BackgroundImage} alt="" />
      </div>
    </div>
  );
};

export default MainMenu;
