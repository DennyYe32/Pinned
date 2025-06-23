"use client";
import { useEffect, useState } from "react";
import React from "react";
import Pins from "./../components/Pins";
import UserNav from "./../components/UserNav";
import { UserPinOverlay } from "../components/UserPinOverlay";

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

export default function Home() {
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch("/api/pins");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const pinsData = await response.json();
        setPins(pinsData.pins);
      } catch (err) {
        console.log("Error from showPins", err);
      }
    };
    fetchPins();
  }, []);

  const [sorts, setSort] = useState("Name");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLoc, setSelectedLoc] = useState<string[]>([]);
  const [isPinOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openPin, setOpenPin] = useState<Pin | null>(null);

  useEffect(() => {
    if (!isPinOverlayOpen) {
      history.pushState(null, "", "/user-home/");
    }
  }, [isPinOverlayOpen]);

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
        <div className="flex-1 bg-red-400/25 p-4 backdrop-blur-sm">
          <Pins
            pins={pins}
            sorts={sorts}
            selectedTypes={selectedTypes}
            selectedLoc={selectedLoc}
            setOpenPin={setOpenPin}
            setIsOverlayOpen={setIsOverlayOpen}
          />
        </div>
      </div>
      <UserPinOverlay
        isOpen={isPinOverlayOpen}
        onClose={async () => {
          history.replaceState(null, "", "/user-home/");
          setIsOverlayOpen(false);
        }}
        pin={openPin}
      />
    </div>
  );
}
