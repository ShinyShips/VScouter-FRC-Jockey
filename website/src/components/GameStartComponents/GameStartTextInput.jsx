import React, { useEffect, useState } from "react";

/**
 * A component that renders a text input with a given question and a button that saves the input to a given state.
 *
 * @param {string} question - The question to be displayed above the text input.
 * @param {number} coordX - The x-coordinate of the text input.
 * @param {number} coordY - The y-coordinate of the text input.
 * @param {string} defaultText - The default text of the text input.
 * @param {function} setTextValue - The function to set the text input value to.
 */
const TextInput = ({
  question = "-",
  defaultText = null,
  setTextValue = () => {},
  numberOnly = false
}) => {
  const [upperText, setUpperText] = useState(
    // If the defaultText is null, set the state to an empty string, otherwise set it to the defaultText in uppercase
    defaultText === null ? "" : defaultText.toUpperCase()
  );

  const [textSelected, setTextSelected] = useState(false);

  useEffect(() => {
    // If the upperText is not empty, set the textValue to the upperText, otherwise set it to null
    if (upperText != "") {
      setTextValue(upperText);
    } else {
      setTextValue(null);
    }
  }, [upperText]);

  return (
    <div className="h-full w-full">
      {/* when the text is selected on mobile, when clicking off of typing user doesn't accidentally click on something else */}
      {textSelected &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) && (
          <div className="absolute left-0 top-0 w-full h-full z-1"></div>
        )}
      <div className="h-full w-full">
        <div className=" border-8 border-[#1D1E1E] w-full h-full bg-[#242424] rounded-2xl flex flex-col px-3">
          <h1 className="text-white text-2xl font-bold pb-2 items-start">
            {question}
          </h1>
          <input
            className="border-2 border-[#1D1E1E] bg-[#4A4A4A] text-white w-full h-12 text-2xl rounded-lg pl-2"
            type={numberOnly ? "number" : "text"}
            value={upperText}
            onChange={(e) => setUpperText(e.target.value.toUpperCase())}
            inputMode="search"
            onFocus={() => setTextSelected(true)}
            onBlur={() => setTextSelected(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextInput;
