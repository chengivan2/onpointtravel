"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { generateInvoicePDF } from "@/utils/pdf";

interface Booking {
  id: string;
  trip_id: string;
  start_date: string;
  end_date: string;
  number_of_people: number;
  total_price: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  trip: {
    id: string;
    name: string;
    destination_id: string;
    description: string;
  } | null;
}

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Trip Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Start Date
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            End Date
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Status
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </tbody>
    </table>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const [invoice, setInvoice] = useState<any | null>(null);
  const [loadingInvoice, setLoadingInvoice] = useState(false);

  const handleGenerateInvoice = async () => {
    setLoadingInvoice(true);
    try {
      // Fetch or create invoice for this booking
      const res = await fetch(`/api/invoices?booking_id=${booking.id}`);
      let invoiceData = await res.json();
      if (!invoiceData || invoiceData.error) {
        // Try to create if not found
        const createRes = await fetch("/api/invoices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            booking_id: booking.id,
            user_id: booking.user.id,
            details: booking,
            total_amount: booking.total_price,
            currency: "USD",
            due_date: null,
          }),
        });
        invoiceData = await createRes.json();
      }
      setInvoice(invoiceData);
      // Download PDF
      const user = { name: booking.user.name, email: booking.user.email };
      const doc = generateInvoicePDF(invoiceData, booking, user);
      doc.save(`invoice-${invoiceData.invoice_number}.pdf`);
    } catch (err) {
      alert("Failed to generate invoice");
    } finally {
      setLoadingInvoice(false);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.trip?.name || "Unknown Trip"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.start_date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.end_date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.status}
      </td>
      <td className="px-6 py-4 text-sm">
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              View Trip
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{booking.trip?.name || "Unknown Trip"}</DialogTitle>
              <DialogDescription>
                {booking.trip?.description || "No description available."}
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => alert("Booking trip again!")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
            >
              Go Again
            </button>
            <button
              onClick={handleGenerateInvoice}
              className="bg-glassmorphism border border-green-400 text-green-900 dark:text-green-100 px-4 py-2 rounded-lg mt-4 shadow-lg hover:bg-green-100/40 dark:hover:bg-green-900/40 backdrop-blur-md"
              disabled={loadingInvoice}
            >
              {loadingInvoice ? "Generating..." : "Download Invoice PDF"}
            </button>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
}