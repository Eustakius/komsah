import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, User, LogOut } from 'lucide-react';
import api from '@/api/axios';

export default function Dashboard() {
    const { user, logout, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (!user && !authLoading) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data.data);
            } catch (error) {
                console.error("Fetch orders error", error);
            } finally {
                setLoadingOrders(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user, authLoading, navigate]);

    if (authLoading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button variant="outline" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* Sidebar / Profile Card */}
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <User className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle className="text-lg">Profil Saya</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500">Nama</div>
                                <div>{user.name}</div>
                                <div className="text-sm font-medium text-gray-500 pt-2">Email</div>
                                <div>{user.email}</div>
                                <div className="text-sm font-medium text-gray-500 pt-2">Bergabung</div>
                                <div>{new Date(user.created_at).toLocaleDateString()}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders Section */}
                <div className="md:col-span-3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-lg">Riwayat Pesanan</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loadingOrders ? (
                                <div>Loading Orders...</div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    Belum ada pesanan.
                                    <br />
                                    <Button variant="link" onClick={() => navigate('/products')}>Belanja Sekarang</Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.order_number} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b">
                                                <div>
                                                    <div className="font-bold text-lg">{order.order_number}</div>
                                                    <div className="text-sm text-gray-500">{order.created_at}</div>
                                                </div>
                                                <Badge
                                                    className={
                                                        order.status === 'pending' ? 'bg-yellow-500' :
                                                            order.status === 'completed' ? 'bg-green-600' : 'bg-gray-500'
                                                    }
                                                >
                                                    {order.status.toUpperCase()}
                                                </Badge>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span>{item.quantity}x {item.product_name}</span>
                                                        <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-center pt-2 font-bold">
                                                <span>Total Bayar</span>
                                                <span className="text-green-600">Rp {order.total.toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
