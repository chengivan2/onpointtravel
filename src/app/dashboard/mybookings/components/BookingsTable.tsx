"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { generateInvoicePDF } from "@/utils/pdf";
import { toast } from "sonner";
import { FileText, Repeat, Download } from "lucide-react";

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white/40 dark:bg-green-900/30 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <svg className="absolute -top-10 -left-10 w-48 h-48 opacity-10 text-green-400" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="currentColor" /></svg>
        <FileText className="w-12 h-12 text-green-500 mb-4" />
        <p className="text-lg text-green-800 dark:text-green-100 font-semibold mb-2">No bookings found</p>
        <p className="text-gray-600 dark:text-green-200 mb-4">You haven't made any bookings yet. Start your adventure now!</p>
        <a
          href="/trips"
          className="mt-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-colors"
        >
          Book an Adventure
        </a>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 backdrop-blur-md border border-green-100/30 dark:border-green-900/30 overflow-x-auto">
      <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="currentColor" /></svg>
      <svg className="absolute bottom-0 left-0 w-40 h-40 opacity-10 text-green-200" fill="none" viewBox="0 0 160 160"><circle cx="80" cy="80" r="80" fill="currentColor" /></svg>
      <table className="min-w-full bg-transparent">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Trip Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Start Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">End Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const [loadingInvoice, setLoadingInvoice] = useState(false);
            const handleGenerateInvoice = async () => {
              setLoadingInvoice(true);
              try {
                const res = await fetch(`/api/invoices?booking_id=${booking.id}`);
                let invoiceData = await res.json();
                if (!invoiceData || invoiceData.error) {
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
                const user = { name: booking.user.name, email: booking.user.email };
                const doc = await generateInvoicePDF(invoiceData, booking, user);
                doc.save(`invoice-${invoiceData.invoice_number}.pdf`);
                toast.success("Invoice PDF downloaded");
              } catch (err) {
                toast.error("Failed to generate invoice");
              } finally {
                setLoadingInvoice(false);
              }
            };
            return (
              <>
                <tr
                  key={booking.id}
                  className={
                    "hover:bg-green-50/30 dark:hover:bg-green-900/40 transition-colors cursor-pointer" +
                    (expandedId === booking.id ? " bg-green-50/40 dark:bg-green-900/50" : "")
                  }
                  onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                >
                  <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100 font-semibold">
                    {booking.trip?.name || "Unknown Trip"}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                    {booking.start_date}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                    {booking.end_date}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                    {booking.status}
                  </td>
                  <td className="px-6 py-4 text-sm flex flex-col gap-2 min-w-[180px]">
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={e => { e.stopPropagation(); toast.info("Rebooking coming soon!"); }}
                        className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-lg hover:bg-green-200 border border-green-200 shadow"
                      >
                        <Repeat className="w-4 h-4" />
                        Book Again
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); handleGenerateInvoice(); }}
                        className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-lg hover:bg-green-200 border border-green-200 shadow"
                        disabled={loadingInvoice}
                      >
                        <Download className="w-4 h-4" />
                        {loadingInvoice ? "Generating..." : "Download PDF"}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === booking.id && (
                  <tr>
                    <td colSpan={5} className="bg-white/80 dark:bg-green-900/60 border-t border-green-100/40 dark:border-green-900/40 shadow-lg text-green-900 dark:text-green-100 p-6">
                      <div className="mb-2 font-bold">Booking Details</div>
                      <div>Trip: {booking.trip?.name}</div>
                      <div>Dates: {booking.start_date} to {booking.end_date}</div>
                      <div>People: {booking.number_of_people}</div>
                      <div>Status: {booking.status}</div>
                      <div>Total: ${booking.total_price}</div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}