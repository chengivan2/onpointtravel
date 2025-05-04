import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Define the expected body shape
interface UpdateProfileRequestBody {
  first_name: string;
  last_name: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // Parse the request body
    const body: UpdateProfileRequestBody = await req.json();

    const { first_name, last_name, email } = body;

    // Ensure user ID is provided (modify this part based on your auth logic)
    const userId = req.headers.get("x-user-id"); // Example: extract from headers
    if (!userId) {
      return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .update({ first_name, last_name, email })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}