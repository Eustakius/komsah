<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farmer_name' => $this->farmer_name,
            'location' => $this->location,
            'content' => $this->content,
            'rating' => $this->rating,
            'crop_type' => $this->crop_type,
            'images' => $this->images,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
