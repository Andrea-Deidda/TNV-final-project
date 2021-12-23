import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './routes/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { FilterByGenreComponent } from './routes/filter-by-genre/filter-by-genre.component';
import { FilterGenrePipe } from './pipes/filterGenre.pipe';
import { LoginComponent } from './routes/login/login.component';
import { TheMovieApiComponent } from './routes/the-movie-api/the-movie-api.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MoviesApiComponent } from './routes/movies-api/movies-api.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    LoadingScreenComponent,
    WelcomeComponent,
    FilterByGenreComponent,
    FilterGenrePipe,
    LoginComponent,
    TheMovieApiComponent,
    WeatherComponent,
    MoviesApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
