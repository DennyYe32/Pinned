import React from "react";
import Pin from "./Pin";
import styles from "./Pins.module.css";

type Pin = {
  _id: string;
  name: string;
  description: string;
  googleUrl: string;
  type: string;
  area: string;
  address: string;
  imageUrl: string;
  distance: number;
  lat: number;
  lon: number;
};

let userLat = 33.938330359797355; //ramsey
let userLon = -83.37087607162724;

async function getUserCoordinates() {
  if (navigator) {
    await navigator.geolocation.getCurrentPosition((position) => {
      userLat = position.coords.latitude;
      userLon = position.coords.longitude;
    });
  } else {
    alert("Geolocation features not available!\n Location set to the UGA Arch");
  }
}

type PinsProps = {
  pins: Pin[];
};

type SortsFiltersProps = {
  sorts: string;
  selectedTypes: string[];
  selectedLoc: string[];
};

type SetOpenPin = {
  setOpenPin: React.Dispatch<React.SetStateAction<Pin | null>>;
  setIsOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ExtendedPinsProps = PinsProps & SortsFiltersProps & SetOpenPin;

const Pins: React.FC<ExtendedPinsProps> = ({
  pins,
  sorts,
  selectedTypes,
  selectedLoc,
  setOpenPin,
  setIsOverlayOpen,
}) => {
  // Helper filter function to avoid repeating filter logic
  const filteredPins = pins.filter((pin) => {
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(pin.type);
    const locMatch = selectedLoc.length === 0 || selectedLoc.includes(pin.area);
    return typeMatch && locMatch;
  });

  if (sorts === "Name") {
    return (
      <div className={styles.pinsBox}>
        {filteredPins
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((pin) => (
            <Pin
              key={pin._id}
              setOpenPin={setOpenPin}
              setIsOverlayOpen={setIsOverlayOpen}
              pin={pin}
            />
          ))}
      </div>
    );
  } else if (sorts === "Area") {
    return (
      <div className={styles.pinsBox}>
        {filteredPins
          .sort((a, b) => a.area.localeCompare(b.area))
          .map((pin) => (
            <Pin
              key={pin._id}
              setOpenPin={setOpenPin}
              setIsOverlayOpen={setIsOverlayOpen}
              pin={pin}
            />
          ))}
      </div>
    );
  } else if (sorts === "Type") {
    return (
      <div className={styles.pinsBox}>
        {filteredPins
          .sort((a, b) => a.type.localeCompare(b.type))
          .map((pin) => (
            <Pin
              key={pin._id}
              setOpenPin={setOpenPin}
              setIsOverlayOpen={setIsOverlayOpen}
              pin={pin}
            />
          ))}
      </div>
    );
  } else if (sorts === "Distance") {
    getUserCoordinates();

    pins.forEach((pin) => {
      pin.distance = Math.sqrt(
        Math.pow(userLat - pin.lat, 2) + Math.pow(userLon - pin.lon, 2)
      );
    });

    const filteredSortedByDistance = filteredPins.sort(
      (a, b) => a.distance - b.distance
    );

    return (
      <div className={styles.pinsBox}>
        {filteredSortedByDistance.map((pin) => (
          <Pin
            key={pin._id}
            setOpenPin={setOpenPin}
            setIsOverlayOpen={setIsOverlayOpen}
            pin={pin}
          />
        ))}
      </div>
    );
  } else {
    // Default to sorting by name
    return (
      <div className={styles.pinsBox}>
        {filteredPins
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((pin) => (
            <Pin
              key={pin._id}
              setOpenPin={setOpenPin}
              setIsOverlayOpen={setIsOverlayOpen}
              pin={pin}
            />
          ))}
      </div>
    );
  }
};

export default Pins;
