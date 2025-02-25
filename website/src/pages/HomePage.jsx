import React from "react";

import ProceedBackButton from "../components/ProceedBackButton";
import HomeFullscreenButton from "../components/HomeComponents/HomeFullscreenButton";
import HomeDumpDataButton from "../components/HomeComponents/HomeDumpDataButton";

import VScouterLogo from "../assets/VScouterLogo.png";
import FRCReefscapeLogo from "../assets/FRCReefscapeLogo.svg";

const HomePage = () => {
  return (
    <main className="h-screen w-screen">
      <div className="flex w-full h-full justify-center items-center py-8 px-8 gap-6">
        <div className="flex flex-col w-auto h-full justify-center items-center gap-6">
          <img
            src={VScouterLogo}
            style={{
              width: "auto",
              height: "85%",
              borderRadius: "6dvh",
            }}
          />
          <img
            src={FRCReefscapeLogo}
            style={{
              width: "auto",
              height: "15%",
              filter: "invert(100%)",
            }}
          />
        </div>

        <div className="flex flex-col h-full justify-center gap-2 flex-1">
          <div
            style={{
              width: "100%",
              height: "250%",
            }}
          >
            <ProceedBackButton
              nextPage={`/game-start`}
              message={"Start Scouting"}
            />
          </div>
          <HomeDumpDataButton />
          <ProceedBackButton nextPage={`/settings`} message={"Settings"} />
          <HomeFullscreenButton />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
