<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;

Route::post('/auth/verify', [AuthController::class, 'verify']);

use App\Http\Controllers\Api\GameController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/games/create', [GameController::class, 'create']);
    Route::post('/games/join', [GameController::class, 'join']);
    Route::get('/games/{id}', [GameController::class, 'status']);
    Route::post('/games/{id}/submit', [GameController::class, 'submitAnswer']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
