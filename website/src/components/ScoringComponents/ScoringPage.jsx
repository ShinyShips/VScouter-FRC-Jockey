import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScoringCoralSection from "./ScoringCoral/ScoringCoralSection";
import ScoringAlgaeSection from "./ScoringAlgae/ScoringAlgaeSection";
import ProceedBackButton from "../ProceedBackButton";

const ScoringPage = ({
  statePath,
  mode,
  nextPage,
  pastPage,
  pickCoralData,
  pickAlgaeData,
}) => {
  const location = useLocation();
  const states = location.state;

  const [placeCoralL1Count, setPlaceCoralL1Count] = useState(
    statePath?.coral?.placeL1Count || 0
  );
  const [placeCoralL2Count, setPlaceCoralL2Count] = useState(
    statePath?.coral?.placeL2Count || 0
  );
  const [placeCoralL3Count, setPlaceCoralL3Count] = useState(
    statePath?.coral?.placeL3Count || 0
  );
  const [placeCoralL4Count, setPlaceCoralL4Count] = useState(
    statePath?.coral?.placeL4Count || 0
  );
  const [placeCoralDropMissCount, setPlaceCoralDropMissCount] = useState(
    statePath?.coral?.placeDropMissCount || 0
  );

  const placeCoralData = [
    {
      position: "L4",
      count: placeCoralL4Count,
      setCount: setPlaceCoralL4Count,
    },
    {
      position: "L3",
      count: placeCoralL3Count,
      setCount: setPlaceCoralL3Count,
    },
    {
      position: "L2",
      count: placeCoralL2Count,
      setCount: setPlaceCoralL2Count,
    },
    {
      position: "L1",
      count: placeCoralL1Count,
      setCount: setPlaceCoralL1Count,
    },
    {
      position: "Drop/Miss",
      count: placeCoralDropMissCount,
      setCount: setPlaceCoralDropMissCount,
    },
  ];

  // Algae States

  const [placeAlgaeNetShot, setPlaceAlgaeNetShot] = useState(
    statePath?.algae?.placeNetShot || 0
  );
  const [placeAlgaeProcessor, setPlaceAlgaeProcessor] = useState(
    statePath?.algae?.placeProcessor || 0
  );
  const [placeAlgaeDropMiss, setPlaceAlgaeDropMiss] = useState(
    statePath?.algae?.placeDropMiss || 0
  );
  const [placeAlgaeRemove, setPlaceAlgaeRemove] = useState(
    statePath?.algae?.placeRemove || 0
  );

  const placeAlgaeData = [
    {
      position: "Net Shot",
      count: placeAlgaeNetShot,
      setCount: setPlaceAlgaeNetShot,
    },
    {
      position: "Processor",
      count: placeAlgaeProcessor,
      setCount: setPlaceAlgaeProcessor,
    },
    {
      position: "Drop/Miss",
      count: placeAlgaeDropMiss,
      setCount: setPlaceAlgaeDropMiss,
    },
    {
      position: "Remove",
      count: placeAlgaeRemove,
      setCount: setPlaceAlgaeRemove,
    },
  ];

  // only for auto scoring
  const [passedStartLine, setPassedStartLine] = useState(
    statePath?.passedStartLine || false
  );
  const [coralPreloaded, setCoralPreloaded] = useState(
    statePath?.coralPreloaded || true
  );

  const loadStateFromLocalStorage = (stateName) => {
    const savedState = localStorage.getItem(stateName);
    return savedState ? JSON.parse(savedState) : [];
  };

  // State stack for undo functionality
  const [stateStack, setStateStack] = useState(() => {
    if(mode == "auto"){
      return loadStateFromLocalStorage("autoStateStack")
    }
    if(mode == "teleop"){
      return loadStateFromLocalStorage("teleopStateStack")
    }
  });

  const [autoEnded, setAutoEnded] = useState(false);

  // Function to handle state changes and push current state to stack
  useEffect(() => {

    // default passing the starting line because you cant do anything without moving
    if (mode == "auto" && stateStack.length == 1) {
      setPassedStartLine(true);
      setTimeout(() => {
        setAutoEnded(true);
      }, 15000);
    }

    let newStateStack = [
      ...stateStack,
      Object.assign(
        {
          placeCoralL1Count,
          placeCoralL2Count,
          placeCoralL3Count,
          placeCoralL4Count,
          placeCoralDropMissCount,

          placeAlgaeNetShot,
          placeAlgaeProcessor,
          placeAlgaeDropMiss,
          placeAlgaeRemove,

          coralPreloaded,
        },
        ...pickCoralData.map((singleCoralData) => {
          return {
            ["pickCoral" + singleCoralData.position + "Count"]:
              singleCoralData.count,
          };
        }),
        ...pickAlgaeData.map((singleAlgaeData) => {
          return {
            ["pickAlgae" + singleAlgaeData.position + "Count"]:
              singleAlgaeData.count,
          };
        })
      ),
    ]
    
    //This runs twice every time the page loads so if we went back a page to Auto...
    //Then we need to prevent this from running twice to prevent the stateStack from being populated incorrectly
    if(states?.inputs.back > 0){
      states.inputs.back--
    }
    else {
      setStateStack(newStateStack);
    }


  }, [
    ...pickCoralData.map((singleCoralData) => {
      return singleCoralData.count;
    }),
    placeCoralL1Count,
    placeCoralL2Count,
    placeCoralL3Count,
    placeCoralL4Count,
    placeCoralDropMissCount,
    ...pickAlgaeData.map((singleAlgaeData) => {
      return singleAlgaeData.count;
    }),
    placeAlgaeNetShot,
    placeAlgaeProcessor,
    placeAlgaeDropMiss,
    placeAlgaeRemove,
    coralPreloaded,
  ]);

  // Function to handle undo operation
  const handleUndo = () => {

    if (stateStack.length > 1) {
      console.log("Undo1");
      stateStack.pop();
      const previousState = stateStack.pop();
      for (let i = 0; i < pickCoralData.length; i++) {
        pickCoralData[i].setCount(
          previousState["pickCoral" + pickCoralData[i].position + "Count"]
        );
      }
      setPlaceCoralL1Count(previousState.placeCoralL1Count);
      setPlaceCoralL2Count(previousState.placeCoralL2Count);
      setPlaceCoralL3Count(previousState.placeCoralL3Count);
      setPlaceCoralL4Count(previousState.placeCoralL4Count);
      setPlaceCoralDropMissCount(previousState.placeCoralDropMissCount);

      for (let i = 0; i < pickAlgaeData.length; i++) {
        pickAlgaeData[i].setCount(
          previousState["pickAlgae" + pickAlgaeData[i].position + "Count"]
        );
      }

      setPlaceAlgaeNetShot(previousState.placeAlgaeNetShot);
      setPlaceAlgaeProcessor(previousState.placeAlgaeProcessor);
      setPlaceAlgaeDropMiss(previousState.placeAlgaeDropMiss);
      setPlaceAlgaeRemove(previousState.placeAlgaeRemove);
      setPassedStartLine(previousState.passedStartLine);
      setStateStack([...stateStack]);

      setCoralPreloaded(previousState.coralPreloaded);
    }
  };

  const pickCoralKeybinds = ["q", "w", "e", "r"];
  const pickAlgaeKeybinds = ["u", "i", "o", "p"];
  useEffect(() => {
    const onEvent = (event) => {
      const buttonClicked = event?.key || null;
      let idToClick = null;
      switch (buttonClicked) {
        case "1":
          idToClick = "L1CoralPlace";
          break;
        case "2":
          idToClick = "L2CoralPlace";
          break;
        case "3":
          idToClick = "L3CoralPlace";
          break;
        case "4":
          idToClick = "L4CoralPlace";
          break;
        case "`":
          idToClick = "Drop/MissCoralPlace";
          break;
        case "9":
          idToClick = "Net ShotAlgaePlace";
          break;
        case "0":
          idToClick = "ProcessorAlgaePlace";
          break;
        case "-":
          idToClick = "Drop/MissAlgaePlace";
          break;
        case "=":
          idToClick = "RemoveAlgaePlace";
          break;
        default:
          pickCoralData.map((singleCoralPickData, index) => {
            buttonClicked == pickCoralKeybinds[index] &&
              (idToClick = singleCoralPickData.position + "CoralPick");
          });
          pickAlgaeData.map((singleAlgaePickData, index) => {
            buttonClicked == pickAlgaeKeybinds[index] &&
              (idToClick = singleAlgaePickData.position + "AlgaePick");
          });
          break;
      }
      if (idToClick) {
        document.getElementById(idToClick).click();
      }
    };

    document.addEventListener("keyup", onEvent);

    return () => {
      document.removeEventListener("keyup", onEvent);
    };
  }, []);

  return (
    <main className="grid grid-cols-2 grid-rows-[repeat(3,auto)] grid-flow-col w-full max-w-full h-full justify-center p-5 gap-5">
      {mode == "auto" && (
        <button
          className="w-full h-16 flex justify-center items-center rounded-lg border-8 border-[#1D1E1E] text-white text-xl md:text-4xl font-bold"
          style={{
            backgroundColor: passedStartLine ? "#507144" : "#242424",
          }}
          onClick={() => setPassedStartLine(!passedStartLine)}
          >
            Passed Starting Line
        </button>
      )}
      <section 
        className="w-full row-span-2 flex flex-col justify-center items-center gap-5"
        style={{ gridRow: mode == "auto" ? "span 2 / span 2" : "span 3 / span 3"}}
      >
        <div className="w-full h-full">
          <ScoringCoralSection
            pickData={pickCoralData}
            placeData={placeCoralData}
          />
        </div>
      </section>
      <section className="w-full h-fit flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl font-bold">
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h1>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-5">
          <div className="grid grid-cols-2 grid-rows-2 grid-flow-col w-full h-full justify-center items-center gap-5 px-4">
            <ProceedBackButton
              nextPage={pastPage}
              back={true}
              stateStack={stateStack}
              mode={mode}
              inputs={{
                ...(states?.inputs || {}),
                [mode]: {
                  coral: Object.assign(
                    {
                      placeL1Count: placeCoralL1Count,
                      placeL2Count: placeCoralL2Count,
                      placeL3Count: placeCoralL3Count,
                      placeL4Count: placeCoralL4Count,
                      placeDropMissCount: placeCoralDropMissCount,
                    },
                    ...pickCoralData.map((singleCoralData) => ({
                      ["pick" +
                      singleCoralData.position.replace(" ", "") +
                      "Count"]: singleCoralData.count,
                    }))
                  ),
                  algae: Object.assign(
                    {
                      placeNetShot: placeAlgaeNetShot,
                      placeProcessor: placeAlgaeProcessor,
                      placeDropMiss: placeAlgaeDropMiss,
                      placeRemove: placeAlgaeRemove,
                    },
                    ...pickAlgaeData.map((singleAlgaeData) => ({
                      ["pick" +
                      singleAlgaeData.position.replace(" ", "") +
                      "Count"]: singleAlgaeData.count,
                    }))
                  ),
                  ...(mode === "auto" && {
                    passedStartLine,
                    coralPreloaded,
                  }),
                },
              }}
            />
            <button
              className="w-full h-full flex justify-center items-center cursor-pointer border-8 border-[#1D1E1E] rounded-xl bg-[#242424] text-white ~text-2xl/5xl font-bold p-2"
              onClick={handleUndo}
            >
              Undo
            </button>
            <div className="w-full h-full row-span-2">
              <ProceedBackButton
                nextPage={nextPage}
                stateStack={stateStack}
                mode={mode}
                blink={autoEnded}
                inputs={{
                  ...(states?.inputs || {}),
                  [mode]: {
                    coral: Object.assign(
                      {
                        placeL1Count: placeCoralL1Count,
                        placeL2Count: placeCoralL2Count,
                        placeL3Count: placeCoralL3Count,
                        placeL4Count: placeCoralL4Count,
                        placeDropMissCount: placeCoralDropMissCount,
                      },
                      ...pickCoralData.map((singleCoralData) => ({
                        ["pick" +
                        singleCoralData.position.replace(" ", "") +
                        "Count"]: singleCoralData.count,
                      }))
                    ),
                    algae: Object.assign(
                      {
                        placeNetShot: placeAlgaeNetShot,
                        placeProcessor: placeAlgaeProcessor,
                        placeDropMiss: placeAlgaeDropMiss,
                        placeRemove: placeAlgaeRemove,
                      },
                      ...pickAlgaeData.map((singleAlgaeData) => ({
                        ["pick" +
                        singleAlgaeData.position.replace(" ", "") +
                        "Count"]: singleAlgaeData.count,
                      }))
                    ),
                    ...(mode === "auto" && { passedStartLine }),
                  },
                }}
              />
            </div>
          </div>
        </section>
        <section className="w-full h-full">
          <ScoringAlgaeSection
            pickData={pickAlgaeData}
            placeData={placeAlgaeData}
          />
        </section>
    </main>
  );
};

export default ScoringPage;
