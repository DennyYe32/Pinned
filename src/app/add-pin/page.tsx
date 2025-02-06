"use client";
import { ReactEventHandler, useState } from "react";
import React from "react";
import Image from 'next/image';
import Button from '../components/Button';
import { useRouter } from "next/navigation";
import Pin from '../components/Pin';

type Pin = {
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

type addPinProp = {
  setPins: (pin: Pin) => void;
}

const AddPin: React.FC<addPinProp> = ({setPins}) => {

  const[name, setName] = useState<string>('');
  const[type, setType] = useState<string>('');
  const[area, setArea] = useState<string>('');
  const[address, setAddress] = useState<string>('');
  const[description, setDescription] = useState<string>('');
  const[lat, setLat] = useState<string>('');
  const[lon, setLon] = useState<string>('');
  const[latLonInput, setLatLonInput] = useState<string>('');
  const[googleUrl, setGoogleUrl] = useState<string>('');
  const[imageUrl, setImageUrl] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  }

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArea(event.target.value);
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleLatLonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatLonInput(event.target.value); 
    const cords = event.target.value.split(",").map((cord) => cord.trim());
    if (cords.length === 2) {
      setLat(cords[0]);
      setLon(cords[1]);
    }
  }

  const handleGoogleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleUrl(event.target.value);
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    
    event.preventDefault();

    const pin = {
      name: name,
      type: type,
      area: area,
      address: address,
      description: description,
      lat: lat,
      lon: lon,
      googleUrl: googleUrl,
      imageUrl: imageUrl,
    }

    try{
      const response = await fetch('/api/pins',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pin),
        
      });

      if(!response.ok){
        throw new Error('Network response was not ok');
      }

    }catch(err){

    }

    setName('');
    setType('');
    setArea('');
    setAddress('');
    setDescription('');
    setLatLonInput('');
    setGoogleUrl('')
    setImageUrl('');

  };

  const router = useRouter();

  return (
    <div className="h-screen bg-center bg-fixed bg-[url('https://content.r9cdn.net/rimg/dimg/3e/2c/96e426b6-city-17759-1688702c4c5.jpg?crop=true&width=1366&height=768&xhint=739&yhint=908')] bg-cover">
      <div className="grid place-items-center h-screen bg-center bg-fixed bg-red-800/25 bg-cover backdrop-blur-sm">
      <Image className=''
        src='/images/Pinned-Logo.png'           
        alt={`Pinned Logo`} 
        width={200} 
        height={100}
        priority />

      <div className="pt-5 flex justify-center align-center h-[1000px] bg-clear-300">

        <div className=" bg-white flex justify-center h-[500px] w-[800px] shadow-lg p-1 rounded-lg border-t-4 border-red-400">
          <div className="flex-col justify-center">
            <h1 className="font-bold text-center text-4xl p-5 font-inter text-red-500 text decoration underline">ADD NEW PIN</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="pr-[40px]">
                <strong className="mr-14">Name:*</strong>
                <input className="p-1 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="place"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                <br /><br />
                <strong className="mr-16">Type:*</strong>
                <select
                  className="pt-2 pb-2 pl-2 pr-[4.75rem] border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="type"
                  value={type}
                  onChange={handleTypeChange}
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
                  value={area}
                  onChange={handleAreaChange}
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
                  value={address}
                  onChange={handleAddressChange}
                />
                <br /><br />
                </div>
                <div>
                <div className="flex mb-6">
                  <strong className="mr-3">Description:*</strong>
                  <textarea
                    className="p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
                <strong className="mr-2">Coordinates:*</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="lat/lon"
                  type="text"
                  value={latLonInput}
                  onChange={handleLatLonChange}
                  placeholder="Latitude, Longitude"
                  required
                />
                <br /><br />
                <strong className='mr-5'>ImageURL:*</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="imageUrl"
                  type="text"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  required
                />
                <br /><br />
                <strong className="mr-4">GoogleURL:</strong> 
                <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-red-500"
                  id="googleUrl"
                  type="text"
                  value={googleUrl}
                  onChange={handleGoogleUrlChange}
                />
                </div>
                </div>
                <br /><br />
                <div className="text-center">
                  <Button type="submit" onClick={() => router.push('/user-home')}>ADD PIN</Button>
                </div>
                
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default AddPin;