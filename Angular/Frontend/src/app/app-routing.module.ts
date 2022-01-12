import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { EditComponent } from './routes/edit/edit.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { FilterByGenreComponent } from './routes/filter-by-genre/filter-by-genre.component';
import { TheMovieApiComponent } from './routes/the-movie-api/the-movie-api.component';
import { MoviesApiComponent } from './routes/movies-api/movies-api.component';
import { MovieApiDetailsComponent } from './routes/movie-api-details/movie-api-details.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';



const routes: Routes = [
  { path: "", redirectTo : '/landingPage', pathMatch: 'full' },
  { path: "dashboard", component : DashboardComponent },
  { path: "add", component : AddComponent },
  { path: "details/:id", component : DetailsComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "landingPage", component: WelcomeComponent},
  { path: "filterbygenre", component: FilterByGenreComponent},
  { path: "themovieapi", component: TheMovieApiComponent},
  { path: "movieapi", component:MoviesApiComponent},
  { path: "movieApiDetails/:id", component: MovieApiDetailsComponent},
  { path: "login", component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
