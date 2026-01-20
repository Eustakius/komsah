<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pupukDasar = Category::where('slug', 'pupuk-dasar')->first();
        $pupukCair = Category::where('slug', 'pupuk-cair')->first();

        Product::create([
            'category_id' => $pupukDasar->id ?? 1,
            'name' => 'KOMSAH Tani Granul',
            'slug' => 'komsah-tani-granul',
            'type' => 'granul',
            'description' => 'Pupuk organik granul lengkap untuk menyuburkan tanah dan tanaman.',
            'detailed_description' => 'KOMSAH Tani Granul adalah pupuk organik berkualitas tinggi yang diformulasikan khusus untuk memperbaiki struktur tanah dan menyediakan nutrisi lengkap bagi tanaman. Cocok untuk padi, palawija, dan hortikultura.',
            'benefits' => json_encode(['Menyuburkan tanah', 'Memperbaiki struktur tanah', 'Nutrisi lengkap']),
            'composition' => json_encode(['N' => '2-5%', 'P' => '2-5%', 'K' => '2-5%']),
            'images' => json_encode([]),
            'primary_image' => 'https://placehold.co/600x600/16a34a/ffffff?text=Granul',
            'weight_grams' => 1000,
            'price' => 75000,
            'stock' => 100,
            'target_crops' => json_encode(['Padi', 'Jagung', 'Kedelai']),
            'usage_instructions' => json_encode(['Taburkan merata pada lahan sebelum tanam']),
            'is_featured' => true,
        ]);

        Product::create([
            'category_id' => $pupukCair->id ?? 2,
            'name' => 'KOMSAH Cair (KCT)',
            'slug' => 'komsah-cair-kct',
            'type' => 'cair',
            'description' => 'Pupuk cair dengan teknologi nano untuk penyerapan maksimal.',
            'detailed_description' => 'Pupuk cair konsentrasi tinggi yang mudah diserap tanaman. Mempercepat pertumbuhan vegetatif dan generatif. Sangat efektif untuk penyemprotan daun.',
            'benefits' => json_encode(['Cepat diserap tanaman', 'Memacu pertumbuhan', 'Meningkatkan bobot buah']),
            'composition' => json_encode(['N' => '5%', 'P' => '5%', 'K' => '5%', 'ZPT' => 'Ada']),
            'images' => json_encode([]),
            'primary_image' => 'https://placehold.co/600x600/15803d/ffffff?text=Cair',
            'weight_grams' => 1200, // ~1 Liter
            'price' => 95000,
            'stock' => 50,
            'target_crops' => json_encode(['Bawang Merah', 'Cabai', 'Sayuran']),
            'usage_instructions' => json_encode(['Larutkan 5ml per liter air', 'Semprotkan pada daun pagi hari']),
            'is_featured' => true,
        ]);
    }
}
