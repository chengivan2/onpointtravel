import { NextResponse } from "next/server";
import { supabaseService } from "@/utils/supabase/srk";

export async function POST(request: Request) {
  const { id, status } = await request.json();

  const { error } = await supabaseService
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating status:", error.message);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}