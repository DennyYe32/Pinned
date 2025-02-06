import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    const hashedPaswword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPaswword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured while registering user.",
      },
      { status: 500 }
    );
  }
}
