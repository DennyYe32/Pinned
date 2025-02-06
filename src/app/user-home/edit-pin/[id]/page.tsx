"use client";
import { ReactEventHandler, useEffect, useState } from "react";
import React from "react";
import Image from 'next/image';
import Button from '../../../components/Button';
import { useParams, useRouter } from "next/navigation";
import Pin from '../../../components/Pin';

interface Pin {
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

const EditPin = () => {

    const [pin, setPin] = useState<Pin>({   
        name: '',
        type: '',
        area: '',
        address: '',
        description: '',
        lat: '',
        lon: '',
        googleUrl: '',
        imageUrl: '',
    });

    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;


    useEffect(() => {
        const fetchPin = async () =>{
            try{
                const response = await fetch(`/api/pins/${id}`)
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                const pinData = data.pin;
                setPin({
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
        if(id){
            fetchPin();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        setPin((prevPin) => ({...prevPin, [id]: value,}));
    };
   

    const handleLatLonChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const cords = event.target.value.split(",").map((cord) => cord.trim());
        setPin((prevPin) => ({...prevPin, lat: cords[0], lon: cords[1],}));

    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try{
          const response = await fetch(`/api/pins/${id}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pin),
            
          });

          if(!response.ok){
            throw new Error('Network response was not ok');
          }

        }catch(err){
            console.log('Error updating pin:', err);
        }
  
    };

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();

      try{
          const response = await fetch(`/api/pins/${id}`, {
              method: 'DELETE',
          });
          if(!response.ok){
              throw new Error('Network response was not ok');
          }
      } catch(err){
          console.log('Error in handleDelete');
      }
    }

    const loaderProp =({src}:{src:any}) => {
      return src;
  }

  return (
    <div className="h-screen bg-center bg-fixed bg-[url('https://content.r9cdn.net/rimg/dimg/3e/2c/96e426b6-city-17759-1688702c4c5.jpg?crop=true&width=1366&height=768&xhint=739&yhint=908')] bg-cover">
      <div className="grid place-items-center h-screen bg-center bg-fixed bg-red-800/25 bg-cover backdrop-blur-sm">
      <Image className=''
        src='/images/Pinned-Logo.png'           
        alt={`Pinned Logo`} 
        width={200} 
        height={100}
        loader={loaderProp}
        priority />

      <div className="pt-5 flex justify-center align-center h-[1000px] bg-clear-300">

        <div className=" bg-white flex justify-center h-[550px] w-[800px] shadow-lg p-1 rounded-lg border-t-4 border-red-400">
          <div className="flex-col justify-center">
            <form onSubmit={handleDelete}><Button type="submit" onClick={() => router.push('/user-home')}>DELETE PIN</Button></form>

            <h1 className="font-bold text-center text-4xl p-5 font-inter text-red-500 text decoration underline">EDIT PIN</h1>
            <form className='' onSubmit={handleSubmit}>
              <div className="flex">
                <div className="pr-[40px]">
                <strong className="mr-14">Name:*</strong>
                <input className="p-1 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="name"
                  type="text"
                  value={pin.name}
                  onChange={handleChange}
                  required
                />
                <br /><br />
                <strong className="mr-16">Type:*</strong>
                <select
                  className="pt-2 pb-2 pl-2 pr-[4.75rem] border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="type"
                  value={pin.type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a Type</option>  
                  <option value="Restaurant">Restaurant</option>
                  <option value="Store">Store</option>
                  <option value="Park">Park</option>
                  <option value="Bar">Bar</option>
                  <option value="Museum">Museum</option>
                  <option value="Theater">Theater</option>
                  <option value="Zoo">Zoo</option>
                  <option value="Other">Other</option>
                </select>
                <br /><br />
                <strong className="mr-16">Area:*</strong>
                <select
                  className="pt-2 pb-2 pl-2 pr-[4.25rem] border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                  id="area"
                  value={pin.area}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select an Area</option>  
                  <option value="Campus">UGA Campus</option>
                  <option value="Downtown">Downtown</option>
                  <option value="East Side">East Side</option>
                  <option value="Alps">Alps</option>
                  <option value="Epps Bridge">Epps Bridge</option>
                  <option value="Other">Other</option>
                </select>
                <br /><br />
                <strong className="mr-10">Address:</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="address"
                  type="text"
                  value={pin.address}
                  onChange={handleChange}
                />
                <br /><br />
                </div>
                <div>
                <div className="flex mb-6">
                  <strong className="mr-3">Description:*</strong>
                  <textarea
                    className="p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                    id="description"
                    value={pin.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <strong className="mr-2">Coordinates:*</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="lat/lon"
                  type="text"
                  value={`${pin.lat}, ${pin.lon}`}
                  onChange={handleLatLonChange}
                  placeholder="Latitude, Longitude"
                  required
                />
                <br /><br />
                <strong className='mr-5'>ImageURL:*</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="imageUrl"
                  type="text"
                  value={pin.imageUrl}
                  onChange={handleChange}
                  required
                />
                <br /><br />
                <strong className="mr-4">GoogleURL:</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="googleUrl"
                  type="text"
                  value={pin.googleUrl}
                  onChange={handleChange}
                />
                </div>
                </div>
                <br /><br />
                <div className="text-center">
                    
                    <Button type="submit" onClick={() => router.push('/user-home')}>UPDATE PIN</Button>
                </div>
                
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default EditPin;