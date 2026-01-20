import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                        <MessageSquare className="w-4 h-4" />
                        Hubungi Kami
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                        Ada Pertanyaan? <span className="text-green-700">Kami Siap Membantu</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tim kami siap menjawab pertanyaan Anda tentang produk, penggunaan, atau kemitraan.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="shadow-2xl border-2 border-gray-100">
                            <CardHeader>
                                <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subjek</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                                            required
                                        ></textarea>
                                    </div>
                                    <Button type="submit" size="lg" className="w-full bg-green-700 hover:bg-green-800 shadow-lg">
                                        <Send className="w-5 h-5 mr-2" />
                                        Kirim Pesan
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Contact Cards */}
                        {[
                            {
                                icon: Mail,
                                title: "Email",
                                content: "info@komsah.co.id",
                                link: "mailto:info@komsah.co.id",
                                color: "blue"
                            },
                            {
                                icon: Phone,
                                title: "Telepon",
                                content: "+62 21 1234 5678",
                                link: "tel:+622112345678",
                                color: "green"
                            },
                            {
                                icon: MapPin,
                                title: "Alamat",
                                content: "BRIN Bogor, Jl. Raya Jakarta-Bogor, Cibinong, Bogor, Jawa Barat",
                                link: null,
                                color: "orange"
                            }
                        ].map((item, i) => (
                            <Card key={i} className={`shadow-lg border-2 border-${item.color}-100 hover:shadow-2xl transition-all`}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 bg-${item.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                                            {item.link ? (
                                                <a href={item.link} className="text-gray-600 hover:text-green-700 transition-colors">
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600">{item.content}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Business Hours */}
                        <Card className="shadow-lg border-2 border-gray-100">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-4 text-gray-900">Jam Operasional</h3>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Senin - Jumat</span>
                                        <span className="font-semibold">08:00 - 17:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sabtu</span>
                                        <span className="font-semibold">08:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Minggu</span>
                                        <span className="font-semibold text-red-600">Tutup</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
