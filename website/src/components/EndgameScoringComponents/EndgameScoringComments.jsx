import React from "react";

const EndgameScoringComments = ({ comment, setComment }) => {
  return (
    <textarea
      className="flex w-full h-full border-8 box-border border-[#1D1E1E] rounded-xl bg-[#4A4A4A] text-white text-3xl resize-none ~p-6/8"
      onChange={(e) => setComment(e.target.value)}
      id="comments"
      defaultValue={comment}
      placeholder="Enter Comments Here"
    ></textarea>
  );
};

export default EndgameScoringComments;
