<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leaderboards', function (Blueprint $table) {
            $table->id();
            $table->string('period');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('rank');
            $table->decimal('score', 20, 8);
            $table->timestamps();

            $table->index(['period', 'rank']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leaderboards');
    }
};
