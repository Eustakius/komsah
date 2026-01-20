import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import api from '@/api/axios';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await api.get('/blogs');
                setPosts(data.data);
            } catch (error) {
                console.error("Fetch blog error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Placeholder data if API is empty
    const displayPosts = posts.length > 0 ? posts : [
        {
            id: 1,
            title: "Tips Memilih Pupuk Organik yang Tepat",
            excerpt: "Pupuk organik sangat penting untuk keberlanjutan tanah pertanian. Simak tips memilih pupuk yang sesuai dengan kebutuhan tanaman Anda.",
            image: "https://placehold.co/600x400/16a34a/ffffff?text=Blog+1",
            author: "Admin Komsah",
            date: "20 Jan 2026",
            category: "Edukasi"
        },
        {
            id: 2,
            title: "Cara Meningkatkan Produksi Padi di Musim Hujan",
            excerpt: "Musim hujan sering menjadi tantangan bagi petani padi. Berikut adalah strategi pemupukan dan perawatan untuk menjaga hasil panen tetap optimal.",
            image: "https://placehold.co/600x400/15803d/ffffff?text=Blog+2",
            author: "Dr. Tani",
            date: "18 Jan 2026",
            category: "Tips Bertani"
        },
        {
            id: 3,
            title: "Mengenal Teknologi Nano pada Pupuk Cair KOMSAH",
            excerpt: "Teknologi nano memungkinkan nutrisi diserap tanaman lebih cepat dan efisien. Pelajari bagaimana KOMSAH Cair bekerja.",
            image: "https://placehold.co/600x400/14532d/ffffff?text=Blog+3",
            author: "Riset & Dev",
            date: "10 Jan 2026",
            category: "Teknologi"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-12">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Blog & Artikel Pertanian</h1>
                <p className="text-gray-600 text-lg">
                    Dapatkan wawasan terbaru seputar teknologi pertanian, tips budidaya, dan kabar terkini dari KOMSAH.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                        <div className="h-48 overflow-hidden">
                            <img
                                src={post.image || post.featured_image || 'https://placehold.co/600x400?text=No+Image'}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                            />
                        </div>
                        <CardContent className="pt-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                    {post.category || 'Artikel'}
                                </Badge>
                                <span className="text-xs text-gray-400 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {post.date || new Date().toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 hover:text-green-600 transition-colors cursor-pointer">
                                {post.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                                {post.excerpt || post.content}
                            </p>

                            <div className="flex justify-between items-center pt-4 border-t mt-auto">
                                <span className="text-xs text-gray-500 flex items-center">
                                    <User className="w-3 h-3 mr-1" />
                                    {post.author || 'Admin'}
                                </span>
                                <Button variant="link" className="p-0 text-green-600 hover:text-green-800">
                                    Baca Selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
