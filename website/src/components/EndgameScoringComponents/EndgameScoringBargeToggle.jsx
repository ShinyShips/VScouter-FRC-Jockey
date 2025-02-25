import React, { useEffect, useState } from "react";

const EndgameScoringBargeToggle = ({ position, climbData }) => {
  const toggleData = climbData.find((singleClimbData) => {
    return singleClimbData.position == position;
  });
  return (
    <button
      className="flex w-full h-full justify-center items-center border-8 border-[#1D1E1E] rounded-xl ~px-0/2 py-2 text-white ~text-2xl/6xl font-bold"
      style={{
        backgroundColor: toggleData.selected ? "#507144" : "#242424",
      }}
      onClick={() => {
        climbData.map((singleClimbData) =>
          singleClimbData.setSelected(false)
        );
        toggleData.setSelected(!toggleData.selected);
      }}
    >
      {position}
    </button>
  );
};

export default EndgameScoringBargeToggle;
