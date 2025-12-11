<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'stake_amount' => 'decimal:8',
        'pool_total' => 'decimal:8',
        'platform_fee' => 'decimal:8',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public function participants()
    {
        return $this->hasMany(GameParticipant::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'game_questions')
                    ->withPivot('order', 'time_limit')
                    ->orderBy('pivot_order');
    }

    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }
}
