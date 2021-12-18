import { Component, OnInit } from '@angular/core';
import { SuggestService } from '../../services/suggest.service';
import { MeteoApiInterface } from '../../models/data.model';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {

  meteo : MeteoApiInterface;
  citta = "torino"
  constructor(private suggestService: SuggestService) { }

  ngOnInit(): void {
      this.suggestService.getMeteo(this.citta).subscribe(
        response =>{
            this.meteo = response;
            console.log(this.meteo);
            this.meteo.main.temp =  Math.floor((this.meteo.main.temp - 273));
        },
        err => console.log(err)
      )
  }

}
