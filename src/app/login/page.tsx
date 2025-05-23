'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Đăng nhập thất bại');
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('isLoggedIn', "true");
            router.push('/admin');
        } catch (err) {
            console.error(err);
            setError('Lỗi kết nối máy chủ');
        }
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-[#15394c] bg-opacity-70">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#07273c] text-white rounded-lg p-8 w-full max-w-md shadow-lg relative"
            >
                <button className="absolute top-4 right-4 text-white" onClick={() => router.push('/')}>
                    ✕
                </button>

                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    {error && <p className="text-red-400 text-center">{error}</p>}

                    <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full px-4 py-2 rounded bg-transparent border border-gray-400 placeholder-gray-400 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter password here"
                        className="w-full px-4 py-2 rounded bg-transparent border border-gray-400 placeholder-gray-400 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="accent-orange-500"
                            />
                            Remember me
                        </label>
                        <button type="button" className="text-gray-300 hover:underline text-sm">
                            Forgot password ?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
                    >
                        LOGIN
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Create An Account ?{' '}
                    <button
                        type="button"
                        onClick={() => router.push('/signup')}
                        className="text-orange-400 hover:underline"
                    >
                        SignUp
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
