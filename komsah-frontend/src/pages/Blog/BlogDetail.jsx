import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Eye, Share2 } from 'lucide-react';
import api from '@/api/axios';

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${slug}`);
                setBlog(data.data);
            } catch (error) {
                console.error("Failed to load blog", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat artikel...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Artikel Tidak Ditemukan</h2>
                    <Link to="/blog">
                        <button className="bg-green-700 text-white px-6 py-3 rounded-lg">Kembali ke Blog</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-green-700 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali ke Blog
                </Link>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span>{blog.author || 'Tim KOMSAH'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{new Date(blog.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <span>{blog.views} views</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {blog.featured_image && (
                        <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                            <img src={blog.featured_image} alt={blog.title} className="w-full h-96 object-cover" />
                        </div>
                    )}
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg max-w-none mb-12"
                >
                    <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </motion.div>

                {/* Share */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">Bagikan Artikel</h3>
                        <button className="flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-lg hover:bg-green-200 transition-colors">
                            <Share2 className="w-5 h-5" />
                            Bagikan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
