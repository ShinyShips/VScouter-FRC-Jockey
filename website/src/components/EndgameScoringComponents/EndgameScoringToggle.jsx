import React from "react";

const EndgameScoringToggle = ({ question, selected, setSelected }) => {
  return (
    <button
      className="flex w-full h-full justify-center items-center border-8 border-[#1D1E1E] rounded-xl ~px-0/2 py-2 text-white ~text-2xl/5xl font-bold"
      style={{
        backgroundColor: selected ? "#507144" : "#242424",
      }}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      {question}
    </button>
  );
};

export default EndgameScoringToggle;
