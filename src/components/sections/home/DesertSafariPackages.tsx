'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

type Tour = {
  name: string;
  slug: string;
  address: string;
  description: string;
  duration: string;
  maxGuests: number;
  price: number;
  oldPrice?: number;
  discount?: boolean;
  image: string;
};

export default function DesertSafariPackages() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/tours');
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 my-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
            Our Packages
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            Top-rated desert safari trips
          </h1>
        </div>
        <div className="mt-6 md:mt-0">
          <p className="text-sm text-gray-600 mb-3">
            Join thousands of happy travelers who’ve experienced the thrill and beauty of our desert tours.
          </p>
          <Button>See More</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((item, index) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 space-x-2 flex">
                  <Badge className="bg-white text-gray-800">🏆 Top Tours</Badge>
                  {item.discount && (
                    <Badge className="bg-pink-100 text-pink-700">Disc. 50%</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{item.address}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={16} /> {item.duration} days
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} /> {item.maxGuests} guests
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Start from</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${item.price.toLocaleString()}
                      {item.oldPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${item.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <Link href={`/packages/${item.slug}`}>
                    <Button>Book Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
