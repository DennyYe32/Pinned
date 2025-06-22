import connectMongoDB from "@/libs/mongodb";
import Pin from "@/models/pinSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await connectMongoDB();
  const pin = await Pin.findById(id);
  if (!pin) {
    return NextResponse.json({ message: "Pin not found" }, { status: 404 });
  }
  return NextResponse.json({ pin });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await request.json();
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
  } = body;

  await connectMongoDB();
  await Pin.findByIdAndUpdate(id, {
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

  return NextResponse.json({ message: "Pin updated" }, { status: 200 });
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();
  const deleted = await Pin.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Pin not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Pin deleted" }, { status: 200 });
}
