import React, {useEffect, useState} from "react";
import "./ArrowController.css";

const ArrowController = ({
                             onUpClick,
                             onDownClick,
                             onLeftClick,
                             onRightClick,
                             onUpDownRelease,
                             onLeftRightRelease
                         }) => {

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
    };

    const stopAction = (e) => {
        switch (e.code) {
            case "ArrowUp":
                startAction(onUpDownRelease);
                break;
            case "ArrowDown":
                startAction(onUpDownRelease);
                break;
            case "ArrowLeft":
                startAction(onLeftRightRelease);
                break;
            case "ArrowRight":
                startAction(onLeftRightRelease);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', stopAction);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', stopAction);

        };
    }, [])

    return (
        <div className="arrow-controller-container">
            <button
                className="arrow up"
                onMouseDown={() => onUpClick()}
                onMouseUp={() => onUpDownRelease()}
                onTouchStart={() => onUpClick()}
                onTouchEnd={() => onUpDownRelease()}
            >
                &uarr;
            </button>
            <div className="arrow-row">
                <button
                    className="arrow left"
                    onMouseDown={() => onLeftClick()}
                    onMouseUp={() => onLeftRightRelease()}
                    onTouchStart={() => onLeftClick()}
                    onTouchEnd={() => onLeftRightRelease()}
                >
                    &larr;
                </button>
                <button
                    className="arrow down"
                    onMouseDown={() => onDownClick()}
                    onMouseUp={() => onUpDownRelease()}
                    onTouchStart={() => onDownClick()}
                    onTouchEnd={() => onUpDownRelease()}
                >
                    &darr;
                </button>
                <button
                    className="arrow right"
                    onMouseDown={() => onRightClick()}
                    onMouseUp={() => onLeftRightRelease()}
                    onTouchStart={() => onRightClick()}
                    onTouchEnd={() => onLeftRightRelease()}
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default ArrowController;
