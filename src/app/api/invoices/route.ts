import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// POST: Generate an invoice for a booking (if not already exists)
export async function POST(req: Request) {
  const { booking_id, user_id, details, total_amount, currency, due_date } = await req.json();
  const supabase = await createClient();

  // Check if invoice already exists for this booking
  const { data: existing, error: existingError } = await supabase
    .from("invoices")
    .select("*")
    .eq("booking_id", booking_id)
    .single();

  if (existing) {
    return NextResponse.json(existing, { status: 200 });
  }

  // Insert new invoice
  const { data, error } = await supabase.from("invoices").insert([
    {
      booking_id,
      user_id,
      details,
      total_amount,
      currency: currency || "USD",
      due_date,
      status: "unpaid",
    },
  ]).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// GET: Get invoice by booking_id
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const booking_id = searchParams.get("booking_id");
  if (!booking_id) return NextResponse.json({ error: "booking_id required" }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("booking_id", booking_id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data, { status: 200 });
}
