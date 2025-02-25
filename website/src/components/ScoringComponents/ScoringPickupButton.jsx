import React, { useEffect } from "react";

const ScoringPickupButton = ({
  position,
  pickPositionSelected,
  setPickPositionSelected,
  place
}) => {
  return (
    <button
      className="flex w-full h-full justify-center items-center border-8 border-[#1D1E1E] rounded-xl ~p-0/3"
      style={{
        backgroundColor:
          pickPositionSelected == position ? "#507144" : "#242424",
      }}
      onClick={() => {
        if (pickPositionSelected == position) {
          setPickPositionSelected("");
          return;
        }
        setPickPositionSelected(position);
      }}
      id={position+place+"Pick"}
    >
      <h1 
        className="text-white ~text-xs/xl ~px-0/2 ~py-1/3 font-bold"
      >
        {position}
      </h1>
    </button>
  );
};

export default ScoringPickupButton;
