import React, { useEffect, useState } from "react";

/**
 * Renders a component for selecting an alliance.
 *
 * @param {number} props.coordX - The x-coordinate of the component.
 * @param {number} props.coordY - The y-coordinate of the component.
 * @param {string} props.currentAlliance - The current alliance.
 * @param {function} props.setAlliance - The function to set the alliance.
 * @return {JSX.Element} The rendered component.
 */
const InitialSelectAlliance = ({ currentAlliance, setAlliance }) => {
  const [redSelected, setRedSelected] = useState(currentAlliance === "redAlliance");
  const [blueSelected, setBlueSelected] = useState(currentAlliance === "blueAlliance");

  /**
   * Click handler for the alliance selection.
   * @param {string} alliance - The alliance to select.
   */
  const clickAlliance = (alliance) => {
    if (alliance === "red") {
      setRedSelected(!redSelected);
      setBlueSelected(false);
    } else if (alliance === "blue") {
      setBlueSelected(!blueSelected);
      setRedSelected(false);
    }
  };

  /**
   * Updates the alliance state based on the selected value.
   */
  useEffect(() => {
    if (redSelected && !blueSelected) {
      setAlliance("redAlliance");
    } else if (!redSelected && blueSelected) {
      setAlliance("blueAlliance");
    } else {
      setAlliance(null);
    }
  }, [redSelected, blueSelected]);

  return (
    <>
      {/* Container */}
      <div
        className="w-full h-full border-8 border-[#1D1E1E] bg-[#242424] rounded-2xl flex flex-col items-start justify-center px-3 pb-2 break-words"
      >
        {/* Text */}
        <h1
          className="text-white text-2xl font-bold pb-2 items-start"
        >
          Select Alliance
        </h1>

        {/* Selectors */}
        <div
          className="flex justify-between w-full gap-2">
          {/* Red */}
          <div
            className="bg-[#C80000] rounded-xl h-20 flex-grow"
            style={{
              boxShadow: `0px 0px 0px ${redSelected ? "1rem #F7B900" : " 0.5rem #1D1E1E"} inset`,
            }}
            onClick={() => clickAlliance("red")}
          ></div>
          {/* Blue */}
          <div
            className="bg-[#00008B] rounded-xl h-20 flex-grow"
            style={{
              boxShadow: `0px 0px 0px ${blueSelected ? "1rem #F7B900" : "0.5rem #1D1E1E"} inset`,
            }}
            onClick={() => clickAlliance("blue")}
          ></div>
        </div>
      </div>
    </>
  );
};

export default InitialSelectAlliance;
