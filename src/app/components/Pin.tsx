import Image from "next/image";
import styles from "./Pin.module.css";
import Card from "./Card";

// Use the full Pin type from Pins.tsx
export type Pin = {
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

type PinProps = {
  pin: Pin;
  setOpenPin: (pin: Pin) => void;
  setIsOverlayOpen: (open: boolean) => void;
};

const Pin: React.FC<PinProps> = ({ pin, setOpenPin, setIsOverlayOpen }) => {
  return (
    <Card
      className={styles.pinItem}
      onClick={() => {
        setOpenPin(pin);
        setIsOverlayOpen(true);
      }}
      key={pin._id}
    >
      <Image
        className={styles.pinImg}
        src={pin.imageUrl}
        alt={`picture of ${pin.name}`}
        width={300}
        height={300}
        priority
      />
      <div className={styles.pinInfo}>
        <h2>{pin.name}</h2>
        <div className="flex justify-around">
          <div>
            <p>{pin.type}</p>
          </div>
          <div>
            <p>{pin.area}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Pin;
