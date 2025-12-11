<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'options' => 'array',
        'is_active' => 'boolean',
    ];

    public function games()
    {
        return $this->belongsToMany(Game::class, 'game_questions');
    }
}
