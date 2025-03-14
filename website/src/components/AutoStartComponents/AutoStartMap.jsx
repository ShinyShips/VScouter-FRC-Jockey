import React, { useState } from "react";

import fieldMap from "../../assets/FieldMap.png";
import fieldMapBlue from "../../assets/FieldMapBlue.png";

import AutoStartNumberSection from "./AutoStartNumberSection";

/**
 * Renders a map for where the robot starts.
 * The map can be flipped between blue and red alliances, and it includes a flip button to rotate based on perspective.
 *
 * @param {number} buttonCoordX - x-coordinate of the flip button
 * @param {number} buttonCoordY - y-coordinate of the flip button
 * @param {string} alliance - alliance of the map (either "blue" or "red")
 * @return {JSX.Element} The rendered component.
 */
const AutoStartMap = ({ startPoses, setStartPoses, alliance }) => {
  return (
    <div className="relative h-full w-full">
      {/* Render the map for the robot to start */}
      <img
        src={alliance == "redAlliance" ? fieldMap : fieldMapBlue}
        className="h-auto w-full max-h-96 lg:max-h-full"
      />
      <div className="absolute flex left-0 top-0 h-48 w-full lg:h-96">
        {[0, 1, 2, 3, 4,].map((value, index) => {
            return (
              <div
                className="w-full" 
                key={index}>
                <AutoStartNumberSection
                  number={index}
                  startPoses={startPoses}
                  setStartPoses={setStartPoses}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AutoStartMap;
