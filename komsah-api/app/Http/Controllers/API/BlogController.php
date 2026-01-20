<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Http\Resources\BlogResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        return BlogResource::collection(
            Blog::where('status', 'published')->latest()->paginate(9)
        );
    }

    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $blog->increment('views');

        return new BlogResource($blog);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'status' => 'in:draft,published',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['user_id'] = auth()->id(); // Admin
        $validated['featured_image'] = 'default.jpg';

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        return new BlogResource($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($request->all());
        return new BlogResource($blog);
    }

    public function destroy($id)
    {
        Blog::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
