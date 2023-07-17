import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = await getToken({ req });

    if (!token || !token?.email)
      return new Response("Unauthorised", { status: 401 });

    const { name, password, image } = await req.json();
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (image) {
      data.image = image;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const user = await db.user.update({
      where: {
        email: token.email,
      },
      data,
      select: {
        email: true,
        image: true,
        name: true,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response("Failed to update an account!", { status: 404 });
  }
};
