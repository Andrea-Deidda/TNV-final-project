import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { EditComponent } from './routes/edit/edit.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { FilterByGenreComponent } from './routes/filter-by-genre/filter-by-genre.component';
import { LoginComponent } from './routes/login/login.component';
import { TheMovieApiComponent } from './routes/the-movie-api/the-movie-api.component';
import { SuggestComponent } from './routes/suggest/suggest.component';


const routes: Routes = [
  { path: "", redirectTo : '/landingPage', pathMatch: 'full' },
  { path: "dashboard", component : DashboardComponent },
  { path: "add", component : AddComponent },
  { path: "details/:id", component : DetailsComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "landingPage", component: WelcomeComponent},
  { path: "filterbygenre", component: FilterByGenreComponent},
  { path: "login", component: LoginComponent},
  { path: "themovieapi", component: TheMovieApiComponent},
  { path: "suggestmovie", component: SuggestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
