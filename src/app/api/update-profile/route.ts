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

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const userId = user.id;

    // Parse the request body
    const body: UpdateProfileRequestBody = await req.json();
    const { first_name, last_name, email } = body;

    // Update the user's profile in the database
    const { data, error } = await supabase
      .from("users")
      .update({ first_name, last_name, email })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}