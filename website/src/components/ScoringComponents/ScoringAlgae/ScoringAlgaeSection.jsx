import React, { useState } from "react";
import ScoringAlgaePlace from "./ScoringAlgaePlace";
import ScoringPickup from "../ScoringPickup";
import { toast } from "react-toastify";

const ScoringAlgaeSection = ({ pickData, placeData }) => {
  const [pickPositionSelected, setPickPositionSelected] = useState("");

  return (
    <div
      className="flex w-full h-full bg-[#3B3B3B] border-8 border-[#1D1E1E] rounded-xl flex-col justify-center items-center">
      <h1 className="text-white text-4xl font-bold py-2">
        Algae
      </h1>
      <div
        className="w-full h-full ~p-1/4 overflow-hidden"
        // style={{ width: "90%", height: "45%", marginBottom: "2dvh" }}
        onClick={() => {
          if (pickPositionSelected == "") {
            toast.warn("Please select a pick position first.");
          }
        }}
      >
        <ScoringAlgaePlace
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeData={placeData}
          pickData={pickData}
        />
      </div>
      <div
        className="w-full h-full p-2" 
        // style={{ width: "90%", height: "25%", marginBottom: "2dvh" }}
      >
        <ScoringPickup
          pickData={pickData}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          place={"Algae"}
        />
      </div>
    </div>
  );
};

export default ScoringAlgaeSection;
