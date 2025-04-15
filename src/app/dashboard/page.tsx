import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import data from "./data.json";
import { Metadata } from "next";
import { DashboardSidebar } from "./components/sidebar/DashboardSideBar";
import AdminDataSlotCards from "./components/admincomponents/AdminDataSlotCards";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminBookingsChart from "./components/admincomponents/AdminBookingsChart";

export const metadata: Metadata = {
  title: "OnPoint Dashboard",
  description: "Manage your OnPoint account",
};

export default async function OnPointDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }
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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full ">
                <h2>Hello </h2>
              </div>
              <AdminDataSlotCards />
              <div className="px-4 lg:px-6">
                <AdminBookingsChart />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
