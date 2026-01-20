<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'order_number' => $this->order_number,
            'status' => $this->status,
            'total' => $this->total,
            'subtotal' => $this->subtotal,
            'shipping_cost' => $this->shipping_cost,
            'items_count' => $this->items->count(),
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'shipping_info' => [
                'recipient' => $this->recipient_name,
                'address' => $this->shipping_address,
                'city' => $this->city,
            ],
            'items' => $this->items->map(function ($item) {
                return [
                    'product_name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ];
            }),
        ];
    }
}
