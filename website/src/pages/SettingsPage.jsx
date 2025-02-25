import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProceedBackButton from "../components/ProceedBackButton";
import SettingsMatchDataScanner from "../components/SettingsComponents/SettingsMatchDataScanner";
import SettingsButton from "../components/SettingsComponents/SettingsButton";
import SettingsViewMatchData from "../components/SettingsComponents/SettingsViewMatchData";
import SettingsUpdateButton from "../components/SettingsComponents/SettingsUpdateButton";
import { useNavigate } from "react-router-dom";

/**
 * A page for the user to access settings such as clearing match data, viewing match data, and getting match data.
 *
 * @return {JSX.Element} The rendered component.
 */
const SettingsPage = () => {
  const navigate = useNavigate();
  const [matchDataGetClicked, setMatchDataGetClicked] = useState(false);
  const [matchDataClearClicked, setMatchDataClearClicked] = useState(false);
  const [scoutDataClearClicked, setScoutDataClearClicked] = useState(false);
  const [viewScoutingData, setViewScoutingData] = useState(false);

  useEffect(() => {
    /**
     * If the user has clicked the clear match data button, clear the local storage for match data and notify the user.
     * If the user has clicked the clear scouting data button, clear the local storage for scouting data and notify the user.
     */
    if (matchDataClearClicked) {
      localStorage.setItem("matchData", "");
      setMatchDataClearClicked(false);
      toast.success("Cleared Match Data");
    } else if (scoutDataClearClicked) {
      localStorage.setItem("scoutingData", JSON.stringify({ data: [] }));
      setScoutDataClearClicked(false);
      toast.success("Cleared Scouting Data");
    }
  }, [matchDataClearClicked, scoutDataClearClicked]);

  return (
    <>
      {/* Container for the settings buttons */}
      <div className="flex flex-col h-screen gap-2 p-4">
        <div className="flex w-full h-fit justify-between gap-2">
          {/* If the user has clicked the back button, render the ProceedBackButton component to navigate back to the main page */}
          {matchDataGetClicked || viewScoutingData ? (
            <>
              <button
                className="flex items-center justify-center border-8 border-[#1D1E1E] rounded-xl bg-[#242424] text-white font-bold ~text-2xl/5xl text-center p-2"
                onClick={() => {
                  setMatchDataGetClicked(false);
                  setViewScoutingData(false);
                }}
              >
                Back
              </button>
              <SettingsUpdateButton />
            </>
          ) : (
            <div className="flex w-full h-fit gap-10">
              <ProceedBackButton nextPage={"/"} back={true} />
              {/* Render a button to update service workers */}
              <SettingsUpdateButton />
              <ProceedBackButton
                nextPage={"/parse-data"}
                message={"Parse Data"}
              />
            </div>
          )}
        </div>
        {/* Settings Buttons */}
        {/* If the user has clicked the view matches data button, render the SettingsViewMatchData component */}
        { !viewScoutingData ?
          (
            <div className="flex flex-col w-full h-fit max-h-16 justify-between gap-2 mb-2">
              <button
                className="flex w-full h-full items-center justify-center border-8 border-[#1D1E1E] rounded-xl bg-[#4A4A4A] text-white font-bold ~text-2xl/5xl ~p-2/8"
                onClick={() => navigate("/match-data")} // Toggles the state when the button is clicked
              >
                Get Match Data
              </button>
              <SettingsButton
                question="Clear Match Data"
                state={matchDataClearClicked}
                setState={setMatchDataClearClicked}
              />
              <SettingsButton
                question="Clear Scouting Data"
                state={scoutDataClearClicked}
                setState={setScoutDataClearClicked}
              />

              <SettingsButton
                question="View Matches Data"
                state={viewScoutingData}
                setState={setViewScoutingData}
              />
            </div>
          ) :
          (
            <SettingsViewMatchData />
          )
      }
        
      </div>

      {/* If the user has clicked the get match data button, render the SettingsMatchDataScanner component */}
      {matchDataGetClicked && (
        <SettingsMatchDataScanner
          state={matchDataGetClicked}
          setState={setMatchDataGetClicked}
        />
      )}
    </>
  );
};

export default SettingsPage;
