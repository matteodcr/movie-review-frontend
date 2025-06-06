import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {MovieService} from '../../services/movie.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movie-search-bar.component.html',
  styleUrls: ['./movie-search-bar.component.scss']
})
export class MovieSearchBarComponent implements OnInit {
  searchControl = new FormControl();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        const searchTerm = value?.trim();

        if (searchTerm) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {},
            queryParamsHandling: '',
          });
        }
        if (searchTerm.length >= 3) {
          this.movieService.searchMovies(searchTerm);
        } else {
          this.movieService.getMovies()
        }
      });
  }
}
