<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('wallet_address', 42)->unique();
            $table->string('world_id')->unique();
            $table->string('username', 50)->unique()->nullable();
            $table->string('avatar_url')->nullable();
            $table->integer('total_games')->default(0);
            $table->integer('total_wins')->default(0);
            $table->decimal('total_earned', 20, 8)->default(0);
            $table->integer('current_streak')->default(0);
            $table->integer('max_streak')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_banned')->default(false);
            $table->timestamps();
            
            $table->index('wallet_address');
            $table->index('world_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
