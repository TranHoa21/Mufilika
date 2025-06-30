'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AdminAddTourPage() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [price, setPrice] = useState('');
    const [included, setIncluded] = useState('');
    const [notIncluded, setNotIncluded] = useState('');

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const [days, setDays] = useState([
        { name: '', slug: '', description: '', image: null as File | null }
    ]);

    const router = useRouter();

    const handleAddDay = () => {
        setDays([...days, { name: '', slug: '', description: '', image: null }]);
    };

    const handleDayChange = (index: number, field: string, value: string | File | null) => {
        const updated = [...days];
        updated[index] = { ...updated[index], [field]: value };
        setDays(updated);
    };

    const handleTourSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('maxGuests', maxGuests);
        formData.append('price', price);
        formData.append('included', included); // string
        formData.append('notIncluded', notIncluded);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await fetch('/api/tours', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error);

            // Tạo từng TourInDay sau khi tour được tạo thành công
            for (const day of days) {
                const dayForm = new FormData();
                dayForm.append('name', day.name);
                dayForm.append('slug', day.slug);
                dayForm.append('slugTour', slug);
                dayForm.append('description', day.description);
                if (day.image) dayForm.append('image', day.image);

                await fetch('/api/tourInDay', {
                    method: 'POST',
                    body: dayForm,
                });
            }

            alert('Tạo tour thành công!');
            router.push('/admin/tours');
        } catch (err) {
            console.error(err);
            alert('Lỗi khi tạo tour.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto py-10"
        >
            <h1 className="text-2xl font-bold mb-6">Tạo Tour mới</h1>
            <form onSubmit={handleTourSubmit} className="space-y-6">
                <div>
                    <Label>Tên tour</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <Label>Slug</Label>
                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div>
                    <Label>Địa điểm</Label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <Label>Mô tả</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                </div>
                <div>
                    <Label>Thời lượng (ngày)</Label>
                    <Input value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <div>
                    <Label>Số khách tối đa</Label>
                    <Input value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} required />
                </div>
                <div>
                    <Label>Giá</Label>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <Label>Ảnh đại diện</Label>
                    <Input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImageFile(file);
                            setPreviewImageUrl(URL.createObjectURL(file));
                        }
                    }} required />
                    {previewImageUrl && (
                        <Image src={previewImageUrl} alt="Preview" width={120} height={80} className="rounded mt-2" />
                    )}
                </div>
                <div>
                    <Label>Included (comma-separated)</Label>
                    <Textarea
                        value={included}
                        onChange={(e) => setIncluded(e.target.value)}
                        placeholder="e.g. Hotel, Meals, Local guide"
                        rows={2}
                    />
                </div>

                <div>
                    <Label>Not Included (comma-separated)</Label>
                    <Textarea
                        value={notIncluded}
                        onChange={(e) => setNotIncluded(e.target.value)}
                        placeholder="e.g. Flight tickets, Travel insurance"
                        rows={2}
                    />
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Các ngày trong tour</h2>
                    {days.map((day, index) => (
                        <div key={index} className="p-4 border rounded space-y-3 mb-4">
                            <Label>Tên ngày</Label>
                            <Input value={day.name} onChange={(e) => handleDayChange(index, 'name', e.target.value)} />

                            <Label>Slug</Label>
                            <Input value={day.slug} onChange={(e) => handleDayChange(index, 'slug', e.target.value)} />

                            <Label>Mô tả</Label>
                            <Textarea value={day.description} onChange={(e) => handleDayChange(index, 'description', e.target.value)} rows={2} />

                            <Label>Ảnh</Label>
                            <Input type="file" accept="image/*" onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleDayChange(index, 'image', file || null);
                            }} />
                        </div>
                    ))}

                    <Button type="button" onClick={handleAddDay}>
                        + Thêm ngày
                    </Button>
                </div>

                <Button type="submit">Tạo tour</Button>
            </form>
        </motion.div>
    );
}
