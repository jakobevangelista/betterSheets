import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { countries } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.insert(countries).values({ name: "test" });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("INSERT_ERROR", { status: 400 });
  }
}
