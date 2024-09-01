export const motionConfig = [
  {
    id: "move",
    label: "Move",
    type: "input",
    unit: "steps",
    action: "moveCat",
    value: 10, // Default value
    placeholder: 10,
  },
  {
    id: "turnClockwise",
    label: "Turn Clockwise",
    type: "input",
    unit: "degrees",
    action: "rotateClockwise",
    icon: "↻", // Icon for clockwise rotation
    value: 15, // Default value
    placeholder: 15,
  },
  {
    id: "turnAnticlockwise",
    label: "Turn Anticlockwise",
    type: "input",
    unit: "degrees",
    action: "rotateAnticlockwise",
    icon: "↺", // Icon for anticlockwise rotation
    value: 15, // Default value
    placeholder: 15,
  },
  {
    id: "gotoPosition",
    label: "Go To Position",
    type: "input-group",
    inputs: [
      { name: "goto.x", placeholder: "X Coordinate", unit: "X", value: 0 },
      { name: "goto.y", placeholder: "Y Coordinate", unit: "Y", value: 0 },
    ],
    action: "goToPosition",
  },
  {
    id: "direction",
    label: "Pointing Direction",
    type: "input",
    unit: "degrees",
    action: "setDirection",
    value: 0, // Default value
    placeholder: 0,
  },
  {
    id: "positionType",
    label: "Go To",
    type: "select",
    options: [
      { value: "random", label: "Random Position" },
      { value: "mouse", label: "Mouse Pointer" },
    ],
    action: "setPositionType",
    value: "random", // Default value
  },
];

export const lookConfig = [
  {
    id: "sayDuration",
    action: "say",
    duration: 2,
    actionMessage: "",
    placeholder: "Hello..",
  },
  {
    id: "thinkDuration",
    action: "Think",
    duration: 2,
    actionMessage: "",
    placeholder: "Hmmm..",
  },
  {
    id: "say",
    action: "say",
    actionMessage: "",
    placeholder: "Hello",
  },
  {
    id: "think",
    action: "Think",
    actionMessage: "",
    placeholder: "Hmmm..",
  },
  {
    id: "sizeChangeByPercent",
    action: "Change size by",
    percent: 0,
    placeholder: "100",
  },
  {
    id: "costumeType",
    label: "Switch costume to",
    type: "select",
    options: [
      { value: "costume1", label: "Costume 1" },
      { value: "costume2", label: "Costume 2" },
    ],
    action: "setCostume",
    value: "costume1", // Default value
  },
];

export const replayConfig = [
  {
    id: "replayAllActions",
    label: "Replay All Actions",
  },
  {
    id: "replayNthAction",
    label: "Replay Nth Action",
    type: "input",
    value: 0,
  },
];
