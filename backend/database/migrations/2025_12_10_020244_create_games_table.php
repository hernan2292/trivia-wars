<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('game_code', 10)->unique();
            $table->enum('game_type', ['1v1', 'tournament', 'free'])->default('1v1');
            $table->decimal('stake_amount', 20, 8);
            $table->string('category', 50)->default('general');
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
            $table->enum('status', ['waiting', 'in_progress', 'completed', 'cancelled'])->default('waiting');
            $table->foreignId('winner_id')->nullable()->constrained('users');
            $table->decimal('pool_total', 20, 8)->default(0);
            $table->decimal('platform_fee', 20, 8)->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamps();
            
            $table->index('status');
            $table->index('game_type');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
