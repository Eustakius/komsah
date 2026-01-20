<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->where('is_active', true);

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return ProductResource::collection($query->paginate(12));
    }

    public function featured()
    {
        $products = Product::where('is_active', true)
            ->where('is_featured', true)
            ->take(6)
            ->get();

        return ProductResource::collection($products);
    }

    public function show($slug)
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $product->increment('views');

        return new ProductResource($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'type' => 'required|in:granul,cair',
            'description' => 'required|string',
            'detailed_description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'weight_grams' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'benefits' => 'nullable|array',
            'composition' => 'nullable|array',
            'usage_instructions' => 'nullable|array',
            'target_crops' => 'nullable|array',
            'image' => 'nullable|image|max:2048', // Primary image upload
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Handle image upload mock (would implementation actual storage logic)
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['primary_image'] = $path;
        } else {
            $validated['primary_image'] = 'placeholder.jpg';
        }

        $validated['images'] = []; // Default empty array for gallery
        $validated['benefits'] = $validated['benefits'] ?? [];
        $validated['composition'] = $validated['composition'] ?? [];
        $validated['usage_instructions'] = $validated['usage_instructions'] ?? [];
        $validated['target_crops'] = $validated['target_crops'] ?? [];


        $product = Product::create($validated);

        return new ProductResource($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'stock' => 'sometimes|integer',
            'price' => 'sometimes|numeric',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return new ProductResource($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
