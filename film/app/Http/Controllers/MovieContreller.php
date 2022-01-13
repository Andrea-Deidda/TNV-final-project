<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieCollection;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
//use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;


class MovieContreller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return new MovieCollection(Movie::all());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->only([
           'movie_rating'
        ]), [
            'movie_rating' => 'required|integer|between:1,5',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $movie = Movie::create($request->only([
            'movie_rating', 'movie_id', 'user_id'
        ]));

        return response()->json(new MovieResource($movie), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        if($movie){
            return response()->json(new MovieResource($movie), Response::HTTP_OK);
        }

        return response()->json(null, Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movie $movie)
    {
        $movie->update($request->only([
            'movie_rating', 'movie_id', 'user_id'
        ]));

        return response()->json(new MovieResource($movie), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return response()->json([
            null, Response::HTTP_NO_CONTENT
        ]);
    }

    public function getMovieRatingByMoviedId($movie_id){

        return response()->json(new MovieCollection(Movie::where('movie_id', $movie_id)->get()), Response::HTTP_OK);

    }


    public function getMovieRatingByUserId($user_id){

        return response()->json(new MovieCollection(Movie::where('user_id', $user_id)->get()), Response::HTTP_OK);
    }


    public function getMovieRatingByUserdIdAndMovieId($movie_id, $user_id){

        return response()->json(new MovieCollection(Movie::where('user_id', $user_id)
        ->where('movie_id', $movie_id)->get()), Response::HTTP_OK);

    }

}
