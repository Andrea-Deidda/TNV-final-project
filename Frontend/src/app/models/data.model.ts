export interface MovieData {
    id: number;
    name: string;
    cast: string;
    director: string;
    genre: string;
    rated: boolean;
    reviews: string;
    evaluation: number;
    releaseDate: Date;
}

export interface MovieApiInterface{
    average_rating: number,
    backdrop_path: string,
    name: string,
    results: ResultInterface
}

export interface ResultInterface{
    adult: boolean,
    backdrop_path: string,
    id: number,
    media_type: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number

}

export interface MeteoApiInterface{
    name: string,
    main: MainInterface,
}

export interface MainInterface{
    humidity: number,
    temp: number,
    pressure: number
}
