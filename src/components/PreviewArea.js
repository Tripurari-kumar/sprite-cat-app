import React, { useState, useRef, useEffect } from "react";
import CatSprite from "./CatSprite";
import CloudText from "../components/common/Cloud"; // Import the CloudText component

export default function PreviewArea({
  motionState,
  setMotionState,
  lookState,
  setLookState,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);

  const { x = 0, y = 0 } = motionState?.goto || {};
  const turnDegree = motionState?.turnDegree || 0;

  // Calculate the bounds of the preview area
  const getBounds = () => {
    if (!previewRef.current) return { width: 0, height: 0 };

    const { width, height } = previewRef.current.getBoundingClientRect();
    return { width, height };
  };

  const clampPosition = (x, y) => {
    const { width, height } = getBounds();
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const maxX = halfWidth;
    const minX = -halfWidth;
    const maxY = halfHeight;
    const minY = -halfHeight;

    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY)),
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - x, y: e.clientY - y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const { x: clampedX, y: clampedY } = clampPosition(newX, newY);

    setMotionState((prev) => ({
      ...prev,
      goto: {
        x: clampedX,
        y: clampedY,
      },
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Ensure the position is updated when the size of the PreviewArea changes
    const handleResize = () =>
      setMotionState((prev) => ({
        ...prev,
        goto: clampPosition(prev.goto.x, prev.goto.y),
      }));

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMotionState]);

  console.log("currentTextAction", lookState?.currentTextAction);

  useEffect(() => {
    if (
      lookState.currentTextAction === "sayDurationMsg" ||
      lookState.currentTextAction === "thinkDurationMsg"
    ) {
      const duration = lookState[lookState?.currentTextAction]?.duration || 0;

      if (duration > 0) {
        const timer = setTimeout(() => {
          setLookState((prev) => ({
            ...prev,
            currentTextAction: "",
          }));
        }, duration * 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [lookState, lookState?.currentTextAction, setLookState]);

  return (
    <div
      ref={previewRef}
      className="relative flex items-center justify-center h-full w-full overflow-hidden p-2"
      style={{ background: "#f0f0f0" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Cloud component positioned above the cat */}
      <div
        className="absolute"
        style={{
          transform: `translate(${x}px, ${y - 80}px)`, // Adjust Y to position the cloud above the cat
          transition: isDragging ? "none" : "transform 0.2s",
        }}
      >
        {lookState?.currentTextAction &&
          (lookState?.currentTextAction === "sayDurationMsg" ||
          lookState?.currentTextAction === "thinkDurationMsg" ? (
            <CloudText
              text={lookState?.[`${lookState?.currentTextAction}`]?.msg}
              actionType={
                lookState.currentTextAction === "sayDurationMsg"
                  ? "say"
                  : "think"
              }
            />
          ) : (
            <CloudText
              text={lookState?.[`${lookState?.currentTextAction}`]}
              actionType={
                lookState.currentTextAction === "sayMsg" ? "say" : "think"
              }
            />
          ))}
      </div>

      {/* Cat sprite */}
      <div
        className="absolute"
        style={{
          transform: `translate(${x}px, ${y}px) rotate(${turnDegree}deg`,
          transition: isDragging ? "none" : "transform 0.2s",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <CatSprite sizePercentage={lookState.sizePercentage} />
      </div>
    </div>
  );
}
