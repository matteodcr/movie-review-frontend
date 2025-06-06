import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import {CreateReviewComponent} from './pages/create-review/create-review.component';
import {HomeComponent} from './pages/home/home.component';
import {ReviewComponent} from './pages/review/review.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: CreateReviewComponent},
  { path: 'review/:id', component: ReviewComponent },
  { path: '**', redirectTo: '' }
];
