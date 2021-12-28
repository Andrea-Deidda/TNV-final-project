<?php

namespace App\Http\Controllers;

use App\Http\Resources\RatingCollection;
use App\Http\Resources\RatingResource;
use App\Models\Rating;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(new RatingCollection(Rating::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'movie_rating' => 'required|integer',
            'movie_id' => 'required|integer',
            'user_id' => 'required|integer'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $rating = Rating::create($request->only([
            'movie_rating', 'movie_id', 'user_id'
        ]));

        return response()->json(new RatingResource($rating), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function show(Rating $rating)
    {
        return response()->json(new RatingResource($rating), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rating $rating)
    {
        $validator = Validator::make($request->all(), [
            'movie_id' => 'required|integer',
            'user_id' => 'required|integer',
            'movie_rating' => 'required|integer|between:1,5'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $rating->update($request->only([
            'movie_rating', 'movie_id', 'user_id'
        ]));

        return response()->json(new RatingResource($rating), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rating $rating)
    {
        $rating->delete();

        return response()->json([
            null, Response::HTTP_NO_CONTENT
        ]);
    }

    public function getMovieRatingsByMovieId($movieId)
    {
        return response()->json(new RatingCollection(Rating::where('movie_id', $movieId)->get()), Response::HTTP_OK);
    }

    public function getMovieRatingsByUserId($userId)
    {
        return response()->json(new RatingCollection(Rating::where('user_id', $userId)->get()), Response::HTTP_OK);
    }

    public function getMovieRatingsByUserIdAndMovieId($userId, $movieId)
    {
        return response()->json(new RatingCollection(Rating::where([['user_id', $userId],['movie_id', $movieId]])->get()), Response::HTTP_OK);
    }

}
