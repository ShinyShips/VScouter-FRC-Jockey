import React from "react";

const ScoringCoralPlaceCounter = ({
  position,
  placeCount,
  setPlaceCount,
  pickPositionSelected,
  setPickPositionSelected,
  pickData,
}) => {
  return (
    <button
      className="w-full h-full"
      onClick={() => {
        if (pickPositionSelected != "") {
          setPlaceCount(placeCount + 1);
          pickData.find((singlePickData) => {
            if (singlePickData.position == pickPositionSelected) {
              singlePickData.setCount(singlePickData.count + 1);
            }
          });
          setPickPositionSelected("");
        }
      }}
    >
      <span
        className="w-full h-full flex justify-between items-center border-[#1D1E1E] border-4 rounded-xl"
        style={{
          backgroundColor: "rgb(133, 133, 133, .50)",
        }}
        id={position + "CoralPlace"}
      >
        <h1 className="text-white ~text-2xl/6xl font-bold pl-4">
          {position}
        </h1>
        <h1 className="text-white ~text-2xl/6xl font-bold pr-4">
          {placeCount}
        </h1>
      </span>
    </button>
  );
};

export default ScoringCoralPlaceCounter;
