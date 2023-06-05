import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./settings.css";

let globalSettings = {
    videoQuality: "high",
    musicVolume: 50,
    language: "english",
  };

function Settings() {
  const navigate = useNavigate();
  const [videoQuality, setVideoQuality] = useState(globalSettings.videoQuality);
  const [musicVolume, setMusicVolume] = useState(globalSettings.musicVolume);
  const [language, setLanguage] = useState(globalSettings.language);

  const handleGearClick = () => {
    navigate("/stream", { replace: true });
  };

  const handleVideoQualityChange = (e) => {
    setVideoQuality(e.target.value);
  };

  const handleMusicVolumeChange = (e) => {
    setMusicVolume(Number(e.target.value));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleHelpClick = () => {
    console.log("Ask for help");
  };

  const handleConfirmClick = () => {
    globalSettings = {
      videoQuality,
      musicVolume,
      language,
    };

    navigate("/stream", { replace: true });

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
        <ul className="settings-options">
          <li>
            <label htmlFor="video-quality">Video Quality:</label>
            <div className="checkbox-options">
              <label>
                <input
                  type="checkbox"
                  name="video-quality"
                  value="high"
                  checked={videoQuality === "high"}
                  onChange={handleVideoQualityChange}
                />
                High
              </label>
              <label>
                <input
                  type="checkbox"
                  name="video-quality"
                  value="low"
                  checked={videoQuality === "low"}
                  onChange={handleVideoQualityChange}
                />
                Low
              </label>
            </div>
          </li>
          <li>
            <label htmlFor="music-volume">Music:</label>
            <input
              type="range"
              id="music-volume"
              min="0"
              max="100"
              value={musicVolume}
              onChange={handleMusicVolumeChange}
            />
          </li>
          <li>
            <label htmlFor="language">Language:</label>
            <select id="language" value={language} onChange={handleLanguageChange}>
              <option value="english">English</option>
              <option value="polish">Polish</option>
            </select>
          </li>
          <li>
            <label htmlFor="Help">Help:</label>
            <button onClick={handleHelpClick}>Ask for help</button>
          </li>
        </ul>
        <div className="settings-buttons">
          <button style={{backgroundColor: "#BFACE2"}} onClick={handleConfirmClick}>Apply</button>
          <button style={{opacity: "0.75"}} onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
export { globalSettings };
