import React from "react";
import ScoringAlgaePlaceButton from "./ScoringAlgaePlaceButton";

import NetShotIcon from "../../../assets/AutoScoringImages/NetShotIcon.svg";
import ProcessorIcon from "../../../assets/AutoScoringImages/ProcessorIcon.svg";
import DropMissIcon from "../../../assets/AutoScoringImages/DropMissIcon.svg";

const AutoScoringAlgaePlace = ({
  pickPositionSelected,
  setPickPositionSelected,
  placeData,
  pickData,
}) => {
  const positionIcons = [NetShotIcon, ProcessorIcon, DropMissIcon];
  return (
    <div
      className="flex w-full h-full justify-between items-center gap-1"
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   width: "100%",
      //   height: "100%",
      //   gap: "1dvw",
      // }}
    >
      {["Net", "Processor", "Miss"].map((position, index) => (
        <div className="w-full h-full max-w-[33%]" 
        // style={{ width: "100%", height: "100%", flex: 1 }} 
        key={index} >
          <ScoringAlgaePlaceButton
            position={position}
            icon={positionIcons[index]}
            placeCount={placeData[index].count}
            setPlaceCount={placeData[index].setCount}
            pickPositionSelected={pickPositionSelected}
            setPickPositionSelected={setPickPositionSelected}
            pickData={pickData}
          />
        </div>
      ))}
    </div>
  );
};

export default AutoScoringAlgaePlace;
