import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

/**
 * A button component that navigates to the next page in the app.
 *
 * By default, it will navigate to the root page of the app.
 * If the "back" prop is set to true, it will navigate to the previous page.
 * If the "nextPage" prop is set, it will navigate to that page instead.
 * If the "inputs" prop is set, it will pass those inputs as props to the next page.
 * If the "coordX" and "coordY" props are set, the button will be positioned at those coordinates.
 * If the "width" and "height" props are set, the button will have those dimensions.
 * If the "message" prop is set, the button will display that message.
 *
 * @param {bool} back - Whether to navigate to the previous page or not.
 * @param {string} nextPage - The page to navigate to.
 * @param {object} inputs - The inputs to pass to the next page.
 * @param {number} coordX - The x-coordinate to position the button at.
 * @param {number} coordY - The y-coordinate to position the button at.
 * @param {number} width - The width of the button.
 * @param {number} height - The height of the button.
 * @param {string} message - The message to display on the button.
 */
const ProceedBackButton = ({
  back = false,
  nextPage = "/",
  inputs = {},
  message = null,
  blink = false,
  stateStack,
  mode,
}) => {

  const saveStateToLocalStorage = (newStateStack, stateName) => {
    localStorage.setItem(stateName, JSON.stringify(newStateStack));
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [turnBoxRed, setTurnBoxRed] = useState(false);
  useEffect(() => {
    if (blink) {
      setTimeout(() => {
        setTurnBoxRed(!turnBoxRed);
      }, 600);
    }
  }, [blink, turnBoxRed]);

  /** Handler for the button being clicked */
  const proceedClick = () => {
    if (back) {
      // If the back prop is set to true, pass the inputs as props to the previous page
      inputs = Object.fromEntries(
        Object.entries(inputs).filter(([key, value]) => value !== null)
      );
      inputs.back = 2
      console.log(inputs);
      if(stateStack){
        if(mode == "auto"){
          saveStateToLocalStorage(stateStack, "autoStateStack")
        }
        if(mode == "teleop"){
          saveStateToLocalStorage(stateStack, "teleopStateStack")
        }
      }
      navigate(nextPage, { state: { inputs } });
    } else {
      // If the back prop is set to false, check if all inputs have been filled in
      const hasNull = Object.values(inputs).some((val) => {
        if (val === null) {
          return true;
        } else if (Array.isArray(val)) {
          return val.includes(null);
        }
      });
      if (hasNull) {
        // If there are any null inputs, display an error message
        toast.error("Fill In All Fields To Proceed");
      } else {
        if (
          nextPage == "/game-start" &&
          location.pathname == "/endgame-scoring"
        ) {
          // If the next page is the game start page and the current page is the endgame scoring page
          const fullData = {
            data: JSON.parse(localStorage.getItem("scoutingData"))?.data || [],
          };
          
          const { back, ...filteredInputs } = inputs;

          // Append the match number to the comment
          if (filteredInputs.comment) {
            filteredInputs.comment = `Match ${filteredInputs.matchNumber}: ${filteredInputs.comment}`;
          }

          fullData.data.push({ ...filteredInputs });
          // Save the inputs to local storage
          localStorage.setItem("scoutingData", JSON.stringify(fullData));
          console.log(fullData);
          saveStateToLocalStorage([], "autoStateStack")
          saveStateToLocalStorage([], "teleopStateStack")
          navigate(nextPage, {
            state: {
              inputs: {
                matchNumber: (parseInt(inputs.matchNumber) + 1).toString(),
                alliance: inputs.alliance,
                scouterInitials: inputs.scouterInitials,
              },
            },
          });
        } else {
          // If the next page is not the game start page, pass the inputs as props to the next page
          console.log(inputs);
          if(stateStack){
            if(mode == "auto"){
              saveStateToLocalStorage(stateStack, "autoStateStack")
            }
            if(mode == "teleop"){
              saveStateToLocalStorage(stateStack, "teleopStateStack")
            }
          }

          navigate(nextPage, { state: { inputs } });
        }
      }
    }
  };

  return (
    <button
      className="flex h-full w-full border-8 border-[#1D1E1E] rounded-xl justify-center items-center whitespace-pre-wrap break-words text-white font-bold ~text-2xl/5xl text-center p-2"
      style={{
        backgroundColor: turnBoxRed ? "#8B0000" : "#242424",
      }}
      onClick={proceedClick}
      id={back ? "backButton" : "proceedButton"}
    >
      {back ? "Back" : message ? message : "Proceed"}
    </button>
  );
};

export default ProceedBackButton;
