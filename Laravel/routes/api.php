<?php

use App\Http\Controllers\RatingController;
use App\Http\Resources\RatingCollection;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/ratings', RatingController::class);

Route::get('/ratings/movieId/{movieId}', [RatingController::class, 'getMovieRatingsByMovieId']);

Route::get('/ratings/userId/{userId}', [RatingController::class, 'getMovieRatingsByUserId']);

Route::get('/ratings/userId/{userId}/movieId/{movieId}', [RatingController::class, 'getMovieRatingsByUserIdAndMovieId']);
