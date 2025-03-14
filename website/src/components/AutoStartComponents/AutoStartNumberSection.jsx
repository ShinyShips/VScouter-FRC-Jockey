import React, { useEffect } from "react";

/**
 * Renders a number section for the Auto Start Map.
 *
 * @param {string} number - The number to be displayed.
 * @param {number} coordX - The x-coordinate of the section.
 * @param {number} coordY - The y-coordinate of the section.
 * @param {number} width - The width of the section.
 * @param {number} height - The height of the section.
 * @param {boolean} rotated - Whether the section should be rotated.
 * @return {JSX.Element} The rendered component.
 */
const AutoStartNumberSection = ({ number, startPoses, setStartPoses }) => {
  const updateStartPoses = () => {
    if (!startPoses[number]) {
      setStartPoses.map((setStartPos) => setStartPos(false));
      setStartPoses[number](true);
      return;
    }
    setStartPoses[number](!startPoses[number]);
  };

  useEffect(() => {
    document.addEventListener("keyup", function onEvent(event) {
      if (event.key === String(number + 1)) {
        updateStartPoses();
      }
    });
  }, []);

  return (
    <>
      <div
        className="h-full w-full border-4 border-[#5A5A5A] flex justify-center items-center"
        style={{
          backgroundColor: startPoses[number]
            ? `rgba(247, 185, 0, 0.5)`
            : `rgba(217, 217, 217, 0.5)`,
        }}
        onClick={() => {
          updateStartPoses();
        }}
      >
        <p className="text-4xl font-bold text-white">{number}</p>
      </div>
    </>
  );
};

export default AutoStartNumberSection;
