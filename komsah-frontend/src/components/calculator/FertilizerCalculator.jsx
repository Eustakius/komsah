import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Sprout, TrendingUp, AlertCircle, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function FertilizerCalculator() {
    const [formData, setFormData] = useState({
        landArea: '',
        cropType: 'padi',
        soilCondition: 'normal',
    });
    const [result, setResult] = useState(null);

    const cropTypes = {
        padi: { name: 'Padi', dosage: 200 },
        jagung: { name: 'Jagung', dosage: 250 },
        cabai: { name: 'Cabai', dosage: 150 },
        tomat: { name: 'Tomat', dosage: 180 },
        sayuran: { name: 'Sayuran Hijau', dosage: 120 },
    };

    const soilMultiplier = {
        poor: 1.3,
        normal: 1.0,
        good: 0.8,
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        const area = parseFloat(formData.landArea);
        if (!area || area <= 0) {
            alert('Masukkan luas lahan yang valid!');
            return;
        }

        const baseDosage = cropTypes[formData.cropType].dosage;
        const multiplier = soilMultiplier[formData.soilCondition];
        const totalDosage = area * baseDosage * multiplier;

        setResult({
            totalDosage: totalDosage.toFixed(2),
            cropName: cropTypes[formData.cropType].name,
            area,
            soilCondition: formData.soilCondition,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                        <Calculator className="w-4 h-4" />
                        Kalkulator Dosis
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                        Hitung Kebutuhan <span className="text-green-700">Pupuk</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tentukan dosis pupuk yang tepat untuk lahan Anda berdasarkan jenis tanaman dan kondisi tanah.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Calculator Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="shadow-xl border-2 border-gray-100">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Sprout className="w-6 h-6 text-green-600" />
                                    Data Lahan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleCalculate} className="space-y-6">
                                    {/* Land Area */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Luas Lahan (m²)
                                        </label>
                                        <input
                                            type="number"
                                            name="landArea"
                                            value={formData.landArea}
                                            onChange={handleChange}
                                            placeholder="Contoh: 1000"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Crop Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Jenis Tanaman
                                        </label>
                                        <select
                                            name="cropType"
                                            value={formData.cropType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
                                        >
                                            {Object.entries(cropTypes).map(([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Soil Condition */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Kondisi Tanah
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: 'poor', label: 'Kurang Baik', color: 'red' },
                                                { value: 'normal', label: 'Normal', color: 'yellow' },
                                                { value: 'good', label: 'Baik', color: 'green' },
                                            ].map((option) => (
                                                <label
                                                    key={option.value}
                                                    className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.soilCondition === option.value
                                                        ? `border-${option.color}-500 bg-${option.color}-50`
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="soilCondition"
                                                        value={option.value}
                                                        checked={formData.soilCondition === option.value}
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-sm font-medium">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-green-700 hover:bg-green-800 text-lg py-6 shadow-lg shadow-green-200"
                                        >
                                            <Calculator className="w-5 h-5 mr-2" />
                                            Hitung Dosis Pupuk
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Result */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {result ? (
                            <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2 text-green-800">
                                        <CheckCircle2 className="w-6 h-6" />
                                        Hasil Perhitungan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Total Dosage */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg text-center"
                                    >
                                        <div className="text-sm text-gray-600 mb-2">Total Kebutuhan Pupuk</div>
                                        <div className="text-5xl font-bold text-green-700 mb-2">
                                            {result.totalDosage}
                                        </div>
                                        <div className="text-lg text-gray-700 font-semibold">gram (gr)</div>
                                    </motion.div>

                                    {/* Details */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                                            <span className="text-gray-600">Luas Lahan</span>
                                            <span className="font-bold text-gray-900">{result.area} m²</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                                            <span className="text-gray-600">Jenis Tanaman</span>
                                            <span className="font-bold text-gray-900">{result.cropName}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                                            <span className="text-gray-600">Kondisi Tanah</span>
                                            <span className="font-bold text-gray-900 capitalize">
                                                {result.soilCondition === 'poor' && 'Kurang Baik'}
                                                {result.soilCondition === 'normal' && 'Normal'}
                                                {result.soilCondition === 'good' && 'Baik'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Recommendation */}
                                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm text-blue-900">
                                                <strong>Rekomendasi:</strong> Aplikasikan pupuk secara merata pada lahan. Untuk hasil optimal, gunakan pupuk KOMSAH Granul atau Cair sesuai kebutuhan.
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link to="/products">
                                        <Button size="lg" className="w-full bg-green-700 hover:bg-green-800 shadow-lg">
                                            <ShoppingBag className="w-5 h-5 mr-2" />
                                            Beli Pupuk KOMSAH
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="shadow-xl border-2 border-gray-100 h-full flex items-center justify-center">
                                <CardContent className="text-center py-20">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <TrendingUp className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Siap Menghitung?</h3>
                                    <p className="text-gray-600">
                                        Isi form di sebelah kiri untuk mendapatkan rekomendasi dosis pupuk yang tepat.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
