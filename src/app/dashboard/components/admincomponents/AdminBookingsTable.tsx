"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";
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

export default function AdminBookingsTable({ bookings }: { bookings: any[] }) {
  const supabase = createClient();

  const [localBookings, setLocalBookings] = React.useState(bookings);

  const handleStatusChange = async (id: string, value: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: value })
        .eq("id", id);

      if (error) {
        console.error("Error updating status:", error.message);
      } else {
        setLocalBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: value } : b))
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handlePaymentStatusChange = async (id: string, value: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ payment_status: value })
        .eq("id", id);

      if (error) {
        console.error("Error updating payment status:", error.message);
      } else {
        setLocalBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, payment_status: value } : b))
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] bg-white/80 dark:bg-green-900/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 dark:border-green-900/50 shadow-xl">
        <Table>
          <TableHeader className="bg-muted dark:bg-green-900/50">
            <TableRow>
              <TableHead>Trip Name</TableHead>
              <TableHead>People</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Booked By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.trip_name}</TableCell>
                <TableCell>{booking.people}</TableCell>
                <TableCell>
                  <Select
                    value={booking.status}
                    onValueChange={(value) =>
                      handleStatusChange(booking.id, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="text-[#F5F5F5]">
                      <SelectItem value="pending">
                        <Badge variant="outline" className="bg-yellow-500">
                          Pending
                        </Badge>
                      </SelectItem>
                      <SelectItem value="confirmed">
                        <Badge variant="outline" className="bg-green-500">
                          Confirmed
                        </Badge>
                      </SelectItem>
                      <SelectItem value="ongoing">
                        <Badge variant="outline" className="bg-green-300">
                          Ongoing
                        </Badge>
                      </SelectItem>
                      <SelectItem value="cancelled">
                        <Badge variant="outline" className="bg-red-500">
                          Cancelled
                        </Badge>
                      </SelectItem>
                      <SelectItem value="completed">
                        <Badge variant="outline" className="bg-blue-500">
                          Completed
                        </Badge>
                      </SelectItem>
                      <SelectItem value="refunded">
                        <Badge variant="outline" className="bg-red-300">
                          Refunded
                        </Badge>
                      </SelectItem>
                      <SelectItem value="on_hold">
                        <Badge variant="outline" className="bg-gray-500">
                          On hold
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={booking.payment_status}
                    onValueChange={(value) =>
                      handlePaymentStatusChange(booking.id, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">
                        <Badge variant="outline" className="bg-red-500">
                          Unpaid
                        </Badge>
                      </SelectItem>
                      <SelectItem value="partially_paid">
                        <Badge variant="outline" className="bg-yellow-500">
                          Partially Paid
                        </Badge>
                      </SelectItem>
                      <SelectItem value="paid">
                        <Badge variant="outline" className="bg-green-500">
                          Paid
                        </Badge>
                      </SelectItem>
                      <SelectItem value="refund_pending">
                        <Badge variant="outline" className="bg-orange-500">
                          Refund Pending
                        </Badge>
                      </SelectItem>
                      <SelectItem value="refunded">
                        <Badge variant="outline" className="bg-blue-500">
                          Refunded
                        </Badge>
                      </SelectItem>
                      <SelectItem value="failed">
                        <Badge variant="outline" className="bg-gray-500">
                          Failed
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{booking.booked_by}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
