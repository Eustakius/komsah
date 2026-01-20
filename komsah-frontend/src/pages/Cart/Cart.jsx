import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CartContext } from '@/context/CartContext';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Keranjang Belanja Kosong</h2>
                <p className="text-gray-600 mb-8">Anda belum menambahkan produk apapun ke keranjang.</p>
                <Link to="/products">
                    <Button size="lg">Mulai Belanja</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="md:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-lg border flex flex-col sm:flex-row gap-4 items-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-md shrink-0 overflow-hidden">
                                {item.primary_image ? (
                                    <img src={item.primary_image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                )}
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-green-600 font-medium">Rp {parseInt(item.price).toLocaleString('id-ID')}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="text-right font-bold w-28 hidden sm:block">
                                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg border sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Ringkasan Pesanan</h3>

                        <div className="space-y-3 mb-6 border-b pb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Harga</span>
                                <span className="font-bold">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="block w-full">
                            <Button size="lg" className="w-full">
                                Lanjut Pembayaran
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
