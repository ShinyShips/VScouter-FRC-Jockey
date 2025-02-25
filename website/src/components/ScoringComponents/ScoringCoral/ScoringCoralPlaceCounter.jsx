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
        className="w-full h-full flex justify-between items-center border-[#1D1E1E] border-4 rounded-xl text-white ~text-2xl/6xl font-bold px-4"
        style={{
          backgroundColor: "rgb(133, 133, 133, .50)",
        }}
        id={position + "CoralPlace"}
      >
        <span>
          {position}
        </span>
        <span>
          {placeCount}
        </span>
      </span>
    </button>
  );
};

export default ScoringCoralPlaceCounter;
