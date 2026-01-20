import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { getTotalItems } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-700 font-bold text-xl">K</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-green-700 transition-colors">
                            KOMSAH
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Beranda', 'Produk', 'Testimoni', 'Blog'].map((item) => {
                            const path = item === 'Beranda' ? '/' : `/${item.toLowerCase()}`;
                            return (
                                <Link
                                    key={item}
                                    to={path}
                                    className="text-gray-600 hover:text-green-700 font-medium text-sm uppercase tracking-wide transition-colors"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/cart" className="relative transition-colors hover:text-green-700">
                            <ShoppingCart className="w-6 h-6 text-gray-600" />
                            {getTotalItems() > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white font-bold">
                                    {getTotalItems()}
                                </Badge>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-green-700">
                                    Halo, {user.name}
                                </Link>
                                <Button variant="outline" size="sm" onClick={logout} className="border-red-100 text-red-600 hover:bg-red-50">
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-700">Masuk</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white shadow-md shadow-green-100">
                                        Daftar
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-700 p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 overflow-hidden shadow-xl"
                    >
                        <div className="p-6 space-y-6">
                            <div className="flex flex-col gap-4">
                                <Link to="/" className="text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Beranda</Link>
                                <Link to="/products" className="text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Produk</Link>
                                <Link to="/testimonials" className="text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Testimoni</Link>
                                <Link to="/blog" className="text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Blog</Link>
                            </div>
                            <hr className="border-gray-100" />
                            {!user && (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link to="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full">Masuk</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-green-700 text-white">Daftar</Button>
                                    </Link>
                                </div>
                            )}
                            {user && (
                                <div className="space-y-3">
                                    <Link to="/dashboard" className="block text-green-700 font-medium" onClick={() => setIsOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <Button variant="destructive" className="w-full" onClick={() => { logout(); setIsOpen(false); }}>
                                        Keluar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
