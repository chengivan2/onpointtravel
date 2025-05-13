import { NextResponse } from "next/server";
import { FetchBookings } from "@/app/dashboard/bookings/components/FetchBookings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  try {
    const bookings = await FetchBookings(page, limit);
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}