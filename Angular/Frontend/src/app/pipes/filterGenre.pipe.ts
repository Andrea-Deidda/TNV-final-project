import { Pipe, PipeTransform } from '@angular/core';
import { MovieData } from '../models/data.model';

@Pipe({
  name: 'filterGenre'
})
export class FilterGenrePipe implements PipeTransform {

  transform(movies: MovieData[], genre: string): MovieData[] {
    /*if(movies.length>0){
      let finalArray : MovieData[] = [];
      for(let i=0; i<movies.length;i++){
        if(movies[i].genre == genre){
          finalArray.push(movies[i]);
        }
      }
      return finalArray;
    }*/
    return null;
  }

}
