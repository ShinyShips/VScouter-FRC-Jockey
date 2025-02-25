import React from "react";
import EndgameScoringBargeToggle from "./EndgameScoringBargeToggle";

const EndgameScoringBargeSection = ({ climbData }) => {
  return (
    <section className="flex w-full h-full bg-[#3B3B3B] border-8 border-[#1D1E1E] rounded-xl justify-center items-center px-5 py-3 gap-2">
      {climbData.map((singleClimbData) => (
        <div id={climbData.position} className="h-full flex-1">
          <EndgameScoringBargeToggle
            position={singleClimbData.position}
            climbData={climbData}
          />
        </div>
      ))}
    </section>
  );
};

export default EndgameScoringBargeSection;
