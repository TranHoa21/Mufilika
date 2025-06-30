"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    metaDescription: string;
    category: Category;
    createdAt: string;
}

interface Category {
    name: string;
    slug: string;
}

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredPosts = posts?.filter(post =>
        selectedCategory === 'All' || post.category?.name === selectedCategory
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto py-12 px-4 bg-white text-[#1c1c1c] w-full"
        >
            {/* Hero Section */}
            <section className="text-center my-10 ">
                <h1 className="text-4xl font-bold text-[#1c1c1c]">Blog / Brand Story / Creative Corner</h1>
                <p className="text-lg text-gray-600 mt-4">
                    Discover creative articles and fascinating stories about our brand journey.
                </p>
            </section>

            {/* Filter / Category Tabs */}
            <div className="mb-8">
                <div className="flex justify-center gap-6 flex-wrap">
                    {['All', ...categories].map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category)}
                            className={`text-lg font-semibold px-3 py-1 rounded-full border ${selectedCategory === category
                                ? 'bg-[#a56f45] text-white'
                                : 'text-[#1c1c1c] border-gray-300 hover:border-[#a56f45]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid/List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredPosts?.map((post) => (
                        <div key={post.id} className="bg-white border border-gray-200 shadow rounded-lg overflow-hidden">
                            <div className="relative w-full h-48">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold text-[#1c1c1c]">{post.title}</h2>
                                <p className="text-gray-700 mt-2">{post.metaDescription}</p>
                                <p className="text-gray-500 text-sm mt-4">{new Date(post.createdAt).toLocaleDateString()}</p>
                                <a href={`/blog/${post.slug}`} className="inline-block mt-4 text-[#a56f45] hover:underline">
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination / Load More */}
            <div className="text-center mt-8">
                <button className="px-6 py-2 bg-[#a56f45] text-white font-semibold rounded-full hover:bg-[#8c5933]">
                    Load more
                </button>
            </div>

            {/* Sidebar */}
            <div className="md:flex md:space-x-8 mt-12">

                {/* Featured Posts */}
                <div className="md:w-1/4">
                    <div className="bg-[#fdfaf5] p-6 rounded-lg shadow border border-[#e4ded5]">
                        <h3 className="text-xl font-semibold text-[#1c1c1c] mb-4">Featured Posts</h3>
                        <ul>
                            {posts?.slice(0, 5).map((post) => (
                                <li key={post.id} className="mb-4">
                                    <a href={`/post/${post.id}`} className="text-[#a56f45] hover:underline">
                                        {post.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div className="mt-8 bg-[#fdfaf5] p-6 rounded-lg shadow border border-[#e4ded5]">
                        <h3 className="text-xl font-semibold text-[#1c1c1c] mb-4">Subscribe for Updates</h3>
                        <form className="flex flex-col">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 mb-4 border border-gray-300 bg-white text-[#1c1c1c] rounded-lg"
                            />
                            <button
                                type="submit"
                                className="bg-[#a56f45] text-white py-2 rounded-lg hover:bg-[#8c5933]"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sidebar content */}
                <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Popular Topics */}
                    <div className="mt-8 bg-[#fdfaf5] p-6 rounded-lg shadow border border-[#e4ded5]">
                        <h3 className="text-xl font-semibold text-[#1c1c1c] mb-4">Popular Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Gifts', 'Handmade', 'Design', 'Product Care'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 border rounded-full text-sm text-gray-700 hover:bg-[#a56f45] hover:text-white cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Inspirational Quote */}
                    <div className="mt-8 bg-[#fdfaf5] p-6 rounded-lg shadow border border-[#e4ded5] text-center">
                        <p className="italic text-gray-600">
                            “Creativity is intelligence having fun.” – Albert Einstein
                        </p>
                    </div>

                    {/* Follow Banner */}
                    <div className="mt-8 bg-[#fdfaf5] p-6 rounded-lg shadow border border-[#e4ded5] text-center">
                        <p className="text-lg font-semibold text-[#1c1c1c] mb-2">
                            Are you following us yet?
                        </p>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="text-[#a56f45] underline hover:text-[#8c5933]"
                        >
                            Follow our fanpage →
                        </a>
                    </div>

                    {/* Most Viewed */}
                    <div className="mt-8 bg-[#fdfaf5] p-6 rounded-lg shadow border border-[#e4ded5]">
                        <h3 className="text-xl font-semibold text-[#1c1c1c] mb-4">Most Viewed</h3>
                        <ul className="list-disc ml-4 text-gray-700 space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    Why Handmade Gifts Are Priceless
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Zodiac Sign Gift Suggestions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    5 Eye-catching Packaging Ideas
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Blog;
