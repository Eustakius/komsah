<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        Testimonial::create([
            'farmer_name' => 'Bapak Sutrisno',
            'crop_type' => 'Padi',
            'location' => 'Ngawi, Jawa Timur',
            'content' => 'Setelah pakai KOMSAH Granul, hasil panen padi saya meningkat 30%. Tanahnya juga jadi lebih gembur. Sangat puas!',
            'rating' => 5,
            'is_verified' => true,
        ]);

        Testimonial::create([
            'farmer_name' => 'Ibu Siti Aminah',
            'crop_type' => 'Bawang Merah',
            'location' => 'Brebes, Jawa Tengah',
            'content' => 'KOMSAH Cair sangat membantu saat musim hujan. Daun bawang jadi lebih kuat dan tidak mudah busuk. Hemat biaya pupuk kimia juga.',
            'rating' => 5,
            'is_verified' => true,
        ]);

        Testimonial::create([
            'farmer_name' => 'Kang Dedi',
            'crop_type' => 'Jagung',
            'location' => 'Garut, Jawa Barat',
            'content' => 'Jagung tumbuh seragam dan tongkolnya besar-besar. Saya rekomendasikan buat sesama petani jagung.',
            'rating' => 4,
            'is_verified' => false,
        ]);

        Testimonial::create([
            'farmer_name' => 'Pak Haji Komar',
            'crop_type' => 'Cabai',
            'location' => 'Lembang, Bandung',
            'content' => 'Cabai saya jadi lebih tahan penyakit patek. Hasil petik lebih banyak dan warnanya merah merona.',
            'rating' => 5,
            'is_verified' => true,
        ]);
    }
}
