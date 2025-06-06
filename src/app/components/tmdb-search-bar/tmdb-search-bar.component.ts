import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MovieService} from '../../services/movie.service';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-tmdb-search-bar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './tmdb-search-bar.component.html',
  styleUrl: './tmdb-search-bar.component.scss'
})
export class TmdbSearchBarComponent implements OnInit{
  searchControl = new FormControl();
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter(value => value.length >= 3)
      )
      .subscribe(value => this.movieService.searchTmdbMovies(value));
  }

}
