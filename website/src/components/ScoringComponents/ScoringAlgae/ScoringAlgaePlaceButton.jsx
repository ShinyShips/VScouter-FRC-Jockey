import React from "react";

const ScoringAlgaePlaceButton = ({
  position,
  icon,
  placeCount,
  setPlaceCount,
  pickPositionSelected,
  setPickPositionSelected,
  pickData,
}) => {
  return (
    <button
      className="flex flex-col w-full h-full justify-center items-center border-8 bg-[#242424] border-[#1D1E1E] rounded-xl lg:p-2"
      onClick={() => {
        if (pickPositionSelected != "") {
          (pickPositionSelected);
          setPlaceCount(placeCount + 1);
          pickData.find((singlePickData) => {
            if (singlePickData.position == pickPositionSelected) {
              singlePickData.setCount(singlePickData.count + 1);
            }
          });
          setPickPositionSelected("");
        }
      }}
      id={position+"AlgaePlace"}
    >
      <h1
        className="text-white ~text-xs/3xl font-bold">
        {position}
      </h1>

      <div
        className="flex w-full h-full justify-center items-center gap-4"
        // style={{
        //   width: "95%",
        //   height: "75%",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   gap: "1.5dvw",
        // }}
      >
        {/* <img
          src={icon}
          className="object-contain h-12 filter invert"
          // style={{
          //   width: "auto",
          //   height: "70%",
          //   filter: "invert(1)",
          // }}
        /> */}
        <h1
          className="text-white ~text-2xl/6xl font-bold" 
        // style={{ color: "white", fontSize: "6.75dvh", fontWeight: "bold" }}
        >
          {placeCount}
        </h1>
      </div>
    </button>
  );
};

export default ScoringAlgaePlaceButton;
