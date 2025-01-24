import React, { useEffect } from "react";

const ScoringPickupButton = ({
  position,
  pickPositionSelected,
  setPickPositionSelected,
  place
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor:
          pickPositionSelected == position ? "#507144" : "#242424",
        border: "1.63dvh solid #1D1E1E",
        borderRadius: "2dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        if (pickPositionSelected == position) {
          setPickPositionSelected("");
          return;
        }
        setPickPositionSelected(position);
      }}
      id={position+place+"Pick"}
    >
      <h1 style={{ color: "white", fontSize: "3.25dvh", fontWeight: "700" }}>
        {position}
      </h1>
    </div>
  );
};

export default ScoringPickupButton;
