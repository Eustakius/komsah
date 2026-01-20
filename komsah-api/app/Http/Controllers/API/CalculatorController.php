<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public function calculate(Request $request)
    {
        $validated = $request->validate([
            'land_size' => 'required|numeric|min:1', // m2
            'crop_type' => 'required|string',
            'soil_condition' => 'required|in:poor,normal,fertile',
        ]);

        $landSize = $validated['land_size'];

        // Logic dasar perhitungan (bisa disesuaikan dengan rumus nyata)
        // Standar 1 Hektar (10000 m2) butuh: 
        // Granul: 200kg (Normal)
        // Cair: 10 Liter (Normal)

        $baseGranulPerHectare = 200;
        $baseLiquidPerHectare = 10;

        // Adjust by soil condition
        $multiplier = match ($validated['soil_condition']) {
            'poor' => 1.2,
            'normal' => 1.0,
            'fertile' => 0.8,
        };

        $granulNeeded = ($landSize / 10000) * $baseGranulPerHectare * $multiplier;
        $liquidNeeded = ($landSize / 10000) * $baseLiquidPerHectare * $multiplier;

        // Estimasi biaya (Example prices)
        $priceGranulPerKg = 15000;
        $priceLiquidPerLiter = 80000;

        $totalCost = ($granulNeeded * $priceGranulPerKg) + ($liquidNeeded * $priceLiquidPerLiter);

        return response()->json([
            'data' => [
                'granul_kg' => round($granulNeeded, 1),
                'liquid_liter' => round($liquidNeeded, 1),
                'total_cost' => round($totalCost, 0),
                'recommendation' => "Gunakan kombinasi KOMSAH Granul dan Cair untuk hasil maksimal pada lahan {$landSize}m².",
            ]
        ]);
    }
}
