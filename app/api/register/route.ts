import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) return new Response("Unauthorised", { status: 401 });

    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password)
      return new Response("Please provide all the data", { status: 404 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response("Failed to create an account!", { status: 404 });
  }
};
