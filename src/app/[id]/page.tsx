"use client";
import { use, useEffect, useState } from 'react';
import React from "react";
import Nav from "./../components/Nav";
import { useParams, useRouter } from "next/navigation";
import {PinOverlay} from '../components/PinOverlay';


interface Pin {
  _id: string;
  name: string;
  type: string;
  area: string;
  address: string;
  description: string;
  lat: string;
  lon: string;
  googleUrl: string;
  imageUrl: string;
};

export default function Home() {


  const [pin, setPin] = useState<Pin>({   
    _id: '',
    name: '',
    type: '',
    area: '',
    address: '',
    description: '',
    lat: '',
    lon: '',
    googleUrl: '',
    imageUrl: '/public/images/loading.jpg',
  });

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isPinOverlayOpen, setIsOverlayOpen] = useState(true);

  const fetchPin = async () =>{

    try{

      const response = await fetch(`/api/pins/${id}`)

      if(!response.ok){
          throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      const pinData = data.pin;
      setPin({
          _id: id,
          name: pinData.name || '',
          type: pinData.type || '',
          area: pinData.area || '',
          address: pinData.address || '',
          description: pinData.description || '',
          lat: pinData.lat || '',
          lon: pinData.lon|| '',
          googleUrl: pinData.googleUrl|| '',
          imageUrl: pinData.imageUrl || '',
            
    })
    
    } catch (err){
        console.log('Error from EditPin');
    }
  };

  useEffect(() => {
    
    if(id){
        fetchPin();
        // if(isPinOverlayOpen===false){router.push('/user-home')}
    }
  }, [id]);

  const[sorts, setSort] = useState("Name");

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState([]);

  const handleOverlayClose = (event: any) => {
    event?.preventDefault();
    setIsOverlayOpen(false);
    router.push('/');
    console.log("pushed on router");
  };

  return (
    <div className="min-h-screen bg-center bg-fixed bg-[url('https://content.r9cdn.net/rimg/dimg/3e/2c/96e426b6-city-17759-1688702c4c5.jpg?crop=true&width=1366&height=768&xhint=739&yhint=908')] bg-cover">
      <div className="flex min-h-screen">
        <div className="w-[300px] bg-red-200 p-4">
          <Nav sorts={sorts} setSort={setSort} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} selectedLoc={selectedLoc} setSelectedLoc={setSelectedLoc} />
        </div>
        <div className="flex-1 bg-red-400/25 p-4 backdrop-blur-sm">

        </div>
      </div>
      <PinOverlay
      isOpen={isPinOverlayOpen}
      onClose={handleOverlayClose
        // async (event: any) => {
        // event?.preventDefault();
        // setIsOverlayOpen(false);
        // await router.push('/user-home');
        // }
      }
      pin={pin}
/>
    </div>
  );
}


// "use client";
// import { useState } from 'react';
// import React from "react";
// import Pins from "../components/Pins";
// import Nav from "../components/Nav";
// import { useParams, useRouter } from "next/navigation";
// import {PinOverlay} from '../components/PinOverlay';

// import Data from "../Pins.json" assert { type: "json" };
// import { Router } from 'next/router';

// type Pin = {
//   id: string;
//   name: string;
//   description: string;
//   googleUrl: string;
//   type: string;
//   area: string;
//   address: string;
//   imageUrl: string;
//   distance: number;
//   lat: number;
//   lon: number;
// };

// const pinsData: Pin[] = Data;


// export default function Home({params}:{params: {id: string}}) {

//   const[pins, setPins] = useState<Pin[]>(pinsData);

//   const newPin = (newPin: Pin) => {

//     setPins((pins) => [newPin, ...pins]);

//   };

//   const[sorts, setSort] = useState("Name");

//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedLoc, setSelectedLoc] = useState([]);

//   const [isPinOverlayOpen, setIsOverlayOpen] = useState(true);

// //   let params = useParams();
// //   let id = params.id
// //   let linkPin = pinsData.filter((pin)=> pin.id === id);

//   const id = params.id
//   const linkPin = pinsData.filter((pin)=> pin.id === id);

//   const [openPin, setOpenPin] = useState<Pin>(linkPin[0]);

//   return (
//     <div className="min-h-screen">
//       <div className="flex min-h-screen">
//         <div className="w-[300px] bg-blue-200 p-4">
//           <Nav sorts={sorts} setSort={setSort} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} selectedLoc={selectedLoc} setSelectedLoc={setSelectedLoc} />
//         </div>
//         <div className="flex-1 bg-gray-400 p-4">
//         <Pins pins={pins} sorts={sorts} selectedTypes={selectedTypes} selectedLoc={selectedLoc} setOpenPin={setOpenPin} setIsOverlayOpen={setIsOverlayOpen} />
//         </div>
//       </div>
//       <PinOverlay
//         isOpen = {isPinOverlayOpen}
//         onClose={async () => {
//           window.history.replaceState(null, "", "/");
//           setIsOverlayOpen(false);
//         }}
//         pin = {openPin}
//         >
          
//       </PinOverlay>
//     </div>
//   );
// }
