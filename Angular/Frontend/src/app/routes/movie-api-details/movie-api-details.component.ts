import { MovieRatingService } from './../../services/movieRatings/movie-ratings.service';
import { CommentsService } from './../../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieData, ResultInterface } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import { ApiPictureService } from '../../services/api-picture.service';
import { MoviesApiService } from '../../services/moviesapi.service';
import { CommentsInterface } from '../../models/comments.model';
import { VERSION } from '@angular/core';
import { MovieRatingsArrayInterface, MovieRatingsInterface } from 'src/app/models/movie-ratings.model';

@Component({
  selector: 'app-movie-api-details',
  templateUrl: './movie-api-details.component.html',
  styleUrls: ['./movie-api-details.component.css']
})
export class MovieApiDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieApiService: MoviesApiService,
    private pictureService: ApiPictureService, private router: Router, private dataService: DataService,
    private commentsService: CommentsService, private movieRatingService: MovieRatingService) { }

  // RATINGS
  ratings: MovieRatingsInterface; // ottiene dati in arrivo da getMovieRatingsOnComponent
  result: MovieRatingsArrayInterface[]; // Array Modello Movie-Ratings.model
  ratingEntry: MovieRatingsArrayInterface; // prende i dati di un rating entry da parte si user
  currentRating: number;                  // tiene il valore del rating
  newRating: MovieRatingsArrayInterface;  // tiene il valore di un nuovo rating
  starRating: MovieRatingsArrayInterface;
  movie_rating_id: number;
  ratingSubmit: MovieRatingsArrayInterface;
  ratedOptions = ['1', '2', '3', '4', '5'];   // stabilisce i valori disponibili per il rating da 1 a 5 (come il numero di stelle)
  name = "Angular " + VERSION.major;          // utlie per il fnzionamento delle star

  // IMMAGINI
  imagePath: string
  private mainUrl: ApiPictureService;
  movieDetailsEntry: ResultInterface;
  id: number;
  pathComplete: string;

  // ID USER
  username: string = sessionStorage.getItem('username');
  userId=1;
  user: any;

  // COMMENTI
  dataEntry: CommentsInterface;
  movies: MovieData[];
  casa: number;
  comments: CommentsInterface[];

  //LISTA VISTO/DA VEDERE
  movieFilm = <MovieData>{};
  seenOption = ['my watched movies', 'my Must See movies']
  seenSubmit: MovieData
  flag;

  // LISTE
  dataEntryList: MovieData;

  // FUNZIONI
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getMovieApiDetails();
    this.getMovieRating();
    this.getEntries();
    this.getMovies();
    
    
  }

  // Funzione che prende il campo scelto nel form Film da vedere e lo aggiunge al database The Net Fish
  onSeen(form: NgForm) {
    
    this.movieFilm = form.form.value;

    console.log("form.form.value ", form.form.value);
    console.log(this.id);
    this.movieFilm.movie_id = this.id
    this.movieFilm.user_id = 1
    this.movieFilm.name = this.movieDetailsEntry.title;
    this.movieFilm.evaluation = this.movieDetailsEntry.vote_average;
    this.movieFilm.reviews = this.movieDetailsEntry.overview;
    this.movieFilm.cast = "null";
    this.movieFilm.director = "null"
    this.movieFilm.rated = false;

    if (form.form.value.seen === 'my watched movies') {
      this.movieFilm.seen = true;
      this.movieFilm.must_see = false

    } else if (form.form.value.seen === 'my Must See movies') {
      this.movieFilm.must_see = true;
      this.movieFilm.seen = false;
    };


    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].movie_id == this.id) {
        console.log("INIZIA IL FOR");
        this.flag = true;
        this.movieFilm.id = this.movies[i].id
        this.movieFilm.name = this.movies[i].name;
        console.log("this.movieFilm.id  ", this.movieFilm.id)
        console.log("FINISCE IL FOR");

        break;

      } else {
        this.flag = false;
      }
    };

    // Add o PUT se il film è già presente nel BD o meno
    if (this.flag == true) {
      this.dataService.editEntry(this.movieFilm).subscribe(response => {
        window.alert("Movie added to your list, Tkank you!");
      },
        (err) => {
          console.log("mah");
        }
      )
      console.log("FINISCE LA EDIT");
    }

    else {
      console.log(this.movieFilm);

      this.dataService.addEntry(this.movieFilm).subscribe(response => {
        window.alert("Movie added to your list, Tkank you!"); 
      },
        (err) => {
          console.log("mah2");
        }
      )
      this.flag == true;
      console.log("FINISCE LA ADD");
    }
   };

  onSubmitRating(form: NgForm) {
    form.form.value.movie_id = this.movieDetailsEntry.id,
      form.form.value.user_id = 1
    //form.form.value.currentRating = parseInt(form.form.value.currentRating);
    form.form.value.movie_rating = parseInt(form.form.value.movie_rating);
    this.ratingSubmit = form.form.value;
    console.log("RISULTATI RATING", this.ratingSubmit);
    this.movieRatingService.addMovieRating(this.ratingSubmit).subscribe(response => {

    },
      (err) => {
        console.log(err)
      }
    )
  }
  
  // chiama e alloca l ordine corretto degli indirizzi per recupero immagini da api
  getMovieApiDetails() {
    this.movieApiService.getMovieById(this.id).subscribe((res: any) => {
      this.movieDetailsEntry = res;
      this.imagePath = "https://image.tmdb.org/t/p/w780" + this.movieDetailsEntry.backdrop_path 
      console.log(this.movieDetailsEntry);
    })
  }

  // funzione protipo di supporto alternativa per le immagini
  /*getMoviePosters() { 
    this.pictureService.getMoviePics(this.movieDetailsEntry.backdrop_path).subscribe((res: any) => {
      this.movieDetailsEntry = res;
      this.pathComplete = this.combinePath(this.mainUrl, this.movieDetailsEntry.backdrop_path)
      console.log(this.pathComplete)
    }
    )
  }

  // allegata a getMoviePosters()
  combinePath(mainUrl: ApiPictureService, backdrop_path: string) {
    return this.mainUrl + this.movieDetailsEntry.backdrop_path;
  }*/

  getMovieRating() {
    this.movieRatingService.getratingsByMovieId(this.id).subscribe(
      response => {
        this.ratings = response;
        this.ratingEntry = this.ratings.data[0];
      },
      error => console.log(error)
    )
  }

  //-----------------------SEZIONE COMMENTI --------------------------//

  getEntries() {
    this.commentsService.getComments().subscribe(
      response => {
        //se è andato tutto bene, allora:
        //console.log("ho ottenuto i dati!");
        this.comments = response;
        //console.log(this.comments);
      },
      error => console.log(error)
    )
  }

  getMovies() {
    this.dataService.getData().subscribe((response: any) => {
      this.movies = response;
      //console.log(this.movies);
    })
  }

  onSubmit(form: NgForm) {

    this.dataEntry = form.form.value;
    console.log(form);
    console.log(this.dataEntry);
    console.log(this.userId);
    console.log(this.id);
    this.userId=3;
    this.commentsService.addComment(this.userId, this.id, this.dataEntry).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["/movieApiDetails/791373"]);
      },
      error =>
        alert(error.error.message)
    )
  }

  reloadPage() {
    window.location.reload();
  }
}
