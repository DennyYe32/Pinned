'use client'
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from "./Button";
import Pin from './Pin';

export function PinOverlay({isOpen, onClose, pin}:{isOpen: boolean, onClose: any, pin: any}){

    if(isOpen==true){history.replaceState(null, "", "/" + pin._id)}
    
    const router = useRouter();
    
    return(
        <div>
            {isOpen ? (
                <div>
                    <div className="bg-slate-950 bg-opacity-75 w-[100vw] h-[100vw] fixed top-0 right-0 cursor-pointer z-10" 
                        onClick={onClose} />
                    <div className="bg-slate-50 fixed top-0 inset-0 m-auto z-10 w-[900px] h-[80%] rounded-lg shadow-xl">
                        <div className="relative h-[400px] shadow-xl">  
                            <div className="flex justify-between">
                              <button className="relative px-2 h-8 z-20 rounded-full font-bold text-center border-none bg-white bg-transparent text-[22px] cursor-pointer" 
                                    type="button" 
                                    onClick={onClose}>X</button>
                            </div>
                            <Image className="absolute z-10 top-0 left-0 w-[100%] h-[400px] rounded-t-lg object-cover"
                                src={`${pin.imageUrl}`}
                                alt={`picture of ${pin.name}`} 
                                width={300} 
                                height={300}
                                priority
                            />
                            <div className="relative m-auto w-fit bg-opacity-75 bg-black z-30 rounded-lg px-2 my-[100px]">
                                <h1 className="relative z-30 text-center text-shadow text-white  text-[60px]">{pin.name}</h1>
                            </div>
                        </div>
                        <div className="flex  space-between m-auto bg-slate-50">
                            <div className="bg-white-500 w-[50%] border-solid border-black border-r-2 border-b-2 text-center font-bold text-[20px] text-black">{pin.type}</div> 
                            <div className="w-[50%] border-solid border-black border-b-2 text-center font-bold text-black text-[20px]">{pin.area}</div>
                        </div>
                        <div className="flex  space-between m-auto bg-slate-50">
                            <div className="w-[50%] border-solid border-black border-r-2 border-b-2 text-center font-bold  text-black text-[20px]"><a href={pin.googleUrl} target="_blank">Directions</a></div>
                            <div className="w-[50%] border-solid border-black border-b-2 text-center font-bold text-[90%] text-black"><h1>{pin.address}</h1></div>
                        </div>
                        <div className="flex p-5 m-auto bg-slate-50 text-black rounded-lg font-bold">
                            <h1>{pin.description}</h1>
                        </div>
                    </div>

                </div>
            ): null}
        </div>
    );
}


// "use client";
// import React, { useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Button from "./Button";
// import Pin from "./Pin";

// // type PinProps = {
// //     pin: {
// //       id: number;
// //       name: string;
// //       type: string;
// //       area: string;
// //       address: string;
// //       imageUrl: string;
// //     };
// // };

// //:{isOpen: boolean, onClose: any, children: any[]}
// export function PinOverlay({
//   isOpen,
//   onClose,
//   pin,
// }: {
//   isOpen: boolean;
//   onClose: any;
//   pin?: {
//     _id: string;
//     name: string;
//     type: string;
//     area: string;
//     address: string;
//     imageUrl: string;
//     googleUrl: string;
//     description: string;
//   };
// }) {
//   useEffect(() => {
//     if (isOpen && pin?._id) {
//       window.history.replaceState(null, "", pin._id);
//     }
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen, pin]);

//   // Return null if `pin` is undefined or missing required properties
//   if (!isOpen || !pin || !pin.imageUrl) return null;

//   return (
//     <div>
//       <div
//         className="bg-slate-950 bg-opacity-75 w-full h-full fixed top-0 right-0 cursor-pointer z-10"
//         aria-hidden="true"
//         onClick={onClose}
//       />
//       <div className="bg-slate-50 fixed top-0 inset-0 m-auto z-10 w-[90%] sm:w-[900px] h-[80%] rounded-lg shadow-xl">
//         <div className="relative h-[400px] shadow-xl">
//           <button
//             aria-label="Close overlay"
//             className="relative px-2 h-8 z-20 rounded-full font-bold text-center border-none bg-white bg-transparent text-[22px] cursor-pointer"
//             type="button"
//             onClick={onClose}
//           >
//             X
//           </button>
//           <Image
//             className="absolute z-10 top-0 left-0 w-full h-[400px] rounded-t-lg object-cover"
//             src={pin.imageUrl}
//             alt={`picture of ${pin.name}`}
//             width={300}
//             height={300}
//             priority
//           />
//           <div className="relative m-auto w-fit bg-opacity-75 bg-black z-30 rounded-lg px-2 my-[100px]">
//             <h1 className="relative z-30 text-center text-shadow text-white text-[60px]">
//               {pin.name}
//             </h1>
//           </div>
//         </div>
//         <div className="flex justify-between m-auto bg-slate-50">
//           <div className="bg-white-500 w-[50%] border-solid border-black border-r-2 border-b-2 text-center font-bold text-[20px] text-black">
//             {pin.type}
//           </div>
//           <div className="w-[50%] border-solid border-black border-b-2 text-center font-bold text-[20px] text-black">
//             {pin.area}
//           </div>
//         </div>
//         <div className="flex justify-between m-auto bg-slate-50">
//           <div className="w-[50%] border-solid border-black border-r-2 border-b-2 text-center font-bold text-[20px] text-black">
//             <a href={pin.googleUrl} target="_blank" rel="noopener noreferrer">
//               Directions
//             </a>
//           </div>
//           <div className="w-[50%] border-solid border-black border-b-2 text-center font-bold text-[20px] text-black">
//             <h1>{pin.address}</h1>
//           </div>
//         </div>
//         <div className="flex p-5 m-auto bg-slate-50 text-black rounded-lg font-bold">
//           <h1>{pin.description}</h1>
//         </div>
//       </div>
//     </div>
//   );
// }
