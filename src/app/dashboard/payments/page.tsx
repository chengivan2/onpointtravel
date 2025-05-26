import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import PaymentsCard from "./components/user/PaymentsCard";
import PaymentsAreaChart from "./components/user/PaymentsAreaChart";
import AgentPaymentsCard from "./components/agent/AgentPaymentsCard";
import AgentPaymentsAreaChart from "./agentcomponents/AgentPaymentsAreaChart";
import AdminPaymentsCard from "../payments/admincomponents/AdminPaymentsCard";
import AdminPaymentsAreaChart from "../payments/admincomponents/AdminPaymentsAreaChart";
import AdminPaymentsStats from "../payments/admincomponents/AdminPaymentsStats";
import { supabaseService } from "@/utils/supabase/srk";

export const metadata: Metadata = {
  title: "Payments | OnPoint Dashboard",
  description: "View your payment history and stats",
};

export default async function PaymentsDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  const firstName = `${profile?.first_name || ""}`;
  const role = profile?.role;
  const isAdmin = role === "admin";
  const isAgent = role === "agent";

  // --- USER PAYMENTS ---
  type UserPayment = {
    id: string;
    amount: number;
    currency: string;
    status: string;
    booking_id: string;
    processed_at: string;
    trip_name: string;
  };
  let userPayments: UserPayment[] = [];
  let userPaymentsAreaData: { month: string; total: number }[] = [];
  if (!isAdmin && !isAgent) {
    // Get all payments for this user (via bookings)
    const { data: bookings = [] } = await supabase
      .from("bookings")
      .select("id, trip_id, start_date, end_date, number_of_people, total_price, status, trip:trips(name)")
      .eq("user_id", user.id);
    const bookingIds: string[] = (bookings ?? []).map((b: any) => b.id);
    const { data: payments = [] } = bookingIds.length
      ? await supabase
          .from("payments")
          .select("id, amount, currency, status, booking_id, processed_at")
          .in("booking_id", bookingIds)
      : { data: [] };
    userPayments = (payments ?? []).map((p: any) => {
      const booking = (bookings ?? []).find((b: any) => b.id === p.booking_id);
      const trip = Array.isArray(booking?.trip) ? booking?.trip[0] : booking?.trip;
      return {
        ...p,
        trip_name: trip?.name ?? "-",
      };
    });
    // Area chart: payments per month (last 6 months)
    const now = new Date();
    userPaymentsAreaData = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const month = d.toLocaleString("default", { month: "short", year: "2-digit" });
      const total = userPayments
        .filter((p) => {
          const pd = new Date(p.processed_at);
          return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
        })
        .reduce((sum, p) => sum + (p.amount ?? 0), 0);
      return { month, total };
    });
  }

  // --- AGENT PAYMENTS ---
  type AgentPayment = {
    id: string;
    amount: number;
    currency: string;
    status: string;
    booking_id: string;
    processed_at: string;
    trip_name: string;
    client_name: string;
  };
  let agentOwnPayments: AgentPayment[] = [];
  let agentClientPayments: AgentPayment[] = [];
  let agentPaymentsAreaData: { month: string; total: number }[] = [];
  if (isAgent && !isAdmin) {
    // Use supabaseService for agent queries
    const { data: ownBookings = [] } = await supabaseService
      .from("bookings")
      .select("id, trip_id, start_date, end_date, number_of_people, total_price, status, trip:trips(name)")
      .eq("user_id", user.id);
    const ownBookingIds: string[] = (ownBookings ?? []).map((b: any) => b.id);
    const { data: ownPayments = [] } = ownBookingIds.length
      ? await supabaseService
          .from("payments")
          .select("id, amount, currency, status, booking_id, processed_at")
          .in("booking_id", ownBookingIds)
      : { data: [] };
    agentOwnPayments = (ownPayments ?? []).map((p: any) => {
      const booking = (ownBookings ?? []).find((b: any) => b.id === p.booking_id);
      const trip = Array.isArray(booking?.trip) ? booking?.trip[0] : booking?.trip;
      return {
        ...p,
        trip_name: trip?.name ?? "-",
        client_name: "You",
      };
    });
    // Bookings created for others
    const { data: clientBookings = [] } = await supabaseService
      .from("bookings")
      .select("id, trip_id, start_date, end_date, number_of_people, total_price, status, trip:trips(name), user:users(first_name, last_name, email)")
      .eq("created_by", user.id)
      .neq("user_id", user.id);
    const clientBookingIds: string[] = (clientBookings ?? []).map((b: any) => b.id);
    const { data: clientPayments = [] } = clientBookingIds.length
      ? await supabaseService
          .from("payments")
          .select("id, amount, currency, status, booking_id, processed_at")
          .in("booking_id", clientBookingIds)
      : { data: [] };
    agentClientPayments = (clientPayments ?? []).map((p: any) => {
      const booking = (clientBookings ?? []).find((b: any) => b.id === p.booking_id);
      const trip = Array.isArray(booking?.trip) ? booking?.trip[0] : booking?.trip;
      const u = Array.isArray(booking?.user) ? booking?.user[0] : booking?.user;
      return {
        ...p,
        trip_name: trip?.name ?? "-",
        client_name: u ? ((`${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || u.email) ?? "-") : "-",
      };
    });
    // Area chart: payments per month (last 6 months)
    const now = new Date();
    const allAgentPayments: AgentPayment[] = [...agentOwnPayments, ...agentClientPayments];
    agentPaymentsAreaData = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const month = d.toLocaleString("default", { month: "short", year: "2-digit" });
      const total = allAgentPayments
        .filter((p) => {
          const pd = new Date(p.processed_at);
          return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
        })
        .reduce((sum, p) => sum + (p.amount ?? 0), 0);
      return { month, total };
    });
  }

  // --- ADMIN PAYMENTS ---
  type AdminPayment = {
    id: string;
    amount: number;
    currency: string;
    status: string;
    booking_id: string;
    processed_at: string;
    trip_name: string;
    user_name: string;
    agent_name?: string | null;
  };
  let adminPayments: AdminPayment[] = [];
  let adminPaymentsAreaData: { month: string; total: number }[] = [];
  let adminStats: { totalPayments: number; totalAmount: number; totalUsers: number; totalAgents: number } = { totalPayments: 0, totalAmount: 0, totalUsers: 0, totalAgents: 0 };
  if (isAdmin) {
    try {
      console.error('[ADMIN] Fetching all payments...');
      const { data: allPayments = [], error: paymentsError } = await supabaseService
        .from("payments")
        .select(`id, amount, currency, status, booking_id, processed_at, booking:bookings!payments_booking_id_fkey(trip:trips(name), user:users(first_name, last_name, email))`);
      if (paymentsError) console.error('[ADMIN] Payments fetch error:', paymentsError);
      console.error('[ADMIN] allPayments:', allPayments);
      adminPayments = (allPayments ?? []).map((p: any) => {
        const booking = p.booking ?? {};
        let trip = booking.trip;
        if (Array.isArray(trip)) trip = trip[0];
        let u = booking.user;
        if (Array.isArray(u)) u = u[0];
        const tripName = trip?.name ?? "-";
        const userName = u ? ((`${u.first_name ?? ""} ${u.last_name ?? ""}`.trim()) || (u.email ?? "-")) : "-";
        return {
          ...p,
          trip_name: tripName,
          user_name: userName,
          agent_name: null, // Not joined for now
        };
      });
      console.error('[ADMIN] adminPayments:', adminPayments);
      // Area chart: payments per month (last 6 months)
      const now = new Date();
      adminPaymentsAreaData = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        const month = d.toLocaleString("default", { month: "short", year: "2-digit" });
        const total = adminPayments
          .filter((p) => {
            const pd = new Date(p.processed_at);
            return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
          })
          .reduce((sum, p) => sum + (p.amount ?? 0), 0);
        return { month, total };
      });
      console.error('[ADMIN] adminPaymentsAreaData:', adminPaymentsAreaData);
      // Stats
      adminStats.totalPayments = adminPayments.length;
      adminStats.totalAmount = adminPayments.reduce((sum, p) => sum + (p.amount ?? 0), 0);
      // Users
      const { count: totalUsers = 0, error: usersError } = await supabaseService.from("users").select("id", { count: "exact" });
      if (usersError) console.error('[ADMIN] Users count error:', usersError);
      adminStats.totalUsers = totalUsers ?? 0;
      // Agents
      const { count: totalAgents = 0, error: agentsError } = await supabaseService.from("users").select("id", { count: "exact" }).eq("role", "agent");
      if (agentsError) console.error('[ADMIN] Agents count error:', agentsError);
      adminStats.totalAgents = totalAgents ?? 0;
      console.error('[ADMIN] adminStats:', adminStats);
    } catch (err) {
      console.error('[ADMIN] Exception:', err);
    }
  }

  // --- FILTERS & SEARCH (Client-side) ---
  // These would be implemented in the card/chart components using useState/useMemo for filtering and searching.
  // Example for AdminPaymentsCard (pseudo):
  // const [search, setSearch] = useState("");
  // const [statusFilter, setStatusFilter] = useState("");
  // const filteredPayments = useMemo(() => adminPayments.filter(...), [adminPayments, search, statusFilter]);
  // Pass filteredPayments to AdminPaymentsCard.

  // For empty charts, the chart components already show an empty state if data is empty.

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col px-3 gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hello, {firstName} 👋
                  </h2>
                  <p className="text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200">
                    Here are your payment records and stats.
                  </p>
                </div>
              </div>
              {/* Admin view */}
              {isAdmin && (
                <>
                  <AdminPaymentsStats {...adminStats} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <AdminPaymentsCard payments={adminPayments} />
                    <AdminPaymentsAreaChart data={adminPaymentsAreaData} />
                  </div>
                </>
              )}
              {/* Agent view */}
              {isAgent && !isAdmin && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <AgentPaymentsCard payments={agentOwnPayments} forOwnBookings />
                    <AgentPaymentsCard payments={agentClientPayments} />
                  </div>
                  <div className="mt-6">
                    <AgentPaymentsAreaChart data={agentPaymentsAreaData} />
                  </div>
                </>
              )}
              {/* User view */}
              {!isAdmin && !isAgent && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <PaymentsCard payments={userPayments} />
                    <PaymentsAreaChart data={userPaymentsAreaData} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
