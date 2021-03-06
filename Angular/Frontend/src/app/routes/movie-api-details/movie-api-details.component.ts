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
//import { LoginService } from '../../services/login/login.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-movie-api-details',
  templateUrl: './movie-api-details.component.html',
  styleUrls: ['./movie-api-details.component.css']
})
export class MovieApiDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieApiService: MoviesApiService,
    public loginService:LoginService,
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
    this.getEntries();
    this.getMovies();


  }

  // Funzione che prende il campo scelto nel form Film da vedere e lo aggiunge al database The Net Fish
  onSeen(form: NgForm) {
    var usernameLogged = sessionStorage.getItem('username');
    this.loginService.getUserByUsername(usernameLogged).subscribe(response => {
      this.movieFilm = form.form.value;
      console.log("form.form.value ", form.form.value);
      console.log(this.id);
      this.movieFilm.movie_id = this.id;
      this.movieFilm.user_id = response.id;
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

      // Add o PUT se il film ?? gi?? presente nel BD o meno
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
    })


   };

  onSubmitRating(form: NgForm) {
    var usernameLogged = sessionStorage.getItem('username');
    this.loginService.getUserByUsername(usernameLogged).subscribe(response => {
    form.form.value.movie_id = this.movieDetailsEntry.id,
      form.form.value.user_id = response.id;
    //form.form.value.currentRating = parseInt(form.form.value.currentRating);
    form.form.value.movie_rating = parseInt(form.form.value.movie_rating);
    this.ratingSubmit = form.form.value;
    console.log("RISULTATI RATING", this.ratingSubmit);
    this.movieRatingService.addMovieRating(this.ratingSubmit).subscribe(response => {
    window.alert("Rating submitted, Tkank you!");
    },
      (err) => {
        console.log(err)
      }
    )
  })
  }

  // chiama e alloca l ordine corretto degli indirizzi per recupero immagini da api
  getMovieApiDetails() {
    this.movieApiService.getMovieById(this.id).subscribe((res: any) => {
      this.movieDetailsEntry = res;
      this.imagePath = "https://image.tmdb.org/t/p/w780" + this.movieDetailsEntry.backdrop_path
      console.log(this.movieDetailsEntry);
    })
  }

   //-----------------------SEZIONE COMMENTI --------------------------//

  getEntries() {
    this.commentsService.getComments().subscribe(
      response => {
        //se ?? andato tutto bene, allora:
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
    var usernameLogged = sessionStorage.getItem('username');
    this.loginService.getUserByUsername(usernameLogged).subscribe(response => {
    this.dataEntry = form.form.value;
    console.log(form);
    console.log(this.dataEntry);
    console.log(this.userId);
    console.log(this.id);
    this.commentsService.addComment(response.id, this.id, this.dataEntry).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["/movieApiDetails/791373"]);
      },
      error =>
        alert(error.error.message)
    );
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
