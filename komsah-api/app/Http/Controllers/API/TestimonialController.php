<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Http\Resources\TestimonialResource;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return TestimonialResource::collection(
            Testimonial::where('is_verified', true)->latest()->paginate(10)
        );
    }

    public function featured()
    {
        return TestimonialResource::collection(
            Testimonial::where('is_verified', true)
                ->where('is_featured', true)
                ->take(5)
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'farmer_name' => 'required|string',
            'location' => 'required|string',
            'crop_type' => 'required|string',
            'content' => 'required|string',
            'rating' => 'required|numeric|min:1|max:5',
            'phone' => 'nullable|string',
            'land_size' => 'nullable|integer',
            'yield_increase_percent' => 'nullable|integer',
        ]);

        // If authenticated, link to user
        if ($request->user('sanctum')) {
            $validated['user_id'] = $request->user('sanctum')->id;
        }

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'message' => 'Testimonial submitted successfully',
            'data' => new TestimonialResource($testimonial)
        ], 201);
    }

    // Admin methods
    public function verify($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update(['is_verified' => true]);
        return new TestimonialResource($testimonial);
    }

    public function destroy($id)
    {
        Testimonial::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
