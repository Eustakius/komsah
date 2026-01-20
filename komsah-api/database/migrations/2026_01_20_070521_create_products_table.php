<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name'); // "KOMSAH Tani", "KCT"
            $table->string('slug')->unique();
            $table->enum('type', ['granul', 'cair']);
            $table->text('description');
            $table->longText('detailed_description');
            $table->json('benefits'); // ["Menyuburkan tanah", "Nutrisi lengkap"]
            $table->json('composition'); // {"N": "2%", "P": "3%", "K": "2%"}
            $table->json('images'); // ["image1.jpg", "image2.jpg"]
            $table->string('primary_image');
            $table->integer('weight_grams');
            $table->decimal('price', 12, 2);
            $table->integer('stock')->default(0);
            $table->json('target_crops'); // ["padi", "bawang", "sayuran"]
            $table->json('usage_instructions');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
