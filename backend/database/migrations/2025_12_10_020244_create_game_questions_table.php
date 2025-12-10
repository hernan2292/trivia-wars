<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained()->cascadeOnDelete();
            $table->foreignId('question_id')->constrained()->cascadeOnDelete();
            $table->integer('question_order');
            $table->integer('time_limit')->default(15);
            $table->timestamps();

            $table->unique(['game_id', 'question_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_questions');
    }
};
