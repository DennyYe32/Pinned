"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FilterBox from "./FilterBox";
import SortBox from "./SortBox";

const types = ["Restaurant", "Park", "Bar", "Museum", "Theater", "Zoo"];
const locations = ["Campus", "Downtown", "East Side", "Alps", "Epps Bridge"];

interface NavProps {
  sorts: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLoc: string[];
  setSelectedLoc: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Nav({
  sorts,
  setSort,
  selectedTypes,
  setSelectedTypes,
  selectedLoc,
  setSelectedLoc,
}: NavProps) {
  const router = useRouter();

  return (
    <div className="h-full">
      <button
        className="px-2 py-1 bg-white rounded font-inter font-bold text-red-500"
        onClick={() => router.push("/login")}
      >
        LOGIN
      </button>
      <br />
      <br />

      <Image
        className="mx-auto"
        src="/images/Pinned-Logo.png"
        alt={`Pinned Logo`}
        width={200}
        height={100}
        priority
      />

      <br />
      <br />
      <SortBox sorts={sorts} setSort={setSort} />
      <FilterBox
        title="Type"
        categories={types}
        selectedCategories={selectedTypes}
        setSelectedCategories={setSelectedTypes}
      />
      <FilterBox
        title="Locations"
        categories={locations}
        selectedCategories={selectedLoc}
        setSelectedCategories={setSelectedLoc}
      />
    </div>
  );
}
