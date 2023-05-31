import "../CSS.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div class="header">
        <h2>CAR STREAM</h2>
        <div>
          <button
            class="button"
            onClick={() => navigate("/admin", { replace: true })}
          >
            settings
          </button>
          <button
            class="button"
            onClick={() => navigate("/login", { replace: true })}
          >
            log in
          </button>
        </div>
      </div>
      <div className="content">
        <h1>Virtual platform for renting cars</h1>
        <p>Rent and drive</p>
      </div>
    </div>
  );
};

export default MainMenu;
