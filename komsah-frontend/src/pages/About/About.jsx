import { motion } from 'framer-motion';
import { Leaf, Users, Award, Target, Heart, Sprout } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-green-50/20 to-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                        <Leaf className="w-4 h-4" />
                        Tentang Kami
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                        Misi Kami: <span className="text-green-700">Tanah Sehat</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Mengembalikan kesehatan tanah Indonesia melalui inovasi ilmiah dan kemitraan dengan petani.
                    </p>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="bg-white rounded-3xl shadow-xl p-12 border-2 border-green-100">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Cerita Kami</h2>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                            <p>
                                KOMSAH lahir dari keprihatinan <strong>Prof. Dr. Ir. Widyatmoko, M.Agr.</strong>,
                                peneliti senior di BRIN Bogor, terhadap kerusakan tanah akibat penggunaan pupuk kimia berlebihan.
                            </p>
                            <p>
                                Melalui riset bertahun-tahun, beliau mengembangkan pupuk organik berbasis <strong>seresah</strong>
                                (daun gugur) yang kaya akan mikroba, enzim, dan hormon alami. Formulasi ini terbukti mampu
                                mengembalikan kesuburan tanah yang rusak.
                            </p>
                            <p>
                                Didukung oleh <strong>Puskestan</strong> (Pusat Kesehatan Tanah dan Tanaman), KOMSAH kini
                                telah membantu ribuan petani di seluruh Indonesia meningkatkan hasil panen hingga <strong>40%</strong>
                                sambil mengurangi ketergantungan pada pupuk kimia.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: Target,
                            title: "Misi Kami",
                            description: "Mengembalikan kesehatan tanah Indonesia dan meningkatkan kesejahteraan petani melalui solusi organik yang terbukti ilmiah.",
                            color: "green"
                        },
                        {
                            icon: Award,
                            title: "Inovasi Ilmiah",
                            description: "Dikembangkan oleh peneliti BRIN dengan standar riset tertinggi. Setiap produk melalui uji laboratorium dan lapangan.",
                            color: "blue"
                        },
                        {
                            icon: Heart,
                            title: "Kemitraan Petani",
                            description: "Kami tidak hanya menjual produk, tapi membangun kemitraan jangka panjang dengan pendampingan dari tanam hingga panen.",
                            color: "orange"
                        }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-${value.color}-100 hover:shadow-2xl transition-all`}
                        >
                            <div className={`w-16 h-16 bg-${value.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                                <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Team */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Tim Kami</h2>
                    <p className="text-xl text-gray-600 mb-12">
                        Didukung oleh para ahli di bidang pertanian, mikrobiologi, dan agronomi.
                    </p>
                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-3xl p-12 shadow-2xl">
                        <Users className="w-16 h-16 mx-auto mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Prof. Dr. Ir. Widyatmoko, M.Agr.</h3>
                        <p className="text-green-100 text-lg mb-2">Founder & Chief Scientist</p>
                        <p className="text-green-200 max-w-2xl mx-auto">
                            Peneliti Senior BRIN Bogor dengan pengalaman 30+ tahun di bidang kesehatan tanah dan mikrobiologi pertanian.
                        </p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-green-50 rounded-3xl p-12 border-2 border-green-200"
                >
                    <Sprout className="w-16 h-16 mx-auto mb-6 text-green-700" />
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">Bergabunglah dengan Gerakan Tanah Sehat</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Bersama-sama kita wujudkan pertanian Indonesia yang berkelanjutan dan sejahtera.
                    </p>
                    <a href="/products">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all">
                            Lihat Produk Kami
                        </button>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
