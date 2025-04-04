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
        {/* ... rest of the form remains the same ... */}
      </form>
    </section>
  )
}