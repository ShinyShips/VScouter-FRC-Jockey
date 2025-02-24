import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringCoralPlaceMap from "./ScoringCoralPlaceMap";
import ScoringPickup from "../ScoringPickup";
import { toast } from "react-toastify";

const ScoringCoralSection = ({
  pickData,
  placeData,
}) => {
  const [pickPositionSelected, setPickPositionSelected] = useState("");

  return (
    <div
      className="flex w-full h-full bg-[#3B3B3B] border-8 border-[#1D1E1E] rounded-xl flex-col justify-center items-center">
      <div className="flex w-full h-full justify-center items-center">
        <h1 className="text-white text-3xl font-bold pt-2">
          Coral
        </h1>
      </div>
      <div
        className="flex w-full h-full"
        onClick={() => {
          if (pickPositionSelected == "") {
            toast.warn("Please select a pick position first .");
          }
        }}
      >
        <ScoringCoralPlaceMap
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeData={placeData}
          pickData={pickData}
        />
      </div>
      <div className="flex w-full h-full ~px-2/4 pb-4">
        <ScoringPickup
          pickData={pickData}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          place={"Coral"}
        />
      </div>
    </div>
  );
};

export default ScoringCoralSection;