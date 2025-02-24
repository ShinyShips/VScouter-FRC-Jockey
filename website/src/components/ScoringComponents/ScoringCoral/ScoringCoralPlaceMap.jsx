import React, { useEffect } from "react";

import ReefSideView from "../../../assets/AutoScoringImages/ReefSideView.png";
import ScoringCoralPlaceCounter from "./ScoringCoralPlaceCounter";

const AutoScoringCoralMap = ({
  pickPositionSelected,
  setPickPositionSelected,
  placeData,
  pickData,
}) => {
  
  return (
    <div className="flex w-full h-full justify-center items-center ~p-2/16">
      <div className="relative w-full h-full">
        <div className="absolute w-full h-4/5 z-10 text-white text-2xl flex flex-col justify-center items-center">
          {[4, 3, 2, 1].map((item, index) => (
            <div 
              key={index}
              className="w-full h-1/4"
            >
              <ScoringCoralPlaceCounter
                position={`L${item}`}
                placeCount={placeData[index].count}
                setPlaceCount={placeData[index].setCount}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                pickData={pickData}
              />
            </div>
          ))}
        </div>

        <div className="relative w-full h-full flex flex-col justify-center items-center">
          <img src={ReefSideView} className="w-3/4 h-4/5"/>
          <div className="w-full h-1/5">
            <ScoringCoralPlaceCounter
              position={"Drop/Miss"}
              placeCount={placeData[placeData.length - 1].count}
              setPlaceCount={placeData[placeData.length - 1].setCount}
              pickPositionSelected={pickPositionSelected}
              setPickPositionSelected={setPickPositionSelected}
              pickData={pickData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScoringCoralMap;
