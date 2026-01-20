import { useState, useEffect, useContext, useRef, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Check, Shield, Package, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CartContext } from '@/context/CartContext';
import api from '@/api/axios';

// 3D Product Model (Simple Box for now, can be replaced with actual model)
function Product3D({ color = "#16a34a" }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = time * 0.3;
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Main Package */}
                <mesh castShadow>
                    <boxGeometry args={[1.5, 2, 0.8]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
                </mesh>

                {/* Label */}
                <mesh position={[0, 0, 0.41]}>
                    <planeGeometry args={[1.2, 1.5]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.8} />
                </mesh>

                {/* Logo/Icon */}
                <mesh position={[0, 0.3, 0.42]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </Float>
    );
}

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${slug}`);
                setProduct(data.data);
            } catch (error) {
                console.error("Fetch error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full"
                ></motion.div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Produk Tidak Ditemukan</h2>
                    <Link to="/products">
                        <Button>Kembali ke Katalog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const benefits = product.benefits || ['Meningkatkan kesuburan tanah', 'Mempercepat pertumbuhan', 'Ramah lingkungan'];
    const crops = product.target_crops || ['Padi', 'Jagung', 'Sayuran'];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-green-50/20 to-white py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-green-700 mb-8 transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Kembali ke Produk</span>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* 3D Product Viewer */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="sticky top-24 h-[600px]"
                    >
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl border-2 border-white h-full relative">
                            {/* 3D Canvas */}
                            <Canvas shadows className="cursor-grab active:cursor-grabbing">
                                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                                <OrbitControls
                                    enableZoom={true}
                                    enablePan={false}
                                    minDistance={3}
                                    maxDistance={8}
                                    autoRotate
                                    autoRotateSpeed={0.5}
                                />

                                <ambientLight intensity={0.5} />
                                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                                <pointLight position={[-5, 3, -5]} intensity={0.5} color="#0ea5e9" />

                                <Suspense fallback={null}>
                                    <Product3D color={product.type === 'granul' ? '#16a34a' : '#0ea5e9'} />
                                </Suspense>

                                {/* Ground */}
                                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                                    <planeGeometry args={[10, 10]} />
                                    <shadowMaterial opacity={0.2} />
                                </mesh>
                            </Canvas>

                            {/* Interaction Hint */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-lg">
                                <Package className="w-4 h-4 inline mr-2" />
                                Drag untuk memutar • Scroll untuk zoom
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Badges */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <Badge className="bg-green-100 text-green-800 border border-green-200 px-4 py-1.5 text-sm font-semibold">
                                {product.type === 'granul' ? '🌾 Pupuk Granul' : '💧 Pupuk Cair'}
                            </Badge>
                            {product.is_featured && (
                                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-4 py-1.5 text-sm font-semibold">
                                    ⭐ Unggulan
                                </Badge>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {product.detailed_description || product.description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Harga</div>
                                    <div className="text-5xl font-bold text-green-700">
                                        Rp {parseInt(product.price).toLocaleString('id-ID')}
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                        / {product.weight_grams >= 1000 ? `${product.weight_grams / 1000} kg` : `${product.weight_grams} gr`}
                                    </div>
                                </div>
                                <Leaf className="w-16 h-16 text-green-600 opacity-20" />
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-6 py-4 bg-gray-50 hover:bg-gray-100 font-bold text-xl transition-colors"
                                >
                                    −
                                </button>
                                <div className="px-8 py-4 font-bold text-xl min-w-[80px] text-center">{quantity}</div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-6 py-4 bg-gray-50 hover:bg-gray-100 font-bold text-xl transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                                <Button
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="w-full bg-green-700 hover:bg-green-800 text-white text-lg py-7 shadow-xl shadow-green-200 hover:shadow-2xl transition-all"
                                >
                                    <ShoppingCart className="mr-2 w-6 h-6" />
                                    Tambah ke Keranjang
                                </Button>
                            </motion.div>
                        </div>

                        {/* Benefits & Target Crops */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Benefits */}
                            <div className="bg-white border-2 border-green-100 p-6 rounded-2xl shadow-lg">
                                <h3 className="font-bold text-lg mb-4 flex items-center text-gray-900">
                                    <Check className="w-5 h-5 text-green-600 mr-2" />
                                    Manfaat Utama
                                </h3>
                                <ul className="space-y-3">
                                    {benefits.map((benefit, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start text-gray-700"
                                        >
                                            <span className="text-green-600 mr-2 text-lg">•</span>
                                            <span>{benefit}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Target Crops */}
                            <div className="bg-white border-2 border-blue-100 p-6 rounded-2xl shadow-lg">
                                <h3 className="font-bold text-lg mb-4 flex items-center text-gray-900">
                                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                                    Cocok Untuk
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {crops.map((crop, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 px-4 py-2 text-sm">
                                                {crop}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
