import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import "./settings.css";


function Settings({videoQuality, setVideoQuality, setView}) {

    let [tmp, setTmp] = useState(videoQuality);

    useEffect(() => {
        const storedVideoQuality = localStorage.getItem("videoQuality");
        if (storedVideoQuality) {
            setTmp(storedVideoQuality);
        }
    }, []);


    useEffect(() => {
        if (tmp) {
            localStorage.setItem("videoQuality", tmp);
        }
    }, [tmp]);

    const handleGearClick = () => {
        setView(false)
    };

    const handleVideoQualityChange = (option) => {
        setTmp(option);
    };

    const handleConfirmClick = () => {
        setView(false)
        setVideoQuality(tmp)
    };

    const handleCancelClick = () => {
        setView(false)
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
                            checked={tmp === "720p"}
                            onChange={() => handleVideoQualityChange("720p")}
                        />
                        <label htmlFor="720p">720p</label>
                    </div>
                    <div className="checkbox-option">
                        <input
                            type="checkbox"
                            id="480p"
                            checked={tmp === "480p"}
                            onChange={() => handleVideoQualityChange("480p")}
                        />
                        <label htmlFor="480p">480p</label>
                    </div>
                    <div className="checkbox-option">
                        <input
                            type="checkbox"
                            id="360p"
                            checked={tmp === "360p"}
                            onChange={() => handleVideoQualityChange("360p")}
                        />
                        <label htmlFor="360p">360p</label>
                    </div>
                    <div className="checkbox-option">
                        <input
                            type="checkbox"
                            id="240p"
                            checked={tmp === "240p"}
                            onChange={() => handleVideoQualityChange("240p")}
                        />
                        <label htmlFor="240p">240p</label>
                    </div>
                    <div className="checkbox-option">
                        <input
                            type="checkbox"
                            id="144p"
                            checked={tmp === "144p"}
                            onChange={() => handleVideoQualityChange("144p")}
                        />
                        <label htmlFor="144p">144p</label>
                    </div>
                </div>
                <div className="settings-buttons">
                    <button
                        style={{backgroundColor: "#BFACE2"}}
                        onClick={handleConfirmClick}
                    >
                        Apply
                    </button>
                    <button style={{opacity: "0.75"}} onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
