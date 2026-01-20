import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

function FAQItem({ question, answer, index }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-lg text-gray-900 pr-4">{question}</span>
                <ChevronDown className={`w-6 h-6 text-green-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6"
                >
                    <p className="text-gray-600 leading-relaxed">{answer}</p>
                </motion.div>
            )}
        </motion.div>
    );
}

export default function FAQ() {
    const faqs = [
        {
            question: "Apa itu KOMSAH?",
            answer: "KOMSAH adalah pupuk organik berbasis seresah (daun gugur) yang dikembangkan oleh Prof. Dr. Ir. Widyatmoko dari BRIN Bogor. Produk ini dirancang untuk mengembalikan kesehatan tanah yang rusak akibat penggunaan pupuk kimia berlebihan."
        },
        {
            question: "Bagaimana cara menggunakan pupuk KOMSAH?",
            answer: "Aplikasikan KOMSAH secara merata pada lahan sebelum tanam atau sebagai pupuk susulan. Dosis yang direkomendasikan adalah 200-250 gram per meter persegi, tergantung jenis tanaman dan kondisi tanah. Gunakan kalkulator dosis kami untuk rekomendasi yang lebih akurat."
        },
        {
            question: "Berapa lama hasil bisa terlihat?",
            answer: "Perubahan pada kesehatan tanah dapat terlihat dalam 2-4 minggu pertama, ditandai dengan tanah yang lebih gembur dan warna lebih gelap. Peningkatan hasil panen biasanya terlihat pada musim tanam berikutnya, dengan peningkatan rata-rata 30-40%."
        },
        {
            question: "Apakah KOMSAH aman untuk semua jenis tanaman?",
            answer: "Ya, KOMSAH aman untuk semua jenis tanaman termasuk padi, jagung, sayuran, buah-buahan, dan tanaman hias. Formulasi organik murni memastikan tidak ada risiko over-fertilization atau kerusakan tanaman."
        },
        {
            question: "Apakah KOMSAH bisa dicampur dengan pupuk lain?",
            answer: "KOMSAH dapat dikombinasikan dengan pupuk organik lainnya. Namun, untuk hasil optimal, kami merekomendasikan penggunaan KOMSAH secara eksklusif untuk mengurangi ketergantungan pada pupuk kimia."
        },
        {
            question: "Berapa lama masa simpan pupuk KOMSAH?",
            answer: "Pupuk KOMSAH dapat disimpan hingga 12 bulan dalam kemasan tertutup di tempat kering dan sejuk. Setelah dibuka, sebaiknya digunakan dalam 3 bulan untuk hasil optimal."
        },
        {
            question: "Apakah ada program pendampingan?",
            answer: "Ya! Melalui Puskestan (Pusat Kesehatan Tanah dan Tanaman), kami menyediakan pendampingan lengkap dari tanam hingga panen. Termasuk konsultasi gratis, kunjungan lapangan, dan skema pembayaran fleksibel (yarnen)."
        },
        {
            question: "Bagaimana cara memesan dalam jumlah besar?",
            answer: "Untuk pemesanan dalam jumlah besar (>100 kg), silakan hubungi tim kami melalui WhatsApp atau email. Kami menyediakan harga khusus untuk pembelian grosir dan pengiriman langsung ke lokasi."
        },
        {
            question: "Apakah tersedia di seluruh Indonesia?",
            answer: "Ya, kami melayani pengiriman ke seluruh Indonesia melalui berbagai ekspedisi. Untuk wilayah Jabodetabek, tersedia layanan same-day delivery."
        },
        {
            question: "Apa bedanya KOMSAH Granul dan KOMSAH Cair?",
            answer: "KOMSAH Granul cocok untuk aplikasi dasar dan pembenahan tanah jangka panjang. KOMSAH Cair lebih cepat diserap tanaman dan ideal untuk pupuk susulan atau tanaman dalam pot. Keduanya memiliki kandungan nutrisi yang sama."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold">
                        <HelpCircle className="w-4 h-4" />
                        Pertanyaan Umum
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                        <span className="text-green-700">FAQ</span> - Pertanyaan yang Sering Diajukan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Temukan jawaban untuk pertanyaan umum tentang produk dan layanan KOMSAH.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4 mb-12">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-green-50 rounded-3xl p-12 border-2 border-green-200"
                >
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">Masih Ada Pertanyaan?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Tim kami siap membantu Anda. Hubungi kami melalui WhatsApp, email, atau telepon.
                    </p>
                    <a href="/contact">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all">
                            Hubungi Kami
                        </button>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
