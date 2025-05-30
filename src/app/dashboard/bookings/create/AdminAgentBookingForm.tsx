"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  userId: z.string().nonempty("Please select a user"),
  tripId: z.string().nonempty("Please select a trip"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  people: z.number().int().min(1, "At least 1 person required"),
  addons: z.record(z.string(), z.number().int().min(0)).optional(),
  specialRequests: z.string().optional(),
});

export function AdminAgentBookingForm({ users }: { users: { id: string; email: string; name: string }[] }) {
  const supabase = createClient();
  const router = useRouter();

  const [trips, setTrips] = useState<{ id: string; name: string; price: number }[]>([]);
  const [addons, setAddons] = useState<{ id: string; type: string; price: number }[]>([]);
  const [basePrice, setBasePrice] = useState(0);
  const [addonPrice, setAddonPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [showResult, setShowResult] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      people: 1,
      addons: {},
    },
  });

  const formData = watch();

  // Restrict access to admins and agents
  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin" && profile?.role !== "agent") {
        router.push("/dashboard");
      }
    };

    checkAccess();
  }, [supabase, router]);

  // Fetch trips for selection
  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("trips").select("id, name, price");
      if (error) {
        toast.error("Failed to fetch trips. Please try again.");
      } else {
        setTrips(data || []);
      }
    };

    fetchTrips();
  }, [supabase]);

  // Fetch addons for selection
  useEffect(() => {
    const fetchAddons = async () => {
      const { data, error } = await supabase.from("addons").select("id, type, price");
      if (error) {
        toast.error("Failed to fetch addons. Please try again.");
      } else {
        setAddons(data || []);
      }
    };

    fetchAddons();
  }, [supabase]);

  // Calculate prices
  useEffect(() => {
    const calculatePrices = () => {
      const selectedTrip = trips.find((trip) => trip.id === formData.tripId);
      if (!selectedTrip || !formData.people || !formData.startDate || !formData.endDate) return;

      // Calculate base price
      const calculatedBasePrice = selectedTrip.price * formData.people;

      // Calculate addon price (per unit, not per night or day)
      const calculatedAddonPrice = Object.entries(formData.addons || {}).reduce(
        (acc, [type, quantity]) => {
          const addon = addons.find((a) => a.type === type);
          return acc + (addon?.price || 0) * quantity;
        },
        0
      );

      // Update state
      setBasePrice(calculatedBasePrice);
      setAddonPrice(calculatedAddonPrice);
      setTotalPrice(calculatedBasePrice + calculatedAddonPrice);
    };

    calculatePrices();
  }, [formData, trips, addons]);

  const onSubmit = async (data: any) => {
    setProcessing(true);
    try {
      const bookingResponse = await supabase
        .from("bookings")
        .insert([
          {
            user_id: data.userId,
            trip_id: data.tripId,
            start_date: data.startDate.toISOString(),
            end_date: data.endDate.toISOString(),
            number_of_people: data.people,
            total_price: totalPrice,
            status: "pending",
            payment_status: "unpaid",
            special_requests: data.specialRequests,
          },
        ])
        .select()
        .single();

      if (bookingResponse.error) throw bookingResponse.error;

      // Create initial payment record
      const paymentResponse = await supabase.from("payments").insert([
        {
          booking_id: bookingResponse.data.id,
          amount: totalPrice,
          currency: "USD",
          payment_method: "cash",
          status: "unpaid",
        },
      ]);

      if (paymentResponse.error) throw paymentResponse.error;

      // Handle addons with quantity
      const addonEntries = Object.entries(data.addons || {})
        .filter(([_, quantity]) => Number(quantity) > 0)
        .map(([type, quantity]) => ({
          booking_id: bookingResponse.data.id,
          addon_type: type,
          description: `${type.replace("_", " ")} rental`,
          price: addons.find((a) => a.type === type)?.price || 0,
          quantity: Number(quantity),
        }));

      if (addonEntries.length > 0) {
        const addonResponse = await supabase.from("booking_addons").insert(addonEntries);
        if (addonResponse.error) throw addonResponse.error;
      }

      setShowResult(true);
      reset();
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      setShowResult(false);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white/60 dark:bg-green-900/20 rounded-xl p-8 border border-green-100/30 dark:border-green-900/30 mt-12">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">Create Booking</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Selection */}
        <div>
          <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Select User</label>
          <select
            {...register("userId")}
            className="cursor-pointer w-full px-4 py-2 rounded-lg border dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="" className="cursor-pointer">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id} className="cursor-pointer dark:bg-green-900/50">
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
        </div>

        {/* Trip Selection */}
        <div>
          <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Select Trip</label>
          <select
            {...register("tripId")}
            className="cursor-pointer w-full px-4 py-2 rounded-lg border dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="" className="cursor-pointer">Select a trip</option>
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id} className="cursor-pointer dark:bg-green-900/50">
                {trip.name}
              </option>
            ))}
          </select>
          {errors.tripId && <p className="text-red-500 text-sm mt-1">{errors.tripId.message}</p>}
        </div>

        {/* Other Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Start Date</label>
            <input
              type="date"
              {...register("startDate", { valueAsDate: true })}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">End Date</label>
            <input
              type="date"
              {...register("endDate", { valueAsDate: true })}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Number of People</label>
          <input
            type="number"
            {...register("people", { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
            min="1"
          />
          {errors.people && <p className="text-red-500 text-sm mt-1">{errors.people.message}</p>}
        </div>

        {/* Addons */}
        <div>
          <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Addons</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div key={addon.type} className="p-4 bg-white/60 dark:bg-green-900/20 rounded-lg border border-green-200/30 dark:border-green-700/30">
                <label className="flex items-center justify-between">
                  <span className="text-green-700 dark:text-green-300 capitalize">{addon.type.replace("_", " ")}</span>
                  <input
                    type="number"
                    {...register(`addons.${addon.type}`, { valueAsNumber: true })}
                    className="w-20 px-3 py-1 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
                    min="0"
                    defaultValue={0}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-green-200 dark:border-green-700 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700 dark:text-green-300">Base Price</span>
            <span className="text-sm text-green-700 dark:text-green-300">${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700 dark:text-green-300">Addon Price</span>
            <span className="text-sm text-green-700 dark:text-green-300">${addonPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-green-800 dark:text-green-100">Total Price</span>
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
        >
          {processing ? "Processing..." : "Create Booking"}
        </button>
      </form>

      <Dialog open={showResult !== null} onOpenChange={() => setShowResult(null)}>
        <DialogContent className="bg-white/70 dark:bg-green-900/30 backdrop-blur-md border-green-200/50 dark:border-green-700/50 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-green-900 dark:text-green-100">
              {showResult ? "Booking Successful" : "Booking Failed"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <div>
              {showResult ? (
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <p className="mt-4 text-green-800 dark:text-green-200 text-center">
              {showResult
                ? "The booking has been successfully created!"
                : "There was an error creating the booking. Please try again."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminAgentBookingsView({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Start from page 1 since initialBookings is page 0
  const LIMIT = 15; // Number of bookings to load per page

  const loadMoreBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?page=${page}&limit=${LIMIT}`);
      const newBookings = await res.json();

      if (newBookings.length < LIMIT) {
        setHasMore(false); // No more bookings to load
      }

      setBookings((prev) => [...prev, ...newBookings]); // Append new bookings to the existing list
      setPage((prev) => prev + 1); // Increment the page number
    } catch (err) {
      toast.error("Failed to load more bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking status");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      toast.error("Failed to update booking status. Please try again.");
    }
  };

  return (
    <div className="p-6">
      {/* Add Booking Button */}
      <div className="flex justify-end mb-6">
        <Link href="/dashboard/bookings/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg">
            Add Booking
          </button>
        </Link>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white/30 dark:bg-green-900/30 rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Trip Name</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">People</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{booking.trip_name}</td>
                <td className="px-4 py-2">{booking.client}</td>
                <td className="px-4 py-2">{booking.people}</td>
                <td className="px-4 py-2">
                  <select
                    title="Booking Status"
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="w-full px-2 py-1 border rounded-lg bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md backdrop-blur-md"
                  >
                    <option
                      value="pending"
                      className="bg-yellow-100/50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full px-2 py-1"
                    >
                      Pending
                    </option>
                    <option
                      value="confirmed"
                      className="bg-green-100/50 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full px-2 py-1"
                    >
                      Confirmed
                    </option>
                    <option
                      value="ongoing"
                      className="bg-blue-100/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full px-2 py-1"
                    >
                      Ongoing
                    </option>
                    <option
                      value="cancelled"
                      className="bg-red-100/50 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full px-2 py-1"
                    >
                      Cancelled
                    </option>
                    <option
                      value="completed"
                      className="bg-purple-100/50 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full px-2 py-1"
                    >
                      Completed
                    </option>
                    <option
                      value="refunded"
                      className="bg-pink-100/50 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 rounded-full px-2 py-1"
                    >
                      Refunded
                    </option>
                    <option
                      value="on_hold"
                      className="bg-gray-100/50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 rounded-full px-2 py-1"
                    >
                      On Hold
                    </option>
                  </select>
                </td>
                <td className="px-4 py-2 capitalize">{booking.payment_status}</td>
                <td className="px-4 py-2">{new Date(booking.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreBookings}
            disabled={loading}
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
