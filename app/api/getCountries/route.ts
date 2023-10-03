import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { countries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const query = await db.query.countries.findFirst({
      where: eq(countries.id, 1),
      //   with: {
      //     cities: true,
      //   },
    });
    console.log(query);
    return NextResponse.json(query);
  } catch (error) {
    console.error(error);
    return new NextResponse("INSERT_ERROR", { status: 400 });
  }
}
