import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ScrollControls } from '@react-three/drei';
import { ArrowRight, Sprout, TrendingUp, ShieldCheck, ShoppingBag, Instagram, Leaf, Droplet, Sun, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import AgriScene3D from '@/components/3d/AgriScene3D';
import ArcanePostProcessing from '@/components/3d/effects/ArcanePostProcessing';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-${color}-200 hover:shadow-2xl hover:shadow-${color}-100/50 transition-all group relative overflow-hidden`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className={`w-16 h-16 bg-${color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${color}-600 group-hover:rotate-12 transition-all duration-300 relative z-10 shadow-lg`}>
                <Icon className={`w-8 h-8 text-${color}-600 group-hover:text-white transition-colors`} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 relative z-10">{title}</h3>
            <p className="text-gray-600 leading-relaxed relative z-10">{description}</p>
        </motion.div>
    );
}

export default function Home() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
            {/* 3D Hero Section with Advanced Scene */}
            <section className="relative h-screen flex items-center overflow-hidden">
                {/* Advanced 3D Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas
                        camera={{ position: [0, 2, 8], fov: 50 }}
                        className="bg-gradient-to-b from-sky-100 via-green-50 to-amber-50"
                        shadows
                        dpr={[1, 2]}
                    >
                        <Suspense fallback={null}>
                            <ScrollControls pages={3} damping={0.1}>
                                <AgriScene3D />
                            </ScrollControls>
                            <ArcanePostProcessing enableBloom={true} />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10"></div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-100 to-green-50 text-green-800 text-sm font-semibold tracking-wide shadow-lg border-2 border-green-200"
                        >
                            <Leaf className="w-4 h-4" />
                            Tanah Sehat, Kunci Petani Sejahtera
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
                        >
                            Pupuk Organik<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-green-600 to-green-500">
                                Berbasis Seresah
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl text-gray-700 mb-10 leading-relaxed"
                        >
                            Dikembangkan oleh <strong>Prof. Dr. Ir. Widyatmoko (BRIN)</strong>.
                            Mengembalikan kesehatan tanah yang rusak akibat pupuk kimia berlebihan,
                            meningkatkan hasil panen hingga <strong className="text-green-700">40%</strong>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link to="/products">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-7 h-auto bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 shadow-2xl shadow-green-300 hover:shadow-green-400 transition-all duration-300 hover:scale-105">
                                    <ShoppingBag className="mr-2 w-5 h-5" />
                                    Belanja Sekarang
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/calculator">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-7 h-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-green-600 transition-all duration-300 shadow-lg">
                                    <Droplet className="mr-2 w-5 h-5" />
                                    Hitung Dosis Pupuk
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500" />
                                Toko Resmi:
                            </p>
                            <div className="flex gap-3">
                                <a href="https://shopee.co.id/komsahshop" target="_blank" rel="noreferrer" className="group">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white border-2 border-orange-200 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span className="font-semibold text-sm">Shopee</span>
                                    </div>
                                </a>
                                <a href="https://www.instagram.com/explore/tags/komsah/" target="_blank" rel="noreferrer" className="group">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white border-2 border-pink-200 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl">
                                        <Instagram className="w-4 h-4" />
                                        <span className="font-semibold text-sm">Instagram</span>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
                    </div>
                </motion.div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mb-48"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Users, value: 5000, suffix: "+", label: "Petani Sejahtera" },
                            { icon: TrendingUp, value: 40, suffix: "%", label: "Peningkatan Hasil" },
                            { icon: Leaf, value: 100, suffix: "%", label: "Organik Murni" },
                            { icon: Heart, value: 98, suffix: "%", label: "Kepuasan Pelanggan" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <stat.icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="text-5xl font-bold mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-green-100 text-sm uppercase tracking-wide">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kenapa Memilih KOMSAH?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Solusi ilmiah untuk tanah sehat dan petani sejahtera.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Leaf}
                            title="Berbasis Seresah Alami"
                            description="Dibuat dari daun gugur (seresah) yang kaya mikroba, enzim, dan hormon alami. Proses ilmiah yang terbukti mengembalikan kesuburan tanah."
                            color="green"
                            delay={0}
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Hasil Panen Meningkat 40%"
                            description="Riset BRIN membuktikan peningkatan signifikan pada berat dan kualitas panen. Mengurangi ketergantungan pada pupuk kimia."
                            color="blue"
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Didukung Puskestan"
                            description="Pusat Kesehatan Tanah dan Tanaman memberikan pendampingan lengkap dari tanam hingga panen. Skema pembayaran fleksibel (yarnen)."
                            color="orange"
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-green-600 to-green-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute top-0 right-0 w-96 h-96 border-4 border-white rounded-full -mr-48 -mt-48"
                    ></motion.div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Wujudkan Tanah Sehat, Petani Sejahtera
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl mb-10 text-green-100 max-w-2xl mx-auto"
                    >
                        Bergabunglah dengan ribuan petani yang telah merasakan manfaat pupuk organik KOMSAH.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/products">
                            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-xl px-12 py-8 h-auto shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
                                Mulai Sekarang
                                <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
