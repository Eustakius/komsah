import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import api from '@/api/axios';

export default function Checkout() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        recipient_name: '',
        phone: '',
        shipping_address: '',
        city: '',
        province: '',
        postal_code: '',
        payment_method: 'transfer',
        notes: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    // Pre-fill user data if available
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                recipient_name: user.name || '',
                phone: user.phone || '', // Assuming phone is on user model, simplified
            }));
        }
    }, [user]);

    if (authLoading) return <div>Loading Auth...</div>;

    // Redirect if not logged in
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Login Diperlukan</h2>
                <p className="text-gray-600 mb-8">Silakan login atau daftar untuk melanjutkan pembayaran.</p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="outline" onClick={() => navigate('/register')}>Daftar</Button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const orderData = {
            ...formData,
            items: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))
        };

        try {
            const { data } = await api.post('/orders', orderData);
            clearCart();
            // Redirect to dashboard or success page with order ID
            navigate('/dashboard'); // Ideally /order-success/:id
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal memproses pesanan. Silakan coba lagi.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const shippingCost = 25000;
    const total = getTotalPrice() + shippingCost;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Checkout & Pembayaran</h1>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Informasi Pengiriman</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nama Penerima</label>
                                    <Input
                                        value={formData.recipient_name}
                                        onChange={e => setFormData({ ...formData, recipient_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                                    <Input
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Alamat Lengkap</label>
                                <Input
                                    value={formData.shipping_address}
                                    onChange={e => setFormData({ ...formData, shipping_address: e.target.value })}
                                    required
                                    placeholder="Nama Jalan, No Rumah, RT/RW"
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kota/Kabupaten</label>
                                    <Input
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Provinsi</label>
                                    <Input
                                        value={formData.province}
                                        onChange={e => setFormData({ ...formData, province: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-1">Kode Pos</label>
                                    <Input
                                        value={formData.postal_code}
                                        onChange={e => setFormData({ ...formData, postal_code: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Catatan (Opsional)</label>
                                <Input
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Metode Pembayaran</CardTitle></CardHeader>
                        <CardContent>
                            <Select
                                value={formData.payment_method}
                                onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                                className="w-full bg-white"
                            >
                                <option value="transfer">Transfer Bank (BCA/Mandiri/BRI)</option>
                                <option value="ewallet">E-Wallet (GoPay/OVO/Dana)</option>
                                <option value="cod">COD (Bayar di Tempat)</option>
                            </Select>
                        </CardContent>
                    </Card>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-md">
                            {error}
                        </div>
                    )}
                </div>

                <div className="md:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader><CardTitle>Ringkasan Pembayaran</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Total Belanja ({cartItems.length} barang)</span>
                                <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Ongkos Kirim (Flat)</span>
                                <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total Tagihan</span>
                                <span className="text-green-600">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                            <Button type="submit" size="lg" className="w-full mt-6" disabled={submitting}>
                                {submitting ? 'Memproses...' : 'Bayar Sekarang'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
