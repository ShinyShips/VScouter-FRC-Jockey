import React from "react";

/**
 * Renders a component for a team selection button.
 *
 * @param {string} currentTeamType - The type of the current team.
 * @param {boolean} currentTeamStatus - The status of the current team.
 * @param {function} clickTeam - A callback function to handle team selection.
 * @param {string} teamName - The name of the team.
 * @return {JSX.Element} The rendered component.
 */
const InitialSelectTeamButton = ({
  currentTeamType,
  currentTeamStatus,
  clickTeam,
  teamName = "0000 - Team Name",
}) => {
  return (
    <>
      <div
        className="border border-[#1D1E1E] rounded-lg bg-[#393939] text-white w-full h-full flex flex-row items-center"
        style={{
          backgroundColor: `#${currentTeamStatus ? "393939" : "6C6C6C"}`,
        }}
        onClick={() => clickTeam(currentTeamType, currentTeamStatus)}
      >
        <h1 className="text-xl pl-2">
          {teamName}
        </h1>
      </div>
    </>
  );
};

export default InitialSelectTeamButton;
