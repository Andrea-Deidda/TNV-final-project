import { Component, OnInit } from '@angular/core';
import { MovieData } from 'src/app/models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter-by-genre',
  templateUrl: './filter-by-genre.component.html',
  styleUrls: ['./filter-by-genre.component.css']
})
export class FilterByGenreComponent implements OnInit {

  genreByUser : string;
  movies: MovieData [];
  constructor(public dataService : DataService) { }

  ngOnInit(): void {
    //fai questa roba all'avvio del componente:
    this.getEntries();
  }

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.movies = response;
    })
  }

}
