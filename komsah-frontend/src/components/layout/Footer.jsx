import { Instagram, Send, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            KOMSAH
                        </h3>
                        <p className="text-sm leading-relaxed mb-6 text-gray-400">
                            Partner terpercaya petani Indonesia. Menyediakan pupuk organik berkualitas untuk hasil panen yang lebih sehat dan melimpah.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Produk</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/products" className="hover:text-green-400 transition-colors">Pupuk Granul</a></li>
                            <li><a href="/products" className="hover:text-green-400 transition-colors">Pupuk Cair</a></li>
                            <li><a href="/calculator" className="hover:text-green-400 transition-colors">Kalkulator Dosis</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Informasi</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Tentang Kami</a></li>
                            <li><a href="/blog" className="hover:text-green-400 transition-colors">Artikel Pertanian</a></li>
                            <li><a href="/testimonials" className="hover:text-green-400 transition-colors">Kisah Sukses</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Official Store</h4>
                        <div className="flex flex-col gap-3">
                            <a href="https://shopee.co.id/komsahshop" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-white">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <ShoppingBag className="w-4 h-4" />
                                </div>
                                <span>Shopee Komsah</span>
                            </a>
                            <a href="https://www.instagram.com/explore/tags/komsah/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-white">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Instagram className="w-4 h-4" />
                                </div>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    © 2026 KOMSAH. Hak Cipta Dilindungi.
                </div>
            </div>
        </footer>
    );
}
