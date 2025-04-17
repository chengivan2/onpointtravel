"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Booking {
  id: string;
  trip_id: string;
  number_of_people: number;
  status: string;
  payment_status: string;
  trip_name: {
    name: string;
  };
}

export default function AdminBookingsTable() {
  const supabase = createClient();
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const [bookings, setBookings] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/signin"); // Redirect to sign-in if no user is logged in
      }

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserRole(profile.role);
      }
    };

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          "id, trip_id, number_of_people, status, payment_status, trip_name:trips!inner(name)"
        ).returns<Booking[]>();

      if (error) {
        console.error("Error fetching bookings:", error.message);
      } else {
        const formattedData = data?.map((booking) => ({
          id: booking.id,
          trip_name: booking.trip_name?.name || "N/A",
          people: booking.number_of_people,
          status: booking.status,
          payment_status: booking.payment_status,
        }));
        setBookings(formattedData || []);
      }
    };

    fetchUserRole();
    fetchBookings();
  }, [supabase]);

  if (userRole !== "admin") {
    return null; // Render nothing if the user is not an admin
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] bg-white/80 dark:bg-green-900/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 dark:border-green-900/50 shadow-xl">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Trip Name</TableHead>
              <TableHead>People</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.trip_name}</TableCell>
                <TableCell>{booking.people}</TableCell>
                <TableCell>
                  <Select
                    value={booking.status}
                    onValueChange={async (value) => {
                      try {
                        const { error } = await supabase
                          .from("bookings")
                          .update({ status: value })
                          .eq("id", booking.id);

                        if (error) {
                          console.error(
                            "Error updating status:",
                            error.message
                          );
                        } else {
                          setBookings((prev) =>
                            prev.map((b) =>
                              b.id === booking.id ? { ...b, status: value } : b
                            )
                          );
                        }
                      } catch (err) {
                        console.error("Unexpected error:", err);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <Badge variant="outline" className="text-yellow-500">
                          Pending
                        </Badge>
                      </SelectItem>
                      <SelectItem value="confirmed">
                        <Badge variant="outline" className="text-green-500">
                          Confirmed
                        </Badge>
                      </SelectItem>
                      <SelectItem value="cancelled">
                        <Badge variant="outline" className="text-red-500">
                          Cancelled
                        </Badge>
                      </SelectItem>
                      <SelectItem value="completed">
                        <Badge variant="outline" className="text-blue-500">
                          Completed
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={booking.payment_status}
                    onValueChange={async (value) => {
                      try {
                        const { error } = await supabase
                          .from("bookings")
                          .update({ payment_status: value })
                          .eq("id", booking.id);

                        if (error) {
                          console.error(
                            "Error updating payment status:",
                            error.message
                          );
                        } else {
                          setBookings((prev) =>
                            prev.map((b) =>
                              b.id === booking.id
                                ? { ...b, payment_status: value }
                                : b
                            )
                          );
                        }
                      } catch (err) {
                        console.error("Unexpected error:", err);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">
                        <Badge variant="outline" className="text-red-500">
                          Unpaid
                        </Badge>
                      </SelectItem>
                      <SelectItem value="partially_paid">
                        <Badge variant="outline" className="text-yellow-500">
                          Partially Paid
                        </Badge>
                      </SelectItem>
                      <SelectItem value="paid">
                        <Badge variant="outline" className="text-green-500">
                          Paid
                        </Badge>
                      </SelectItem>
                      <SelectItem value="refund_pending">
                        <Badge variant="outline" className="text-orange-500">
                          Refund Pending
                        </Badge>
                      </SelectItem>
                      <SelectItem value="refunded">
                        <Badge variant="outline" className="text-blue-500">
                          Refunded
                        </Badge>
                      </SelectItem>
                      <SelectItem value="failed">
                        <Badge variant="outline" className="text-gray-500">
                          Failed
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
