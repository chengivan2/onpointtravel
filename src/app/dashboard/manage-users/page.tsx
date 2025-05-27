import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
import { fetchUsersServer } from "./fetchUsersServer";

const ManageUsersTable = dynamic(() => import("./ManageUsersTable"), { ssr: false });

export default async function ManageUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: profile } = await supabase
    .from("users")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();
  const role = profile?.role;
  if (role !== "admin" && role !== "agent") redirect("/dashboard");

  const { users: initialUsers, error } = await fetchUsersServer();

  return (
    <SidebarProvider
      style={
        {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }
    >
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col px-3 lg:px-6 gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Manage Users</h2>
                  <p className="text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200">
                    Search, filter, sort, edit, and (admin only) delete users.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <ManageUsersTable initialUsers={initialUsers} role={role} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
