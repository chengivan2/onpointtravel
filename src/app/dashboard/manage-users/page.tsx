import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { fetchUsersServer } from "./fetchUsersServer";
import ManageUsersTable from "./ManageUsersTable";
import { Metadata } from "next";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Manage Users - OnPoint Dashboard",
  description: "Admin and agent users can manage customers",
};

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
  const isAdmin = role === "admin";

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
        {isAdmin && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              type="button"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white shadow-xl transition-all duration-300 hover:translate-x-[-120px] focus:translate-x-[-120px] hover:w-14 focus:w-14 w-40"
              onClick={() => {
                // Custom event or state to trigger add user dialog in ManageUsersTable
                const event = new CustomEvent("openAddUserDialog");
                window.dispatchEvent(event);
              }}
              aria-label="Add user"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-200">
                Add user
              </span>
            </button>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
