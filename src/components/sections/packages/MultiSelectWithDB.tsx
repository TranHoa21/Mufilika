'use client';

import React, { useEffect, useState } from 'react';
import Select, { OnChangeValue } from 'react-select';
import currency from 'currency.js';

interface Tour {
    id: number;
    title: string;
    places_id: number;
    price: number;
}

interface StateManagedSelect {
    value: Tour;
    label: string;
}

interface Props {
    onPlacesChange: (selectedIds: number[]) => void;
    onPrices: (selectedPrices: number[]) => void;
    onTotalAmountChange: (totalAmount: currency) => void;
    onSelectePricesTitle: (selectedPricesTitle: string[]) => void;
    onNumTravelersChange: (numTravelers: number) => void;
    totalAmount: currency;
}

const MultiSelectWithDB: React.FC<Props> = ({
    onPlacesChange,
    onPrices,
    onTotalAmountChange,
    onSelectePricesTitle,
    onNumTravelersChange,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<StateManagedSelect[]>([]);
    const [tourAddresses, setTourAddresses] = useState<Tour[]>([]);
    const [numTravelers, setNumTravelers] = useState(1);
    const [totalAmount, setTotalAmount] = useState(currency(0));

    useEffect(() => {
        const fetchTourAddresses = async () => {
            try {
                const response = await fetch('/api/tours');
                const data = await response.json();
                console.log("✅ tour data", data);
                setTourAddresses(data);
            } catch (error) {
                console.error('Error fetching tour addresses:', error);
            }
        };

        fetchTourAddresses();
    }, []);

    useEffect(() => {
        const totalPrice = selectedOptions.reduce((total, option) => {
            const price = currency(option.value.price).multiply(numTravelers);
            return total.add(price);
        }, currency(0));

        setTotalAmount(totalPrice);
        onTotalAmountChange(totalPrice);
    }, [selectedOptions, numTravelers]);

    const handleOptionChange = (
        newValue: OnChangeValue<StateManagedSelect, true>,
    ) => {
        const newOptions = newValue as StateManagedSelect[];
        setSelectedOptions(newOptions);

        const selectedIds = newOptions.map((option) => option.value.id);
        const selectedPrices = newOptions.map((option) => option.value.price);
        const selectedTitles = newOptions.map((option) => option.label);

        onPlacesChange(selectedIds);
        onPrices(selectedPrices);
        onSelectePricesTitle(selectedTitles);
    };

    const handleNumTravelersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const num = parseInt(event.target.value);
        setNumTravelers(num);
        onNumTravelersChange(num);
    };

    return (
        <div className="mt-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose your tour addresses:</label>
                <Select
                    isMulti
                    options={tourAddresses.map((tour) => ({ value: tour, label: tour.title }))}
                    value={selectedOptions}
                    onChange={handleOptionChange}
                />
            </div>

            <div className="text-sm text-gray-600">
                <p>Selected IDs: <span className="font-semibold">{selectedOptions.map((opt) => opt.value.id).join(', ')}</span></p>
                <p>Prices: <span className="font-semibold">{selectedOptions.map((opt) => opt.value.price).join(', ')} $</span></p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of travelers:</label>
                <select
                    value={numTravelers}
                    onChange={handleNumTravelersChange}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                            {num} traveler{num > 1 ? 's' : ''}
                        </option>
                    ))}
                </select>
            </div>

            <p className="text-lg text-gray-800 font-semibold">
                Total amount: <span className="text-[#a86a3d]">{totalAmount.format()}</span>
            </p>
        </div>
    );
};

export default MultiSelectWithDB;
