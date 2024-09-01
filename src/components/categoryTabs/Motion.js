import React, { useState, useEffect } from "react";
import { motionConfig } from "../utils";

function Motion({ setMotionState, motionState }) {
  const [localState, setLocalState] = useState({
    toMoveSteps: motionState.toMoveSteps,
    clockWiseTurnDegree: motionState.clockWiseTurnDegree,
    antiClockWiseTurnDegree: motionState.antiClockWiseTurnDegree,
    goto: { ...motionState.goto },
    pointingDirection: motionState.pointingDirection,
    positionType: motionState.positionType,
    turnDegree: motionState.turnDegree,
  });

  console.log("motionState", motionState, localState);

  useEffect(() => {
    setLocalState((prev) => ({
      ...prev,
      goto: { ...motionState.goto },
    }));
  }, [motionState.goto]);

  const moveCat = (deltaX, deltaY) => {
    setMotionState((prev) => ({
      ...prev,
      toMoveSteps: localState.toMoveSteps,
      goto: {
        x: prev.goto.x + deltaX,
        y: prev.goto.y + deltaY,
      },
    }));
  };

  const handleLabelClick = (id) => {
    setMotionState((prevState) => {
      let updatedState = { ...prevState };
      // console.log(localState.toMoveSteps);
      switch (id) {
        case "move":
          const deltaSteps = localState.toMoveSteps;
          const radians = (prevState.pointingDirection * Math.PI) / 180;
          const deltaX = deltaSteps * Math.cos(radians);
          const deltaY = deltaSteps * Math.sin(radians);

          moveCat(deltaX, deltaY);
          break;

        case "turnClockwise":
          updatedState = {
            ...updatedState,
            turnDegree:
              (updatedState.turnDegree || 0) + localState.clockWiseTurnDegree,
          };
          break;

        case "turnAnticlockwise":
          updatedState = {
            ...updatedState,
            turnDegree:
              (updatedState.turnDegree || 0) -
              localState.antiClockWiseTurnDegree,
          };
          break;

        case "gotoPosition":
          updatedState.goto = { ...localState.goto };
          break;

        case "direction":
          updatedState = {
            ...updatedState,
            pointingDirection: localState.pointingDirection,
            turnDegree: localState.pointingDirection,
          };
          break;

        case "positionType":
          const randomX = Math.floor(Math.random() * 201) - 100; // random number between -100 and 100
          const randomY = Math.floor(Math.random() * 201) - 100; // random number between -100 and 100
          updatedState = {
            ...updatedState,
            positionType: localState.positionType,
            goto: { x: randomX, y: randomY },
          };
          break;

        default:
          break;
      }
      return updatedState;
    });
  };

  const handleInputChange = (id, newValue) => {
    setLocalState((prevState) => {
      const updatedState = { ...prevState };

      if (id === "gotoPosition") {
        updatedState.goto = {
          ...prevState.goto,
          [newValue.name]: newValue.value,
        };
      } else {
        switch (id) {
          case "move":
            updatedState.toMoveSteps = newValue;
            break;
          case "turnClockwise":
            updatedState.clockWiseTurnDegree = newValue;
            break;
          case "turnAnticlockwise":
            updatedState.antiClockWiseTurnDegree = newValue;
            break;
          case "direction":
            updatedState.pointingDirection = newValue;
            break;
          case "positionType":
            updatedState.positionType = newValue;
            break;
          default:
            break;
        }
      }
      return updatedState;
    });
  };

  const renderInput = (config) => (
    <div
      key={config.id}
      className="flex items-center bg-blue-50 p-2 rounded-lg"
    >
      <button
        onClick={() => handleLabelClick(config.id)}
        className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
      >
        {config.label}{" "}
        {config.icon && <span className="text-lg">{config.icon}</span>}
      </button>
      <input
        type="number"
        value={localState[config.id]}
        placeholder={config.placeholder}
        onChange={(e) => handleInputChange(config.id, +e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-14 text-xs"
      />
      <span className="ml-2 text-sm text-gray-500">{config.unit}</span>
    </div>
  );

  const renderInputGroup = (config) => (
    <div key={config.id} className="flex bg-blue-50 p-4 rounded-lg ml-[10px]">
      <button
        onClick={() => handleLabelClick(config.id)}
        className="font-semibold mb-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all mr-2"
      >
        {config.label}
      </button>
      <div className="flex space-x-4">
        {config.inputs.map((input) => (
          <div key={input.name} className="flex items-center">
            <input
              type="number"
              placeholder={config.placeholder}
              value={localState.goto[input.name.split(".")[1]]}
              onChange={(e) =>
                handleInputChange(config.id, {
                  name: input.name.split(".")[1],
                  value: +e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-lg w-24 text-xs"
            />
            <span className="ml-2 text-xs text-gray-500">{input.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelect = (config) => (
    <div
      key={config.id}
      className="flex items-center bg-blue-50 p-2 rounded-lg"
    >
      <button
        onClick={() => handleLabelClick(config.id)}
        className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
      >
        {config.label}
      </button>
      <select
        value={localState[config.id]}
        onChange={(e) => handleInputChange(config.id, e.target.value)}
        className="p-2 border border-gray-300 rounded-lg min-w-0"
      >
        {config.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="absolute top-4 left-4 bg-blue-50 p-6 rounded-lg shadow-lg space-y-4 w-full">
      {motionConfig.map((config) => {
        if (config.type === "input") {
          return renderInput(config);
        }
        if (config.type === "input-group") {
          return renderInputGroup(config);
        }
        if (config.type === "select") {
          return renderSelect(config);
        }
        return null;
      })}
    </div>
  );
}

export default Motion;
