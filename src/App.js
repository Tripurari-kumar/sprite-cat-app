import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [motionState, setMotionState] = useState({
    toMoveSteps: 0,
    antiClockWiseTurnDegree: 0,
    clockWiseTurnDegree: 0,
    turnDegree: 0,
    goto: { x: 0, y: 0 },
    pointingDirection: 0, // Initial direction in degrees
  });
  const [lookState, setLookState] = useState({
    sayDurationMsg: {
      msg: "",
      duration: 2,
    },
    sayMsg: "",
    thinkMsg: "",
    thinkDurationMsg: {
      msg: "",
      duration: 2,
    },
    costume: "costume1",
    sizePercentage: 100,
    currentTextAction: "",
  });

  const [selectedTab, setSelectedTab] = useState("Motion");

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />{" "}
          <MidArea
            motionState={motionState}
            setMotionState={setMotionState}
            selectedTab={selectedTab}
            lookState={lookState}
            setLookState={setLookState}
          />
        </div>

        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            setMotionState={setMotionState}
            motionState={motionState}
            lookState={lookState}
            setLookState={setLookState}
          />
        </div>
      </div>
    </div>
  );
}
