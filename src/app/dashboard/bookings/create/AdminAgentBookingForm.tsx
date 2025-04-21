"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { supabaseService } from "@/utils/supabase/srk";
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

const formSchema = z.object({
  userId: z.string().nonempty("Please select a user"),
  tripId: z.string().nonempty("Please select a trip"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  people: z.number().int().min(1, "At least 1 person required"),
  addons: z.record(z.string(), z.number().int().min(0)).optional(),
  specialRequests: z.string().optional(),
});

export function AdminAgentBookingForm() {
  const supabase = createClient();
  const router = useRouter();

  const [users, setUsers] = useState<{ id: string; email: string; name: string }[]>([]);
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

  // Fetch users for selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabaseService.auth.admin.listUsers();

        if (error) {
          console.error("Error fetching users:", error.message);
        } else {
          const formattedUsers = data.users.map((user) => ({
            id: user.id,
            email: user.email || "",
            name: `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim() || user.email || "",
          }));
          setUsers(formattedUsers);
        }
      } catch (err) {
        console.error("Unexpected error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Fetch trips for selection
  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("trips").select("id, name, price");
      if (error) {
        console.error("Error fetching trips:", error.message);
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
        console.error("Error fetching addons:", error.message);
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

      const nights = Math.ceil(
        (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const calculatedBasePrice = selectedTrip.price * formData.people;

      const calculatedAddonPrice = Object.entries(formData.addons || {}).reduce(
        (acc, [type, quantity]) => {
          const addon = addons.find((a) => a.type === type);
          return acc + (addon?.price || 0) * quantity * nights;
        },
        0
      );

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
      console.error("Booking error:", error);
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
            className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
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
            className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
          >
            <option value="">Select a trip</option>
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
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
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
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
