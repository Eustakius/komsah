<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        Blog::create([
            'title' => 'Tips Memilih Pupuk Organik yang Tepat',
            'slug' => Str::slug('Tips Memilih Pupuk Organik yang Tepat'),
            'content' => 'Pupuk organik sangat penting untuk keberlanjutan tanah pertanian. Dalam artikel ini kita akan membahas...',
            'excerpt' => 'Pupuk organik sangat penting untuk keberlanjutan tanah pertanian. Simak tips memilih pupuk yang sesuai dengan kebutuhan tanaman Anda.',
            'author' => 'Admin Komsah',
            'status' => 'published',
            'category' => 'Edukasi',
            'views' => 120,
        ]);

        Blog::create([
            'title' => 'Cara Meningkatkan Produksi Padi di Musim Hujan',
            'slug' => Str::slug('Cara Meningkatkan Produksi Padi di Musim Hujan'),
            'content' => 'Musim hujan sering menjadi tantangan bagi petani padi. Genangan air berlebih...',
            'excerpt' => 'Musim hujan sering menjadi tantangan bagi petani padi. Berikut adalah strategi pemupukan dan perawatan untuk menjaga hasil panen tetap optimal.',
            'author' => 'Dr. Tani',
            'status' => 'published',
            'category' => 'Tips Bertani',
            'views' => 250,
        ]);

        Blog::create([
            'title' => 'Mengenal Teknologi Nano pada Pupuk Cair KOMSAH',
            'slug' => Str::slug('Mengenal Teknologi Nano pada Pupuk Cair KOMSAH'),
            'content' => 'Teknologi nano bukan hanya istilah keren, tapi benar-benar mengubah cara tanaman menyerap nutrisi...',
            'excerpt' => 'Teknologi nano memungkinkan nutrisi diserap tanaman lebih cepat dan efisien. Pelajari bagaimana KOMSAH Cair bekerja.',
            'author' => 'Riset & Dev',
            'status' => 'published',
            'category' => 'Teknologi',
            'views' => 400,
        ]);
    }
}
