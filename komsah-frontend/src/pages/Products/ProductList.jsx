import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Sparkles } from 'lucide-react';
import api from '@/api/axios';

// 3D Tilt Card Component
function TiltCard({ children, className }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Mock data for now if API fails or is empty
                setProducts([
                    {
                        id: 1,
                        name: "KOMSAH Granul",
                        slug: "komsah-granul",
                        price: 75000,
                        description: "Pupuk organik granul premium untuk segala jenis tanaman.",
                        primary_image: null
                    },
                    {
                        id: 2,
                        name: "KOMSAH Cair",
                        slug: "komsah-cair",
                        price: 95000,
                        description: "Pupuk cair konsentrat tinggi untuk pertumbuhan cepat.",
                        primary_image: null
                    }
                ]);

                // Real fetch attempt
                const { data } = await api.get('/products');
                if (data.data && data.data.length > 0) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto"
                ></motion.div>
                <p className="mt-4 text-gray-600">Memuat produk...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-green-50/20 to-white py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                        <Sparkles className="w-4 h-4" />
                        Produk Unggulan
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                        Katalog Produk <span className="text-green-700">KOMSAH</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Temukan solusi nutrisi terbaik untuk tanaman Anda. Teknologi nano untuk hasil panen maksimal dan berkelanjutan.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link to={`/products/${product.slug}`}>
                                <TiltCard className="h-full">
                                    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 group h-full border-2 border-transparent hover:border-green-200">
                                        {/* Image Section */}
                                        <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                            {product.primary_image ? (
                                                <motion.img
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.5 }}
                                                    src={product.primary_image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center z-10">
                                                    <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                        <Sparkles className="w-12 h-12 text-green-700" />
                                                    </div>
                                                    <span className="text-gray-500 text-sm font-medium">Produk Premium</span>
                                                </div>
                                            )}
                                            {/* Shine Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 0.6 }}
                                            ></motion.div>
                                        </div>

                                        {/* Content Section */}
                                        <CardContent className="p-6" style={{ transform: "translateZ(20px)" }}>
                                            <motion.h3
                                                className="font-bold text-2xl mb-3 text-gray-900 group-hover:text-green-700 transition-colors"
                                                whileHover={{ x: 5 }}
                                            >
                                                {product.name}
                                            </motion.h3>
                                            <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>

                                            {/* Price & Button */}
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Harga</div>
                                                    <div className="text-3xl font-bold text-green-700">
                                                        Rp {parseInt(product.price).toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Button
                                                        size="lg"
                                                        className="bg-green-700 hover:bg-green-800 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all"
                                                    >
                                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                                        Beli
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TiltCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Produk</h3>
                        <p className="text-gray-600">Produk akan segera tersedia. Silakan cek kembali nanti.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
