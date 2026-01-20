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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('farmer_name');
            $table->string('location'); // "Sragen, Jawa Tengah"
            $table->string('phone')->nullable();
            $table->text('content');
            $table->string('crop_type'); // "Padi", "Bawang Merah"
            $table->integer('land_size')->nullable(); // dalam meter persegi
            $table->integer('yield_increase_percent')->nullable();
            $table->json('images')->nullable(); // foto hasil panen
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
