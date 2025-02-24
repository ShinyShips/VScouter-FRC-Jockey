import ScoringPickupButton from "./ScoringPickupButton";

const ScoringPickup = ({
  pickData,
  pickPositionSelected,
  setPickPositionSelected,
  place,
}) => {
  return (
    <div className="flex w-full h-full justify-between items-center gap-1">
      {pickData.map((singlePickData, index) => {
        if (!singlePickData.hide) {
          return (
            <div className="w-full h-full" key={index}>
              <ScoringPickupButton
                position={singlePickData.position}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                place={place}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ScoringPickup;
