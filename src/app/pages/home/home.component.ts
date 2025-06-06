import {Component, OnInit} from '@angular/core';
import {AddReviewButtonComponent} from "../../components/add-review-button/add-review-button.component";
import {MovieSearchBarComponent} from "../../components/search-bar/movie-search-bar.component";
import {Movie} from '../../models/movie';
import {MovieService} from '../../services/movie.service';
import {Router} from '@angular/router';
import {MovieListComponent} from '../../components/movie-list/movie-list.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    AddReviewButtonComponent,
    MovieSearchBarComponent,
    MovieListComponent,
    MovieListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private movieService: MovieService, private router: Router) {
  }


  openReviewForm() {
    this.router.navigate(['new']);
  }

}
