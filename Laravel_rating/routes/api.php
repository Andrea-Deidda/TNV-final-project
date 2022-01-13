<?php

use App\Http\Controllers\MovieContreller;
use App\Http\Resources\MovieCollection;
use App\Models\Movie;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/movies', MovieContreller::class);

Route::get('/movies/movie_id/{movie_id}',[MovieContreller::class, 'getMovieRatingByMoviedId']);

Route::get('/movies/user_id/{user_id}',[MovieContreller::class, 'getMovieRatingByUserId'] );

Route::get('/movies/movie_id/{movie_id}/user_id/{user_id}',[MovieContreller::class, 'getMovieRatingByUserdIdAndMovieId'] );
