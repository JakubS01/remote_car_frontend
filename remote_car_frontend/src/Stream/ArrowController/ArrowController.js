import React, { useEffect, useState } from "react";
import "./ArrowController.css";

const ArrowController = ({
  onUpClick,
  onDownClick,
  onLeftClick,
  onRightClick
}) => {
  const [intervalId, setIntervalId] = useState(null);

  const handleKeyPress = (e) => {
    switch (e.code) {
      case "ArrowUp":
        startAction(onUpClick);
        break;
      case "ArrowDown":
        startAction(onDownClick);
        break;
      case "ArrowLeft":
        startAction(onLeftClick);
        break;
      case "ArrowRight":
        startAction(onRightClick);
        break;
      default:
        break;
    }
  };

  const startAction = (action) => {
    action();
    clearInterval(intervalId);
    const id = setInterval(action, 100);
    setIntervalId(id);
  };

  const stopAction = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", stopAction);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", stopAction);
    };
  }, [intervalId]);

  const handleMousePress = (action) => {
    action();
    clearInterval(intervalId);
    const id = setInterval(action, 100);
    setIntervalId(id);
  };

  const handleMouseRelease = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div className="arrow-controller-container">
      <button
        className="arrow up"
        onMouseDown={() => handleMousePress(onUpClick)}
        onMouseUp={handleMouseRelease}
        onTouchStart={() => handleMousePress(onUpClick)}
        onTouchEnd={handleMouseRelease}
      >
        &uarr;
      </button>
      <div className="arrow-row">
        <button
          className="arrow left"
          onMouseDown={() => handleMousePress(onLeftClick)}
          onMouseUp={handleMouseRelease}
          onTouchStart={() => handleMousePress(onLeftClick)}
          onTouchEnd={handleMouseRelease}
        >
          &larr;
        </button>
        <button
          className="arrow down"
          onMouseDown={() => handleMousePress(onDownClick)}
          onMouseUp={handleMouseRelease}
          onTouchStart={() => handleMousePress(onDownClick)}
          onTouchEnd={handleMouseRelease}
        >
          &darr;
        </button>
        <button
          className="arrow right"
          onMouseDown={() => handleMousePress(onRightClick)}
          onMouseUp={handleMouseRelease}
          onTouchStart={() => handleMousePress(onRightClick)}
          onTouchEnd={handleMouseRelease}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default ArrowController;
