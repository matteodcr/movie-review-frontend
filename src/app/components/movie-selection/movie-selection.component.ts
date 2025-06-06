import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Movie} from '../../models/movie';
import {MovieService} from '../../services/movie.service';
import {TmdbSearchBarComponent} from '../tmdb-search-bar/tmdb-search-bar.component';

@Component({
  selector: 'app-movie-selection',
  imports: [FormsModule, NgForOf, NgIf, TmdbSearchBarComponent],
  templateUrl: './movie-selection.component.html',
  styleUrl: './movie-selection.component.scss',
  standalone: true
})
export class MovieSelectionComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  isLoading = false;

  @Output() movieSelected = new EventEmitter<Movie>();

  constructor(private movieService: MovieService) {
    this.movieService.tmdbMovies$.subscribe(movie => this.movies = movie);
    this.movieService.isTmdbMovieLoading$.subscribe(loading => this.isLoading = loading);
  }

  ngOnInit() {
    this.movieService.clearTmdbMovies();
  }

  onMovieChange() {
    if (this.selectedMovie) {
      this.movieSelected.emit(this.selectedMovie);
    }
  }

  selectMovie(movie: any) {
    this.selectedMovie = movie;
    this.onMovieChange(); // déclenche un éventuel event output
  }

}
