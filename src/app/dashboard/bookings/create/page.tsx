import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import { FetchUsers } from "./FetchUsers";
import { AdminAgentBookingForm } from "./AdminAgentBookingForm";

export const metadata: Metadata = {
  title: "OnPoint Dashboard",
  description: "Create a booking for a client",
};

export default async function AdminAgentCreateBookingPage() {
  const supabase = await createClient();

  // Check session and user
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    redirect("/signin");
  }

  const { user } = session;

  // Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    redirect("/signin");
  }

  const firstName = `${profile?.first_name || ""}`;
  const isAdmin = profile?.role === "admin";
  const isAgent = profile?.role === "agent";

  // Redirect if the user is neither an admin nor an agent
  if (!isAdmin && !isAgent) {
    redirect("/dashboard");
  }

  const usersResult = await FetchUsers();

  if (usersResult.error) {
    return (
      <SidebarProvider>
        <DashboardSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col items-center justify-center min-h-[40vh]">
            <div className="bg-white/40 dark:bg-green-900/30 rounded-xl p-8 shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-2 text-red-700 dark:text-red-300">
                Error
              </h2>
              <p className="text-gray-700 dark:text-gray-200">
                {usersResult.error}
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const users = usersResult.users;

  return (
    <SidebarProvider>
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col px-3 lg:px-6 gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full px-4 lg:px-6 gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hello, {firstName} 👋
                  </h2>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Create a booking below.
                  </p>
                </div>
              </div>

              <AdminAgentBookingForm users={users} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
