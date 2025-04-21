import { NextResponse } from "next/server";
import { supabaseService } from "@/utils/supabase/srk";

export async function POST(request: Request) {
  const { id, payment_status } = await request.json();

  const { error } = await supabaseService
    .from("bookings")
    .update({ payment_status })
    .eq("id", id);

  if (error) {
    console.error("Error updating payment status:", error.message);
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}