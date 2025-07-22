'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import MultiSelectWithDB from '@/components/sections/packages/MultiSelectWithDB'
import currency from 'currency.js'

export default function BookingStepOne() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        departureDate: '',
        destination: '',
    })

    const [phone, setPhone] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(currency(0))
    const [totalAmount, setTotalAmount] = useState(currency(0))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNext = () => {
        const { fullName, email, departureDate, destination } = formData
        if (!fullName || !email || !departureDate || !destination || !phone) {
            alert('Please fill out all fields.')
            return
        }

        const query = new URLSearchParams({
            fullName,
            email,
            departureDate,
            destination,
            phone,
            quantity: quantity.toString(),
            price: price.value.toString(),
            total: totalAmount.value.toString(),
        }).toString()

        router.push(`/booking/info?${query}`)
    }

    return (
        <section className="min-h-screen bg-[#fefdfc] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-[#a86a3d]">
                    Book Your Safari Tour
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="input"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="input"
                        type="email"
                    />
                    <input
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        placeholder="Departure Date"
                        type="date"
                        className="input"
                    />
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="input"
                        type="tel"
                    />
                </div>

                <div className="mt-6">
                    <MultiSelectWithDB
                        onPlacesChange={(ids) => setFormData((prev) => ({ ...prev, destination: ids[0]?.toString() || '' }))}
                        onPrices={(p) => {
                            const total = p.reduce((sum, val) => sum + val, 0)
                            setPrice(currency(total))
                        }}
                        onTotalAmountChange={(t) => setTotalAmount(t)}
                        onNumTravelersChange={(q) => setQuantity(q)}
                        onSelectePricesTitle={() => { }}
                        totalAmount={totalAmount}
                    />
                </div>

                <button
                    onClick={handleNext}
                    className="mt-8 w-full bg-[#a86a3d] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#8f5531] transition"
                >
                    Next Step
                </button>
            </motion.div>
        </section>
    )
}
