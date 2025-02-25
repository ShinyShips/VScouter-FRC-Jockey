import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import SettingsBackButton from "../components/SettingsComponents/SettingsBackButton";

const MatchDataPage = () => {
  const [matchDataURL, setMatchDataURL] = useState(""); // The URL to the match data (can be got from both the QR code or the text box)
  const [useManual, setUseManual] = useState(false); // Indicating if the text box should be used to get the URL

  const navigate = useNavigate();

  useEffect(() => {
    if (useManual) {
      // Getting the URL from the text box if the manual toggle is on
      const input = document.querySelector("input");
      setMatchDataURL(input.value);
    } else {
      setMatchDataURL("");
    }
  }, [useManual]);

  const doneClick = async () => {
    try {
      const res = await fetch(matchDataURL); // Fetching the data from the URL
      const fullData = await res.json();
      const matches = fullData.matches;

      localStorage.setItem("matchData", JSON.stringify(matches)); // Storing the data in local storage so it can be accessed if the website is refreshed

      toast.success(
        "Match Data Fetched: " +
          JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0]
      ); // Notifying the user that the data has been fetched

      navigate("/"); // Navigating back to the home page
    } catch (err) {
      // If anything goes wrong, notify the user
      toast.error("Invalid URL");
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full">
      {/* Back Button */}
      <SettingsBackButton route={"/settings"} />
      
      {/* Container */}
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
        <h1 className="text-white font-bold ~text-2xl/5xl text-center p-2">
            Load Match Data
          </h1>
          <h2 className="text-white font-bold ~text-1xl/4xl text-center p-2">
            Are You Online (Using QR Code) or Offline (Using Match Schedule File)?
          </h2>
        <div className="flex w-full h-full gap-4 px-4">
          <ProceedBackButton nextPage={"/match-data/online"} message={"Online"} />
          
          <ProceedBackButton nextPage={"/match-data/offline"} message={"Offline"} />
        </div>
      </div>
    </div>
  );
};

export default MatchDataPage;
