import Pin from './Pin';
import styles from './Pins.module.css';


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
// 33.95776534918996,-83.37535277631285 arches

async function getUserCoordinates(){
  if(navigator){
    await navigator.geolocation.getCurrentPosition((position)=>{
      userLat = position.coords.latitude;
      userLon = position.coords.longitude;
    //   console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    //   console.log(`User Latitude: ${userLat}, User Longitude: ${userLon}`);
  })}else{
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
    setOpenPin: Function;
    setIsOverlayOpen: Function;
  }

type ExtendedPinsProps = PinsProps & SortsFiltersProps & SetOpenPin;

const Pins: React.FC<ExtendedPinsProps> = ({pins, sorts, selectedTypes, selectedLoc, setOpenPin, setIsOverlayOpen}) => {

    if(sorts == "Name"){
        return(
            <div className={styles.pinsBox}>
                {pins.filter((pin)=> {if(selectedTypes.length === 0){return pin;}else if(selectedTypes.includes(pin.type)){return pin}})
                    .filter((pin)=> {if(selectedLoc.length === 0){return pin;}else if(selectedLoc.includes(pin.area)){return pin}})
                    .sort((a,b) => a.name.localeCompare(b.name))
                    .map(pin => (<Pin key={pin._id} setOpenPin={setOpenPin} setIsOverlayOpen={setIsOverlayOpen}  pin={pin} />))}
            </div>
        );
    }else if(sorts == "Area"){
        return(
            <div className={styles.pinsBox}>
                {pins.filter((pin)=> {if(selectedTypes.length === 0){return pin;}else if(selectedTypes.includes(pin.type)){return pin}})
                .filter((pin)=> {if(selectedLoc.length === 0){return pin;}else if(selectedLoc.includes(pin.area)){return pin}})
                .sort((a,b) => a.area.localeCompare(b.area))
                .map(pin => (<Pin key={pin._id} setOpenPin={setOpenPin} setIsOverlayOpen={setIsOverlayOpen} pin={pin} />))}
            </div>
        );

    }else if(sorts == "Type"){
        return(
            <div className={styles.pinsBox}>
                {pins.filter((pin)=> {if(selectedTypes.length === 0){return pin;}else if(selectedTypes.includes(pin.type)){return pin}})
                .filter((pin)=> {if(selectedLoc.length === 0){return pin;}else if(selectedLoc.includes(pin.area)){return pin}})
                .sort((a,b) => a.type.localeCompare(b.type))
                .map(pin => (<Pin key={pin._id} setOpenPin={setOpenPin} setIsOverlayOpen={setIsOverlayOpen} pin={pin} />))}
            </div>
        );

    }else if(sorts == "Distance"){
        
        
        getUserCoordinates();
        
        pins.map((pin)=> {
            pin.distance = Math.sqrt(Math.pow(userLat-pin.lat,2)+Math.pow(userLon-pin.lon,2))
        })

        return(
            <div className={styles.pinsBox}>
                {pins.filter((pin)=> {if(selectedTypes.length === 0){return pin;}else if(selectedTypes.includes(pin.type)){return pin}})
                .filter((pin)=> {if(selectedLoc.length === 0){return pin;}else if(selectedLoc.includes(pin.area)){return pin}})
                .sort((a,b) => a.distance-b.distance)
                .map(pin => (<Pin key={pin._id} setOpenPin={setOpenPin} setIsOverlayOpen={setIsOverlayOpen} pin={pin} />))}
            </div>
        );

    }else{
        return(
            <div className={styles.pinsBox}>
                {pins.filter((pin)=> {if(selectedTypes.length === 0){return pin;}else if(selectedTypes.includes(pin.type)){return pin}})
                .filter((pin)=> {if(selectedLoc.length === 0){return pin;}else if(selectedLoc.includes(pin.area)){return pin}})
                .sort((a,b) => a.name.localeCompare(b.name))
                .map(pin => (<Pin key={pin._id} setOpenPin={setOpenPin} setIsOverlayOpen={setIsOverlayOpen} pin={pin} />))}
            </div>
        );
    }
}

export default Pins;


/* {pins.map(pin =>(<Pin key={pin.id} pin={pin} />))} */