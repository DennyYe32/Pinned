"use client";
import { useEffect, useState } from "react";
import React from "react";
import UserNav from "@/app/components/UserNav";
import { useParams, useRouter } from "next/navigation";
import { UserPinOverlay } from "@/app/components/UserPinOverlay";

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
}

export default function Home() {
  const [pin, setPin] = useState<Pin>({
    _id: "",
    name: "",
    type: "",
    area: "",
    address: "",
    description: "",
    lat: "",
    lon: "",
    googleUrl: "",
    imageUrl: "/public/images/loading.jpg",
  });

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isPinOverlayOpen, setIsOverlayOpen] = useState(true);

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const response = await fetch(`/api/pins/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const pinData = data.pin;
        setPin({
          _id: id,
          name: pinData.name || "",
          type: pinData.type || "",
          area: pinData.area || "",
          address: pinData.address || "",
          description: pinData.description || "",
          lat: pinData.lat || "",
          lon: pinData.lon || "",
          googleUrl: pinData.googleUrl || "",
          imageUrl: pinData.imageUrl || "",
        });
      } catch (err) {
        console.log("Error from EditPin", err);
      }
    };

    if (id) {
      fetchPin();
    }
  }, [id]);

  const [sorts, setSort] = useState("Name");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLoc, setSelectedLoc] = useState<string[]>([]);

  const handleOverlayClose = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsOverlayOpen(false);
    router.push("/user-home");
    console.log("pushed on router");
  };

  return (
    <div className="min-h-screen bg-center bg-fixed bg-[url('https://content.r9cdn.net/rimg/dimg/3e/2c/96e426b6-city-17759-1688702c4c5.jpg?crop=true&width=1366&height=768&xhint=739&yhint=908')] bg-cover">
      <div className="flex min-h-screen">
        <div className="w-[300px] bg-red-200 p-4">
          <UserNav
            sorts={sorts}
            setSort={setSort}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedLoc={selectedLoc}
            setSelectedLoc={setSelectedLoc}
          />
        </div>
        <div className="flex-1 bg-red-400/25 p-4 backdrop-blur-sm"></div>
      </div>
      <UserPinOverlay
        isOpen={isPinOverlayOpen}
        onClose={handleOverlayClose}
        pin={pin}
      />
    </div>
  );
}
