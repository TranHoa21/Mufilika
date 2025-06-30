"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Booking {
    id: string;
    tourName: string;
    quantity: number;
    totalPrice: number;
    status: string;
    createdAt: string;
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter();

    // Lấy danh sách booking
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("/api/bookings");
                const data = await res.json();

                if (data.success && Array.isArray(data.bookings)) {
                    setBookings(data.bookings);
                } else {
                    console.error("Dữ liệu trả về không hợp lệ:", data);
                    setBookings([]);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách bookings:", err);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Hàm xóa booking
    const handleDelete = async (bookingId: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa booking này?")) return;
        setDeleting(bookingId);

        try {
            const res = await fetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
            if (res.ok) {
                setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
                alert("Xóa booking thành công!");
            } else {
                alert("Xóa booking thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa booking:", error);
            alert("Lỗi khi xóa booking!");
        } finally {
            setDeleting(null);
        }
    };

    if (loading) return <div className="p-6">Đang tải danh sách bookings...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6"
        >
            <h1 className="text-2xl font-bold mb-6 text-[#FF6B6B]">Danh sách Booking</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Mã booking</th>
                            <th className="px-4 py-2 border">Tour</th>
                            <th className="px-4 py-2 border">Số lượng</th>
                            <th className="px-4 py-2 border">Tổng tiền</th>
                            <th className="px-4 py-2 border">Trạng thái</th>
                            <th className="px-4 py-2 border">Ngày tạo</th>
                            <th className="px-4 py-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">#{booking.id.slice(0, 6)}</td>
                                <td className="px-4 py-2 border">{booking.tourName}</td>
                                <td className="px-4 py-2 border">{booking.quantity}</td>
                                <td className="px-4 py-2 border">{booking.totalPrice.toLocaleString()}đ</td>
                                <td className="px-4 py-2 border">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${booking.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : booking.status === "CONFIRMED"
                                                ? "bg-blue-100 text-blue-700"
                                                : booking.status === "COMPLETED"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">{format(new Date(booking.createdAt), "dd/MM/yyyy")}</td>
                                <td className="px-4 py-2 border flex gap-3">
                                    <button
                                        onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(booking.id)}
                                        className={`text-red-600 hover:underline text-sm ${deleting === booking.id ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        disabled={deleting === booking.id}
                                    >
                                        {deleting === booking.id ? "Đang xóa..." : "Xóa"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    Không có booking nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
