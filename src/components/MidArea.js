import React from "react";
import Motion from "./categoryTabs/motion";
import Looks from "./categoryTabs/looks";

export default function MidArea({
  setMotionState,
  motionState,
  selectedTab,
  lookState,
  setLookState,
}) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4 bg-gray-100">
      {selectedTab === "Motion" && (
        <Motion setMotionState={setMotionState} motionState={motionState} />
      )}
      {selectedTab === "Looks" && (
        <Looks lookState={lookState} setLookState={setLookState} />
      )}
    </div>
  );
}
