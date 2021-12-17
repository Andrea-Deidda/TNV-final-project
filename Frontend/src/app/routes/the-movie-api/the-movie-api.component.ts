import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MovieApiInterface, ResultInterface } from '../../models/data.model';

@Component({
  selector: 'app-the-movie-api',
  templateUrl: './the-movie-api.component.html',
  styleUrls: ['./the-movie-api.component.css']
})
export class TheMovieApiComponent implements OnInit {

  movies : MovieApiInterface;
  resultsApi : ResultInterface;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      response => {
        this.movies = response;
        console.log(this.movies)
        this.resultsApi = this.movies.results;
      },
      err => console.log(err)
    )
  }

}
