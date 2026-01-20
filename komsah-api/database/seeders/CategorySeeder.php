<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Pupuk Dasar', 'icon' => 'sprout'],
            ['name' => 'Pupuk Khusus', 'icon' => 'leaf'],
            ['name' => 'Pupuk Cair', 'icon' => 'droplet'],
        ];

        foreach ($categories as $index => $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'icon' => $cat['icon'],
                'order' => $index,
            ]);
        }
    }
}
