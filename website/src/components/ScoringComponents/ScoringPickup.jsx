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
              <ScoringPickupButton
                position={singlePickData.position}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                place={place}
                key={index}
              />
          );
        }
        return null;
      })}
    </div>
  );
};

export default ScoringPickup;
