import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const items = await db.collection("items").find({}).toArray();

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";

  if (query) {
    const data = [
      { id: 1, name: "Item One" },
      { id: 2, name: "Item Two" },
      { id: 3, name: "Item Three" },
    ];

    return new Response(
      JSON.stringify({
        result: `You searched for: ${query}`,
        data: data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.json({ items });
}
