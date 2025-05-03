import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";

// Define the expected body shape
interface UpdateProfileRequestBody {
  first_name: string;
  last_name: string;
  phone: string;
  bio: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const supabase = await createClient();

      // Validate and typecast the request body
      const { first_name, last_name, phone, bio } = req.body as UpdateProfileRequestBody;

      // Ensure user ID is provided (modify this part based on your auth logic)
      const userId = req.headers["x-user-id"]; // Example: extract from headers
      if (!userId) {
        return res.status(400).json({ error: "User ID is missing" });
      }

      const { data, error } = await supabase
        .from("users")
        .update({ first_name, last_name, phone, bio })
        .eq("id", userId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ data });
    } catch (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}