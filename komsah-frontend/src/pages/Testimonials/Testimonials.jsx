import { useState, useEffect } from 'react';
import { Quote, User, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import api from '@/api/axios';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data } = await api.get('/testimonials');
                setTestimonials(data.data);
            } catch (error) {
                console.error("Fetch testimonials error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    // Placeholder data if API is empty for demo
    const displayTestimonials = testimonials.length > 0 ? testimonials : [
        {
            id: 1,
            farmer_name: "Bapak Sutrisno",
            farmer_photo: "https://placehold.co/100x100/16a34a/ffffff?text=BS",
            crop_type: "Padi",
            location: "Ngawi, Jawa Timur",
            content: "Setelah pakai KOMSAH Granul, hasil panen padi saya meningkat 30%. Tanahnya juga jadi lebih gembur. Sangat puas!",
            rating: 5,
            is_verified: true
        },
        {
            id: 2,
            farmer_name: "Ibu Siti Aminah",
            farmer_photo: "https://placehold.co/100x100/16a34a/ffffff?text=SA",
            crop_type: "Bawang Merah",
            location: "Brebes, Jawa Tengah",
            content: "KOMSAH Cair sangat membantu saat musim hujan. Daun bawang jadi lebih kuat dan tidak mudah busuk. Hemat biaya pupuk kimia juga.",
            rating: 5,
            is_verified: true
        },
        {
            id: 3,
            farmer_name: "Kang Dedi",
            farmer_photo: "https://placehold.co/100x100/16a34a/ffffff?text=KD",
            crop_type: "Jagung",
            location: "Garut, Jawa Barat",
            content: "Jagung tumbuh seragam dan tongkolnya besar-besar. Saya rekomendasikan buat sesama petani jagung.",
            rating: 4,
            is_verified: false
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Kata Mereka Tentang KOMSAH</h1>
                <p className="text-gray-600 text-lg">
                    Ratusan petani telah membuktikan peningkatan hasil panen dengan menggunakan produk KOMSAH.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayTestimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="h-full hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-green-50/30">
                        <CardContent className="pt-6">
                            <Quote className="w-10 h-10 text-green-200 mb-4" />
                            <p className="text-gray-700 mb-6 italic min-h-[80px]">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4 border-t pt-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                    {testimonial.farmer_photo ? (
                                        <img src={testimonial.farmer_photo} alt={testimonial.farmer_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-full h-full p-2 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900">{testimonial.farmer_name}</h4>
                                        {testimonial.is_verified && (
                                            <CheckCircle className="w-4 h-4 text-blue-500" title="Terverifikasi" />
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Petani {testimonial.crop_type}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {testimonial.location}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 bg-green-900 text-white rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Anda punya cerita sukses?</h2>
                <p className="text-green-100 mb-8 max-w-xl mx-auto">
                    Bagikan pengalaman Anda menggunakan produk KOMSAH dan dapatkan hadiah menarik untuk cerita terpilih.
                </p>
                <Button variant="secondary" size="lg" className="bg-white text-green-900 hover:bg-gray-100">
                    Kirim Testimoni
                </Button>
            </div>
        </div>
    );
}
