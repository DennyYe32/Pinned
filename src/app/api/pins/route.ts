import connectMongoDB from "@/libs/mongodb";
import Pin from "@/models/pinSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    name,
    description,
    googleUrl,
    type,
    area,
    address,
    imageUrl,
    lat,
    lon,
  } = await request.json();
  await connectMongoDB();
  await Pin.create({
    name,
    description,
    googleUrl,
    type,
    area,
    address,
    imageUrl,
    lat,
    lon,
  });
  return NextResponse.json(
    { message: "Pin added successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const pins = await Pin.find();
  return NextResponse.json({ pins });
}
