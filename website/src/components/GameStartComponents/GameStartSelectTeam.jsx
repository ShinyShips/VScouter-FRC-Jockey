import React, { useEffect, useState } from "react";

import SelectTeamButton from "./GameStartSelectTeamButton";

/**
 * Renders a component for selecting a team.
 *
 * @param {number} coordX - The X coordinate of the component.
 * @param {number} coordY - The Y coordinate of the component.
 * @param {string} defaultSelectTeam - The default selected team.
 * @param {Function} setSelectTeam - The function to set the selected team.
 * @return {JSX.Element} The rendered component.
 */
const InitialSelectTeam = ({
  defaultSelectTeam,
  setSelectTeam,
  selectedMatch,
  selectedAlliance,
}) => {
  let baseTeams = [];
  try {
    baseTeams =
      selectedMatch > JSON.parse(localStorage.getItem("matchData")).length ||
      selectedMatch < 1
        ? JSON.parse(localStorage.getItem("matchData"))[0]
        : JSON.parse(localStorage.getItem("matchData"))[selectedMatch - 1 || 0];
    baseTeams = baseTeams[selectedAlliance ? selectedAlliance : "redAlliance"];
  } catch {
    baseTeams = ["0001", "0002", "0003"];
  }

  // States for the team selection
  const [team1Status, setTeam1Status] = useState(
    defaultSelectTeam === baseTeams[0]
  );
  const [team2Status, setTeam2Status] = useState(
    defaultSelectTeam === baseTeams[1]
  );
  const [team3Status, setTeam3Status] = useState(
    defaultSelectTeam === baseTeams[2]
  );
  const [customTeamStatus, setCustomTeamStatus] = useState(
    defaultSelectTeam != baseTeams[0] &&
      defaultSelectTeam != baseTeams[1] &&
      defaultSelectTeam != baseTeams[2] &&
      defaultSelectTeam != null
  );

  // State for the custom team value
  const [customTeamValue, setCustomTeamValue] = useState(
    defaultSelectTeam != baseTeams[0] &&
      defaultSelectTeam != baseTeams[1] &&
      defaultSelectTeam != baseTeams[2] &&
      defaultSelectTeam != null
      ? defaultSelectTeam
      : ""
  );

  // Function to handle team selection
  const clickTeam = (currentTeamType, currentTeamStatus) => {
    if (currentTeamType === "1") {
      setTeam1Status(!currentTeamStatus);

      setTeam2Status(false);
      setTeam3Status(false);
      setCustomTeamStatus(false);
    } else if (currentTeamType === "2") {
      setTeam2Status(!currentTeamStatus);

      setTeam1Status(false);
      setTeam3Status(false);
      setCustomTeamStatus(false);
    } else if (currentTeamType === "3") {
      setTeam3Status(!currentTeamStatus);

      setTeam1Status(false);
      setTeam2Status(false);
      setCustomTeamStatus(false);
    } else if (currentTeamType === "custom") {
      setCustomTeamStatus(true);

      setTeam1Status(false);
      setTeam2Status(false);
      setTeam3Status(false);
    }
  };

  // Effect to set the selected team
  useEffect(() => {
    if (team1Status) {
      setSelectTeam(baseTeams[0]);
    } else if (team2Status) {
      setSelectTeam(baseTeams[1]);
    } else if (team3Status) {
      setSelectTeam(baseTeams[2]);
    } else if (customTeamStatus && customTeamValue != "") {
      setSelectTeam(customTeamValue);
    } else {
      setSelectTeam(null);
    }
  }, [
    team1Status,
    team2Status,
    team3Status,
    customTeamStatus,
    customTeamValue,
  ]);

  const [textSelected, setTextSelected] = useState(false);

  return (
    <>
      {/* Container */}
      <div
      className="w-full h-full border-8 border-[#1D1E1E] bg-[#242424] rounded-xl">
        {/* when the text is selected on mobile, when clicking off of typing user doesn't accidentally click on something else */}
        {textSelected &&
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) && (
            <div className="absolute left-0 top-0 w-full h-full z-1"></div>
          )}

        <div className="w-full h-full px-2"> 
          {/* Question */}
          <h1 className="text-white text-2xl font-bold pb-2">
            Select Team
          </h1>
          {/* Selectors */}
          <div className="flex flex-col w-full h-full gap-2">
            <div className="flex-grow">
              <SelectTeamButton
                currentTeamType={"1"}
                currentTeamStatus={team1Status}
                clickTeam={clickTeam}
                teamName={baseTeams[0]}
              />
            </div>
            <div className="flex-grow">
              <SelectTeamButton
                currentTeamType={"2"}
                currentTeamStatus={team2Status}
                clickTeam={clickTeam}
                teamName={baseTeams[1]}
              />
            </div>
            <div className="flex-grow">
              <SelectTeamButton
                currentTeamType={"3"}
                currentTeamStatus={team3Status}
                clickTeam={clickTeam}
                teamName={baseTeams[2]}
              />
            </div>
          </div>

          {/* Custom Team Selector */}
          <div className="flex justify-between pt-3 z-[2] items-center">
            <h1 className="text-white text-xl flex-grow mr-2">
              Custom:
            </h1>
            <input
              className="border-2 border-[#1D1E1E] text-white w-full h-full text-xl rounded-lg pl-2"
              type="text"
              placeholder="Team #"
              style={{
                backgroundColor: `#${customTeamStatus ? "393939" : "6C6C6C"}`,
              }}
              value={customTeamValue}
              onChange={(e) => setCustomTeamValue(e.target.value)}
              onFocus={() => {
                clickTeam("custom", customTeamStatus);
                setTextSelected(true);
              }}
              onBlur={() => setTextSelected(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialSelectTeam;
