export interface MovieData {
    id: number;
    name: string;
    cast: string;
    director: string;
    rated: boolean;

    reviews: string;
    evaluation: number;
    user_id: number;
    movie_id: number;
    seen: boolean;
    must_see: boolean;
}

export interface MovieApiInterface {
  average_rating: number,
  backdrop_path: string,
  description: string,
  id: number,
  name: string,
  results: ResultInterface[]
}

export interface ResultInterface {
  adult: boolean,
  backdrop_path: string,
  id: number,
  media_type: string,
  original_language: string,
  overview: string,
  popularity: number,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  runtime: number,
  poster_path : string
}


