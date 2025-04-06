"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import * as z from "zod";
import type { Database } from "@/types/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";

const vehicleTypes = [
  "land_cruiser",
  "safari_van",
  "suv",
  "taxi",
  "personal_rental",
  "sedan",
] as const;

const formSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    people: z.number().int().min(1, "At least 1 person required"),
    addons: z.record(z.enum(vehicleTypes), z.number().int().min(0)).optional(),
    specialRequests: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      if (data.startDate < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start date must be in the future",
          path: ["startDate"],
        });
      }
      if (data.endDate <= data.startDate!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be after start date",
          path: ["endDate"],
        });
      }
    }
  });

export function BookingForm({
  trip,
}: {
  trip: Database["public"]["Tables"]["trips"]["Row"];
}) {
  const supabase = createClient();
  const [addons, setAddons] = useState<Database["public"]["Tables"]["addons"]["Row"][]>([]);
  const [totalPrice, setTotalPrice] = useState(0); // Initial total price set to 0
  const [basePrice, setBasePrice] = useState(0); // Initial base price set to 0
  const [addonPrice, setAddonPrice] = useState(0); // Initial addon price set to 0
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
      addons: {}, // Default addons set to an empty object
    },
  });

  const formData = watch();

  // Fetch addons for the trip
  useEffect(() => {
    const fetchAddons = async () => {
      const { data, error } = await supabase.from("addons").select("*");
      if (error) {
        console.error("Error fetching addons:", error);
      } else {
        setAddons(data || []);
      }
    };

    fetchAddons();
  }, [supabase]);

  // Calculate prices
  useEffect(() => {
    const calculatePrices = () => {
      if (!trip.price || !formData.startDate || !formData.endDate) return;

      const nights = Math.ceil(
        (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const calculatedBasePrice = trip.price * formData.people * nights;

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
  }, [formData, trip.price, addons]);

  const onSubmit = async (data: any) => {
    setProcessing(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        window.location.href = `/login?next=/trips/${trip.slug}`;
        return;
      }

      const bookingResponse = await supabase
        .from("bookings")
        .insert([
          {
            user_id: user.id,
            trip_id: trip.id,
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
      console.log("Form addons data:", data.addons); // Log the addons data
      const addonEntries = Object.entries(data.addons || {})
        .filter(([_, quantity]) => Number(quantity) > 0)
        .map(([type, quantity]) => ({
          booking_id: bookingResponse.data.id,
          addon_type: type,
          description: `${type.replace("_", " ")} rental`,
          price: addons.find((a) => a.type === type)?.price || 0, // Fetch price from the addons list
          quantity: Number(quantity),
        }));

      console.log("Addon entries to insert:", addonEntries); // Log the addon entries

      if (addonEntries.length > 0) {
        const addonResponse = await supabase.from("booking_addons").insert(addonEntries);
        if (addonResponse.error) {
          console.error("Addon insertion error:", addonResponse.error);
          throw addonResponse.error;
        }
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
    <section className="bg-white/60 dark:bg-green-900/20 rounded-xl p-8 border border-green-100/30 dark:border-green-900/30 mt-12">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
        Book This Trip
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Fields */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("startDate", { valueAsDate: true })}
                  className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("endDate", { valueAsDate: true })}
                  className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* People */}
          <div>
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Number of People
            </label>
            <input
              type="number"
              {...register("people", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
              min="1"
            />
            {errors.people && (
              <p className="text-red-500 text-sm mt-1">
                {errors.people.message}
              </p>
            )}
          </div>

          {/* Vehicle Addons */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Vehicle Rentals
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle}
                  className="p-4 bg-white/60 dark:bg-green-900/20 rounded-lg border border-green-200/30 dark:border-green-700/30"
                >
                  <label className="flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-300 capitalize">
                      {vehicle.replace("_", " ")}
                    </span>
                    <input
                      type="number"
                      {...register(`addons.${vehicle}`, {
                        valueAsNumber: true,
                      })}
                      className="w-20 px-3 py-1 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
                      min="0"
                      defaultValue={0}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Special Requests
            </label>
            <textarea
              {...register("specialRequests")}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
              rows={3}
            />
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-green-200 dark:border-green-700 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700 dark:text-green-300">Base Price</span>
            <span className="text-sm text-green-700 dark:text-green-300">${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(formData.addons || {}).map(([type, quantity]) => {
              if (quantity > 0) {
                const addon = addons.find((a) => a.type === type);
                const addonPrice = addon ? addon.price * quantity : 0;
                return (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-green-700 dark:text-green-300 capitalize">
                      {type.replace("_", " ")} x {quantity}
                    </span>
                    <span className="text-sm text-green-700 dark:text-green-300">
                      ${addonPrice.toFixed(2)}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-green-800 dark:text-green-100">Total Price</span>
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
        >
          {processing ? "Processing..." : "Book Now"}
        </button>
      </form>

      <Dialog
        open={showResult !== null}
        onOpenChange={() => setShowResult(null)}
      >
        <DialogContent className="bg-white dark:bg-green-900 border-green-200 dark:border-green-700">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-100">
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
            <p className="mt-4 text-green-700 dark:text-green-300 text-center">
              {showResult
                ? "Your booking has been received! We will contact you for payment confirmation."
                : "There was an error processing your booking. Please try again."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
