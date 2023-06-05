import React, { useEffect } from "react";
import "./ArrowController.css";

const ArrowController = ({
  onUpClick,
  onDownClick,
  onLeftClick,
  onRightClick
}) => {
  const handleKeyPress = (e) => {
    switch (e.code) {
      case "ArrowUp":
        onUpClick();
        break;
      case "ArrowDown":
        onDownClick();
        break;
      case "ArrowLeft":
        onLeftClick();
        break;
      case "ArrowRight":
        onRightClick();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className="arrow-controller-container">
      <button className="arrow up" onClick={onUpClick}>
        &uarr;
      </button>
      <div className="arrow-row">
        <button className="arrow left" onClick={onLeftClick}>
          &larr;
        </button>
        <button className="arrow down" onClick={onDownClick}>
          &darr;
        </button>
        <button className="arrow right" onClick={onRightClick}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default ArrowController;
