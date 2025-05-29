import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/utils/supabase/srk";

export async function POST(req: NextRequest) {
  const { first_name, last_name, email, role, password } = await req.json();
  if (!first_name || !last_name || !email || !role || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
  }
  // Create user with service role key
  const { error, data } = await supabaseService.auth.admin.createUser({
    email,
    password,
    user_metadata: { first_name, last_name, role },
    email_confirm: true,
  });
  if (error || !data?.user) {
    return NextResponse.json({ error: error?.message || "Failed to create user" }, { status: 500 });
  }
  return NextResponse.json({ user: data.user }, { status: 201 });
}
