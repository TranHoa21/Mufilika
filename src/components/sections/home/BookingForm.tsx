'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Tour = {
    id: string
    name: string
    price: number
}

export default function BookingForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        email: '',
        departureDate: '',
        destination: '', // chứa tour.id
        tourType: '',
    })

    const [destinations, setDestinations] = useState<Tour[]>([])
    const [showExtraFields, setShowExtraFields] = useState(false)
    const [phone, setPhone] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch('/api/tours')
                const data = await res.json()
                if (Array.isArray(data)) {
                    setDestinations(data)
                }
            } catch (error) {
                console.error('Failed to fetch destinations:', error)
            }
        }

        fetchDestinations()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const selectedTour = destinations.find(t => t.id === formData.destination)
    const price = selectedTour?.price ?? 0
    const total = price * quantity

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!showExtraFields) {
            setShowExtraFields(true)
            return
        }

        if (!phone || !paymentMethod || quantity < 1) {
            alert('Please complete all fields before submitting.')
            return
        }

        const bookingPayload = {
            name: formData.fullName,
            email: formData.email,
            phone,
            paymentMethod,
            totalPrice: total,
            items: [
                {
                    tourId: formData.destination, // đã lưu là tour.id
                    quantity,
                    price,
                },
            ],
            userId: null, // hoặc user.id nếu có login
        }

        try {
            const res = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Booking failed')
            }

            alert('🎉 Booking successful!')
            // Reset form hoặc chuyển trang tùy bạn
        } catch (err) {
            console.error('Booking error:', err)
            alert('❌ Booking failed: ' + err)
        }
    }

    const staticTourOptions = [
        'South Luangwa National Park',
        'Kasanka National Park',
        'Livingstone, Zambia',
        'Lower Zambezi National Park',
    ]

    return (
        <section className="flex flex-col md:flex-row w-full min-h-screen">
            {/* Left Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[#fcf8f5] flex-1 flex items-center justify-center p-8 md:p-16"
            >
                <form onSubmit={handleSubmit} className="max-w-xl w-full">
                    <p className="text-sm uppercase tracking-widest text-[#c08b5c] font-semibold mb-2">Booking Form</p>
                    <h2 className="text-4xl font-bold mb-4">Start your safari journey today</h2>
                    <p className="text-gray-600 mb-8">
                        Don’t miss out on an incredible desert experience! Complete the booking form to secure
                        your spot and prepare for the adventure.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="e.g. John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-3 placeholder-gray-400"
                            required
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-3 text-gray-600"
                            required
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>

                        <input
                            type="email"
                            name="email"
                            placeholder="e.g. hello@deverust.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-3 placeholder-gray-400"
                            required
                        />
                        <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-3 text-gray-600"
                            required
                        />

                        <select
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-3 text-gray-600"
                            required
                        >
                            <option value="">Select Destination</option>
                            {destinations.map((tour) => (
                                <option key={tour.id} value={tour.id}>{tour.name}</option>
                            ))}
                        </select>

                        <select
                            name="tourType"
                            value={formData.tourType}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-3 text-gray-600"
                            required
                        >
                            <option value="">Select Tour Type</option>
                            {staticTourOptions.map((tour, index) => (
                                <option key={index} value={tour}>{tour}</option>
                            ))}
                        </select>
                    </div>

                    {showExtraFields && (
                        <div className="mt-6 space-y-4 border-t pt-6">
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-3 placeholder-gray-400"
                                required
                            />

                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-600"
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="credit">Credit Card</option>
                                <option value="bank">Bank Transfer</option>
                            </select>

                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-full border border-gray-300 rounded px-4 py-3"
                                required
                            />

                            <p className="text-gray-700">Price per person: <strong>${price}</strong></p>
                            <p className="text-gray-700">Total: <strong>${total}</strong></p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-6 bg-[#a86a3d] text-white px-6 py-3 rounded font-semibold hover:bg-[#8f5531] transition"
                    >
                        {showExtraFields ? 'Submit Booking' : 'Book Now'}
                    </button>
                </form>
            </motion.div>

            {/* Right Image */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
                className="hidden md:block relative flex-1"
            >
                <Image
                    src="/images/images2.webp"
                    alt="Safari Family"
                    fill
                    className="object-cover"
                    loading="lazy"
                />
            </motion.div>
        </section>
    )
}
