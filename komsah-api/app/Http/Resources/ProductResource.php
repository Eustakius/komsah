<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'type' => $this->type,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'price' => $this->price,
            'weight_grams' => $this->weight_grams,
            'stock' => $this->stock,
            'primary_image' => $this->primary_image,
            'description' => $this->description,
            'detailed_description' => $this->detailed_description,
            'benefits' => $this->benefits,
            'composition' => $this->composition,
            'usage_instructions' => $this->usage_instructions,
            'target_crops' => $this->target_crops,
            'is_featured' => $this->is_featured,
            'created_at' => $this->created_at,
        ];
    }
}
