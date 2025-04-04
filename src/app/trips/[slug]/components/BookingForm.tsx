'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import * as z from 'zod'
import type { Database } from '@/types/supabase'

const formSchema = z.object({
  startDate: z.date().min(new Date(), { message: "Start date must be in the future" }),
  endDate: z.date().min(new Date(), { message: "End date must be in the future" }),
  people: z.number().int().min(1, "At least 1 person required"),
  addons: z.array(z.string()).optional(),
  specialRequests: z.string().optional(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"]
})

export function BookingForm({ trip }: { trip: Database['public']['Tables']['trips']['Row'] }) {
  const supabase = createClient()
  const [totalPrice, setTotalPrice] = useState(trip.price)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<Database['public']['Tables']['users']['Row'] | null>(null)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      people: 1,
      addons: []
    }
  })

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        setUser(userData)
      }
    }
    getSession()
  }, [supabase])

  const calculateTotal = async (formData: any) => {
    const basePrice = (trip.price ?? 0) * formData.people
    const days = Math.ceil((formData.endDate - formData.startDate) / (1000 * 60 * 60 * 24))
    
    const { data: addons } = await supabase
      .from('addons')
      .select('type, price')
      .in('type', formData.addons)

    const addonTotal = addons?.reduce((acc, addon) => acc + (addon.price * days), 0) || 0
    setTotalPrice(basePrice + addonTotal)
  }

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true)
    try {
      if (!user) {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${location.origin}/auth/callback?next=/trips/${trip.slug}`
          }
        })
        return
      }

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          trip_id: trip.id,
          start_date: formData.startDate.toISOString(),
          end_date: formData.endDate.toISOString(),
          number_of_people: formData.people,
          total_price: totalPrice,
          status: 'pending',
          payment_status: 'unpaid',
          special_requests: formData.specialRequests,
        }])
        .select()
        .single()

      if (error) throw error

      if (formData.addons.length > 0) {
        const { data: addons } = await supabase
          .from('addons')
          .select('type, price')
          .in('type', formData.addons)

        const bookingAddons = addons?.map(addon => ({
          booking_id: booking.id,
          addon_type: addon.type,
          description: `${addon.type} addon`,
          price: addon.price,
          quantity: 1
        })) || []

        await supabase.from('booking_addons').insert(bookingAddons)
      }

      alert('Booking created successfully! We will contact you for payment.')
    } catch (error) {
      console.error('Booking error:', error)
      alert('Error creating booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-white/60 dark:bg-green-900/20 rounded-xl p-8 border border-green-100/30 dark:border-green-900/30 mt-12">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
        Book This Trip
      </h2>

      {!user && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p className="text-green-700 dark:text-green-300">
            You need to be logged in to book this trip. You'll be redirected to login when clicking "Book Now".
          </p>
        </div>
      )}

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6" onChange={handleSubmit(calculateTotal)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dates */}
          <div>
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Travel Dates
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                {...register('startDate', { valueAsDate: true })}
                className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
              />
              <input
                type="date"
                {...register('endDate', { valueAsDate: true })}
                className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
            )}
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
            )}
          </div>

          {/* People */}
          <div>
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Number of People
            </label>
            <input
              type="number"
              {...register('people', { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
              min="1"
            />
            {errors.people && (
              <p className="text-red-500 text-sm mt-1">{errors.people.message}</p>
            )}
          </div>

          {/* Addons */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Additional Services
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['vehicle', 'accommodation', 'camera'].map((addon) => (
                <label
                  key={addon}
                  className="flex items-center space-x-2 p-4 bg-white/60 dark:bg-green-900/20 rounded-lg border border-green-200/30 dark:border-green-700/30"
                >
                  <input
                    type="checkbox"
                    value={addon}
                    {...register('addons')}
                    className="rounded border-green-300 text-green-600 focus:ring-green-500 dark:bg-green-900/20"
                  />
                  <span className="text-green-700 dark:text-green-300 capitalize">
                    {addon}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Special Requests
            </label>
            <textarea
              {...register('specialRequests')}
              className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
              rows={3}
            />
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t border-green-200 dark:border-green-700 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-green-800 dark:text-green-100">
              Total Price
            </span>
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">
              ${(totalPrice ?? 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </section>
  )
}