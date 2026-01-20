<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('items')->latest()->get();
        return OrderResource::collection($orders);
    }

    public function show($orderNumber)
    {
        $order = Order::with('items')
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        // Ensure user owns order if not admin (simplified check)
        if ($order->user_id !== auth()->id() && auth()->user()->email !== 'admin@komsah.com') { // simplified admin check
            abort(403);
        }

        return new OrderResource($order);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'recipient_name' => 'required|string',
            'phone' => 'required|string',
            'shipping_address' => 'required|string',
            'city' => 'required|string',
            'province' => 'required|string',
            'postal_code' => 'required|string',
            'payment_method' => 'required|in:transfer,cod,ewallet',
            'notes' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $total = 0;
            $subtotal = 0;
            $itemsToCreate = [];

            foreach ($validated['items'] as $item) {
                $product = Product::find($item['id']);

                if ($product->stock < $item['quantity']) {
                    abort(400, "Insufficient stock for product {$product->name}");
                }

                $itemSubtotal = $product->price * $item['quantity'];
                $subtotal += $itemSubtotal;

                $itemsToCreate[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $itemSubtotal,
                ];

                // Decrement stock
                $product->decrement('stock', $item['quantity']);
            }

            $shippingCost = 25000; // Flat rate for now
            $total = $subtotal + $shippingCost;

            $order = Order::create([
                'user_id' => $request->user()->id,
                'order_number' => 'ORD-' . date('Ymd') . '-' . Str::random(5),
                'status' => 'pending',
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'total' => $total,
                'recipient_name' => $validated['recipient_name'],
                'phone' => $validated['phone'],
                'shipping_address' => $validated['shipping_address'],
                'city' => $validated['city'],
                'province' => $validated['province'],
                'postal_code' => $validated['postal_code'],
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'unpaid',
                'notes' => $validated['notes'] ?? null,
            ]);

            $order->items()->createMany($itemsToCreate);

            return new OrderResource($order);
        });
    }

    public function cancel($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Cannot cancel non-pending order'], 400);
        }

        $order->update(['status' => 'cancelled']);

        // Restore stock logic could go here

        return new OrderResource($order);
    }

    // Admin Methods
    public function adminIndex()
    {
        return OrderResource::collection(Order::with(['user', 'items'])->latest()->paginate(20));
    }

    public function updateStatus(Request $request, $orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();
        $order->update(['status' => $request->status]);
        return new OrderResource($order);
    }
}
