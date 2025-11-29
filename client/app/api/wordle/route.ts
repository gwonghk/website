import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.frontendexpert.io/api/fe/wordle-words");
  const data = await res.json();
  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
