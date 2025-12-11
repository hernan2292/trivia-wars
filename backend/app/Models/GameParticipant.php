<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameParticipant extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'avg_response_time' => 'decimal:2',
        'prize_amount' => 'decimal:8',
        'joined_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
